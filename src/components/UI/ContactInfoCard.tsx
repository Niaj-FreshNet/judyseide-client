"use client"

import type { ContactInfo } from "@/src/types"

interface IProps {
  contactInfo: ContactInfo
}

export default function ContactInfoCard({ contactInfo }: IProps) {
  const { icon, title, description, details } = contactInfo

  return (
    <div className="bg-white shadow-sm border border-gray-100 rounded-lg">
      <div className="flex flex-col items-center text-center p-8 space-y-4">
        <div className="text-orange-500 text-4xl">{icon}</div>
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
        <div className="space-y-1">
          <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
          <p className="text-sm text-gray-800 font-medium">{details}</p>
        </div>
      </div>
    </div>
  )
}
