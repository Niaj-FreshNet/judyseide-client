"use client";

import { Input } from "@heroui/input";
import { useFormContext } from "react-hook-form";

import { IInput } from "@/src/types";

interface IProps extends IInput {}

export default function JudyInput({
  variant = "bordered",
  labelPlacement = "inside",
  size = "lg",
  required = false,
  type = "text",
  label,
  name,
  className = "rounded-none"
}: IProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  // console.log(errors);

  return (
    <Input
      {...register(name)}
      errorMessage={errors[name] ? (errors[name].message as string) : ""}
      isInvalid={!!errors[name]}
      label={label}
      labelPlacement={labelPlacement}
      required={required}
      size={size}
      type={type}
      variant={variant}
      className={className}
    />
  );
}
