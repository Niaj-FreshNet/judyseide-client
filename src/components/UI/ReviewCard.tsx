import Image from "next/image";
import { Star, UserIcon } from "lucide-react";

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
    <div className="border border-orange-100 p-6 rounded-none shadow-sm space-y-4 flex flex-col">
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

      <div className="flex items-center space-x-3 pt-2">
        {/* Reviewer */}
        <div className="flex items-center space-x-3 pt-2">
          <div className="rounded-full bg-gray-300 p-2">
            {image || <UserIcon size={40} />} {/* Fallback to the icon if no image is provided */}
          </div>
          <div>
            <p className="font-semibold text-default-800 text-sm">{name}</p>
            <p className="text-default-500 text-sm">{date}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
