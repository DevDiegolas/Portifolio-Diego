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
    <div className="w-[45%] mx-auto relative overflow-hidden h-24 hover:h-96 transition-all duration-500 ease-in-out cursor-pointer group hover:w-full">

      {/* Background Image */}
      <img
        src={`/src/assets/${bgImageName}`}
        alt="Game Background"
        className="absolute inset-0 w-full h-full object-cover scale-100 group-hover:scale-110 opacity-50 group-hover:opacity-80 transition-all duration-500"
      />

      {/* Gradient Overlay */}
      <div className={`absolute inset-0 bg-linear-to-r ${overlayFrom} ${overlayVia} to-transparent`} />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center px-10 py-5">

        {/* Header — sempre visível */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 shrink-0 drop-shadow-xl transition-transform duration-500 group-hover:scale-110">
            <img
              src={`/src/assets/${iconImageName}`}
              alt="Game Icon"
              className="w-full h-full object-contain"
            />
          </div>
          <h3 className="text-2xl font-bold text-white">{title}</h3>
        </div>

        {/* Descrição — aparece no hover */}
        <div className="mt-6 max-w-lg text-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-150 space-y-3">
          <p className="text-gray-300 text-sm leading-relaxed">
            {description}
          </p>
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
