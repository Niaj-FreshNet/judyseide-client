import envConfig from "@/src/config/envConfig"

export interface ContactPayload {
  name: string
  email: string
  subject: string
  message: string
}

export const contactApi = async (payload: ContactPayload) => {
  try {
    const response = await fetch(`${envConfig.baseApi}/contact/create-contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || "Failed to send contact message")
    }

    return await response.json()
  } catch (error) {
    console.error("Contact API error:", error)
    throw error
  }
}