"use client";
import React, { useEffect } from "react";
import {
  Form,
  FormControl,
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
import {
  CreateCategoryBody,
  CreateCategoryBodyType,
} from "@/schemaValidations/type.schema";
import typesApiRequest from "@/apiRequests/type";
import { useRouter } from "next/navigation";
// import { useAppContext } from "@/app/context/app-provider";
import { useLoading } from "@/app/context/loading-provider";
import Link from "next/link";

export default function UpdateCategoryForm({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const unwrappedParams = React.use(params);
  // const { accessToken } = useAppContext();
  const { loading, setLoading } = useLoading();
  const router = useRouter();
  const form = useForm<CreateCategoryBodyType>({
    resolver: zodResolver(CreateCategoryBody),
    defaultValues: {
      name: "",
    },
  });
  useEffect(() => {
    const fetchTypeDetail = async () => {
      try {
        const result = await typesApiRequest.type(
          unwrappedParams.id,
        );
        form.reset({
          ...result.payload.data,
        });
      } catch (error) {
        console.log("fail to get Detail Product", error);
      }
    };
    fetchTypeDetail();
  }, []);

  async function onSubmit(values: CreateCategoryBodyType) {
    try {
      if (loading) return;
      setLoading(true);
      const result = await typesApiRequest.updateType(
        unwrappedParams.id,
        values,
      );
      toast({
        description: result.payload.message,
        duration: 3000,
      });
    } catch (error) {
      console.error("Error uploading data:", error);
    } finally {
      router.push("/staff/manage-category");
      setLoading(false);
    }
  }

  return (
    <div className={styles.createForm}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, (errors) => {
            console.log(errors);
          })}
          className="space-y-8"
        >
          <div className={styles.wrapbox}>
            <div className={styles.left}>
              <Link
                href={"/staff/manage-category"}
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
                  ID Doanh mục
                  <div>{unwrappedParams.id || "Không có ID"}</div>
                </h1>
              </div>
              {/* Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="!text-black font-bold">
                      Tên Doanh mục
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="tên doanh mục..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="mt-4"></div>
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
