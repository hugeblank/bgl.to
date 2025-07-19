import { z } from "zod";
export const env = z
  .object({
    DATABASE_URL: z.string(),
    MEDIA_PATH: z.string(),
    AUTH: z.string(),
  })
  .parse(process.env);
