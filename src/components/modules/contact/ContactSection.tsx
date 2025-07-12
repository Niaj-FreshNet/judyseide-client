"use client"

import { MapPin, Phone, Mail } from "lucide-react"
import type { ContactInfo } from "@/src/types"
import ContactInfoCard from "../../UI/ContactInfoCard"

export default function ContactSection() {
  const contactInfoData: ContactInfo[] = [
    {
      icon: <MapPin color="#FB923C" className="w-14 h-14" />,
      title: "Location",
      description: "NORTH MIAMI, FL",
      details: "USA",
    },
    {
      icon: <Phone color="#FB923C" className="w-14 h-14" />,
      title: "Call us",
      description: " 1(305)-360-3048 Share some cool solutions for a mix of online and local businesses.",
      details: "",
    },
    {
      icon: <Mail color="#FB923C" className="w-14 h-14" />,
      title: "Email",
      description: "seide.judy@gmail.com Let's collaborate to connect smoothly and empower one another!",
      details: "",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
      {contactInfoData.map((info, index) => (
        <ContactInfoCard key={index} contactInfo={info} />
      ))}
    </div>
  )
}
