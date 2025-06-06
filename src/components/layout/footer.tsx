import Link from "next/link";
import { Share2, Camera, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="max-w-full mx-auto bg-default-100 border-t border-orange-200 text-default-700">
      <div className="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 px-8 lg:px-24 pt-12 pb-8 place-items-center">
        {/* Brand Section */}
        <div className="space-y-8 flex flex-col items-center md:items-start">
          <h1 className="text-5xl font-serif text-orange-400 font-bold">Judyseide</h1>
          <p className="text-lg text-balance leading-relaxed">
            Lorem ipsum dolor sit amet consectetur. Mollis at in suscipit est morbi. Eget cras vitae
            imperdiet a felis et massa lorem.
          </p>

          {/* Social Icons */}
          <div className="flex space-x-4 pt-2 text-orange-400">
            <a href="https://x.com" rel="noopener noreferrer" target="_blank">
              <Share2 className="w-5 h-5 hover:text-black transition-colors" />
            </a>
            <a href="https://instagram.com" rel="noopener noreferrer" target="_blank">
              <Camera className="w-5 h-5 hover:text-black transition-colors" />
            </a>
            <a href="https://facebook.com" rel="noopener noreferrer" target="_blank">
              <MessageCircle className="w-5 h-5 hover:text-black transition-colors" />
            </a>
          </div>

          <div className="pt-4 space-y-1 text-sm text-default-800">
            <p>Legal & Policies</p>
            <p>© 2025 CraftTrain. All Rights Reserved.</p>
          </div>
        </div>

        {/* Quick Links Section */}
        <div className="space-y-8 flex flex-col items-center md:items-start">
          <h2 className="text-3xl font-serif text-orange-400 font-semibold">Quick Links</h2>
          <div>
            <h3 className="font-medium">Category</h3>
            <ul className="mt-2 space-y-2">
              {["Earrings", "Bracelets", "Necklaces", "Rings"].map((item) => (
                <li key={item}>
                  <Link
                    className="text-lg text-default-600 hover:text-black transition-colors"
                    href="#"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Section */}
        <div className="space-y-8 flex flex-col items-center md:items-start">
          <h2 className="text-3xl font-serif text-orange-400 font-semibold">Contact Us</h2>
          <div className="space-y-2 text-lg text-default-600">
            <p>
              <Link className="hover:text-black transition-colors" href="#">
                Help Center
              </Link>
            </p>
            <p>
              Email:{" "}
              <a className="hover:text-black transition-colors" href="mailto:Jewelry@info.com">
                Jewelry@info.com
              </a>
            </p>
            <p>
              Phone:{" "}
              <a className="hover:text-black transition-colors" href="tel:01234567890">
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
          <div className="border-r border-default-200 h-full" />
          <div className="border-r border-default-200 h-full" />
        </div>
      </div>
    </footer>
  );
}
