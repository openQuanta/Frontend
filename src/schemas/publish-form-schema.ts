import { z } from "zod";

// Schema for the research paper upload form
export const researchPaperSchema = z.object({
  // Paper Title - Required, max 200 characters
  paperTitle: z
    .string()
    .min(1, "Paper title is required")
    .max(200, "Paper title must not exceed 200 characters"),

  // Abstract - Required, max 5000 characters
  abstract: z
    .string()
    .min(1, "Abstract is required")
    .max(5000, "Abstract must not exceed 5000 characters"),

  // Research Field - Required dropdown
  researchField: z.string().min(1, "Please select a research field"),

  // Keywords - Required, max 10 tags
  keywords: z
    .array(z.string().min(1, "Keyword cannot be empty"))
    .min(1, "At least one keyword is required")
    .max(10, "Maximum 10 keywords allowed"),

  // Co-Authors - Optional, max 10 co-authors
  coAuthors: z
    .array(z.string().email("Invalid email address"))
    .max(10, "Maximum 10 co-authors allowed")
    .optional(),

  // Paper Cover Image - Optional, JPG or PNG, max 10MB
  coverImage: z
    .instanceof(File)
    .refine(
      (file) => file.size <= 10 * 1024 * 1024,
      "Cover image must be less than 10MB"
    )
    .refine(
      (file) => ["image/jpeg", "image/png"].includes(file.type),
      "Cover image must be JPG or PNG format"
    )
    .optional()
    .or(z.null()),

  // PDF File Upload - Required, max 30MB
  pdfFile: z
    .instanceof(File)
    .refine((file) => file.size > 0, "PDF file is required")
    .refine(
      (file) => file.size <= 30 * 1024 * 1024,
      "PDF file must be less than 30MB"
    )
    .refine(
      (file) => file.type === "application/pdf",
      "File must be in PDF format"
    ),

  // License - Required dropdown (CC BY 4.0)
  license: z.string().min(1, "Please select a license"),

  // Publication Date - Required
  publicationDate: z
    .string()
    .regex(/^\d{4}\/\d{2}\/\d{2}$/, "Date must be in YYYY/MM/DD format")
    .refine((date) => {
      const parsedDate = new Date(date);
      return !isNaN(parsedDate.getTime());
    }, "Invalid date"),

  // Github Repository - Optional URL
  githubRepository: z
    .string()
    .url("Invalid URL format")
    .regex(/^https?:\/\/(www\.)?github\.com\/.+/, "Must be a valid GitHub URL")
    .optional()
    .or(z.literal("")),

  // DOI - Optional, format: 10.3390/agri01610448
  doi: z
    .string()
    .regex(
      /^10\.\d{4,}\/[-._;()/:A-Za-z0-9]+$/,
      "Invalid DOI format (e.g., 10.3390/agri01610448)"
    )
    .optional()
    .or(z.literal("")),

  // Supplementary Materials - Optional URL
  supplementaryMaterials: z
    .string()
    .url("Invalid URL format")
    .optional()
    .or(z.literal("")),

  // Terms and Conditions Agreement - Required
  // termsAccepted: z
  //   .boolean()
  //   .refine((val) => val === true, "You must accept the terms and conditions"),
});

// Type inference for TypeScript
export type ResearchPaperFormData = z.infer<typeof researchPaperSchema>;

// Example usage with validation
export function validateResearchPaper(data: unknown) {
  try {
    const validatedData = researchPaperSchema.parse(data);
    return { success: true, data: validatedData };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, errors: error.errors };
    }
    return { success: false, errors: [] };
  }
}
