"use client";
import React, { useEffect, useState } from "react";
import styles from "./UserProfile.module.css";
import { ProfileFormProps } from "./types";
import { useForm } from "react-hook-form";
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
  UpdateProfileInfo,
  UpdateProfileInfoType,
} from "@/schemaValidations/account.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import viettelApiRequest from "@/apiRequests/viettel";
// import { useAppContext } from "@/app/context/app-provider";
import { districtResType, provinceResType } from "@/schemaValidations/viettel";

export default function ProfileForm({
  userData,
  onCancel,
  onSave,
}: ProfileFormProps) {
  // const { accessToken } = useAppContext();
  const [provinces, setProvinces] = useState<provinceResType>();
  const [selectedProvinceId, setSelectedProvinceId] = useState<
    number | undefined
  >();
  const [districts, setDistricts] = useState<districtResType>();
  const form = useForm<UpdateProfileInfoType>({
    resolver: zodResolver(UpdateProfileInfo),
    defaultValues: {
      name: userData.name,
      gender: userData.gender,
      dob: userData.dob,
      address: userData.address,
      province: userData.province,
      district: userData.district,
      phone: userData.phone,
    },
  });
  useEffect(() => {
    // Fetch danh sách tỉnh/thành phố
    const fetchProvinces = async () => {
      try {
        const result = await viettelApiRequest.provinces();
        setProvinces(result.payload); // Lưu danh sách tỉnh/thành phố

        // Đặt selectedProvinceId nếu userData.province đã có
        if (userData.province) {
          const selectedProvince = result.payload?.data.find(
            (province) => province.PROVINCE_NAME === userData.province
          );
          const provinceId = selectedProvince?.PROVINCE_ID || undefined;
          if (provinceId !== selectedProvinceId) {
            setSelectedProvinceId(provinceId);
          }
        }
      } catch (error) {
        console.error("Error fetching provinces:", error);
      }
    };

    fetchProvinces();
  }, [userData.province]);

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

  function onSubmit(values: UpdateProfileInfoType) {
    if (onSave) {
      onSave(values); // Gọi hàm onSave khi form submit thành công
    }
  }
  return (
    <div className={styles.formContainer}>
      <div className={`${styles.formSection} text-foreground`}>
        <div className={`${styles.hedform} text-foreground`}>
          <div className={`${styles.sectionTitle} !text-foreground`}>
            Thông tin cá nhân
          </div>
          <h2 className={styles.sectionTitle}>Thông tin liên lạc</h2>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className={styles.formEdit}
          >
            <div className={styles.formF}>
              <div>
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
                        <Input
                          placeholder="Giới tính"
                          {...field}
                          className={`${styles.fieldValue} bg-[rgb(249,249,251)]`}
                        />
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
              </div>
            </div>
            <div className={styles.formActions}>
              <button
                type="button"
                className={styles.closeButton}
                onClick={onCancel}
                tabIndex={0}
              >
                Hủy
              </button>
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
