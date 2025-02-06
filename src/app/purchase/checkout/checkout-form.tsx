import React, { useEffect, useState } from "react";
import styles from "./Checkout.module.css";
import ButtonBackToCart from "./button-backtocart";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePopup } from "@/app/context/popup-provider";
import {
  UpdateDeliveryInfo,
  UpdateDeliveryInfoType,
} from "@/schemaValidations/account.schema";
import { useAppContext } from "@/app/context/app-provider";
import { districtResType, provinceResType } from "@/schemaValidations/viettel";
import viettelApiRequest from "@/apiRequests/viettel";
import accountApiRequest from "@/apiRequests/account";
import { data } from "@/app/(Profile)/customer/profile/types";
import { toast } from "@/hooks/use-toast";
import LoadingAnimation from "@/components/common/LoadingAnimation";

export default function CheckoutForm() {
  const { setShippingDetails } = useAppContext();
  // const accessToken = localStorage.getItem("accessToken")
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<data>();
  const [provinces, setProvinces] = useState<provinceResType>();
  const [selectedProvinceId, setSelectedProvinceId] = useState<
    number | undefined
  >();
  const [selectedDistrictId, setSelectedDistrictId] = useState<
    number | undefined
  >();
  const [districts, setDistricts] = useState<districtResType>();
  const { setContent } = usePopup();
  const form = useForm<UpdateDeliveryInfoType>({
    resolver: zodResolver(UpdateDeliveryInfo),
    defaultValues: {
      dob: "",
      gender: "",
      name: "",
      province: "",
      district: "",
      phone: "",
      address: "",
    },
  });
  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       setLoading(true);
  //       const result = await accountApiRequest.meClient();
  //       const allowedKeys = [
  //         "name",
  //         "province",
  //         "district",
  //         "phone",
  //         "address",
  //         "dob",
  //         "gender",
  //       ];
  //       const filteredData = Object.fromEntries(
  //         Object.entries(result.payload.data).filter(([key]) =>
  //           allowedKeys.includes(key)
  //         )
  //       );
  //       form.reset(filteredData);
  //       setUser(result.payload.data);
  //     } catch (error) {
  //       console.log("loi khi lay user: ", error);
  //       setLoading(false);
  //     }
  //   };
  //   fetchUser();
  // }, []);

  // useEffect(() => {
  //   // Fetch danh sách tỉnh/thành phố
  //   const fetchProvinces = async () => {
  //     try {
  //       const result = await viettelApiRequest.provinces();
  //       setProvinces(result.payload); // Lưu danh sách tỉnh/thành phố

  //       // Đặt selectedProvinceId nếu userData.province đã có
  //       if (user?.province) {
  //         const selectedProvince = result.payload?.data.find(
  //           (province) => province.PROVINCE_NAME === user.province
  //         );
  //         const provinceId = selectedProvince?.PROVINCE_ID || undefined;
  //         if (provinceId !== selectedProvinceId) {
  //           setSelectedProvinceId(provinceId);
  //         }
  //       }
  //     } catch (error) {
  //       console.error("Error fetching provinces:", error);
  //       setLoading(false);
  //     }
  //   };

  //   fetchProvinces();
  // }, [user?.province]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
  
        // Chạy cả hai API cùng lúc với Promise.all
        const [userResult, provincesResult] = await Promise.all([
          accountApiRequest.meClient(),
          viettelApiRequest.provinces(),
        ]);
  
        // Xử lý dữ liệu người dùng
        const allowedKeys = [
          "name",
          "province",
          "district",
          "phone",
          "address",
          "dob",
          "gender",
        ];
        const filteredData = Object.fromEntries(
          Object.entries(userResult.payload.data).filter(([key]) =>
            allowedKeys.includes(key)
          )
        );
        form.reset(filteredData);
        setUser(userResult.payload.data);
  
        // Xử lý dữ liệu tỉnh/thành phố
        setProvinces(provincesResult.payload); // Lưu danh sách tỉnh/thành phố
  
        // Đặt selectedProvinceId nếu userData.province đã có
        if (userResult.payload.data.province) {
          const selectedProvince = provincesResult.payload?.data.find(
            (province) => province.PROVINCE_NAME === userResult.payload.data.province
          );
          const provinceId = selectedProvince?.PROVINCE_ID || undefined;
          if (provinceId !== selectedProvinceId) {
            setSelectedProvinceId(provinceId);
          }
        }
      } catch (error) {
        console.log("Error fetching data: ", error);
      } finally {
      }
    };
  
    fetchData();
  }, []); // Thêm dependency nếu cần
  

  useEffect(() => {
    // Fetch danh sách quận/huyện dựa trên selectedProvinceId
    if (!selectedProvinceId) return;

    const fetchDistricts = async () => {
      try {
        const result = await viettelApiRequest.districts(selectedProvinceId);
        setDistricts(result.payload);
        // Đặt selectedDistrictId nếu userData.district đã có
        if (user?.district) {
          const selectedDistrict = result.payload?.data.find(
            (district) => district.DISTRICT_NAME === user.district
          );
          const districtId = selectedDistrict?.DISTRICT_ID || undefined;
          if (districtId !== selectedDistrictId) {
            setSelectedDistrictId(districtId);
          }
        }
      } catch (error) {
        console.error("Error fetching districts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDistricts();
  }, [selectedProvinceId]);

  async function onSubmit(values: UpdateDeliveryInfoType) {
    setLoading(true);
    try {
      await accountApiRequest.updateMe(values);
      setShippingDetails({
        provinceId: selectedProvinceId || 0,
        districtId: selectedDistrictId || 0,
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        description: "Có lỗi xảy ra khi cập nhật. Vui lòng thử lại.",
        duration: 2000,
      });
    } finally {
      setLoading(false);
      setContent("payment");
    }
  }

  return (
    <div className={styles.holdForm}>
      {loading && <LoadingAnimation/>}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, (error) => console.log(error))}
          className={styles.checkoutForm}
        >
          <div className={styles.formSection}>
            <FormItem>
              <FormLabel className="!text-black font-bold"></FormLabel>
              <FormControl>
                <Input
                  placeholder="Email"
                  value={user ? user.email : ""} // Thay bằng giá trị email thực tế
                  className={styles.formInput}
                  readOnly
                />
              </FormControl>
              <FormDescription></FormDescription>
            </FormItem>
          </div>
          <div className={styles.formSection}>
            <h2 className={styles.sectionTitle}>Địa chỉ giao hàng</h2>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="!text-black ml-[10px]">Tên</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Tên khách hàng"
                      {...field}
                      className={styles.formInput}
                    />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* /////////////////////////////////////////////////////////*/}
            <FormField
              control={form.control}
              name="province"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="!text-black ml-[10px]">
                    Thành phố
                  </FormLabel>
                  <FormControl>
                    <Select
                      key={field.value || "default"}
                      onValueChange={(value) => {
                        field.onChange(value); // Cập nhật giá trị tỉnh/thành phố
                        const selectedProvince = provinces?.data.find(
                          (province) => province.PROVINCE_NAME === value
                        );
                        setSelectedProvinceId(
                          selectedProvince?.PROVINCE_ID || undefined
                        ); // Lưu ID tỉnh đã chọn
                        // Reset district field when province changes
                        form.setValue("district", "");
                      }}
                      value={field.value || ""}
                    >
                      <div className={`${styles.selectContent}`}>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn thành phố" />
                        </SelectTrigger>
                        <SelectContent
                          className={`${styles.selectContent} w-[90%]`}
                        >
                          {provinces?.data.map((province) => (
                            <SelectItem
                              className={styles.selectItem}
                              key={province.PROVINCE_ID}
                              value={province.PROVINCE_NAME}
                            >
                              {province.PROVINCE_NAME}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </div>
                    </Select>
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            {selectedProvinceId && (
              <FormField
                control={form.control}
                name="district"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="!text-black ml-[10px]">
                      Quận/Huyện
                    </FormLabel>
                    <FormControl>
                      <Select
                        key={field.value || "default"}
                        onValueChange={(value) => {
                          field.onChange(value);
                          const selectedDistrict = districts?.data.find(
                            (district) => district.DISTRICT_NAME === value
                          );
                          setSelectedDistrictId(
                            selectedDistrict?.DISTRICT_ID || undefined
                          );
                        }}
                        value={field.value || ""}
                        // disabled={!selectedProvinceId} // Disable nếu chưa chọn tỉnh
                      >
                        <div className={`${styles.selectContent}`}>
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn quận/huyện" />
                          </SelectTrigger>
                          <SelectContent className={styles.selectContent}>
                            {districts?.data.map((district, index) => (
                              <SelectItem
                                className={styles.selectItem}
                                key={index}
                                value={district.DISTRICT_NAME}
                              >
                                {district.DISTRICT_NAME}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </div>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="!text-black ml-[10px]">
                    Địa chỉ
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Địa Chỉ"
                      {...field}
                      className={styles.formInput}
                    />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="!text-black ml-[10px]">
                    Số điện thoại
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      placeholder="Số điện thoại"
                      {...field}
                      className={styles.formInput}
                    />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className={styles.formActions}>
            <ButtonBackToCart />
            <button type="submit" className={styles.continueButton}>
              Tiếp Tục
            </button>
          </div>
        </form>
      </Form>
    </div>
  );
}
