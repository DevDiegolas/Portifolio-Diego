import Footer from './Footer';

export default function AboutPage() {
  return (
    <div className="flex flex-col w-full mt-10 space-y-16">
      <section className="max-w-6xl mx-auto px-6 w-full">
        <h2 className="pixel-title text-xl md:text-2xl font-bold text-white mb-6 border-b border-gray-800 pb-4">
          About Me
        </h2>

        <div className="bg-gray-900/80 border border-gray-800 rounded-2xl p-6 md:p-8 space-y-6">
          <p className="pixel-body text-lg text-slate-200 leading-relaxed">
            My journey in tech started in 2020 as a student at a programming school. I stayed there for years,
            learning deeply while gradually stepping into teaching roles. During the pandemic, classes moved online,
            and at 17 I became a monitor, helping students in hybrid classrooms while instructors handled remote
            sessions. That environment taught me how to communicate clearly, adapt quickly, and support different
            learning styles.
          </p>

          <p className="pixel-body text-lg text-slate-200 leading-relaxed">
            Before turning 18, I was already teaching some groups myself. It was a bit unusual to handle parent
            meetings at that age, but it built confidence and leadership early. Soon after, I started my Computer
            Science degree and continued teaching until I moved into a web and mobile support analyst role, where I
            spent about a year strengthening my troubleshooting and systems mindset.
          </p>

          <p className="pixel-body text-lg text-slate-200 leading-relaxed">
            Later, I returned to teaching online and was invited by another school to teach as well. I had great
            feedback from students, but timing with college made full commitment difficult. Even so, I still keep a
            strong connection with education while working professionally as a developer.
          </p>

          <p className="pixel-body text-lg text-slate-200 leading-relaxed">
            Along this path, I built hands-on experience in both web and game development. I have worked and taught
            with GameMaker, Unity (2D and 3D), Godot, and Roblox Studio, and I also know Unreal Engine (even though
            it is not my favorite workflow). A fun part of my story is that I often taught the same topics I was
            actively studying as a student, which gave me a practical and constantly evolving perspective.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
