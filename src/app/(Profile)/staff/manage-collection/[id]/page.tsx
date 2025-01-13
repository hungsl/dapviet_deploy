"use client";
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
import styles from "./Update.module.css";
import { useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import {
  UpdateCollectionBody,
  UpdateCollectionBodyType,
} from "@/schemaValidations/type.schema";
import typesApiRequest from "@/apiRequests/type";
import { useRouter } from "next/navigation";
import { useLoading } from "@/app/context/loading-provider";
import { converBlobUrlToFile } from "@/lib/utils";
import { deleteImage, uploadImage } from "@/supabase/storage/client";
import Link from "next/link";

export default function UpdateCollectionForm({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const unwrappedParams = React.use(params);
  const [deletedImg, setDeletedImg] = useState<string[]>([]);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const { loading, setLoading } = useLoading();
  const router = useRouter();
  const form = useForm<UpdateCollectionBodyType>({
    resolver: zodResolver(UpdateCollectionBody),
    defaultValues: {
      name: "",
      image: [],
      description: "",
    },
  });
  useEffect(() => {
    const fetchTypeDetail = async () => {
      try {
        const result = await typesApiRequest.collection(
          unwrappedParams.id,
        );
        const data = result.payload.data;
        const fetchCollection = {
          name: data.name,
          image: [],
          description: data.description || "",
        };
        form.reset({
          ...fetchCollection,
        });
        setPreviewUrls(data.images as string[]);
      } catch (error) {
        console.log("lỗi khi lấy bộ sưu tập: ", error )
        console.log("fail to get Detail Product");
      }
    };
    fetchTypeDetail();
  }, []);
  // useEffect(() => {
  //   console.log("previewUrls: ", previewUrls)
  // },[previewUrls])
  async function onSubmit(values: UpdateCollectionBodyType) {
    if(previewUrls.length < 3){
      toast({
        variant: "destructive",
        title: "phải có ít nhất 3 ảnh cho bộ sưu tập"
      })
      return;
    }
    const urls = [];
    if (loading) return;
    setLoading(true);
    try {
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
    } catch (error) {
      console.error("Error uploading data:", error);
    } 
    try {
      for (const url of deletedImg) {
        const { data, error } = await deleteImage(url);
        if (error) {
          console.error(`Lỗi khi xóa URL: ${url}`, error);
        } else {
          console.log(`Đã xóa URL: ${url}`, data);
        }
      }
      const filterSumitUrl = [...previewUrls, ...urls].filter((url) =>
        url.includes("/storage/v1/object/public/")
      );
      console.log(filterSumitUrl);
      const { name, description } = values;
      const updateValue = {
        name,
        images: filterSumitUrl,
        description,
      };
      const result = await typesApiRequest.updateCollection(
        unwrappedParams.id,
        updateValue
      );
      toast({
        duration: 3000,
        description: result.payload.message,
      });
    } catch (error) {
      console.error("Fail to save data:", error);
    }finally {
      router.push("/staff/manage-collection");
      setLoading(false);
    }
  }

  const handleDelete = async (
    index: number,
    url: string,
    field: { onChange:  (value: string[]) => void }
  ) => {
    if (previewUrls.length === 1) {
      field.onChange([]);
    }
    setPreviewUrls((prevUrls) => prevUrls.filter((_, i) => i !== index));
    if (url.includes("/storage/v1/object/public/")) {
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
          onSubmit={form.handleSubmit(onSubmit, (error) => console.log(error))}
          className="space-y-8"
        >
          <Link
          href={"/staff/manage-collection"}
          className="flex items-center space-x-2 text-blue-500 hover:text-blue-700 cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span>Trở lại danh sách</span>
        </Link>
          <div className={styles.textCenter + " mb-6"}>
            <h1 className={styles.header}>
              ID Bộ sưu tập
              <div>{unwrappedParams.id || "Không có ID"}</div>
            </h1>
          </div>
          {/* Image */}
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="!text-black font-bold">
                  Ảnh bộ sưu tập
                </FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    className="hidden"
                    ref={imageInputRef}
                    accept="image/*"
                    multiple
                    onChange={(e) => {
                      const files = e.target.files
                        ? Array.from(e.target.files)
                        : [];
                      field.onChange(files);
                      const newPreviewUrls = files.map((file) =>
                        URL.createObjectURL(file)
                      );
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
                  Chọn ảnh dọc (chiều dài lớn hơn chiều rộng) để hiển thị đẹp nhất.
                </FormDescription>
                <div className="mt-4">
                  <strong>Ảnh đã chọn:</strong>
                  <div className="flex space-x-4 mt-2">
                    {previewUrls.map((url, index) => (
                      <div key={index} className="relative">
                        <img
                          src={url}
                          alt={`category-img-${index}`}
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

          {/* Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="!text-black font-bold">
                  Bộ sưu tập
                </FormLabel>
                <FormControl>
                  <Input placeholder="Tên bộ sưu tập..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="!text-black font-bold">Mô tả</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Mô tả về bộ sưu tập..."
                    className="w-full h-32 resize-none border border-gray-300 p-2 rounded-lg"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end">
            <Button type="submit">Cập nhật bộ sưu tập</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
