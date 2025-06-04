import BlogCard from "@/src/components/UI/BlogCard";
import SectionTitle from "@/src/components/UI/SectionTitle";

const blogs = Array.from({ length: 9 }).map((_, i) => ({
  id: i,
  title: "Blog name",
  excerpt: "Lorem ipsum dolor sit amet consectetur. At ullamcorper dolor...",
  imageUrl: "/blog/blog1.jpg",
}));

export default function BlogPage() {
  return (
    <div className="flex flex-col gap-8">
      <SectionTitle align="center" subtitle="" title="Our Blog" titleClassName="text-default-900" />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <BlogCard
            key={blog.id}
            excerpt={blog.excerpt}
            imageUrl={blog.imageUrl}
            title={blog.title}
          />
        ))}
      </div>
    </div>
  );
}
