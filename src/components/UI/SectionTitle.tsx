interface SectionTitleProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  titleClassName?: string;
  subtitleClassName?: string;
}

export default function SectionTitle({
  title,
  subtitle,
  align = 'left',
  titleClassName = 'text-gray-800',
  subtitleClassName = 'text-gray-500',
}: SectionTitleProps) {
  const alignment = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  return (
    <div className={`mb-6 ${alignment[align]}`}>
      <h2 className={`font-serif text-2xl sm:text-3xl font-bold ${titleClassName}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-6 text-balance ${subtitleClassName}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
