"use client"

import { Button } from "@heroui/button"
import JudyForm from "./JudyForm"
import JudyInput from "./JudyInput"
import type { ContactFormData } from "@/src/types"
import JudyTextarea from "./JudyTextarea"

export default function ContactForm() {
  const handleSubmit = (data: ContactFormData) => {
    console.log("Form submitted:", data)
    // Handle form submission here
  }

  return (
    <div className="bg-[#FEF6F1] shadow-sm border border-orange-100 rounded-none">
      <div className="p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Get in touch</h2>

        <JudyForm onSubmit={handleSubmit}>
          <div className="space-y-6">
            <JudyInput
              name="fullName"
              label="Full name*"
            //   placeholder="Enter your name"
              required
              variant="bordered"
              className="bg-white rounded-none"
            />

            <JudyInput
              name="email"
              label="Email*"
              type="email"
            //   placeholder="Enter your email"
              required
              variant="bordered"
              className="bg-white rounded-none"
            />

            <JudyInput
              name="subjects"
              label="Subjects*"
            //   placeholder="Subject"
              required
              variant="bordered"
              className="bg-white rounded-none"
            />

            <JudyTextarea
              name="message"
              label="Message*"
              placeholder="Write about your message"
              required
              variant="bordered"
              className="bg-white rounded-none"
            />

            <Button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 rounded-none"
              size="lg"
            >
              Send Now
            </Button>
          </div>
        </JudyForm>
      </div>
    </div>
  )
}
