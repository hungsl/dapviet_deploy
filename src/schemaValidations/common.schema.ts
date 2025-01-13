import z from 'zod'

export const MessageRes = z
  .object({
    data: z.string().nullable(),
    message: z.string()
  })
  .strict()

export type MessageResType = z.TypeOf<typeof MessageRes>
