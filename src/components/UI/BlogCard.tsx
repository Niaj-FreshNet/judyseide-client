import Image from "next/image";
import Link from "next/link";

// type Blog = {
//   name: string;
//   price: number;
//   excerpt: string;
//   imageUrl: string;
// };

interface BlogCardProps {
  id: string;
  title: string;
  excerpt: string;
  imageUrl: string;
}

export default function BlogCard({ id, title, excerpt, imageUrl }: BlogCardProps) {
  return (
    <Link href={`/blogs/${id}`}>
      <div className="w-full border border-orange-200 text-default-900 rounded-none group relative transition-all duration-300">
        {/* Image Wrapper with hover button */}
        <div className="relative overflow-hidden bg-gray-100">
          <Image
            alt={title}
            className="w-full h-64 lg:h-80 object-cover transition-transform duration-300 group-hover:scale-105"
            src={imageUrl}
            width={400}
            height={320}
          />
        </div>
        <div className="border-b border-orange-100 " />

        {/* Info */}
        <div className="mt-4 space-y-2">
          <div className="px-4 py-1">
            <h3 className="text-xl font-semibold">{title}</h3>
          </div>
          <div className="border-b border-orange-100 " />
          <div className="px-4 py-1">
            <h3
              className="text-base text-default-600"
              dangerouslySetInnerHTML={{ __html: excerpt }}
            />
          </div>
          <div className="border-b border-orange-100 " />
          <div className="px-4 py-1">
            <h3 className="underline text-md font-semibold">Read more</h3>
          </div>
        </div>
      </div>
    </Link>
  );
}
