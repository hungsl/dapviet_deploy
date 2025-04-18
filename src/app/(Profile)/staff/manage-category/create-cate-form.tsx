import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "../manage-product/Product.module.css";
import {
  CreateCategoryBody,
  CreateCategoryBodyType,
} from "@/schemaValidations/type.schema";
import typesApiRequest from "@/apiRequests/type";
import { toast } from "@/hooks/use-toast";
import { useLoading } from "@/app/context/loading-provider";
import { usePopup } from "@/app/context/popup-provider";
import { useAppContext } from "@/app/context/app-provider";

export default function CreateCateForm() {
  const { loading, setLoading } = useLoading();
  const {closePopup} = usePopup()
  const {isRefresh, setIsRefresh} = useAppContext()
  const form = useForm<CreateCategoryBodyType>({
    resolver: zodResolver(CreateCategoryBody),
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit(values: CreateCategoryBodyType) {
    try {
      if (loading) return;
      setLoading(true);
      const result = await typesApiRequest.createType(values)  
      toast({
        description: result.payload.message,
        duration: 3000
      })
    } catch (error) {
      console.error("Error uploading data:", error);
    } finally {
      setLoading(false);
      closePopup()
      setIsRefresh(!isRefresh)
    }
  }

  return (
    <div className={`${styles.createForm} !bg-background`}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, (error) => console.log(error))}
          className="space-y-8"
        >
          {/* Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="!text-foreground font-bold">
                  Tên danh mục
                </FormLabel>
                <FormControl>
                  <Input placeholder="Tên danh mục..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end">
            <Button type="submit">Tạo danh mục</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
