import Container from "@/src/components/UI/Container";
import ReviewCard from "@/src/components/UI/ReviewCard";
import SectionTitle from "@/src/components/UI/SectionTitle";

const reviews = [
  {
    stars: 5,
    title: "Psum elit viverra scelerisque",
    description:
      "We were extremely pleased with the roofing replacement Infinity Exteriors did for us! They got our job ready and on the schedule quickly. Our project manager kept us informed throughout.",
    name: "John Doe",
    date: "September 12, 2022",
    image: "/reviewers/john.jpg",
  },
    {
      stars: 4,
      title: "Psum elit viverra scelerisque",
      description:
        "We were extremely pleased with the roofing replacement Infinity Exteriors did for us! They got our job ready and on the schedule quickly. Our project manager kept us informed throughout.",
      name: "John Doe",
      date: "September 12, 2022",
      image: "/reviewers/john.jpg",
    },
  {
    stars: 3,
    title: "Psum elit viverra scelerisque",
    description:
      "We were extremely pleased with the roofing replacement Infinity Exteriors did for us! They got our job ready and on the schedule quickly. Our project manager kept us informed throughout.",
    name: "John Doe",
    date: "September 12, 2022",
    image: "/reviewers/john.jpg",
  },
    {
      stars: 2,
      title: "Psum elit viverra scelerisque",
      description:
        "We were extremely pleased with the roofing replacement Infinity Exteriors did for us! They got our job ready and on the schedule quickly. Our project manager kept us informed throughout.",
      name: "John Doe",
      date: "September 12, 2022",
      image: "/reviewers/john.jpg",
    },
];

export default function ReviewSection() {
    return (
    <Container className="">
            <SectionTitle
              title="Customer Reviews"
              subtitle=""
              align="left"
            />
      <div className="mx-auto grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {reviews.map((review, index) => (
          <ReviewCard key={index} {...review} />
        ))}
      </div>
    </Container>
  );
}
