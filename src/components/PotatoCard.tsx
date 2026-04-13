const scattered = [
  { top: 86, side: 'left', offset: '8%', size: 42, rotate: 8, opacity: 0.76 },
  { top: 132, side: 'right', offset: '10%', size: 34, rotate: -6, opacity: 0.66 },
  { top: 178, side: 'left', offset: '14%', size: 52, rotate: 14, opacity: 0.82 },
  { top: 228, side: 'right', offset: '7%', size: 38, rotate: -11, opacity: 0.7 },
  { top: 274, side: 'left', offset: '10%', size: 46, rotate: 4, opacity: 0.74 },
  { top: 326, side: 'right', offset: '13%', size: 32, rotate: -18, opacity: 0.68 },
  { top: 372, side: 'left', offset: '6%', size: 58, rotate: 19, opacity: 0.8 },
  { top: 420, side: 'right', offset: '9%', size: 40, rotate: -2, opacity: 0.73 },
  { top: 468, side: 'left', offset: '12%', size: 36, rotate: -9, opacity: 0.69 },
  { top: 516, side: 'right', offset: '5%', size: 50, rotate: 16, opacity: 0.78 },
  { top: 566, side: 'left', offset: '9%', size: 44, rotate: 7, opacity: 0.72 },
  { top: 618, side: 'right', offset: '11%', size: 38, rotate: -14, opacity: 0.67 },
  { top: 664, side: 'left', offset: '13%', size: 48, rotate: 21, opacity: 0.77 },
];

export default function PotatoCard() {
  return (
    <div className="w-[45%] mx-auto relative overflow-hidden h-24 hover:h-[42rem] transition-all duration-500 ease-in-out cursor-pointer group hover:w-full">

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
          <h3 className="pixel-title text-sm md:text-base font-bold pixel-green">Potato Clicker</h3>
        </div>

        {/* Descrição — aparece no hover */}
        <div className="mt-6 max-w-lg text-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-150 space-y-3">
          <p className="pixel-body text-lg md:text-xl text-slate-200 leading-relaxed">
            A simple clicker game where you grow your potato empire. Click to harvest, buy upgrades, and watch your potatoes multiply!
          </p>
          <p className="pixel-body text-lg md:text-xl text-slate-200 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <p className="pixel-body text-lg md:text-xl text-slate-200 leading-relaxed">
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <p className="pixel-body text-lg md:text-xl text-slate-200 leading-relaxed">
            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione sequi nesciunt.
          </p>
        </div>
      </div>

      {/* Linha de acento amarela na base */}
      <div className="absolute bottom-0 left-0 h-0.75 bg-[#c2ce2b] w-0 group-hover:w-full transition-all duration-500 ease-in-out" />
    </div>
  );
}
