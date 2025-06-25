"use client"

import { Textarea } from "@heroui/input"
import { useFormContext } from "react-hook-form"

interface IProps {
  name: string
  label?: string
  placeholder?: string
  required?: boolean
  className?: string
  variant?: "flat" | "bordered" | "underlined" | "faded"
  labelPlacement?: "inside" | "outside" | "outside-left"
  size?: "sm" | "md" | "lg"
}

export default function JudyTextarea({
  name,
  label,
  placeholder,
  required = false,
  className = "rounded-none",
  variant = "bordered",
  labelPlacement = "inside",
  size = "lg",
}: IProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  return (
    <Textarea
      {...register(name)}
      errorMessage={errors[name] ? (errors[name].message as string) : ""}
      isInvalid={!!errors[name]}
      label={label}
      placeholder={placeholder}
      required={required}
      variant={variant}
      labelPlacement={labelPlacement}
      size={size}
      className={className}
      minRows={4}
    />
  )
}
