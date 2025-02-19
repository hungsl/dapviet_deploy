import z from "zod";

export const RegisterBody = z
  .object({
    name: z.string().trim().min(2, "Tên phải ít nhất 6 ký tự").max(256),
    email: z.string().email("Email không đúng định dạng"),
    password: z
      .string()
      .min(6, "Mật khẩu phải dài ít nhất 6 ký tự")
      .refine((value) => /[A-Z]/.test(value), {
        message: "Mật khẩu phải có ít nhất một chữ cái viết hoa",
      })
      .refine((value) => /[!@#$%^&*(),.?":{}|<>]/.test(value), {
        message: "Mật khẩu phải chứa ít nhất một ký tự đặc biệt",
      })
      .refine(
        (value) => /\d/.test(value), // Kiểm tra số
        { message: "Mật khẩu phải chứa ít nhất một số" }
      ),
    confirmPassword: z
      .string()
      .min(6, "Mật khẩu phải dài ít nhất 6 ký tự")
      .max(100)
      .max(100),
  })
  .strict()
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Mật khẩu không khớp",
        path: ["confirmPassword"],
      });
    }
  });

export type RegisterBodyType = z.TypeOf<typeof RegisterBody>;

export const RegisterRes = z.object({
  data: z.object({
    accessToken: z.string(),
    refreshToken: z.string(),
  }),
  message: z.string().nullable(),
});

export type RegisterResType = z.TypeOf<typeof RegisterRes>;

export const LoginGoogleBody = z
  .object({
    email: z.string().email("Email không đúng định dạng"),
    name: z
    .string(),
    avatar: z.string()
  })
  .strict();

export type LoginGoogleBodyType = z.TypeOf<typeof LoginGoogleBody>;

export const LoginBody = z
  .object({
    email: z.string().email("Email không đúng định dạng"),
    password: z
      .string()
      .min(6, "Mật khẩu phải dài ít nhất 6 ký tự")
      .max(100)
      .refine((value) => /[A-Z]/.test(value), {
        message: "Mật khẩu phải có ít nhất một chữ cái viết hoa",
      })
      .refine((value) => /[!@#$%^&*(),.?":{}|<>]/.test(value), {
        message: "Mật khẩu phải chứa ít nhất một ký tự đặc biệt",
      })
      .refine(
        (value) => /\d/.test(value), // Kiểm tra số
        { message: "Mật khẩu phải chứa ít nhất một số" }
      ),
  })
  .strict();

export type LoginBodyType = z.TypeOf<typeof LoginBody>;

export const forgetPasswordBody = z.object({
  auth: z
    .string()
    .email("Email không hợp lệ")
    .nonempty("Email không được để trống"),
});

export type forgetPasswordType = z.TypeOf<typeof forgetPasswordBody>;

export const resetPasswordBody = z
  .object({
    newPassword: z
      .string()
      .min(6, "Mật khẩu phải dài ít nhất 6 ký tự")
      .refine((value) => /[A-Z]/.test(value), {
        message: "Mật khẩu phải có ít nhất một chữ cái viết hoa",
      })
      .refine((value) => /[!@#$%^&*(),.?":{}|<>]/.test(value), {
        message: "Mật khẩu phải chứa ít nhất một ký tự đặc biệt",
      })
      .refine((value) => /\d/.test(value), {
        message: "Mật khẩu phải chứa ít nhất một số",
      }),
    confirmPassword: z
      .string()
      .min(6, "Mật khẩu phải dài ít nhất 6 ký tự")
      .max(100)
      .max(100),
  })
  .strict()
  .superRefine(({ confirmPassword, newPassword }, ctx) => {
    if (confirmPassword !== newPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Mật khẩu không khớp",
        path: ["confirmPassword"],
      });
    }
  });
export type resetPasswordBodyType = z.TypeOf<typeof resetPasswordBody>;

export const changePasswordBody = z
  .object({
    auth: z
      .string()
      .min(6, "Mật khẩu phải dài ít nhất 6 ký tự")
      .max(100)
      .refine((value) => /[A-Z]/.test(value), {
        message: "Mật khẩu phải có ít nhất một chữ cái viết hoa",
      })
      .refine((value) => /[!@#$%^&*(),.?":{}|<>]/.test(value), {
        message: "Mật khẩu phải chứa ít nhất một ký tự đặc biệt",
      })
      .refine(
        (value) => /\d/.test(value), // Kiểm tra số
        { message: "Mật khẩu phải chứa ít nhất một số" }
      ),
    newPassword: z
      .string()
      .min(6, "Mật khẩu phải dài ít nhất 6 ký tự")
      .refine((value) => /[A-Z]/.test(value), {
        message: "Mật khẩu phải có ít nhất một chữ cái viết hoa",
      })
      .refine((value) => /[!@#$%^&*(),.?":{}|<>]/.test(value), {
        message: "Mật khẩu phải chứa ít nhất một ký tự đặc biệt",
      })
      .refine((value) => /\d/.test(value), {
        message: "Mật khẩu phải chứa ít nhất một số",
      }),
    confirmPassword: z
      .string()
      .min(6, "Mật khẩu phải dài ít nhất 6 ký tự")
      .max(100)
      .max(100),
  })
  .strict()
  .superRefine(({ confirmPassword, newPassword }, ctx) => {
    if (confirmPassword !== newPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Mật khẩu không khớp",
        path: ["confirmPassword"],
      });
    }
  });
export type changePasswordBodyType = z.TypeOf<typeof changePasswordBody>;

export const forgetPasswordRes = z.object({
  data: z.string().nullable(),
  message: z.string(),
});

export type forgetPasswordResType = z.TypeOf<typeof forgetPasswordRes>;
export type changePasswordResType = forgetPasswordResType
export const resetPasswordRes = z.object({
  data: z.string().nullable(),
  message: z.string(),
});

export type resetPasswordResType = z.TypeOf<typeof resetPasswordRes>;

export const LoginRes = RegisterRes;

export type LoginResType = z.TypeOf<typeof LoginRes>;
export const SlideSessionBody = z.object({}).strict();

export type SlideSessionBodyType = z.TypeOf<typeof SlideSessionBody>;
export const SlideSessionRes = RegisterRes;

export type SlideSessionResType = z.TypeOf<typeof SlideSessionRes>;

