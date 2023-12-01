import { z } from "zod";
import { createBoardSchema } from "../create-board/schema";

export const updateBoardSchema = z
  .object({
    id: z.string({
      required_error: "Board id is required",
      invalid_type_error: "Board id must be a string",
    }),
  })
  .and(
    createBoardSchema.partial().refine((data) => Object.keys(data).length > 0, {
      message: "No data provided",
      path: [],
    }),
  );
