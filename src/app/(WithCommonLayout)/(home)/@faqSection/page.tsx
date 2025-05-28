import JudyAccordion from "@/src/components/common/JudyAccordion";
import Container from "@/src/components/UI/Container";
import SectionTitle from "@/src/components/UI/SectionTitle";
import Link from "next/link";

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
                      title="Frequently Asked Questions"
                      subtitle=""
                      align="left"
                    />
      <div className="flex flex-col space-y-8">
        <JudyAccordion items={faqItems} />
      <div>
        <p>Have more questions? 
<Link href={"/#"} className="underline">Visit our Help Center</Link> to find answers to all your questions.</p>
      </div>
      </div>
    </Container>
  );
}
