import Link from "next/link";
import { Share2, Camera, MessageCircle } from "lucide-react"; 


export default function Footer() {
  return (
    <footer className="bg-white border-t-2 border-orange-200 text-gray-700 px-5 py-12">
<div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">
        {/* Brand Section */}
<div className="space-y-8 flex flex-col items-center md:items-start">
  <h1 className="text-5xl font-serif text-orange-400 font-bold">Judyseide</h1>
  <p className="text-sm text-black leading-relaxed">
    Lorem ipsum dolor sit amet consectetur. Mollis at in suscipit est morbi. Eget cras vitae imperdiet a felis et massa lorem.
  </p>

  {/* Social Icons */}
  <div className="flex space-x-4 pt-2 text-orange-400">
    <a href="https://x.com" target="_blank" rel="noopener noreferrer">
      <Share2 className="w-5 h-5 hover:text-black transition-colors" />
    </a>
    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
      <Camera className="w-5 h-5 hover:text-black transition-colors" />
    </a>
    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
      <MessageCircle className="w-5 h-5 hover:text-black transition-colors" />
    </a>
  </div>

  <div className="pt-4 space-y-1 text-sm text-gray-800">
    <p>Legal & Policies</p>
    <p>© 2025 CraftTrain. All Rights Reserved.</p>
  </div>
</div>

        {/* Quick Links Section */}
        <div className="space-y-8 flex flex-col items-center md:items-start">
          <h2 className="text-2xl font-serif text-orange-400 font-semibold">Quick Links</h2>
          <div>
            <h3 className  ="font-medium">Category</h3>
            <ul className="mt-2 space-y-2"> 
              {["Earrings", "Bracelets", "Necklaces", "Rings"].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-md text-gray-600 hover:text-black transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Section */}
        <div className="space-y-8 flex flex-col items-center md:items-start">
          <h2 className="text-2xl font-serif text-orange-400 font-semibold">Contact Us</h2>
          <div className="space-y-2 text-md text-gray-600">
            <p>
              <Link href="#" className="hover:text-black transition-colors">
                Help Center
              </Link>
            </p>
            <p>
              Email:{" "}
              <a href="mailto:Jewelry@info.com" className="hover:text-black transition-colors">
                Jewelry@info.com
              </a>
            </p>
            <p>
              Phone:{" "}
              <a href="tel:01234567890" className="hover:text-black transition-colors">
                01234567890
              </a>
            </p>
            <p>Location: Arizona, USA</p>
          </div>
        </div>
      </div>

      {/* Divider Lines for md+ screens */}
      <div className="max-w-6xl mx-auto hidden md:block mt-10">
        <div className="grid grid-cols-3 gap-8">
          <div className="border-r border-gray-200 h-full"></div>
          <div className="border-r border-gray-200 h-full"></div>
        </div>
      </div>
    </footer>
  );
}
