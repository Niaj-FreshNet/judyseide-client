import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type ProductResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  data: Product;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  imageUrl: string; // Changed from Array<string> to string[] for simplicity
  tags: string[];
  salesCount: number;
  published: boolean;
  materialId: string;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
  relatedProducts: string[]; // Assuming this is an array of product IDs
  goodReviews: string;
  category: Category; // Assuming 'category' is an object based on the response
  material: Material; // Assuming 'material' is an object based on the response
  variants: Variant[]; // Assuming 'variants' is an array of objects
};

export type Variant = {
  size: string;
  color: string;
  price: number;
  quantity: number;
};

export type Category = {
  id: string
  categoryName: string;
  imageUrl: string;
};

export type Material = {
  id: string
  materialName: string;
};

export type Filters = {
  availability: {
    inStock: boolean;
    outOfStock: boolean;
  };
  price: {
    under150: boolean;
    "150to300": boolean;
    "300to500": boolean;
    above500: boolean;
  };
  sortBy: "price-low-to-high" | "price-high-to-low";
  category: string; // Could be an empty string if no category is selected
  material: string; // Could be an empty string if no material is selected
  size?: string; // Optional field for size
};

export type CartItem = {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  quantity: number;
  material: string;
  color: string;
  size: string;
};

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
};
