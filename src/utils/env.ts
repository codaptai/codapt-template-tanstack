import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production"]),
});

export const env = envSchema.parse(process.env);
