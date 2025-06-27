"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import SectionTitle from "@/src/components/UI/SectionTitle";
import { getBlogDetails } from "@/src/services/BlogDetails";
import Loading from "./loading";

export default function BlogDetails() {
  const { id } = useParams();
  const [blog, setBlog] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (id) {
      getBlogDetails(id as string)
        .then((res) => {
          if (res?.data?.blog) {
            setBlog(res.data.blog);
          } else {
            setError(true);
          }
        })
        .catch(() => setError(true))
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) return <Loading />;
  if (error || !blog) return <p className="text-center text-red-500">Failed to load blog.</p>;

  return (
    <div className="flex flex-col gap-12 mb-16">
      <SectionTitle
        align="center"
        subtitle=""
        title={blog.title}
        titleClassName="text-default-900"
      />

      <div className="flex flex-col  items-start gap-16">

        <div className="w-full">
          <Image
            alt={blog.title}
            className="w-full object-cover h-[400px] rounded-none"
            src={blog.imageUrl}
            width={600}
            height={200}
          />
        </div>
        <div className="flex-1 text-default-900">

          <h2 className="text-xl font-bold mb-6">{blog.title}</h2>
          <div
            className="text-default-600 text-md leading-relaxed"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </div>
        {/* <div className="flex-1">
          <Image
            alt={blog.title}
            className="w-full rounded-none shadow-md"
            src={blog.imageUrl}
            width={600}
            height={400}
          />
        </div> */}
      </div>
    </div>
  );
}
