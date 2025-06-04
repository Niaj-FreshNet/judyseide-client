import Link from "next/link";

import JudyAccordion from "@/src/components/common/JudyAccordion";
import Container from "@/src/components/UI/Container";
import SectionTitle from "@/src/components/UI/SectionTitle";

export default function FAQSection() {
  const faqItems = [
    {
      title: "What is your return policy?",
      content: "You may return any item within 30 days of purchase.",
    },
    {
      title: "How long does shipping take?",
      content: "Shipping takes 5-7 business days within the country.",
    },
    {
      title: "How long does shipping take?",
      content: "Shipping takes 5-7 business days within the country.",
    },
    {
      title: "How long does shipping take?",
      content: "Shipping takes 5-7 business days within the country.",
    },
    {
      title: "How long does shipping take?",
      content: "Shipping takes 5-7 business days within the country.",
    },
  ];

  return (
    <Container className="">
      <SectionTitle
        align="left"
        subtitle=""
        title="Frequently Asked Questions"
        titleClassName="text-default-900"
      />
      <div className="flex flex-col space-y-8">
        <JudyAccordion items={faqItems} />
        <div>
          <p className="text-xl">
            Have more questions?
            <Link className="underline" href={"/#"}>
              Visit our Help Center
            </Link>{" "}
            to find answers to all your questions.
          </p>
        </div>
      </div>
      <br />
    </Container>
  );
}
