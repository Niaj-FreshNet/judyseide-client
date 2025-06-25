
import BlogCard from "@/src/components/UI/BlogCard";
import SectionTitle from "@/src/components/UI/SectionTitle";
import { getBlogs } from "@/src/services/Blog";

export default async function BlogPage() {
  const { data, loading, error } = await getBlogs(); // Destructure `data` from API
  const blogs = data?.data || []; // Safe fallback

  console.log("Blogs Data:", blogs); // Debugging log

  return (
    <div className="flex flex-col gap-8">
      <SectionTitle align="center" subtitle="" title="Our Blog" titleClassName="text-default-900" />

      {error ? (
        <p className="text-red-500 text-center">Failed to load blogs.</p>
      ) : blogs.length === 0 ? (
        <p className="text-center">No blogs found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {blogs?.map((blog:any) => (
            <BlogCard
              key={blog?.id}
              id={blog?.id}
              title={blog?.title}
              excerpt={ blog?.content?.slice(0, 120) + "..."}
              imageUrl={blog.imageUrl}
            />
          ))}
        </div>
      )}
    </div>
  );
}