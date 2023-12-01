import { z } from "zod";

export const createBoardSchema = z.object({
  title: z
    .string({
      required_error: "Title is required",
      invalid_type_error: "Title must be a string",
    })
    .min(3, {
      message: "Title must be at least 3 characters",
    }),
  imageId: z.string({
    required_error: "Image id is required",
    invalid_type_error: "Image id must be a string",
  }),

  imageThumbUrl: z.string({
    required_error: "Image thumb url is required",
    invalid_type_error: "Image thumb url must be a string",
  }),
  imageFullUrl: z.string({
    required_error: "Image full url is required",
    invalid_type_error: "Image full url must be a string",
  }),
  imageUserName: z.string({
    required_error: "Image user name is required",
    invalid_type_error: "Image user name must be a string",
  }),
  imageLinkHtml: z.string({
    required_error: "Image link html is required",
    invalid_type_error: "Image link html must be a string",
  }),
});
