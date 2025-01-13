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
import { useRouter } from "next/navigation";
import { usePopup } from "@/app/context/popup-provider";

export default function CreateSizeForm() {
  const { loading, setLoading } = useLoading();
  const {closePopup} = usePopup()
  const router = useRouter()
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
      const result = await typesApiRequest.createSize(values)  
      toast({
        description: result.payload.message,
        duration: 3000
      })
    } catch (error) {
      console.error("Error data:", error);
    } finally {
      setLoading(false);
      closePopup()
      router.refresh()
    }
  }

  return (
    <div className={styles.createForm}>
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
                <FormLabel className="!text-black font-bold">
                  Số đo
                </FormLabel>
                <FormControl>
                  <Input placeholder="Số đo..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end">
            <Button type="submit">Tạo số đo</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
