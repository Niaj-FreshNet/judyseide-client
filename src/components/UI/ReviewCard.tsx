// ReviewCard.tsx
import Image from "next/image";
import { Star } from "lucide-react";

interface ReviewCardProps {
  title: string;
  comment: string;
  name: string;
  date: string;
  rating?: number;
  image: string;
}

export default function ReviewCard({
  title,
  comment,
  name,
  date,
  rating = 5,
  image,
}: ReviewCardProps) {
  return (
    <div className="border border-orange-100 p-6 rounded-none shadow-sm space-y-4">
      {/* rating */}
      <div className="flex space-x-1 text-yellow-500">
        {Array.from({ length: rating }).map((_, i) => (
          <Star key={i} fill="currentColor" size={18} strokeWidth={0} />
        ))}
      </div>

      {/* Title */}
      <h3 className="font-semibold text-lg text-default-800">{title}</h3>

      {/* comment */}
      <p className="text-default-600 text-sm">{comment}</p>

      {/* Reviewer */}
      <div className="flex items-center space-x-3 pt-2">
        <Image
          alt={name}
          className="rounded-full object-cover"
          height={40}
          src={image}
          width={40}
        />
        <div>
          <p className="font-semibold text-default-800 text-sm">{name}</p>
          <p className="text-default-500 text-sm">{date}</p>
        </div>
      </div>
    </div>
  );
}
