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
  UpdateApiProductBodyType,
  UpdateProductBody,
  UpdateProductBodyType,
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
import { deleteImage, uploadImage } from "@/supabase/storage/client";
import { converBlobUrlToFile } from "@/lib/utils";
import { useLoading } from "@/app/context/loading-provider";
import productApiRequest from "@/apiRequests/product";
import { CollectionsType, SizeQuantities, Types } from "../types";
import { toast } from "@/hooks/use-toast";
import { usePopup } from "@/app/context/popup-provider";

export default function UpdateProductForm({
  productId,
}: {
  productId: string | undefined;
}) {
  const imageInputRef = useRef<HTMLInputElement>(null);
  // const { accessToken } = useAppContext();
  const {closePopup} = usePopup();
  const { loading, setLoading } = useLoading();
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [deletedImg, setDeletedImg] = useState<string[]>([]);
  const [types, setTypes] = useState<Types>([]);
  const [sizes, setSizes] = useState<Types>([]);
  const [collections, setCollections] = useState<CollectionsType>([]);
  const form = useForm<UpdateProductBodyType>({
    resolver: zodResolver(UpdateProductBody),
    defaultValues: {
      id: "",
      name: "",
      pictures: [],
      status: "",
      weight: 0,
      sizes: [],
      collectionId: "",
      typeId: "",
      unitPrice: 0,
      description: "",
    },
  });

  useEffect(() => {
    // Giả lập gọi API productId lấy dữ liệu
    const fetchProductDetail = async () => {
      try {
        const result = await productApiRequest.productStaff(
          productId || "",
        );
        console.log("productdetail: ", result);
        const data = result.payload.data;
        const type = await productApiRequest.typeProductsStaff();
        setTypes(type.payload.data);
        const collection =
          await productApiRequest.collectionProductsStaff();
        setCollections(collection.payload.data);
        const size = await productApiRequest.sizeProductsStaff();
        setSizes(size.payload.data);
        const fetchedProduct = {
          id: data.id,
          name: data.name,
          pictures: [],
          status: data.status,
          weight: 120,
          sizes: Object.keys(data.sizeQuantities).map((sizeId) => ({
            size: data.sizeQuantities[sizeId].size,
            quantity: data.sizeQuantities[sizeId].quantity,
          })),
          collectionId: collection.payload.data.find(collection => collection.name === data.collectionName)?.id,
          typeId: type.payload.data.find(type => type.name === data.typeName)?.id,
          unitPrice: data.unitPrice,
          description: data.description,
        };

        // setProduct(fetchedProduct);
        form.reset({
          ...fetchedProduct,
        });
        setPreviewUrls(data.pictures);
      } catch (error) {
        console.log("fail to get Detail Product", error);
      }
    };
    fetchProductDetail();
  }, []);

  async function onSubmit(values: UpdateProductBodyType) {
    try {
      if (loading) return;
      setLoading(true);
      const urls = [];
      const filterUrl = previewUrls.filter(
        (url) => !url.includes("/storage/v1/object/public/")
      );
      for (const url of filterUrl) {
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
      // console.log("filterUrl ", filterUrl);
      // console.log("urls ", urls);
      for (const url of deletedImg) {
        const { data, error } = await deleteImage(url);
        if (error) {
          console.error(`Lỗi khi xóa URL: ${url}`, error);
        } else {
          console.log(`Đã xóa URL: ${url}`, data);
        }
      }
      
      const filterSumitUrl = [...previewUrls, ...urls].filter(
        (url) => url.includes("/storage/v1/object/public/")
      );
      console.log(filterSumitUrl)
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
      const body : UpdateApiProductBodyType = {
        name: values.name,
        description: values.description,
        unitPrice: values.unitPrice,
        pictures: filterSumitUrl,
        weight: values.weight,
        status: values.status,
        collectionId: values.collectionId,
        typeId: values.typeId,
        sizeQuantities: sizeQuantities
      }
      console.log(body);
      const result = await productApiRequest.updateProductStaff(values.id, body)
      toast({
        duration: 3000,
        description: result.payload.message
      })
    } catch (error) {
      console.log("Lỗi khi cập nhật sản phẩm :", error);
    } finally {
      setLoading(false);
      closePopup()
    }
  }

  const handleDelete = async (
    index: number,
    url: string,
    field: { onChange: (value: string[]) => void }
  ) => {
    if (previewUrls.length === 1) {
      field.onChange([]);
    }
    setPreviewUrls((prevUrls) => prevUrls.filter((_, i) => i !== index));
    if (url.includes("/storage/v1/object/public/")) {
      // const { data, error } = await deleteImage(url);
      // console.log(data);
      // console.log(error);
      // console.log("URL xoa trong DB.");
      setDeletedImg((prev) => [...prev, url]);
      console.log("URL thêm vào danh sách xóa sau:", url);
    } else {
      console.log("URL Không có trong DB.");
    }
  };

  return (
    <div className={styles.createForm}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, (errors) => {
            console.log(errors);
          })}
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
                    accept="image/*"
                    className="hidden"
                    ref={imageInputRef}
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
                <Button
                  variant="outline"
                  className="ml-4"
                  type="button"
                  onClick={() => imageInputRef.current?.click()}
                >
                  Chọn hình ảnh
                </Button>
                <FormDescription>
                  Tải lên tệp hình ảnh hợp lệ cho sản phẩm.
                </FormDescription>
                <FormMessage />
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
                          onClick={() => handleDelete(index, url, field)}
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
                      <Input placeholder="Nhập Trọng lượng" {...field} />
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
            <Button type="submit">Cập nhật</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
