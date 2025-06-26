"use client"

import { Button } from "@heroui/button"
import JudyForm from "./JudyForm"
import JudyInput from "./JudyInput"
import JudyTextarea from "./JudyTextarea"
import type { ContactFormData } from "@/src/types"

import { useState } from "react"
import { toast } from "sonner"
import { contactApi } from "@/src/services/Contact"

export default function ContactForm() {
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (data: ContactFormData) => {
    // Map form data to API structure
    const payload = {
      name: data.fullName,
      email: data.email,
      subject: data.subjects,
      message: data.message,
    }

    try {
      setLoading(true)
      const response = await contactApi(payload)

      console.log("Contact form submitted successfully:", response)
      toast.success("Contact form submitted successfully!", {position: "top-right"})
    } catch (error) {
      toast.error("Error submitting contact form:", {position: "top-right"})
    } finally {
      setLoading(false)
    }
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
              required
              variant="bordered"
              className="bg-white rounded-none"
            />

            <JudyInput
              name="email"
              label="Email*"
              type="email"
              required
              variant="bordered"
              className="bg-white rounded-none"
            />

            <JudyInput
              name="subjects"
              label="Subjects*"
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
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Now"}
            </Button>
          </div>
        </JudyForm>
      </div>
    </div>
  )
}