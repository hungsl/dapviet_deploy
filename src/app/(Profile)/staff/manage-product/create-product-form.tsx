import React, { useEffect, useRef, useState } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import styles from "./Product.module.css";
import { useForm } from "react-hook-form";
import {
  CreateProductBody,
  CreateProductBodyType,
  UpdateApiProductBodyType,
} from "@/schemaValidations/product.schema";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { uploadImage } from "@/supabase/storage/client";
import { useLoading } from "@/app/context/loading-provider";
import { converBlobUrlToFile } from "@/lib/utils";
import { CollectionsType, SizeQuantities, Types } from "../types";
import productApiRequest from "@/apiRequests/product";
import { toast } from "@/hooks/use-toast";
import { usePopup } from "@/app/context/popup-provider";

export default function CreateProductForm() {
  const { loading, setLoading } = useLoading();
  // const { accessToken } = useAppContext();
  const {closePopup} = usePopup();
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [types, setTypes] = useState<Types>([]);
  const [collections, setCollections] = useState<CollectionsType>([]);
  const [sizes, setSizes] = useState<Types>([]);

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        setLoading(true)
        const type = await productApiRequest.typeProductsStaff();
        setTypes(type.payload.data);
        const collection =
          await productApiRequest.collectionProductsStaff();
        setCollections(collection.payload.data);
        const size = await productApiRequest.sizeProductsStaff();
        setSizes(size.payload.data);
      } catch (error) {
        console.log("fail to get Detail Product: ", error);
      }finally{
        setLoading(false)
      }
    };
    fetchProductDetail();
  }, []);
  const form = useForm<CreateProductBodyType>({
    resolver: zodResolver(CreateProductBody),
    defaultValues: {
      name: "",
      pictures: [],
      status: "",
      weight: 0,
      sizes: [],
      typeId: "",
      collectionId: "",
      unitPrice: 0,
      description: "",
    },
  });

  async function onSubmit(values: CreateProductBodyType) {
    try {
      if (loading) return;
      setLoading(true);
      const urls = [];
      for (const url of previewUrls) {
        const imageFile = await converBlobUrlToFile(url);
        const { imageUrl, error } = await uploadImage({
          file: imageFile,
          bucket: "hung-pics",
        });
        if (error) {
          console.error(error);
          return;
        }
        urls.push(imageUrl);
      }
      // console.log("previewUrls ", previewUrls);
      // console.log("urls ", urls);
      // console.log("Form Data:", values);
      const sizeQuantities: SizeQuantities = {};

      // Quét qua mảng value.size và kiểm tra với mảng sizes
      values?.sizes?.forEach((sizeData) => {
        const matchingSize = sizes.find((size) => size.name === sizeData.size);
        if (matchingSize) {
          // Nếu tìm thấy phần tử có name trùng với size, thêm vào sizeQuantities
          sizeQuantities[matchingSize.id] = sizeData.quantity;
        }
      });

      const body: UpdateApiProductBodyType = {
        name: values.name,
        description: values.description,
        unitPrice: values.unitPrice,
        pictures: urls,
        weight: values.weight,
        status: values.status,
        collectionId: values.collectionId,
        typeId: values.typeId,
        sizeQuantities: sizeQuantities,
      };
      console.log(body);
      const result = await productApiRequest.createProductStaff( body)
      toast({
        duration: 3000,
        description: result.payload.message
      })
    } catch (error) {
      console.log("lỗi tạo sản phẩm: ", error);
    } finally {
      setLoading(false);
      closePopup()
    }
  }
  const handleDelete = async (
    index: number,
    field: { onChange: (value: string[]) => void }
  ) => {
    console.log(File);
    if (previewUrls.length === 1) {
      field.onChange([]);
    }
    setPreviewUrls((prevUrls) => prevUrls.filter((_, i) => i !== index));
  };

  return (
    <div className={styles.createForm}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, (error) => console.log(error))}
          className="space-y-8"
        >
          {/* Image */}
          <FormField
            control={form.control}
            name="pictures"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="!text-black font-bold">
                  Ảnh sản phẩm
                </FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    className="hidden"
                    ref={imageInputRef}
                    accept="image/*"
                    multiple // Cho phép chọn nhiều ảnh
                    onChange={(e) => {
                      const files = e.target.files
                        ? Array.from(e.target.files)
                        : [];
                      field.onChange(files);
                      const newPreviewUrls = files.map((file) =>
                        URL.createObjectURL(file)
                      );
                      // Lưu URL
                      setPreviewUrls((prevPreviewUrls) => [
                        ...prevPreviewUrls,
                        ...newPreviewUrls,
                      ]);
                    }}
                  />
                </FormControl>
                <FormMessage />
                <Button
                  className="ml-4"
                  variant="outline"
                  type="button"
                  onClick={() => imageInputRef.current?.click()}
                >
                  Chọn hình ảnh
                </Button>
                <FormDescription>
                  Tải lên tệp hình ảnh hợp lệ cho sản phẩm.
                </FormDescription>
                {/* Hiển thị ảnh đã chọn */}
                {field.value &&
                  Array.isArray(field.value) &&
                  field.value.length > 0 && (
                    <div className="mt-4">
                      <strong>Ảnh đã chọn:</strong>
                      <div className="flex space-x-4 mt-2">
                        {previewUrls.map((url, index) => (
                          <div key={index} className="relative">
                            <img
                              key={index}
                              src={url}
                              alt={`product-img-${index}`}
                              className="w-32 h-32 object-cover rounded-lg"
                            />
                            <button
                              onClick={() => handleDelete(index, field)}
                              className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                              aria-label="Delete"
                              type="button"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                className="w-5 h-5"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
              </FormItem>
            )}
          />
          <div className="mt-4"></div>

          <div className={styles.wrapbox}>
            <div className={styles.left}>
              {/* Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="!text-black font-bold">
                      Tên sản phẩm
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="tên sản phẩm..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="mt-4"></div>
              {/* Status */}
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="!text-black font-bold">
                      Trạng thái
                    </FormLabel>
                    <FormControl>
                      <Select
                        {...field}
                        value={field.value || ""}
                        onValueChange={(value) => field.onChange(value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn trạng thái" />
                        </SelectTrigger>
                        <SelectContent className={styles.selectContent}>
                          <SelectItem value="IN_STOCK">Có sẵn</SelectItem>
                          <SelectItem value="OUT_OF_STOCK">Hết hàng</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="mt-4"></div>
              {/* Quantity */}
              <FormField
                control={form.control}
                name="weight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="!text-black font-bold">
                      Trọng lượng (gam)
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Nhập trọng lượng" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="mt-4"></div>
              {/* Sizes */}
              <FormField
                control={form.control}
                name="sizes"
                render={() => (
                  <FormItem>
                    <FormLabel className="!text-black font-bold">
                      Kích cỡ
                    </FormLabel>
                    <FormControl>
                      <div className={styles.sizeBox}>
                        {sizes.map((size) => (
                          <div
                            key={size.name}
                            className="flex items-center space-x-2"
                          >
                            {/* Checkbox */}
                            <Checkbox
                              value={size.name}
                              checked={form
                                .getValues("sizes")
                                ?.some((s) => s.size === size.name)} // Kiểm tra xem kích cỡ này đã được chọn trong form chưa
                              onCheckedChange={(checked) => {
                                const currentSizes =
                                  form.getValues("sizes") || [];
                                if (checked) {
                                  // Khi chọn, thêm vào mảng sizes với quantity ban đầu
                                  const newSizeData = [
                                    ...currentSizes,
                                    { size: size.name, quantity: 1 }, // Giả sử quantity mặc định là 1 khi chọn
                                  ];
                                  form.setValue("sizes", newSizeData);
                                } else {
                                  // Khi bỏ chọn, xóa khỏi mảng sizes
                                  form.setValue(
                                    "sizes",
                                    currentSizes.filter(
                                      (s) => s.size !== size.name
                                    )
                                  );
                                }
                              }}
                            />
                            <span>{size.name}</span>

                            {/* Input cho số lượng */}
                            {form
                              .getValues("sizes")
                              ?.some((s) => s.size === size.name) && (
                              <input
                                type="number"
                                min={1}
                                placeholder="Số lượng"
                                value={
                                  form
                                    .getValues("sizes")
                                    ?.find((s) => s.size === size.name)
                                    ?.quantity || 1
                                } // Hiển thị quantity đã được thiết lập, hoặc mặc định là 1
                                onChange={(e) => {
                                  const updatedSizes =
                                    form.getValues("sizes") ?? [];
                                  const newSizeData = updatedSizes.map((s) =>
                                    s.size === size.name
                                      ? {
                                          ...s,
                                          quantity: parseInt(
                                            e.target.value,
                                            10
                                          ),
                                        }
                                      : s
                                  );
                                  form.setValue("sizes", newSizeData);
                                }}
                                className="w-14 ml-2 p-2 border border-gray-300 rounded"
                              />
                            )}
                          </div>
                        ))}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className={styles.right}>
              {/* Type Field */}
              <FormField
                control={form.control}
                name="typeId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="!text-black font-bold">
                      Loại sản phẩm
                    </FormLabel>
                    <FormControl>
                      <Select
                        key={field.value || "default"}
                        onValueChange={(value) => field.onChange(value)}
                        value={field.value || ""}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn loại sản phẩm" />
                        </SelectTrigger>
                        <SelectContent className={styles.selectContent}>
                          {types.map((type) => (
                            <SelectItem
                              className={styles.selectItem}
                              key={type.id}
                              value={type.id}
                            >
                              {type.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Collection Field */}
              <FormField
                control={form.control}
                name="collectionId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="!text-black font-bold">
                      Bộ sưu tập
                    </FormLabel>
                    <FormControl>
                      <Select
                        key={field.value || "default"}
                        onValueChange={(value) => field.onChange(value)} // Cập nhật giá trị khi chọn
                        value={field.value} // Gán giá trị từ form
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn bộ sưu tập" />
                        </SelectTrigger>
                        <SelectContent className={styles.selectContent}>
                          {collections.map((collection, key) => (
                            <SelectItem
                              className={styles.selectItem}
                              value={collection.id}
                              key={key}
                            >
                              {collection.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Price */}
              <FormField
                control={form.control}
                name="unitPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="!text-black font-bold">Giá</FormLabel>
                    <FormControl>
                      <Input placeholder="VND" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="mt-4"></div>
              {/* Description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="!text-black font-bold">
                      Mô tả sản phẩm
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        className="w-full h-40"
                        placeholder="Nhập mô tả sản phẩm"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button type="submit">Tạo sản phẩm</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
