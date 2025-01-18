import { z } from "zod";

const literalSchema = z.union([z.string(), z.number(), z.boolean(), z.null()]);

type Literal = z.infer<typeof literalSchema>;

type Json = Literal | { [key: string]: Json } | Json[];

const jsonSchema: z.ZodType<Json> = z.lazy(() =>
  z.union([literalSchema, z.array(jsonSchema), z.record(jsonSchema)])
);

export const json = () => jsonSchema;

/**
 *  implementation to read string as JSON encoded data
 *  src: https://github.com/JacobWeisenburger/zod_utilz/blob/4093595e5a6d95770872598ba3bc405d4e9c963b/src/stringToJSON.ts#LL4-L12C8
 *  pipe: https://github.com/colinhacks/zod/discussions/2215#discussioncomment-7812655
 * */
export const stringToJSONSchema = z
  .string()
  .transform((str, ctx): z.infer<ReturnType<typeof json>> => {
    try {
      return JSON.parse(str);
    } catch (e) {
      ctx.addIssue({ code: "custom", message: "Invalid JSON" });
      return z.NEVER;
    }
  });

export const dateStringRefiner = (data: string) => {
  const regex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/(19|20)\d\d$/;
  return regex.test(data);
};
