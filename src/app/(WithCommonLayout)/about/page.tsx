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
    title: "Subtitle Topic 1",
    content: `Lorem ipsum dolor sit amet consectetur. At ullamcorper magna mollis iaculis arcu 
ultricies eget urna purus. Eget faucibus suscipit viverra ultrices. Ipsum eu pulvinar euismod 
mauris. Vulputate eros morbi adipiscing venenatis quis pretium sed mollis. Amet nec egestas 
nunc elit. Aliquet orci viverra leo rhoncus nunc. Tincidunt pharetra vestibulum in ullamcorper 
faucibus ac. Purus tempor netus gravida imperdiet etiam diam aliquet mauris. Eu nisi malesuada 
augue imperdiet pellentesque adipiscing ut. Venenatis ut cursus eu eget ipsum eget nibh varius.
Enim lacus eget eget velit eleifend bibendum et. Porta at praesent id in sed pharetra sagittis.
Quam non dignissim pretium odio. 
Lorem ipsum dolor sit amet consectetur. At ullamcorper magna mollis iaculis arcu 
ultricies eget urna purus. Eget faucibus suscipit viverra ultrices. Ipsum eu pulvinar euismod 
mauris. Vulputate eros morbi adipiscing venenatis quis pretium sed mollis. Amet nec egestas 
nunc elit. Aliquet orci viverra leo rhoncus nunc. Tincidunt pharetra vestibulum in ullamcorper 
faucibus ac. Purus tempor netus gravida imperdiet etiam diam aliquet mauris. Eu nisi malesuada 
augue imperdiet pellentesque adipiscing ut. Venenatis ut cursus eu eget ipsum eget nibh varius.
Enim lacus eget eget velit eleifend bibendum et. Porta at praesent id in sed pharetra sagittis.
Quam non dignissim pretium odio.`,
    imageUrl: "/about.jpg",
  },
  {
    id: 2,
    title: "Subtitle Topic 1",
    content: `Lorem ipsum dolor sit amet consectetur. At ullamcorper magna mollis iaculis arcu 
ultricies eget urna purus. Eget faucibus suscipit viverra ultrices. Ipsum eu pulvinar euismod 
mauris. Vulputate eros morbi adipiscing venenatis quis pretium sed mollis. Amet nec egestas 
nunc elit. Aliquet orci viverra leo rhoncus nunc. Tincidunt pharetra vestibulum in ullamcorper 
faucibus ac. Purus tempor netus gravida imperdiet etiam diam aliquet mauris. Eu nisi malesuada 
augue imperdiet pellentesque adipiscing ut. Venenatis ut cursus eu eget ipsum eget nibh varius.
Enim lacus eget eget velit eleifend bibendum et. Porta at praesent id in sed pharetra sagittis.
Quam non dignissim pretium odio. 
Lorem ipsum dolor sit amet consectetur. At ullamcorper magna mollis iaculis arcu 
ultricies eget urna purus. Eget faucibus suscipit viverra ultrices. Ipsum eu pulvinar euismod 
mauris. Vulputate eros morbi adipiscing venenatis quis pretium sed mollis. Amet nec egestas 
nunc elit. Aliquet orci viverra leo rhoncus nunc. Tincidunt pharetra vestibulum in ullamcorper 
faucibus ac. Purus tempor netus gravida imperdiet etiam diam aliquet mauris. Eu nisi malesuada 
augue imperdiet pellentesque adipiscing ut. Venenatis ut cursus eu eget ipsum eget nibh varius.
Enim lacus eget eget velit eleifend bibendum et. Porta at praesent id in sed pharetra sagittis.
Quam non dignissim pretium odio.`,
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
          className={`flex flex-col md:flex-row ${
            section.reverse ? "md:flex-row-reverse" : ""
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
