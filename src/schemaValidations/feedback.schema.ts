import z from "zod";

export const CartRes = z.object({
  data: z.string().nullable(),
  message: z.string(),
});
export type CartResType = z.TypeOf<typeof CartRes>;

export const FeedbackRes = z.object({
    data: z.object({
      id: z.string(),
      productName: z.string(),
      productImage: z.string().url(),
      content: z.string(),
      rating: z.number().min(1).max(5),
      username: z.string(),
      createdAt: z.string(),
    }),
    message: z.string(),
  });
  
  export type FeedbackResType = z.TypeOf<typeof FeedbackRes>;
  