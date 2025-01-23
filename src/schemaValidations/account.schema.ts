import z from "zod";

export const AccountRes = z
  .object({
    data: z.object({
      id: z.string(), // id là kiểu string (UUID)
      name: z.string(),
      dob: z.string(), // dob là kiểu string để phù hợp với định dạng ngày tháng ISO 8601
      gender: z.enum(["OTHER", "MALE", "FEMALE"]), // Giả sử giới tính chỉ có những giá trị này
      email: z.string().email(),
      province: z.string(),
      district: z.string(),
      address: z.string(),
      phone: z.string(),
      avatar: z.string(),
      role: z.string(), // Giả sử các giá trị này cho role
      status: z.string(), // Giả sử các giá trị này cho status
      createdBy: z.string(),
      createdDate: z.string(), // createdDate là kiểu string để phù hợp với định dạng ngày tháng ISO 8601
      updatedBy: z.string(),
      updatedDate: z.string(), // updatedDate là kiểu string để phù hợp với định dạng ngày tháng ISO 8601
    }),
    message: z.string().nullable(), // message có thể là null
  })
  .strict();

export type AccountResType = z.TypeOf<typeof AccountRes>;

export const UpdateMeBody = z.object({
  name: z.string().trim().min(2).max(256),
});

export type UpdateMeBodyType = z.TypeOf<typeof UpdateMeBody>;

export const UpdateDeliveryInfo = z
  .object({
    name: z.string().min(1, "Customer name is required"),
    address: z.string().min(1, "Address is required"),
    province: z.string().min(1, "Thành Phố"),
    district: z.string().min(1, "Quận/Huyện"),
    phone: z
      .string()
      .min(10, "Số điện thoại phải có ít nhất 10 chữ số")
      .max(15, "Số điện thoại không được vượt quá 15 chữ số")
      .regex(/^\d+$/, "Số điện thoại chỉ được chứa các chữ số"),
    gender: z.string(),
    dob: z.string().optional(),
  })
  .strict();

export type UpdateDeliveryInfoType = z.TypeOf<typeof UpdateDeliveryInfo>;

export const UpdateProfileInfo = z
  .object({
    name: z.string(),
    gender: z.string(),
    dob: z.string().optional(), // Ngày sinh có thể không bắt buộc
    address: z.string(),
    province: z.string(),
    district: z.string(),
    phone: z.string(),
  })
  .strict();

export type UpdateProfileInfoType = z.TypeOf<typeof UpdateProfileInfo>;

export const StaffCreateUser = z
  .object({
    name: z.string().min(1, "Tên không được để trống"), // Bắt buộc, không được để trống
    dob: z
      .string()
      .optional()
      .refine((val) => !val || /^\d{4}-\d{2}-\d{2}$/.test(val), {
        message: "Ngày sinh phải đúng định dạng YYYY-MM-DD",
      }), // Ngày sinh hợp lệ hoặc để trống
    gender: z.enum(["MALE", "FEMALE", "OTHER"], {
      errorMap: () => ({ message: "Giới tính không hợp lệ" }),
    }), // Chỉ chấp nhận các giá trị hợp lệ
    email: z.string().email("Email không hợp lệ"), // Định dạng email hợp lệ
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
    province: z.string().optional(), // Không bắt buộc
    district: z.string().optional(), // Không bắt buộc
    address: z.string().optional(), // Không bắt buộc
    phone: z
      .string()
      .min(10, "Số điện thoại phải có ít nhất 10 chữ số")
      .max(15, "Số điện thoại không được vượt quá 15 chữ số"), // Số điện thoại hợp lệ
    avatar: z
      .any()
      .refine(
        (file) => file instanceof File && file.size > 0,
        "Avatar là bắt buộc và phải là một tệp hợp lệ"
      ),
    role: z.enum(["STAFF", "CUSTOMER"], {
      errorMap: () => ({ message: "Vai trò không hợp lệ" }),
    }), // Chỉ chấp nhận vai trò hợp lệ
    status: z.enum(["VERIFIED", "UNVERIFIED"], {
      errorMap: () => ({ message: "Trạng thái không hợp lệ" }),
    }), // Trạng thái xác minh
  })
  .strict();

export type StaffCreateUserType = z.TypeOf<typeof StaffCreateUser>;

export const UsersListRes = z.object({
  data: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      email: z.string().email(),
      avatar: z.string().url(),
      status: z.string(),
    })
  ),
  size: z.number(),
  page: z.number(),
  totalSize: z.number(),
  totalPage: z.number(),
  message: z.string().nullable(),
});

export type UsersListResType = z.TypeOf<typeof UsersListRes>;
export const updateInfoOrder = z.object({
  email: z.string().email("Vui lòng nhập một địa chỉ email hợp lệ."),
  name: z.string().min(2, { message: "Tên phải có ít nhất 2 ký tự." }),
  phone: z
    .string()
    .min(10, { message: "Số điện thoại phải có ít nhất 10 chữ số." }),
  status: z.enum(["PENDING", "APPROVED", "CANCELLED"], {
    message:
      "Trạng thái phải là một trong các giá trị: PENDING, APPROVED, CANCELLED",
  }),
});
export type UpdateInfoOrderType = z.TypeOf<typeof updateInfoOrder>;
