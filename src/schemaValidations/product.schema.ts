import z from "zod";

const sizeSchema = z.object({
  size: z.string(), // ID của kích thước
  quantity: z.number().min(1, "Số lượng phải lớn hơn 0"), // Số lượng phải lớn hơn 0
});

export const CreateProductBody = z.object({
  name: z.string().min(5, "Tên không ngắn hơn 5 ký tự"),
  pictures: z
    .array(
      z.custom<File>((val) => val instanceof File, {
        message: "Cần có ít nhất một hình ảnh hợp lệ.",
      })
    )
    .refine((files) => files.length > 0, {
      message: "Cần có ít nhất một hình ảnh hợp lệ.",
    }),
  status: z.string().min(1, "Trạng thái là bắt buộc"),
  weight: z
    .preprocess((value) => String(value), z.string())
    .refine(
      (value) => {
        const numberValue = Number(value);
        return !isNaN(numberValue) && numberValue >= 0;
      },
      {
        message: "Số lượng phải là một số hợp lệ",
      }
    )
    .transform((value) => Number(value)),
  sizes: z
    .array(sizeSchema)
    .min(1, "Ít nhất một kích thước là bắt buộc")
    .optional(),
  typeId: z.string().min(1, "Chọn loại sản phẩm"),
  collectionId: z.string(),
  unitPrice: z
    .preprocess((value) => String(value), z.string())
    .refine(
      (value) => {
        const numberValue = Number(value);
        return !isNaN(numberValue) && numberValue > 0;
      },
      {
        message: "Giá phải là một số hợp lệ",
      }
    )
    .transform((value) => Number(value)),
  description: z.string().nonempty("Mô tả bắt buộc"),
});

export type CreateProductBodyType = z.TypeOf<typeof CreateProductBody>;

export const UpdateProductBody = z.object({
  id: z.string(),
  name: z.string().min(5, "Tên không ngắn hơn 5 ký tự"),
  pictures: z
    .array(
      z.custom<File>((val) => val instanceof File, {
        message: "Cần có ít nhất một hình ảnh hợp lệ.",
      })
    )
    .refine((files) => files.length >= 0, {
      message: "Cần có ít nhất một hình ảnh hợp lệ.",
    })
    .optional(),
  status: z.string().min(1, "Trạng thái là bắt buộc"),
  weight: z
    .preprocess((value) => String(value), z.string())
    .refine(
      (value) => {
        const numberValue = Number(value);
        return !isNaN(numberValue) && numberValue >= 0;
      },
      {
        message: "Cân nặng phải là một số hợp lệ",
      }
    )
    .transform((value) => Number(value)),
  sizes: z
    .array(sizeSchema)
    .min(1, "Ít nhất một kích thước là bắt buộc")
    .optional(),
  collectionId: z.string(),
  typeId: z.string().min(1, "Chọn loại sản phẩm"),
  unitPrice: z
    .preprocess((value) => String(value), z.string())
    .refine(
      (value) => {
        const numberValue = Number(value);
        return !isNaN(numberValue) && numberValue > 0;
      },
      {
        message: "Giá phải là một số hợp lệ",
      }
    )
    .transform((value) => Number(value)),
  description: z.string().nonempty("Mô tả bắt buộc"),
});

export type UpdateProductBodyType = z.TypeOf<typeof UpdateProductBody>;

export const UpdateApiProductBody = z.object({
  name: z.string(),
  pictures: z.array(z.string()).optional(),
  status: z.string(),
  weight: z.string().transform((value) => Number(value)),
  sizeQuantities: z.record(z.number()).optional(),
  collectionId: z.string(),
  typeId: z.string(),
  unitPrice: z.string().transform((value) => Number(value)),
  description: z.string(),
});

export type UpdateApiProductBodyType = z.TypeOf<typeof UpdateApiProductBody>;

export const ProductListRes = z.object({
  data: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      unitPrice: z.number(),
      picture: z.string().url(),
      rating: z.number(),
      status: z.string(),
    })
  ),
  size: z.number(),
  page: z.number(),
  totalSize: z.number(),
  totalPage: z.number(),
  message: z.string().nullable(),
});
export const ProductForAIListRes = z.object({
  data: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      unitPrice: z.number(),
      picture: z.string().url(),
      rating: z.number(),
      description: z.string()
    })
  ),
  size: z.number(),
  page: z.number(),
  totalSize: z.number(),
  totalPage: z.number(),
  message: z.string().nullable(),
});

export const TopProductListRes = z.object({
  data: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      unitPrice: z.number(),
      picture: z.string().url(),
      rating: z.number(),
      count: z.number(),
    })
  ),
  size: z.number(),
  page: z.number(),
  totalSize: z.number(),
  totalPage: z.number(),
  message: z.string().nullable(),
});
export const cartListData = z.array(
  z.object({
    id: z.string(),
    name: z.string(),
    unitPrice: z.number(),
    picture: z.string().url(),
    rating: z.number(),
  })
);

export type cartListDataType = z.TypeOf<typeof cartListData>;

export type ProductListResType = z.TypeOf<typeof ProductListRes>;
export type ProductForAIListResType = z.TypeOf<typeof ProductForAIListRes>;
export type TopProductListResType = z.TypeOf<typeof TopProductListRes>;

export const CategoryListRes = z.object({
  data: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      deleted: z.boolean(),
    })
  ),
  size: z.number(),
  page: z.number(),
  totalSize: z.number(),
  totalPage: z.number(),
  message: z.string().nullable(),
});

export type CategoryListResType = z.TypeOf<typeof CategoryListRes>;

const SizeQuantityRes = z.object({
  size: z.string(),
  quantity: z.number(),
});

const ProductData = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  unitPrice: z.number(),
  pictures: z.array(z.string().url()),
  weight: z.number(),
  status: z.enum(["IN_STOCK", "OUT_OF_STOCK"]),
  collectionName: z.string().nullable(),
  typeName: z.string(),
  sizeQuantities: z.record(SizeQuantityRes),
  avgRating: z.number(),
});
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ProductRes = z.object({
  data: ProductData, // The product details object
  message: z.string().nullable(), // message can be null or string
});
export type ProductDataType = z.TypeOf<typeof ProductData>;
export type ProductResType = z.TypeOf<typeof ProductRes>;
