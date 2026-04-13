export default function Header() {
  return (
    <header className="w-full p-6 flex justify-between items-center bg-gray-900 text-white border-b border-gray-800 sticky top-0 z-50">
      <div className="text-2xl font-bold text-blue-400">
        Diego<span className="text-white">.dev</span>
      </div>
      
      <nav className="hidden md:flex gap-6 font-medium text-gray-300">
        <a href="/" className="hover:text-blue-400 transition">Home</a>
        <a href="/about" className="hover:text-blue-400 transition">About Me</a>
        <a href="/games" className="hover:text-blue-400 transition">Games</a>
      </nav>

      <div className="flex gap-4 items-center">
        <a href="/resume" className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded font-bold transition shadow-lg shadow-blue-500/20">
          Resume
        </a>
      </div>
    </header>
  );
}
