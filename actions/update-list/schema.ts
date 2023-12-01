import { z } from "zod";
import { createListSchema } from "../create-list/schema";

export const updateListSchema = z
  .object({
    id: z.string({
      required_error: "List id is required",
      invalid_type_error: "List id must be a string",
    }),
  })
  .and(
    createListSchema.partial().refine((data) => Object.keys(data).length > 0, {
      message: "No data provided",
      path: [],
    }),
  );
