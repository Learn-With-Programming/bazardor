interface Props {
  icon: string;
  iconColor: string;
  title: string;
  subtitle?: string;
}

export default function SectionHeader({
  icon,
  iconColor,
  title,
  subtitle,
}: Props) {
  return (
    <div className="mb-3 sm:mb-4">
      <h2 className="text-base sm:text-lg font-bold text-gray-800 flex items-center gap-1.5 sm:gap-2">
        <span className={`${iconColor} text-xs sm:text-sm`}>{icon}</span>
        {title}
      </h2>
      {subtitle && (
        <p className="text-[11px] sm:text-xs text-gray-500 mt-0.5 sm:mt-1">
          {subtitle}
        </p>
      )}
    </div>
  );
}