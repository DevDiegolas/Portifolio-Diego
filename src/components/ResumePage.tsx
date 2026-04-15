import resumePdf from '../assets/DIEGORESUME.pdf';

// ── Corner decoration ──────────────────────────────────────────────────────
function Corner({ pos }: { pos: 'tl' | 'tr' | 'bl' | 'br' }) {
  const classes = {
    tl: 'top-0 left-0 border-t-2 border-l-2',
    tr: 'top-0 right-0 border-t-2 border-r-2',
    bl: 'bottom-0 left-0 border-b-2 border-l-2',
    br: 'bottom-0 right-0 border-b-2 border-r-2',
  }[pos];
  return (
    <div
      className={`absolute w-5 h-5 ${classes}`}
      style={{ borderColor: 'var(--t-frame-light)' }}
    />
  );
}

// ── Section header ─────────────────────────────────────────────────────────
function SheetHeader({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="pixel-title text-xs" style={{ color: 'var(--t-frame-light)' }}>◈</span>
      <span className="pixel-title text-xs tracking-widest" style={{ color: 'var(--t-frame-light)' }}>{children}</span>
      <span className="pixel-title text-xs" style={{ color: 'var(--t-frame-light)' }}>◈</span>
      <div className="flex-1 h-px" style={{ background: 'var(--t-frame-line)' }} />
    </div>
  );
}

// ── Info row ───────────────────────────────────────────────────────────────
function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start gap-1.5 sm:gap-3 py-1.5 border-b" style={{ borderColor: 'var(--t-frame-line-dark)' }}>
      <span className="pixel-title text-xs w-full sm:w-32 shrink-0 sm:text-right sm:pt-1" style={{ color: 'var(--t-frame-dark)' }}>{label}</span>
      <span className="pixel-body text-xl leading-tight" style={{ color: 'var(--t-text)' }}>{value}</span>
    </div>
  );
}

// ── Skill row ──────────────────────────────────────────────────────────────
function SkillRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start gap-1.5 sm:gap-3 py-1.5 border-b" style={{ borderColor: 'var(--t-frame-line-dark)' }}>
      <span className="pixel-title text-xs w-full sm:w-32 shrink-0 sm:text-right" style={{ color: 'var(--t-frame-dark)' }}>{label}</span>
      <span className="pixel-body text-xl leading-relaxed" style={{ color: 'var(--t-primary)' }}>{value}</span>
    </div>
  );
}

// ── Quest entry ────────────────────────────────────────────────────────────
function QuestEntry({
  title,
  company,
  dates,
  achievements,
}: {
  title: string;
  company: string;
  dates: string;
  achievements: string[];
}) {
  return (
    <div
      className="rounded-lg p-5 space-y-3"
      style={{ background: 'var(--t-bg-card)', border: '1px solid var(--t-frame-line)' }}
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
        <div className="space-y-1">
          <p className="pixel-title text-xs" style={{ color: 'var(--t-frame-light)' }}>{title}</p>
          <p className="pixel-body text-lg" style={{ color: 'var(--t-frame)' }}>{company}</p>
        </div>
        <span
          className="pixel-body text-base px-2 py-0.5 rounded"
          style={{ color: 'var(--t-frame-dark)', background: 'var(--t-bg-card)', border: '1px solid var(--t-frame-line)' }}
        >
          {dates}
        </span>
      </div>
      <ul className="space-y-2 pl-1">
        {achievements.map((item, i) => (
          <li key={i} className="flex items-start gap-2">
            <span className="pixel-title text-xs mt-0.5 shrink-0" style={{ color: 'var(--t-secondary)' }}>+</span>
            <span className="pixel-body text-lg leading-relaxed" style={{ color: 'var(--t-text)' }}>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────
export default function ResumePage() {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 w-full">

        {/* ── Quest Log frame ── */}
        <div
          className="relative rounded-2xl p-4 sm:p-6 md:p-8 space-y-6 sm:space-y-8"
          style={{
            background: 'var(--t-frame-bg)',
            border: '2px solid var(--t-frame)',
            boxShadow: '0 0 0 4px var(--t-frame-outer), 0 0 0 6px color-mix(in srgb, var(--t-frame) 27%, transparent)',
          }}
        >
          <Corner pos="tl" />
          <Corner pos="tr" />
          <Corner pos="bl" />
          <Corner pos="br" />

          {/* ── Sheet title + download ── */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 -mt-1 sm:-mt-2">
            <div className="text-center md:text-left">
              <p
                className="pixel-title text-sm md:text-base tracking-widest"
                style={{ color: 'var(--t-frame-light)', textShadow: '0 0 16px color-mix(in srgb, var(--t-frame) 53%, transparent)' }}
              >
                ◈ QUEST LOG ◈
              </p>
              <p className="pixel-body text-xl mt-1" style={{ color: 'var(--t-text)' }}>
                Fullstack Software Engineer &amp; Game Developer
              </p>
              <p className="pixel-body text-sm sm:text-base mt-0.5 wrap-break-word" style={{ color: 'var(--t-frame-dark)' }}>
                Guaruja, SP, Brazil &nbsp;|&nbsp; +55 (13) 98138-4361 &nbsp;|&nbsp; diegogpssth@gmail.com
              </p>
            </div>
            <div className="flex items-center justify-center md:justify-end shrink-0">
              <a
                href={resumePdf}
                download
                className="inline-flex items-center justify-center px-5 py-2 rounded-md pixel-title text-xs tracking-widest transition-all"
                style={{
                  color: 'var(--t-frame-light)',
                  background: 'var(--t-bg-card)',
                  border: '2px solid var(--t-frame)',
                  boxShadow: '0 0 0 2px var(--t-frame-outer)',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLAnchorElement).style.background = 'var(--t-frame-bg)';
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 0 0 2px var(--t-frame-outer), 0 0 8px color-mix(in srgb, var(--t-frame) 40%, transparent)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLAnchorElement).style.background = 'var(--t-bg-card)';
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 0 0 2px var(--t-frame-outer)';
                }}
              >
                Download Scroll
              </a>
            </div>
          </div>

          {/* ── Grid layout ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* ── Adventurer's Tale (full width) ── */}
            <div className="md:col-span-2">
              <SheetHeader>ADVENTURER'S TALE</SheetHeader>
              <p className="pixel-body text-xl leading-relaxed pl-1" style={{ color: 'var(--t-text)' }}>
                Software Engineer with a unique foundation in game development. Currently building
                high-performance, scalable fullstack applications, utilizing Go, Node.js, and TypeScript for
                robust backends, alongside React and React Native for intuitive frontends. Looking to combine
                versatile fullstack web development skills with game development roots to build complete,
                scalable systems, LiveOps, and engaging user experiences for innovative studios. Advanced
                English speaker and B.S. in Computer Science student.
              </p>
            </div>

            {/* ── Skill Tree ── */}
            <div>
              <SheetHeader>SKILL TREE</SheetHeader>
              <div className="space-y-0">
                <SkillRow label="LANGUAGES"  value="TypeScript, Go (Golang), Python, C#, GDScript, GML" />
                <SkillRow label="FRONTEND"   value="React Native, React, Tailwind CSS" />
                <SkillRow label="BACKEND"    value="Node.js, REST APIs, AWS (EC2, S3, Lambda), Docker, PostgreSQL, MySQL" />
                <SkillRow label="GAME ENG."  value="Godot, Unity, Unreal Engine, Roblox Studio, Game Maker" />
              </div>
            </div>

            {/* ── Guild Links ── */}
            <div>
              <SheetHeader>GUILD LINKS</SheetHeader>
              <div className="space-y-0">
                <InfoRow
                  label="LINKEDIN"
                  value={
                    <a
                      href="https://www.linkedin.com/in/diego-gon%C3%A7alves-piovezan/"
                      target="_blank"
                      rel="noreferrer"
                      className="hover:underline"
                      style={{ color: 'var(--t-primary)' }}
                    >
                      diego-goncalves-piovezan
                    </a>
                  }
                />
                <InfoRow
                  label="GITHUB"
                  value={
                    <a
                      href="https://github.com/DevDiegolas"
                      target="_blank"
                      rel="noreferrer"
                      className="hover:underline"
                      style={{ color: 'var(--t-primary)' }}
                    >
                      DevDiegolas
                    </a>
                  }
                />
              </div>
            </div>

            {/* ── Completed Quests (full width) ── */}
            <div className="md:col-span-2">
              <SheetHeader>COMPLETED QUESTS</SheetHeader>
              <div className="space-y-4">
                <QuestEntry
                  title="FullStack Engineer"
                  company="Orion Maritima"
                  dates="2025 - Present"
                  achievements={[
                    'Developed cross-platform mobile interfaces using React Native, TypeScript, and Tailwind CSS',
                    'Built high-performance back-end services with Go and Node.js, reducing manual operational tasks',
                    'Managed SQL databases with focus on data integrity and optimized reporting queries',
                  ]}
                />
                <QuestEntry
                  title="Game Development Instructor"
                  company="SuperGeeks"
                  dates="2020 - 2022 | 2023 - 2024"
                  achievements={[
                    'Led game development and programming logic classes across Unity, Unreal, Roblox, and Godot',
                    'Simplified complex concepts for diverse student groups, strengthening communication and leadership',
                    'Managed student progress and delivered technical support for hybrid and online classes',
                  ]}
                />
                <QuestEntry
                  title="Web &amp; Mobile Support Analyst"
                  company="Webline"
                  dates="2022 - 2023"
                  achievements={[
                    'Performed deep technical troubleshooting to identify and resolve critical software issues',
                    'Executed advanced SQL queries and database operations to support stability and client requests',
                  ]}
                />
              </div>
            </div>

            {/* ── Training Grounds ── */}
            <div>
              <SheetHeader>TRAINING GROUNDS</SheetHeader>
              <div className="space-y-0">
                <InfoRow label="DEGREE"  value="B.S. in Computer Science" />
                <InfoRow label="SCHOOL"  value="UNIP - Universidade Paulista" />
                <InfoRow label="PERIOD"  value="2022 - 2026 (Expected)" />
              </div>
            </div>

            {/* ── Known Languages ── */}
            <div>
              <SheetHeader>KNOWN LANGUAGES</SheetHeader>
              <div className="space-y-0">
                <InfoRow label="PORTUGUESE" value="Native" />
                <InfoRow label="ENGLISH"    value="Advanced (Professional working proficiency)" />
              </div>
            </div>

          </div>
        </div>
      </section>
  );
}
