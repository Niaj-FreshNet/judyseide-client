import ContactForm from "@/src/components/form/ContactForm";
import ContactSection from "@/src/components/modules/contact/ContactSection";
import SectionTitle from "@/src/components/UI/SectionTitle";
import { Mail } from "lucide-react";


export default async function ContactPage() {

    return (
        <div className="flex flex-col gap-8 mb-16">
            <SectionTitle align="center" subtitle="" title="Contact Us" titleClassName="text-default-900" />


            <ContactSection />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Left Side - Questions Section */}
                <div className="space-y-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-8 leading-tight">Have Questions? Reach Out to Us</h1>

                        <div className="flex items-center space-x-3 p-4 bg-white rounded-lg border border-gray-100">
                            <div className="flex-shrink-0">
                                <Mail className="w-5 h-5 text-gray-600" />
                            </div>
                            <div>
                                <a href="mailto:info@judyseide.com">
                                    <h3 className="font-medium text-gray-900">Send E-Mail</h3>
                                    <p className="text-sm text-gray-600">info@judyseide.com</p>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side - Contact Form */}
                <div>
                    <ContactForm />
                </div>
            </div>
        </div>
    );
}