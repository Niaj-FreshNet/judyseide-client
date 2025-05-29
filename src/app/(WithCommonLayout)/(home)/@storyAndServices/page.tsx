import Container from "@/src/components/UI/Container";
import Link from "next/link";
import Image from "next/image";
import SectionTitle from "@/src/components/UI/SectionTitle";

const sections = [
  {
    title: "Our Store",
    text: "Lorem ipsum dolor sit amet consectetur. Omare tristique in nec et rhoncus amet sit nam proin.",
    link: "/store",
    linkText: "Visit Our Store",
    image: "/services/img1.jpg",
  },
  {
    title: "Contact Us",
    text: "Have questions or need assistance? Our support team is here to help you with any inquiries.",
    link: "/contact",
    linkText: "Get in Touch",
    image: "/services/img2.jpg",
  },
  {
    title: "Our Blog",
    text: "Our customers love us! Check out their feedback and see why we are their favorite store.",
    link: "/blog",
    linkText: "Read Blog",
    image: "/services/img3.jpg",
  },
];

export default function StoryAndServices() {
  return (
    <Container className="">
      <SectionTitle
        title="Our story and  Services"
        subtitle=""
        align="left"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.map((section, idx) => (
          <div
            key={idx}
            className="flex flex-col rounded-none shadow-sm overflow-hidden group transition"
          >
            <div className="relative h-72 w-full">
              <Image
                src={section.image}
                alt={section.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div className="flex flex-col gap-3 p-5">
              <h3 className="text-xl text-default-900 font-bold">{section.title}</h3>
              <p className="text-default-600 text-sm">{section.text}</p>
              <Link
                href={section.link}
                className="text-primary font-medium hover:underline mt-auto"
              >
                {section.linkText}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}
