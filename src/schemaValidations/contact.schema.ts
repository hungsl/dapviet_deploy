
import z from "zod";

export const ContactBody = z
  .object({
    name: z
      .string()
      .min(1, "Tên không được để trống") 
      .max(50, "Tên không được dài quá 50 ký tự"), 

    email: z.string().email("Email không đúng định dạng"), 
    content: z
      .string()
      .min(10, "Nội dung phải có ít nhất 10 ký tự") 
      .max(500, "Nội dung không được dài quá 500 ký tự"), 
    interest: z.string().optional()
  })
  .strict();

export type ContactBodyType = z.TypeOf<typeof ContactBody>;
