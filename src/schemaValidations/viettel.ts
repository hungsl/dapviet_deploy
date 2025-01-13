import z from 'zod'

export const proviceRes = z
    .object({
        data: z.array(
            z.object({
                PROVINCE_ID: z.number(),
                PROVINCE_CODE: z.string(),
                PROVINCE_NAME: z.string()
            })
        ),
        message: z.string().nullable()
    }).strict();
export type provinceResType = z.TypeOf<typeof proviceRes>;

export const districtRes = z
    .object({
        data: z.array(
            z.object({
                DISTRICT_ID: z.number(),
                DISTRICT_VALUE: z.number(),
                DISTRICT_NAME: z.string(),
                PROVINCE_ID: z.number()
            })
        ),
        message: z.string().nullable()
    }).strict();
export type districtResType = z.TypeOf<typeof districtRes>;