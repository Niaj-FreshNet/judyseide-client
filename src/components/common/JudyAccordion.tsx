"use client";

import { Accordion, AccordionItem } from "@heroui/accordion";
interface AccordionItemType {
  title: string;
  content: string;
}

interface AccordionSectionProps {
  items: AccordionItemType[];
}

export default function JudyAccordion({ items }: AccordionSectionProps) {
  return (
    // <div className="-px-2 flex flex-col gap-4 w-full">
    //   </div>
    <Accordion variant="splitted">
      {items.map((item, index) => (
        <AccordionItem
          key={item.title + index}
          aria-label={`Accordion ${index + 1}`}
          className="bg-default-100 shadow-none border border-orange-100 rounded-none"
          title={<p className="text-xl text-default-900 px-4 py-2">{item.title}</p>}
        >
          <p className="text-default-600 text-lg px-2 pb-2">{item.content}</p>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
