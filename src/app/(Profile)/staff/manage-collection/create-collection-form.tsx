import React, { useRef, useState } from "react";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { uploadImage } from "@/supabase/storage/client";
import { useLoading } from "@/app/context/loading-provider";
import { converBlobUrlToFile } from "@/lib/utils";
import styles from "../manage-product/Product.module.css";
import { CreateCollectionBody, CreateCollectionBodyType } from "@/schemaValidations/type.schema";
import { usePopup } from "@/app/context/popup-provider";
import { useRouter } from "next/navigation";
import typesApiRequest from "@/apiRequests/type";
import { toast } from "@/hooks/use-toast";

export default function CreateCollectionForm() {
  const { loading, setLoading } = useLoading();
  const imageInputRef = useRef<HTMLInputElement>(null);
  const {closePopup} = usePopup();
  const router = useRouter()
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const form = useForm<CreateCollectionBodyType>({
    resolver: zodResolver(CreateCollectionBody),
    defaultValues: {
      name: "",
      image: [],
      description: "",
    },
  });

  async function onSubmit(values: CreateCollectionBodyType) {
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
      // console.log("Form Data:", values);
      console.log('Uploaded Image URLs:', urls);
      const {name, description} = values;
      const updateValue = {
        name,
        images: urls,
        description 
      }
      // console.log(updateValue)
      const result = await typesApiRequest.createCollection(updateValue)  
      toast({
        description: result.payload.message,
        duration: 3000
      })
    } catch (error) {
      console.error("Error uploading data:", error);
    } finally {
      setLoading(false);
      closePopup()
      router.refresh()
    }
  }

  const handleDelete = async (index: number, field: { onChange:  (value: string[]) => void }) => {
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
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="!text-black font-bold">Ảnh bộ sưu tập</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    className="hidden"
                    ref={imageInputRef}
                    accept="image/*"
                    multiple
                    onChange={(e) => {
                      const files = e.target.files ? Array.from(e.target.files) : [];
                      field.onChange(files);
                      const newPreviewUrls = files.map((file) => URL.createObjectURL(file));
                      setPreviewUrls((prevPreviewUrls) => [...prevPreviewUrls, ...newPreviewUrls]);
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
                <FormDescription>Tải lên tệp hình ảnh hợp lệ cho bộ sưu tập.</FormDescription>
                {field.value && Array.isArray(field.value) && field.value.length > 0 && (
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

          {/* Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="!text-black font-bold">Bộ sưu tập</FormLabel>
                <FormControl>
                  <Input placeholder="Tên bộ sưu tập..." {...field} />
                </FormControl>
                <FormDescription>Không nên trùng tên với bộ cũ</FormDescription>
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
                  <Textarea placeholder="Mô tả về bộ sưu tập..."className="w-full h-32 resize-none border border-gray-300 p-2 rounded-lg" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end">
            <Button type="submit">Tạo bộ sưu tập</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}