import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface IInput {
  variant?: "flat" | "bordered" | "faded" | "underlined";
  labelPlacement?: "outside" | "outside-left" | "inside";
  size?: "sm" | "md" | "lg";
  required?: boolean;
  type?: string;
  label: string;
  name: string;
  disabled?: boolean;
  className?: string;
}

export interface IUser {
  _id: string;
  name?: string;
  role?: string;
  email?: string;
  status?: string;
  mobileNumber?: string;
  profilePhoto?: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export type Product = {
  name: string;
  price: number;
  imageUrl: string;
  category: string;
  badge: string;
  material: { name: string };
  slug: string;
};