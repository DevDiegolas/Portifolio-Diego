import Header from './components/Header';
import Home from './components/Home';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-950 font-sans text-gray-200">
      <Header />
      <main>
        <Home />
      </main>
    </div>
  );
}