import { z } from "zod";

export const profileSchema = z.object({
  id: z.string().uuid(),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(50, "Username must be less than 50 characters")
    .optional()
    .nullable(),
  first_name: z.string().max(100, "First name too long").optional().nullable(),
  last_name: z.string().max(100, "Last name too long").optional().nullable(),
  field_of_study: z
    .string()
    .max(150, "Field of study too long")
    .optional()
    .nullable(),
  avatar_url: z.string().url("Invalid avatar URL").optional().nullable(),
  bio: z
    .string()
    .max(300, "Bio must be under 300 characters")
    .optional()
    .nullable(),
  updated_at: z.string().datetime().optional().nullable(),
});

export type ProfileData = z.infer<typeof profileSchema>;
