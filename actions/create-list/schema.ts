import { z } from "zod";

export const createListSchema = z.object({
  title: z
    .string({
      required_error: "Title is required",
      invalid_type_error: "Title must be a string",
    })
    .min(3, {
      message: "Title must be at least 3 characters",
    }),
  boardId: z.string({
    required_error: "Border is required",
    invalid_type_error: "Border must be a string",
  }),
});
