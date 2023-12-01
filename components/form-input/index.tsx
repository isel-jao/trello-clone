"use client";

import { useFormStatus } from "react-dom";
import { useId, forwardRef } from "react";

import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input, InputProps } from "@/components/ui/input";

export interface FormInputProps extends InputProps {
  label?: string;
  errors?: Record<string, string[] | undefined>;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ className, label, disabled, id, name, errors, ...rest }, ref) => {
    const inputId = useId();
    const { pending } = useFormStatus();
    const displayErrors = name && errors?.[name];
    return (
      <div className={cn(" flex flex-col gap-2  ", className)}>
        {label ? (
          <Label className="text-xs" htmlFor={id || inputId}>
            {label}
          </Label>
        ) : null}
        <Input
          ref={ref}
          id={id || inputId}
          name={name}
          disabled={disabled || pending}
          {...rest}
          aria-describedby={`${id}-error`}
        />
        {displayErrors ? (
          <div className="flex flex-col gap-2 rounded border border-rose-500  p-2">
            {displayErrors.map((error, i) => (
              <span key={i} className=" text-xs text-rose-500">
                - {error}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    );
  },
);

FormInput.displayName = "FormInput";
