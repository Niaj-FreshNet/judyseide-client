interface SectionTitleProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  titleClassName?: string;
  subtitleClassName?: string;
}

export default function SectionTitle({
  title,
  subtitle,
  align = "left",
  titleClassName = "text-gray-800",
  subtitleClassName = "text-gray-500",
}: SectionTitleProps) {
  const alignment = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  return (
    <div className={`mb-8 ${alignment[align]}`}>
      <h2
        className={`font-serif text-3xl lg:text-4xl font-bold text-default-900 ${titleClassName}`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-6 text-balance text-default-900 ${subtitleClassName}`}>{subtitle}</p>
      )}
    </div>
  );
}
