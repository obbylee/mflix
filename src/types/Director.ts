import { z } from "zod";

export const DirectorSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(3),
});

export type Director = z.infer<typeof DirectorSchema>;
