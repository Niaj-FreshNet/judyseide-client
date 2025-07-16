import Image from "next/image";

import GallerySection from "../(home)/@gallerySection/page";

import SectionTitle from "@/src/components/UI/SectionTitle";

interface AboutSection {
  id: number;
  title: string;
  content: string;
  imageUrl: string;
  reverse?: boolean;
}

const sections: AboutSection[] = [
  {
    id: 1,
    title: "Bella D'or Jewelry",
    content: `Bella D'or Jewelry was founded in November 2024 by Judy Seide, a proud Haitian-American woman with a deep passion for style, empowerment, and cultural heritage. Inspired by the belief that beauty and elegance should be accessible to all, Judy set out to create a jewelry brand that speaks to women from every background, celebrating their strength, resilience, and uniqueness.

From the very beginning, Bella D'or has been about more than just fashion — it’s a movement to uplift and inspire. Judy’s vision was to craft fine fashion necklaces, pendants, bracelets, and rings that don’t just complement a woman’s outfit, but enhance her confidence, radiance, and individuality. Each piece is designed with intention, blending sophistication with affordability, so every woman can experience the joy of owning jewelry that feels luxurious and personal.

Whether you're expressing love, marking a milestone, or simply treating yourself, Bella D'or Jewelry is here to make every moment shine.`,
    imageUrl: "/about.jpg",
  },
  {
    id: 2,
    title: "Empowering Women Through Elegance",
    content: `At Bella D'or Jewelry, we believe jewelry is more than just an accessory — it's a statement of confidence, grace, and individuality. Each piece in our collection is carefully designed to reflect the inner strength and beauty of women from all walks of life. Whether you're dressing for a special occasion or adding sparkle to your everyday look, our affordable fine fashion pieces are made to make you feel radiant and empowered.

We are committed to ensuring that every woman can experience the joy of high-quality, fashionable jewelry without compromise. Our designs blend timeless elegance with modern style, helping you create unforgettable moments, one accessory at a time.`,
    imageUrl: "/about.jpg",
    reverse: true,
  },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col gap-12 mb-16">
      <SectionTitle align="center" subtitle="" title="About us" titleClassName="text-default-900" />

      {sections.map((section) => (
        <div
          key={section.id}
          className={`flex flex-col md:flex-row ${section.reverse ? "md:flex-row-reverse" : ""
            } items-start gap-16`}
        >
          {/* Text Block */}
          <div className="flex-1 text-default-900">
            <h2 className="text-xl font-bold mb-6">{section.title}</h2>
            <p className="text-default-600 text-md leading-relaxed">{section.content}</p>
          </div>

          {/* Image Block */}
          <div className="flex-1">
            <Image
              alt={section.title}
              className="w-full rounded-none shadow-md"
              src={section.imageUrl}
              width={600}
              height={400}
            />
          </div>
        </div>
      ))}
      <div>
        <GallerySection />
      </div>
    </div>
  );
}
