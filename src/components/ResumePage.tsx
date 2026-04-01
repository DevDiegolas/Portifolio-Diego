import TerminalShell from './TerminalShell';
import resumePdf from '../assets/DIEGORESUME.pdf';

export default function ResumePage() {
  return (
    <TerminalShell currentPath="/resume">
      <section id="resume" className="max-w-6xl mx-auto px-6 py-8 w-full">

        <div className="bg-gray-900/80 border border-gray-800 rounded-2xl p-6 md:p-8 space-y-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h3 className="pixel-title text-sm md:text-base text-white">Diego Goncalves</h3>
              <p className="pixel-body text-lg text-slate-200">Fullstack Software Engineer &amp; Game Developer</p>
              <p className="pixel-body text-base text-slate-300 mt-1">
                Guaruja, SP, Brazil | +55 (13) 98138-4361 | diegogpssth@gmail.com
              </p>
            </div>
            <div className="flex items-center gap-3">
              <a
                href={resumePdf}
                download
                className="inline-flex items-center justify-center px-4 py-2 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition"
              >
                Download PDF
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <article className="bg-gray-950 border border-gray-800 rounded-xl p-5 md:col-span-2">
              <h3 className="pixel-title text-sm text-white mb-3">Professional Summary</h3>
              <p className="pixel-body text-lg text-slate-200 leading-relaxed">
                Software Engineer with a unique foundation in game development. Currently building
                high-performance, scalable fullstack applications, utilizing Go, Node.js, and TypeScript for
                robust backends, alongside React and React Native for intuitive frontends. Looking to combine
                versatile fullstack web development skills with game development roots to build complete,
                scalable systems, LiveOps, and engaging user experiences for innovative studios. Advanced
                English speaker and B.S. in Computer Science student.
              </p>
            </article>

            <article className="bg-gray-950 border border-gray-800 rounded-xl p-5">
              <h3 className="pixel-title text-sm text-white mb-3">Technical Skills</h3>
              <ul className="pixel-body text-lg text-slate-200 leading-relaxed list-disc list-inside space-y-1">
                <li>Languages: TypeScript, Go (Golang), Python, C#, GDScript, GML</li>
                <li>Frontend: React Native, React, Tailwind CSS</li>
                <li>Backend &amp; Infrastructure: Node.js, REST APIs, AWS (EC2, S3, Lambda), Docker, PostgreSQL, MySQL</li>
                <li>Game Engines &amp; Design: Godot, Unity, Unreal Engine, Roblox Studio, Game Maker</li>
              </ul>
            </article>

            <article className="bg-gray-950 border border-gray-800 rounded-xl p-5">
              <h3 className="pixel-title text-sm text-white mb-3">Links</h3>
              <div className="pixel-body text-lg text-slate-200 leading-relaxed space-y-2">
                <p>
                  LinkedIn:{' '}
                  <a
                    href="https://www.linkedin.com/in/diego-gon%C3%A7alves-piovezan/"
                    target="_blank"
                    rel="noreferrer"
                    className="text-sky-300 hover:text-sky-200 underline"
                  >
                    diego-goncalves-piovezan
                  </a>
                </p>
                <p>
                  GitHub:{' '}
                  <a
                    href="https://github.com/DevDiegolas"
                    target="_blank"
                    rel="noreferrer"
                    className="text-sky-300 hover:text-sky-200 underline"
                  >
                    DevDiegolas
                  </a>
                </p>
              </div>
            </article>

            <article className="bg-gray-950 border border-gray-800 rounded-xl p-5 md:col-span-2">
              <h3 className="pixel-title text-sm text-white mb-3">Professional Experience</h3>
              <div className="space-y-4">
                <div>
                  <p className="pixel-title text-xs text-white">Junior FullStack Engineer | Orion Maritima | 2025 - Present</p>
                  <ul className="pixel-body text-lg text-slate-200 leading-relaxed list-disc list-inside mt-2 space-y-1">
                    <li>Developed cross-platform mobile interfaces using React Native, TypeScript, and Tailwind CSS</li>
                    <li>Built high-performance back-end services with Go and Node.js, reducing manual operational tasks</li>
                    <li>Managed SQL databases with focus on data integrity and optimized reporting queries</li>
                  </ul>
                </div>
                <div>
                  <p className="pixel-title text-xs text-white">Game Development Instructor | SuperGeeks | 2020 - 2022 | 2023 - 2024</p>
                  <ul className="pixel-body text-lg text-slate-200 leading-relaxed list-disc list-inside mt-2 space-y-1">
                    <li>Led game development and programming logic classes across Unity, Unreal, Roblox, and Godot</li>
                    <li>Simplified complex concepts for diverse student groups, strengthening communication and leadership</li>
                    <li>Managed student progress and delivered technical support for hybrid and online classes</li>
                  </ul>
                </div>
                <div>
                  <p className="pixel-title text-xs text-white">Web &amp; Mobile Support Analyst | Webline | 2022 - 2023</p>
                  <ul className="pixel-body text-lg text-slate-200 leading-relaxed list-disc list-inside mt-2 space-y-1">
                    <li>Performed deep technical troubleshooting to identify and resolve critical software issues</li>
                    <li>Executed advanced SQL queries and database operations to support stability and client requests</li>
                  </ul>
                </div>
              </div>
            </article>

            <article className="bg-gray-950 border border-gray-800 rounded-xl p-5">
              <h3 className="pixel-title text-sm text-white mb-3">Education</h3>
              <p className="pixel-body text-lg text-slate-200 leading-relaxed">
                B.S. in Computer Science | UNIP - Universidade Paulista | 2022 - 2026 (Expected)
              </p>
            </article>

            <article className="bg-gray-950 border border-gray-800 rounded-xl p-5">
              <h3 className="pixel-title text-sm text-white mb-3">Languages</h3>
              <ul className="pixel-body text-lg text-slate-200 leading-relaxed list-disc list-inside space-y-1">
                <li>Portuguese: Native</li>
                <li>English: Advanced (Professional working proficiency)</li>
              </ul>
            </article>
          </div>
        </div>
      </section>
    </TerminalShell>
  );
}
