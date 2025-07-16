import Link from "next/link";
import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="max-w-full mx-auto bg-default-100 border-t border-orange-200 text-default-700">
      <div className="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 px-8 lg:px-24 pt-12 pb-8 place-items-center items-start">
        {/* Brand Section */}
        <div className="space-y-8 flex flex-col items-center md:items-start">
          <h1 className="text-5xl font-serif text-orange-400 font-bold">Bella D'or</h1>
          <p className="text-lg text-balance leading-relaxed">
            Get The Best Jewellery in Your City.
          </p>

          {/* Social Icons */}
          <div className="flex space-x-6 pt-2 text-orange-400">
            {/* TikTok Icon from react-icons */}
            <a href="https://www.tiktok.com/@belladorjewelry" rel="noopener noreferrer" target="_blank">
              <FaTiktok className="w-8 h-8 text-black hover:text-gray-700 transition-colors" />
            </a>

            {/* Instagram Icon from react-icons */}
            <a href="https://www.instagram.com/jewelrybellador?igsh=dTZxbHg3dzB6eWVu" rel="noopener noreferrer" target="_blank">
              <FaInstagram className="w-8 h-8 text-[#E1306C] hover:text-[#C13584] transition-colors" />
            </a>

            {/* Facebook Icon from react-icons */}
            <a href="https://www.facebook.com/profile.php?id=61577797949792" rel="noopener noreferrer" target="_blank">
              <FaFacebook className="w-8 h-8 text-[#1877F2] hover:text-[#0A64BC] transition-colors" />
            </a>
          </div>
          <div className="pt-4 space-y-1 text-sm text-default-800 text-center hidden md:block">
            <p>Legal & Policies</p>
            <p>© 2025 CraftTrain. All Rights Reserved.</p>
          </div>
        </div>

        {/* Quick Links Section */}
        <div className="space-y-8 flex flex-col items-center md:items-start">
          <h2 className="text-3xl font-serif text-orange-400 font-semibold">Quick Links</h2>
          <div className=" text-center md:text-left">
            <h3 className="font-medium">Category</h3>
            <ul className="mt-2 space-y-2">
              {["Earrings", "Bracelets", "Necklaces", "Rings"].map((item) => (
                <li key={item}>
                  <Link
                    className="text-lg text-default-600 hover:text-black transition-colors"
                    href={`/${item.toLowerCase()}`}
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
          <div className="space-y-2 text-lg text-center md:text-left text-default-600">
            <p>
              <Link className="hover:text-black transition-colors" href="/contact">
                Help Center
              </Link>
            </p>
            <p>
              Email:{" "}
              <a className="hover:text-black transition-colors" href="mailto:Jewelry@info.com">
                seide.judy@gmail.com
              </a>
            </p>
            <p>
              Phone:{" "}
              <a className="hover:text-black transition-colors" href="tel:01234567890">
                1(305)-360-3048

              </a>
            </p>
            <p>Location: North Miami,Florida, USA</p>
          </div>
        </div>
      </div>

      {/* Legal & Policies Section (Mobile-only, at the bottom) */}
      <div className="pt-4 space-y-1 text-sm text-default-800 text-center md:hidden">
        <p>Legal & Policies</p>
        <p>© 2025 CraftTrain. All Rights Reserved.</p>
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
