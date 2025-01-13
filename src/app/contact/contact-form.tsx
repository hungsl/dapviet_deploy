"use client";
import React, { useState } from "react";
import styles from "./Contact.module.css";
import InterestButton from "./interest-button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@mui/material";
import { ContactBody, ContactBodyType } from "@/schemaValidations/contact.schema";

export default function ContactForm() {
  const [interest, setInterest] = useState<string>("");
  const form = useForm<ContactBodyType>({
    resolver: zodResolver(ContactBody),
    defaultValues: {
      name: "",
      email: "",
      content: "",
      interest: "",
    },
  });
  async function onSubmit(values: ContactBodyType) {
    console.log(values);
    // Gán interest vào values
    const updatedValues = {
      ...values, // Sao chép các giá trị hiện tại của values
      interest, // Gán hoặc cập nhật trường interest
    };

    // In kết quả ra console
    console.log("Original Values:", values);
    console.log("Updated Values with Interest:", updatedValues);
  }
  const handleInput = (text: string) => {
    setInterest(text);
  };
  return (
    <section className={styles.rightSection}>
      <div className={`${styles.formWrapper} bg-background`}>
        <div className={styles.interestSection}>
          <h2 className={styles.interestTitle}>Tôi quan tâm đến...</h2>
          <div className={styles.interestGrid}>
            <InterestButton handleInput={handleInput} />
          </div>
        </div>
        <div className={styles.inputsContainer}>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit, error => console.log(error))}>
              <div className={styles.formGroup}>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          className={`${styles.formLabel} text-primary-foreground`}
                          placeholder="Tên của bạn"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className={styles.formGroup}>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          className={styles.formLabel}
                          placeholder="Địa chỉ email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className={styles.formGroup}>
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          className={styles.formLabel}
                          placeholder="Nội dung"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <button type="submit" className={styles.submitButton}>
                <img
                  loading="lazy"
                  src="/about/sendmess.png"
                  alt=""
                  className={styles.submitIcon}
                />
                <span>Gửi tin nhắn</span>
              </button>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
}
