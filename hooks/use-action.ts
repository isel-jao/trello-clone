import { useState, useCallback } from "react";

import { ActionState, FieldErrors } from "@/lib/create-safe-action";

type Action<TInput, TOutput> = (
  data: TInput,
) => Promise<ActionState<TInput, TOutput>>;

interface UserActionOptions<TOutput> {
  onSuccess?: (data: TOutput) => void;
  onError?: (error: string) => void;
  onComplete?: () => void;
}

export const useAction = <TInput, TOutput>(
  action: Action<TInput, TOutput>,
  options: UserActionOptions<TOutput> = {},
) => {
  const [fieldErrors, setFieldErrors] = useState<
    FieldErrors<TInput> | undefined
  >(undefined);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<TOutput | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  const execute = useCallback(
    async (input: TInput) => {
      const { onComplete, onError, onSuccess } = options;
      setLoading(true);
      try {
        const result = await action(input);
        console.log("execute", { result });

        if (!result) return;

        setFieldErrors(result.fieldErrors);

        if (result.error) {
          setError(result.error);
          onError?.(result.error);
        }

        if (result.data) {
          setData(result.data);
          onSuccess?.(result.data);
        }
      } finally {
        onComplete?.();
      }
      setLoading(false);
    },
    [action, options],
  );

  return {
    fieldErrors,
    error,
    data,
    loading,
    execute,
  };
};
