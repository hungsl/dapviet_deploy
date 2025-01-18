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
    productId: z.string(),
  }),
  message: z.string(),
});

export type FeedbackResType = z.TypeOf<typeof FeedbackRes>;

export const feedbackProductRes = z.object({
  data: z.array(
    z.object({
      feedbackId: z.string(),
      content: z.string(),
      rating: z.number().min(1).max(5),
      username: z.string(),
      avatar: z.string(),
      createdAt: z.string(),
    })
  ),
  size: z.number(),
  page: z.number(),
  totalSize: z.number(),
  totalPage: z.number(),
  message: z.string(),
});
export type FeedbackProductResType = z.TypeOf<typeof feedbackProductRes>;

export const dataStarRes = z.object({
  data: z.object({
    total5Star: z.number(),
    total4Star: z.number(),
    total3Star: z.number(),
    total2Star: z.number(),
    total1Star: z.number(),
    totalReviews: z.number(),
  }),
  message: z.string(),
});
export type DataStarResType = z.TypeOf<typeof dataStarRes>;
