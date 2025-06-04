"use client";

import { BreadcrumbItem, Breadcrumbs } from "@heroui/breadcrumbs";

interface BreadcrumbProps {
  items: string[];
}

export default function CustomBreadcrumbs({ items }: BreadcrumbProps) {
  return (
    <Breadcrumbs className="flex items-center space-x-2 text-md text-gray-600 mb-12">
      {items.map((item, index) => (
        <BreadcrumbItem key={index}>
          <span
            className={`cursor-pointer text-lg hover:text-orange-500 transition ${
              index === items.length - 1 ? "font-semibold text-orange-400" : ""
            }`}
          >
            {item}
          </span>
          {index < items.length - 1 && <span className="text-gray-400" />}
        </BreadcrumbItem>
      ))}
    </Breadcrumbs>
  );
}

// import { BreadcrumbItem, Breadcrumbs } from "@heroui/breadcrumbs";

// export default function CustomBreadcrumbs() {
//   return (
//     <Breadcrumbs>
//       <BreadcrumbItem>New In</BreadcrumbItem>
//       <BreadcrumbItem>All Category</BreadcrumbItem>
//       <BreadcrumbItem>Earings</BreadcrumbItem>
//       <BreadcrumbItem>Bracelets</BreadcrumbItem>
//       <BreadcrumbItem>Necklaces</BreadcrumbItem>
//       <BreadcrumbItem>Rings</BreadcrumbItem>
//     </Breadcrumbs>
//   );
// }
