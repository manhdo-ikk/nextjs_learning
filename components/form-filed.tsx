import { Input, InputProps } from "@heroui/react";
import { FieldError, UseFormRegister } from "react-hook-form";

interface FormFieldProps extends InputProps {
  name: string;
  label: string;
  type?: string;
  error?: FieldError;
  register: UseFormRegister<any>;
}

export default function FormField({
  name,
  label,
  type = "text",
  error,
  register,
  ...rest
}: FormFieldProps) {
  return (
    <Input
      label={label}
      type={type}
      {...register(name)}
      errorMessage={error?.message}
      isInvalid={Boolean(error)}
      {...rest}
    />
  );
}
