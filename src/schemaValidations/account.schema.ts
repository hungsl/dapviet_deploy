import z from 'zod'

export const AccountRes = z
  .object({
    data: z.object({
      id: z.string(), // id là kiểu string (UUID)
      name: z.string(),
      dob: z.string(), // dob là kiểu string để phù hợp với định dạng ngày tháng ISO 8601
      gender: z.enum(['OTHER', 'MALE', 'FEMALE']), // Giả sử giới tính chỉ có những giá trị này
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
  name: z.string().trim().min(2).max(256)
})

export type UpdateMeBodyType = z.TypeOf<typeof UpdateMeBody>


export const UpdateDeliveryInfo = z
  .object({
    name: z.string().min(1, "Customer name is required"),
    address: z.string().min(1, "Address is required"),
    province: z.string().min(1,"Thành Phố"),
    district: z.string().min(1,"Quận/Huyện"),
    phone: z
    .string()
    .min(10, "Số điện thoại phải có ít nhất 10 chữ số")
    .max(15, "Số điện thoại không được vượt quá 15 chữ số")
    .regex(/^\d+$/, "Số điện thoại chỉ được chứa các chữ số"),
    gender: z.string(),
    dob: z
    .string()
    .optional(),
    
  })
  .strict();

export type UpdateDeliveryInfoType = z.TypeOf<typeof UpdateDeliveryInfo>;

export const UpdateProfileInfo = z
  .object({
    name: z.string(),
    gender: z.string(),
    dob: z
      .string()
      .optional(), // Ngày sinh có thể không bắt buộc
    address: z.string(),
    province: z.string(),
    district: z.string(),
    phone: z
      .string()
  })
  .strict();

export type UpdateProfileInfoType = z.TypeOf<typeof UpdateProfileInfo>;

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
  phone: z.string().min(10, { message: "Số điện thoại phải có ít nhất 10 chữ số." }),
  status: z.enum(["PENDING", "APPROVED", "CANCELLED"], {
    message: "Trạng thái phải là một trong các giá trị: PENDING, APPROVED, CANCELLED",
  }),
})
export type UpdateInfoOrderType = z.TypeOf<typeof updateInfoOrder>