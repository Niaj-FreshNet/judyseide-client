import Link from "next/link";

import JudyAccordion from "@/src/components/common/JudyAccordion";
import Container from "@/src/components/UI/Container";
import SectionTitle from "@/src/components/UI/SectionTitle";

export default function FAQSection() {
  const faqItems = [
    {
      title: "What is your return or exchange policy?",
      content:
        "We accept returns or exchanges within 7 days of purchase.\nPlease note: There are no returns or exchanges on clearance items. All sales are final.",
    },
    {
      title: "What kind of material is your jewelry made with?",
      content:
        "Our jewelry is made from high-quality 14k or 18k gold-filled over metal, ensuring durability and a premium finish.",
    },
    {
      title: "Is there a minimum purchase amount?",
      content:
        "There is no minimum purchase required. However, shipping fees may vary depending on your location.",
    },
    {
      title: "What are your hours of operation?",
      content:
        "We are open 24 hours a day, 365 days a year, including weekends and holidays.",
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
          <div className="text-xl">
            <span> Have more questions? </span>
            <span>
              <Link className="underline" href="/contact">
                Visit our Help Center
              </Link>{" "}
            </span>
            to find answers to all your questions.
          </div>
        </div>
      </div>
      <br />
    </Container>
  );
}
