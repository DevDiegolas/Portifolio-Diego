const scattered = [
  { top: 120, side: 'left',  offset: '9%',  size: 56, rotate: 12,  opacity: 0.85 },
  { top: 190, side: 'right', offset: '9%',  size: 40, rotate: -8,  opacity: 0.75 },
  { top: 265, side: 'left',  offset: '14%', size: 48, rotate: 5,   opacity: 0.80 },
  { top: 340, side: 'right', offset: '12%', size: 36, rotate: -15, opacity: 0.70 },
  { top: 405, side: 'left',  offset: '10%', size: 52, rotate: 20,  opacity: 0.75 },
  { top: 460, side: 'right', offset: '7%',  size: 44, rotate: -4,  opacity: 0.80 },
];

export default function PotatoCard() {
  return (
    <div className="w-[45%] mx-auto relative overflow-hidden h-24 hover:h-96 transition-all duration-500 ease-in-out cursor-pointer group hover:w-full">

      {/* Background com blur */}
      <img
        src="/src/assets/bg-potato.png"
        alt=""
        className="absolute inset-0 w-full h-full object-cover scale-100 group-hover:scale-110 blur-md opacity-70 group-hover:opacity-80 transition-all duration-500"
      />

      {/* Overlay escuro para legibilidade */}
      <div className="absolute inset-0 bg-gray-950/60" />

      {/* Batatas alternando esquerda/direita do texto */}
      {scattered.map((p, i) => (
        <img
          key={i}
          src="/src/assets/icon-potato.png"
          alt=""
          className="absolute pointer-events-none"
          style={{
            top: p.top,
            [p.side]: p.offset,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            transform: `rotate(${p.rotate}deg)`,
            objectFit: 'contain',
          }}
        />
      ))}

      {/* Conteúdo centralizado */}
      <div className="relative z-10 flex flex-col items-center px-10 py-5">

        {/* Header — sempre visível */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 shrink-0 drop-shadow-xl transition-transform duration-500 group-hover:scale-110">
            <img src="/src/assets/icon-potato.png" alt="Game Icon" className="w-full h-full object-contain" />
          </div>
          <h3 className="text-2xl font-bold text-white">Potato Clicker</h3>
        </div>

        {/* Descrição — aparece no hover */}
        <div className="mt-6 max-w-lg text-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-150 space-y-3">
          <p className="text-gray-200 text-sm leading-relaxed">
            A simple clicker game where you grow your potato empire. Click to harvest, buy upgrades, and watch your potatoes multiply!
          </p>
          <p className="text-gray-300 text-sm leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <p className="text-gray-300 text-sm leading-relaxed">
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <p className="text-gray-300 text-sm leading-relaxed">
            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione sequi nesciunt.
          </p>
        </div>
      </div>

      {/* Linha de acento amarela na base */}
      <div className="absolute bottom-0 left-0 h-0.75 bg-[#c2ce2b] w-0 group-hover:w-full transition-all duration-500 ease-in-out" />
    </div>
  );
}
