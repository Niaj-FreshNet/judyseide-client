export default function ProductInfo({
  badge,
  title,
  price,
  material,
  description,
}: {
  badge: string
  title: string
  price: string
  material: string
  description: string
}) {
  return (
    <div className="space-y-6">
      {/* Badge */}
      <span className="inline-block text-md bg-[#F9EEE4] text-black px-4 py-2 mb-4 rounded-none font-medium">
        {badge}
      </span>

      {/* Title & Price */}
      <div className="space-y-6">
        <h1 className="text-3xl font-semibold">{title}</h1>
        <p className="text-2xl font-semibold">${price}</p>
      </div>

      <hr className="border-t border-orange-200" />

      {/* Material & Color Dot */}
      <div className="flex flex-col items-start gap-6">
        <div className="font-medium text-lg">{material}</div>
        <div className="w-10 h-10 bg-yellow-300 rounded-full border border-orange-200" ></div>
      </div>

      <hr className="border-t border-orange-200" />

      {/* Description */}
      <div className="space-y-6">
        <h2 className="font-semibold text-lg">Description</h2>
        <p className="text-sm text-default-800 leading-relaxed">{description}</p>
      </div>

      <hr className="border-t border-orange-200" />

    </div>
  )
}
