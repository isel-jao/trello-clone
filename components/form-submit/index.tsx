"use client";

import React from "react";
import { Button, ButtonProps } from "../ui/button";
import { useFormStatus } from "react-dom";

export function FormSubmit({
  disabled,
  children,
  ...rest
}: Omit<ButtonProps, "type">) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" {...rest} disabled={disabled || pending}>
      {children}
    </Button>
  );
}
