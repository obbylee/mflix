import { z } from "zod";

export const ActorSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(3),
});

export type Actor = z.infer<typeof ActorSchema>;
