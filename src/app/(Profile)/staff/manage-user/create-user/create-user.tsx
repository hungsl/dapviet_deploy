"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./CreateUserPage.module.css";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
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
  StaffCreateUser,
  StaffCreateUserType,
} from "@/schemaValidations/account.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import viettelApiRequest from "@/apiRequests/viettel";
// import { useAppContext } from "@/app/context/app-provider";
import { districtResType, provinceResType } from "@/schemaValidations/viettel";
import { useLoading } from "@/app/context/loading-provider";
import { toast } from "@/hooks/use-toast";
import accountApiRequest from "@/apiRequests/account";
import { uploadImage } from "@/supabase/storage/client";
import { useRouter } from "next/navigation";

export type StaffCheckAPIUserType = {
  status: "VERIFIED" | "UNVERIFIED";
  name: string;
  gender: "MALE" | "FEMALE" | "OTHER";
  email: string;
  password: string;
  phone: string;
  avatar: string;
  role: "STAFF" | "CUSTOMER";
  dob?: string | undefined;
  province?: string | undefined;
  district?: string | undefined;
  address?: string | undefined;
};

export default function CreateUser() {
    const router = useRouter()
  const [provinces, setProvinces] = useState<provinceResType>();
  const [selectedProvinceId, setSelectedProvinceId] = useState<
    number | undefined
  >();
  const { setLoading } = useLoading();
  const [districts, setDistricts] = useState<districtResType>();
  const form = useForm<StaffCreateUserType>({
    resolver: zodResolver(StaffCreateUser),
    defaultValues: {
      name: "",
      gender: "MALE",
      dob: "",
      email: "",
      password: "",
      address: "",
      province: "",
      district: "",
      phone: "",
      avatar: undefined,
      role: "STAFF",
      status: "VERIFIED",
    },
  });

  useEffect(() => {
    // Fetch danh sách tỉnh/thành phố
    const fetchProvinces = async () => {
      try {
        const result = await viettelApiRequest.provinces();
        setProvinces(result.payload); // Lưu danh sách tỉnh/thành phố
      } catch (error) {
        console.error("Error fetching provinces:", error);
      }
    };

    fetchProvinces();
  }, []);

  useEffect(() => {
    // Fetch danh sách quận/huyện dựa trên selectedProvinceId
    if (!selectedProvinceId) return;

    const fetchDistricts = async () => {
      try {
        const result = await viettelApiRequest.districts(selectedProvinceId);
        setDistricts(result.payload); // Lưu danh sách quận/huyện
      } catch (error) {
        console.error("Error fetching districts:", error);
      }
    };

    fetchDistricts();
  }, [selectedProvinceId]);

  async function onSubmit(value: StaffCreateUserType) {
    console.log(value);
    setLoading(true);
    try {
      const { imageUrl, error } = await uploadImage({
        file: value.avatar,
        bucket: "hung-pics",
      });
      if (error) {
        console.error(error);
        setLoading(false); // Đặt loading = false nếu có lỗi
        return;
      }
      console.log("Uploading file:", imageUrl);

      const body = {
        ...value,
        avatar: imageUrl,
      };

      const result = await accountApiRequest.staffCreateUser(body);
      if (result?.payload?.message) {
        toast({
          description: result.payload.message,
          duration: 2000,
        });
      } else {
        toast({
          description: "Cập nhật thành công!",
          duration: 2000,
        });
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        description: "Có lỗi xảy ra khi cập nhật. Vui lòng thử lại.",
        duration: 2000,
      });
    } finally {
        router.push("/staff/manage-user")
      setLoading(false);
    }
  }
  return (
    <div className={styles.formContainer}>
      <div className={`${styles.formSection} text-black`}>
        <div className={`${styles.hedform} text-black`}>
          <div className={`${styles.sectionTitle} !text-black`}>
            Thông tin cá nhân
          </div>
          <h2 className={styles.sectionTitle}>Thông tin liên lạc</h2>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit, (error) => {
              console.log(error);
            })}
            className={styles.formEdit}
          >
            <div className={styles.formF}>
              <div>
                <FormField
                  control={form.control}
                  name="avatar"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={styles.fieldLabel}>
                        Avatar
                      </FormLabel>
                      <FormControl>
                        <div className={styles.avatarUpload}>
                          {/* Hiển thị preview ảnh */}
                          {field.value && (
                            <img
                              src={URL.createObjectURL(field.value)} // Tạo URL tạm cho file
                              alt="Preview Avatar"
                              className={styles.avatarPreview}
                            />
                          )}

                          {/* Input file */}
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                field.onChange(file); // Lưu file vào field
                              }
                            }}
                            className={`${styles.fieldValue} bg-[rgb(249,249,251)]`}
                          />
                        </div>
                      </FormControl>
                      <FormDescription>
                        Vui lòng tải lên một ảnh đại diện.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={styles.fieldLabel}>
                        {" "}
                        Địa chỉ Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="example@gmail.com"
                          {...field}
                          className={`${styles.fieldValue} bg-[rgb(249,249,251)]`}
                        />
                      </FormControl>
                      <FormDescription></FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={styles.fieldLabel}>
                        Họ và tên
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Họ và tên"
                          {...field}
                          className={`${styles.fieldValue} bg-[rgb(249,249,251)]`}
                        />
                      </FormControl>
                      <FormDescription />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={styles.fieldLabel}>
                        Mật khẩu
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Mật khẩu"
                          {...field}
                          className={`${styles.fieldValue} bg-[rgb(249,249,251)]`}
                        />
                      </FormControl>
                      <FormDescription />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dob"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={styles.fieldLabel}>
                        Ngày sinh
                      </FormLabel>
                      <FormControl>
                        <ReactDatePicker
                          selected={field.value ? new Date(field.value) : null}
                          onChange={(date) =>
                            field.onChange(date?.toISOString().split("T")[0])
                          }
                          className={`${styles.fieldValue} text-[15px] bg-[rgb(249,249,251)] text-black border border-gray-200 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400`}
                          dateFormat="yyyy-MM-dd"
                          placeholderText="Chọn ngày sinh"
                          maxDate={new Date()} // Ngăn chọn ngày trong tương lai
                          showYearDropdown
                          showMonthDropdown
                          dropdownMode="select"
                        />
                      </FormControl>
                      <FormDescription />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={styles.fieldLabel}>
                        Giới tính
                      </FormLabel>
                      <FormControl>
                        <Select
                          key={field.value || "default"}
                          onValueChange={(value) => field.onChange(value)}
                          value={field.value || ""}
                        >
                          <SelectTrigger className="bg-[rgb(249,249,251)] text-black">
                            <SelectValue placeholder="Chọn giới tính" />
                          </SelectTrigger>
                          <SelectContent
                            className={`${styles.selectContent} bg-[rgb(249,249,251)] text-black`}
                          >
                            <SelectItem value="MALE">Nam</SelectItem>
                            <SelectItem value="FEMALE">Nữ</SelectItem>
                            <SelectItem value="OTHER">Khác</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormDescription />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={styles.fieldLabel}>
                        Số điện thoại
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder="Số điện thoại"
                          {...field}
                          className={`${styles.fieldValue} bg-[rgb(249,249,251)]`}
                        />
                      </FormControl>
                      <FormDescription />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="province"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={styles.fieldLabel}>
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
                          <SelectTrigger className="bg-[rgb(249,249,251)] text-black">
                            <SelectValue placeholder="Chọn thành phố" />
                          </SelectTrigger>
                          <SelectContent
                            className={`${styles.selectContent} bg-[rgb(249,249,251)] text-black`}
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
                        <FormLabel className={styles.fieldLabel}>
                          Quận/Huyện
                        </FormLabel>
                        <FormControl>
                          <Select
                            key={field.value || "default"}
                            onValueChange={(value) => field.onChange(value)}
                            value={field.value || ""}
                            // disabled={!selectedProvinceId} // Disable nếu chưa chọn tỉnh
                          >
                            <SelectTrigger className="bg-[rgb(249,249,251)] text-black">
                              <SelectValue placeholder="Chọn quận/huyện" />
                            </SelectTrigger>
                            <SelectContent
                              className={`${styles.selectContent} bg-[rgb(249,249,251)] text-black`}
                            >
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
                      <FormLabel className={styles.fieldLabel}>
                        Địa chỉ
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Địa chỉ"
                          {...field}
                          className={`${styles.fieldValue} bg-[rgb(249,249,251)]`}
                        />
                      </FormControl>
                      <FormDescription />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={styles.fieldLabel}>
                        Vai trò
                      </FormLabel>
                      <FormControl>
                        <Select
                          key={field.value || "default"}
                          onValueChange={(value) => field.onChange(value)}
                          value={field.value || ""}
                        >
                          <SelectTrigger className="bg-[rgb(249,249,251)] text-black">
                            <SelectValue placeholder="Chọn vai trò" />
                          </SelectTrigger>
                          <SelectContent
                            className={`${styles.selectContent} bg-[rgb(249,249,251)] text-black`}
                          >
                            <SelectItem value="STAFF">Quản trị</SelectItem>
                            <SelectItem value="USER">Người dùng</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormDescription />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={styles.fieldLabel}>
                        Trạng thái
                      </FormLabel>
                      <FormControl>
                        <Select
                          key={field.value || "default"}
                          onValueChange={(value) => field.onChange(value)}
                          value={field.value || ""}
                        >
                          <SelectTrigger className="bg-[rgb(249,249,251)] text-black">
                            <SelectValue placeholder="Chọn trạng thái" />
                          </SelectTrigger>
                          <SelectContent
                            className={`${styles.selectContent} bg-[rgb(249,249,251)] text-black`}
                          >
                            <SelectItem value="VERIFIED">
                              Đã xác minh
                            </SelectItem>
                            <SelectItem value="UNVERIFIED">
                              Chưa xác minh
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormDescription />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className={styles.formActions}>
              <button type="submit" className={styles.saveButton} tabIndex={0}>
                Lưu
              </button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
