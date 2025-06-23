'use client';

import { useState } from "react";


const colorToHex = (color: string): string => {
  // Return if already valid hex
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(color)) {
    return color;
  }

  // Create temporary element for color conversion
  const tempDiv = document.createElement('div');
  tempDiv.style.color = color;
  document.body.appendChild(tempDiv);

  // Get computed color
  const computedColor = window.getComputedStyle(tempDiv).color;
  document.body.removeChild(tempDiv);

  // Convert rgb to hex
  if (computedColor.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/)) {
    const rgb = computedColor.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/)!.slice(1).map(Number);
    return `#${rgb.map(x => {
      const hex = x.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    }).join('')}`;
  }

  // Fallback to black if conversion fails
  return '#000000';
};

export default function ProductInfo({
  title,
  price,
  material,
  description,
  variants, // New prop for variants
  selectedSize,
  setSelectedSize,
  selectedColor,
  setSelectedColor,
  quantity,
  setQuantity,
}: {
  title: string;
  price: string;
  material: string;
  description: string;
  variants: { size: string; color: string; price: number; quantity: number }[];
  selectedSize: string | null;
  setSelectedSize: (size: string | null) => void;
  selectedColor: string | null;
  setSelectedColor: (color: string | null) => void;
  quantity: number;
  setQuantity: (quantity: number) => void;
}) {
  const sizes = Array.from(new Set(variants.map((variant) => variant.size)));
  const colors = Array.from(new Set(variants.map((variant) => variant.color)));

  // Set initial price to the price passed as a prop
  const [currentPrice, setCurrentPrice] = useState(price);

  const handleSizeChange = (size: string) => {
    setSelectedSize(size);
    updatePrice(size, selectedColor);
  };

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    updatePrice(selectedSize, color);
  };

  const updatePrice = (size: string | null, color: string | null) => {
    const selectedVariant = variants.find(
      (variant) => variant.size === size && variant.color === color
    );
    if (selectedVariant) {
      // Use setCurrentPrice to update the price
      setCurrentPrice(selectedVariant.price.toString());
    }
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newQuantity = parseInt(e.target.value, 10);
    if (isNaN(newQuantity)) newQuantity = 1;

    const selectedVariant = variants.find(
      (variant) => variant.size === selectedSize && variant.color === selectedColor
    );

    if (selectedVariant && newQuantity <= selectedVariant.quantity) {
      setQuantity(newQuantity);
    } else if (selectedVariant) {
      setQuantity(selectedVariant.quantity); // Max quantity available
    }
  };

  return (
    <div className="space-y-6">
      {/* Title & Price */}
      <div className="space-y-6">
        <h1 className="text-3xl font-semibold">{title}</h1>
        <p className="text-2xl font-semibold">${currentPrice}</p>
      </div>

      <hr className="border-t border-orange-200" />

      {/* Material & Color Dot */}
      <div className="space-y-6">
        <h2 className="font-semibold text-lg">{material}</h2>
        <p className="text-sm text-default-800 leading-relaxed">{description}</p>
      </div>

      <hr className="border-t border-orange-200" />

      {/* Color Selection */}
      <div className="space-y-4">
        <h2 className="font-semibold text-lg">Select Color</h2>
        <div className="flex gap-4">
          {colors.map((color) => {
            const colorHex = colorToHex(color); // Convert color to hex
            return (
              <button
                key={color}
                onClick={() => handleColorChange(color)}
                className={`px-4 py-2 rounded-md ${selectedColor === color ? "border border-orange-200" : "border border-gray-200"}`}
              >
                <div
                  className="w-10 h-10 rounded-full"
                  style={{ backgroundColor: colorHex }} // Fill the circle with the color
                />
                {/* {color} */}
              </button>
            );
          })}
        </div>
      </div>

      <hr className="border-t border-orange-200" />

      {/* Size Selection */}
      <div className="space-y-4">
        <h2 className="font-semibold text-lg">Select Size</h2>
        <div className="flex gap-4">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => handleSizeChange(size)}
              className={`px-4 py-2 rounded-md ${selectedSize === size ? "border border-orange-200" : "border border-gray-200"}`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <hr className="border-t border-orange-200" />

      {/* Quantity Input */}
      <div className="space-y-4">
        <h2 className="font-semibold text-lg">Select Quantity</h2>
        <input
          type="number"
          value={quantity}
          onChange={handleQuantityChange}
          min={1}
          className="border px-4 py-2 rounded-md"
        />
        <p className="text-sm text-gray-500">Available: {variants.find(variant => variant.size === selectedSize && variant.color === selectedColor)?.quantity || 0}</p>
      </div>

      <hr className="border-t border-orange-200" />
    </div>
  );
}
