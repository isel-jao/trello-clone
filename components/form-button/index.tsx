"use client";

import React from "react";
import { Button, ButtonProps } from "../ui/button";
import { useFormStatus } from "react-dom";

export default function FormButton({
  disabled,
  children,
  ...rest
}: ButtonProps) {
  const { pending } = useFormStatus();
  return (
    <Button {...rest} disabled={disabled || pending}>
      {children}
    </Button>
  );
}
