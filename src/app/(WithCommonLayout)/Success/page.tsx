<<<<<<< HEAD
'use client';

import ProductReviews from "@/src/components/modules/product/ProductReviews";
import RelatedProducts from "@/src/components/modules/product/RelatedProducts";
import ThankYou from "@/src/components/thank-you/ThankYou";

export default function ThankYouPage() {

  return (
    <div className=" space-y-16">
        <ThankYou />
      
    </div>
  );
}
=======
import Image from "next/image"
import Link from "next/link"
import image1 from "@/public/gallery/success.jpg";

export default function success() {
  return (
    <div className=" flex flex-col">
      {/* Header with Begin link */}
      <header className="p-6">
        <Link href="/" className="text-orange-500 hover:text-orange-600 transition-colors font-medium">
          ← Begin
        </Link>
      </header>

      {/* Main content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="max-w-md w-full text-center space-y-8">
          {/* Thank you heading */}
          <h1 className="text-2xl md:text-3xl font-semibold text-orange-500">Thank you so much</h1>

          {/* Decorative circular image */}
          <div className="flex justify-center py-8">
            <div className="relative">
              <Image
                src={image1}
                alt="Order confirmation illustration"
                width={150}
                height={150}
                className="rounded-full bg-orange-400"
              />
              {/* Decorative elements around the circle */}
              {/* <div className="absolute -top-2 -left-2 w-3 h-3 bg-orange-300 rounded-full"></div>
              <div className="absolute -top-1 -right-3 w-2 h-2 bg-orange-400 rounded-full"></div>
              <div className="absolute -bottom-2 -left-3 w-2 h-2 bg-orange-300 rounded-full"></div>
              <div className="absolute -bottom-1 -right-2 w-3 h-3 bg-orange-400 rounded-full"></div>
              <div className="absolute top-1/2 -left-4 w-1.5 h-1.5 bg-orange-300 rounded-full"></div>
              <div className="absolute top-1/2 -right-4 w-1.5 h-1.5 bg-orange-400 rounded-full"></div> */}
            </div>
          </div>

          {/* Order confirmation text */}
          <div className="space-y-4">
            <h2 className="text-xl font-medium text-orange-500">Your Order has been confirmed</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
               We’ve received your order and it’s now being processed. A confirmation email has been sent to your inbox with all the details.
            </p>
          </div>

          {/* Check email button */}
          <a href="mailto:bella d'or@gmail.com">
  <button className="w-full max-w-xs mx-auto bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-6 rounded-lg transition-colors">
    Check Your Email
  </button>
</a>

        </div>
      </main>
    </div>
  )
}
>>>>>>> 3c0c8e00d014459573e13f8e453d47e08037b280
