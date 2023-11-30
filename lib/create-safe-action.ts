import { auth } from "@clerk/nextjs";
import { z } from "zod";

export type FieldErrors<T> = Partial<Record<keyof T, string[]>>;

export type ActionState<TInput, TOutput> = {
  fieldErrors?: FieldErrors<TInput>;
  error?: string | null;
  data?: TOutput;
};

export const createSafeAction = <TInput, TOutput>(
  schema: z.Schema<TInput>,
  handler: (data: TInput) => Promise<ActionState<TInput, TOutput>>,
  authRequired = true
) => {
  return async (data: TInput): Promise<ActionState<TInput, TOutput>> => {
    console.log(`safeAction: userId ${auth().userId}`);
    if (authRequired && !auth().userId) {
      return {
        error: "Unauthorized",
      };
    }
    console.log({ data });

    const validatedData = schema.safeParse(data);
    if (!validatedData.success) {
      return {
        fieldErrors: validatedData.error.flatten()
          .fieldErrors as FieldErrors<TInput>,
      };
    }
    return handler(validatedData.data);
  };
};
