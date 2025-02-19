
import z from 'zod'

export const CreateCollectionBody = z.object({
  name: z.string().min(5,"Tên không ngắn hơn 5 ký tự"),
  image: z
  .array(
    z.custom<File>((val) => val instanceof File, {
      message: "Cần có ít nhất 3 hình ảnh hợp lệ.",
    })
  )
  .refine((files) => files.length >= 3, {
    message: "Cần có ít nhất 3 hình ảnh hợp lệ.",
  }),
  description: z.string().nonempty("Mô tả bắt buộc"),
});

export type CreateCollectionBodyType = z.TypeOf<typeof CreateCollectionBody>

export const UpdateCollectionBody = z.object({
  name: z.string().min(5,"Tên không ngắn hơn 5 ký tự"),
  image: z
  .array(
    z.custom<File>((val) => val instanceof File, {
      message: "Cần có ít nhất 1 hình ảnh hợp lệ.",
    })
  )
  .refine((files) => files.length >= 0, {
    message: "Cần có ít nhất 1 hình ảnh hợp lệ.",
  }),
  description: z.string().nonempty("Mô tả bắt buộc"),
});

export type UpdateCollectionBodyType = z.TypeOf<typeof UpdateCollectionBody>

export const CreateCollectionSchema = z.object({
  name: z.string().min(5, "Tên không được ngắn hơn 5 ký tự."),
  images: z
    .array(z.string().url({ message: "Cần có ít nhất một URL hình ảnh hợp lệ." }))
    .refine((urls) => urls.length > 0, {
      message: "Cần có ít nhất một hình ảnh.",
    }),
  description: z.string().nonempty("Mô tả bắt buộc."),
});

export type CreateCollectionSchemaType = z.TypeOf<typeof CreateCollectionSchema>;

export const CreateCategoryBody = z.object({
  name: z.string().min(1,"tên không ngắn hơn 1 ký tự"),
});

export type CreateCategoryBodyType = z.TypeOf<typeof CreateCategoryBody>

// export const UpdateCategoryBody = z.object({
//   id: z.string(),
//   name: z.string().min(1,"tên không ngắn hơn 1 ký tự"),
//   image: z
//   .array(
//     z.custom<File>((val) => val instanceof File, {
//       message: "Cần có ít nhất một hình ảnh hợp lệ.",
//     })
//   )
//   .refine((files) => files.length >= 0, {
//     message: "Cần có ít nhất một hình ảnh hợp lệ.",
//   }).optional(),
 
//   description: z.string().nonempty("Mô tả bắt buộc"),
// });

// export type UpdateCategoryBodyType = z.TypeOf<typeof UpdateCategoryBody>


export const TypesListRes = z.object({
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

export const collectionListRes = z.object({
  data: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      description: z.string(),
      images: z.array(z.string().url()),
      deleted: z.boolean(),
    })
  ),
  size: z.number(),
  page: z.number(),
  totalSize: z.number(),
  totalPage: z.number(),
  message: z.string().nullable(),
});
export type TypesListResType = z.TypeOf<typeof TypesListRes>;
export type collectionListResType = z.TypeOf<typeof collectionListRes>;

export const typeItemRes = z.object({
  data: z.object({
    id: z.string(),
    name: z.string(),
    deleted: z.boolean(),
  }),
  message: z.string(),
});

export type TypeItemResType = z.TypeOf<typeof typeItemRes>;

export const collectionRes = z.object({
  data: z.object({
    name: z.string(),
    description: z.string().nullable(),
    images: z.array(z.string().nullable()),
  }),
  message: z.string(),
});

export type CollectionResType = z.TypeOf<typeof collectionRes>;
