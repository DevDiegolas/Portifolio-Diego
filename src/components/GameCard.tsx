interface GameCardProps {
  title: string;
  description: string;
  bgImageName: string;
  iconImageName: string;
  accentColor?: string;
  overlayFrom?: string;
  overlayVia?: string;
}

export default function GameCard({
  title,
  description,
  bgImageName,
  iconImageName,
  accentColor = '#c2ce2b',
  overlayFrom = 'from-gray-950/95',
  overlayVia = 'via-gray-900/70',
}: GameCardProps) {
  return (
    <div className="w-full relative overflow-hidden h-24 hover:h-72 transition-all duration-500 ease-in-out cursor-pointer group">

      {/* Background Image */}
      <img
        src={`/src/assets/${bgImageName}`}
        alt="Game Background"
        className="absolute inset-0 w-full h-full object-cover scale-110 opacity-50 group-hover:opacity-75 transition-opacity duration-500"
      />

      {/* Gradient Overlay */}
      <div className={`absolute inset-0 bg-linear-to-r ${overlayFrom} ${overlayVia} to-transparent`} />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center px-10 py-6">
        <div className="flex items-center gap-6">

          {/* Icon */}
          <div className="w-14 h-14 shrink-0 drop-shadow-xl transition-transform duration-500 group-hover:scale-110">
            <img
              src={`/src/assets/${iconImageName}`}
              alt="Game Icon"
              className="w-full h-full object-contain"
            />
          </div>

          {/* Text */}
          <div>
            <h3 className="text-2xl font-bold text-white">{title}</h3>
            <p className="text-gray-300 text-sm mt-3 max-w-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-150 leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom accent line */}
      <div
        className="absolute bottom-0 left-0 h-0.75 w-0 group-hover:w-full transition-all duration-500 ease-in-out"
        style={{ backgroundColor: accentColor }}
      />
    </div>
  );
}
