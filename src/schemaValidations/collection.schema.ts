
import z from "zod";

export const collectionRes = z.object({
    data: z.array(
      z.object({
        id: z.string(),
        name: z.string(),
        description: z.string(),
        images: z.array(z.string()).nonempty("Cần ít nhất một hình ảnh hợp lệ"),
        deleted: z.boolean(),
      })
    ),
    size: z.number(),
    page: z.number(),
    totalSize: z.number(),
    totalPage: z.number(),
    message: z.string().nullable(),
  });
  
  export type collectionResType = z.TypeOf<typeof collectionRes>;