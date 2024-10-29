import { z } from "zod";

export const MovieSchema = z.object({
  id: z.string().optional(),
  director_id: z.string(),
  title: z.string().min(3),
  plot: z.string(),
  duration: z.string(),
  release_date: z.coerce.date(),
  rating: z.number(),
  actors: z.string().array(),
});

export type Movie = z.infer<typeof MovieSchema>;
