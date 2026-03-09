import { useState, useEffect } from "react";

const modules = [
  {
    id: 1,
    icon: "🪪",
    tag: "Module 01",
    title: "Profile Builder",
    subtitle: "Build your career identity",
    duration: "15 min",
    level: "Starter",
    color: "#FF6B35",
    lessons: [
      { title: "Understanding your academic background", done: true },
      { title: "Identifying core strengths & soft skills", done: true },
      { title: "Setting short-term vs long-term goals", done: false },
      { title: "Crafting your personal value proposition", done: false },
    ],
    description:
      "Define who you are professionally. The AI agent analyzes your background, extracts key strengths, and helps you articulate a compelling career narrative.",
    outcome: "A complete student profile ready for resume generation",
  },
  {
    id: 2,
    icon: "📄",
    tag: "Module 02",
    title: "Resume Evaluator",
    subtitle: "AI-powered resume scoring",
    duration: "20 min",
    level: "Core",
    color: "#00B4D8",
    lessons: [
      { title: "Resume anatomy — what recruiters scan first", done: true },
      { title: "ATS optimization & keyword strategy", done: false },
      { title: "Action verbs & quantifying achievements", done: false },
      { title: "Common mistakes & how to fix them", done: false },
    ],
    description:
      "Upload your resume and receive an instant AI evaluation. Get a score, heatmap of weak sections, and specific rewrite suggestions tailored to your target role.",
    outcome: "An ATS-ready resume scoring 85%+",
  },
  {
    id: 3,
    icon: "🧭",
    tag: "Module 03",
    title: "Career Pathfinder",
    subtitle: "Discover your ideal trajectory",
    duration: "25 min",
    level: "Core",
    color: "#7B2FBE",
    lessons: [
      { title: "Mapping skills to industry demand", done: false },
      { title: "Exploring roles: tech, management, research", done: false },
      { title: "Reading job descriptions like an insider", done: false },
      { title: "Building a 90-day action plan", done: false },
    ],
    description:
      "The AI agent cross-references your profile with real-time job market data to recommend the 3 best-fit career paths, with a personalized roadmap for each.",
    outcome: "A personalized 90-day career action plan",
  },
  {
    id: 4,
    icon: "⚡",
    tag: "Module 04",
    title: "Skill Gap Analyzer",
    subtitle: "Know exactly what to learn next",
    duration: "18 min",
    level: "Advanced",
    color: "#06D6A0",
    lessons: [
      { title: "Current skills audit & benchmarking", done: false },
      { title: "Industry-specific skill matrices", done: false },
      { title: "Prioritizing what to learn (ROI of skills)", done: false },
      { title: "Curated learning resource recommendations", done: false },
    ],
    description:
      "Get a visual skill gap report. The AI compares your current skill set against job descriptions in your target field and generates a prioritized learning curriculum.",
    outcome: "A ranked skill-learning roadmap with resources",
  },
  {
    id: 5,
    icon: "🎤",
    tag: "Module 05",
    title: "Interview Simulator",
    subtitle: "Practice with AI feedback",
    duration: "30 min",
    level: "Advanced",
    color: "#FFB703",
    lessons: [
      { title: "STAR method for behavioral questions", done: false },
      { title: "Technical interview preparation strategies", done: false },
      { title: "AI mock interview: 5 live questions", done: false },
      { title: "Salary negotiation fundamentals", done: false },
    ],
    description:
      "Practice real interview questions tailored to your target role. The AI evaluates your answers on clarity, relevance, and confidence — then shows you how to improve.",
    outcome: "Interview-ready with personalized answer bank",
  },
  {
    id: 6,
    icon: "🌐",
    tag: "Module 06",
    title: "LinkedIn & Portfolio",
    subtitle: "Build your digital presence",
    duration: "22 min",
    level: "Advanced",
    color: "#E63946",
    lessons: [
      { title: "LinkedIn profile optimization checklist", done: false },
      { title: "Writing a magnetic About section", done: false },
      { title: "Portfolio structure for tech & non-tech", done: false },
      { title: "Networking outreach templates", done: false },
    ],
    description:
      "Transform your online presence. The AI generates an optimized LinkedIn summary, headline, and portfolio structure based on your profile and target industry.",
    outcome: "A complete, recruiter-magnet online presence",
  },
];

const levelColors = {
  Starter: "#06D6A0",
  Core: "#00B4D8",
  Advanced: "#FF6B35",
};

export default function VidyaGuide() {
  const [active, setActive] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [agentTyping, setAgentTyping] = useState(true);
  const [agentText, setAgentText] = useState("");
  const agentMessage =
    "Namaste! I'm VidyaGuide — your AI career mentor. Choose a module below to begin your personalized journey. I'll guide you at every step. 🚀";

  useEffect(() => {
    setMounted(true);
    let i = 0;
    const interval = setInterval(() => {
      setAgentText(agentMessage.slice(0, i + 1));
      i++;
      if (i >= agentMessage.length) {
        clearInterval(interval);
        setAgentTyping(false);
      }
    }, 22);
    return () => clearInterval(interval);
  }, []);

  const completedLessons = modules.flatMap((m) => m.lessons).filter((l) => l.done).length;
  const totalLessons = modules.flatMap((m) => m.lessons).length;
  const progressPct = Math.round((completedLessons / totalLessons) * 100);

  const activeModule = modules.find((m) => m.id === active);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0A0A0F",
        fontFamily: "'DM Sans', sans-serif",
        color: "#E8E8F0",
        overflowX: "hidden",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Playfair+Display:wght@700;900&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .card-hover {
          transition: transform 0.25s cubic-bezier(.34,1.56,.64,1), box-shadow 0.25s ease;
          cursor: pointer;
        }
        .card-hover:hover {
          transform: translateY(-6px) scale(1.015);
        }

        .lesson-row {
          transition: background 0.15s;
          border-radius: 8px;
          padding: 10px 12px;
        }
        .lesson-row:hover { background: rgba(255,255,255,0.05); }

        .close-btn:hover { background: rgba(255,255,255,0.12) !important; }

        .tag-pill {
          font-size: 10px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          font-weight: 600;
          padding: 3px 9px;
          border-radius: 100px;
          background: rgba(255,255,255,0.08);
          color: rgba(255,255,255,0.5);
        }

        .progress-bar-inner {
          height: 100%;
          border-radius: 100px;
          background: linear-gradient(90deg, #FF6B35, #FFB703);
          transition: width 1s cubic-bezier(.22,.68,0,1.2);
        }

        .modal-overlay {
          position: fixed; inset: 0;
          background: rgba(0,0,0,0.75);
          backdrop-filter: blur(8px);
          z-index: 100;
          display: flex; align-items: center; justify-content: center;
          padding: 20px;
          animation: fadeIn 0.2s ease;
        }

        .modal-box {
          background: #13131A;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 20px;
          max-width: 560px;
          width: 100%;
          padding: 36px;
          animation: slideUp 0.3s cubic-bezier(.34,1.56,.64,1);
          position: relative;
        }

        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUp { from { transform: translateY(40px); opacity: 0 } to { transform: translateY(0); opacity: 1 } }

        .start-btn {
          background: linear-gradient(135deg, var(--mod-color), #0A0A0F 180%);
          border: 1.5px solid var(--mod-color);
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 600;
          padding: 12px 28px;
          border-radius: 100px;
          cursor: pointer;
          transition: opacity 0.2s, transform 0.2s;
          letter-spacing: 0.03em;
        }
        .start-btn:hover { opacity: 0.85; transform: scale(1.03); }

        .grid-bg {
          position: fixed; inset: 0; z-index: 0; pointer-events: none;
          background-image:
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
          background-size: 48px 48px;
        }

        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0A0A0F; }
        ::-webkit-scrollbar-thumb { background: #333; border-radius: 4px; }
      `}</style>

      <div className="grid-bg" />

      {/* Header */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          padding: "32px 40px 0",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                background: "linear-gradient(135deg, #FF6B35, #FFB703)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 18,
              }}
            >
              🎓
            </div>
            <span
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 22,
                fontWeight: 900,
                letterSpacing: "-0.02em",
                background: "linear-gradient(90deg, #FF6B35, #FFB703)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              VidyaGuide
            </span>
            <span
              style={{
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: "0.1em",
                color: "rgba(255,255,255,0.35)",
                textTransform: "uppercase",
                marginLeft: 2,
              }}
            >
              AI Agent
            </span>
          </div>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", letterSpacing: "0.05em" }}>
            Career Planning & Resume Mentor
          </p>
        </div>

        {/* Progress widget */}
        <div
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 14,
            padding: "14px 20px",
            minWidth: 220,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 8,
              fontSize: 12,
              color: "rgba(255,255,255,0.5)",
            }}
          >
            <span>Overall Progress</span>
            <span style={{ color: "#FFB703", fontWeight: 600 }}>{progressPct}%</span>
          </div>
          <div
            style={{
              height: 6,
              borderRadius: 100,
              background: "rgba(255,255,255,0.08)",
            }}
          >
            <div
              className="progress-bar-inner"
              style={{ width: mounted ? `${progressPct}%` : "0%" }}
            />
          </div>
          <div style={{ marginTop: 8, fontSize: 11, color: "rgba(255,255,255,0.3)" }}>
            {completedLessons} of {totalLessons} lessons complete
          </div>
        </div>
      </div>

      {/* Agent Bubble */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          margin: "28px 40px",
          background: "rgba(255,107,53,0.07)",
          border: "1px solid rgba(255,107,53,0.2)",
          borderRadius: 16,
          padding: "18px 22px",
          display: "flex",
          alignItems: "flex-start",
          gap: 14,
          maxWidth: 720,
        }}
      >
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #FF6B35, #FFB703)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 20,
            flexShrink: 0,
          }}
        >
          🤖
        </div>
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, color: "#FF6B35", marginBottom: 5, letterSpacing: "0.08em", textTransform: "uppercase" }}>
            VidyaGuide Agent
          </div>
          <p style={{ fontSize: 14, lineHeight: 1.7, color: "rgba(255,255,255,0.8)" }}>
            {agentText}
            {agentTyping && (
              <span
                style={{
                  display: "inline-block",
                  width: 2,
                  height: 14,
                  background: "#FF6B35",
                  marginLeft: 2,
                  verticalAlign: "middle",
                  animation: "blink 0.7s infinite",
                }}
              />
            )}
          </p>
        </div>
        <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>
      </div>

      {/* Module Grid */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          padding: "0 40px 60px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: 20,
        }}
      >
        {modules.map((mod, i) => {
          const doneCount = mod.lessons.filter((l) => l.done).length;
          const pct = Math.round((doneCount / mod.lessons.length) * 100);
          const isHovered = hoveredId === mod.id;

          return (
            <div
              key={mod.id}
              className="card-hover"
              onClick={() => setActive(mod.id)}
              onMouseEnter={() => setHoveredId(mod.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{
                background: "#13131A",
                border: `1px solid ${isHovered ? mod.color + "55" : "rgba(255,255,255,0.07)"}`,
                borderRadius: 18,
                padding: "26px",
                opacity: mounted ? 1 : 0,
                transform: mounted ? "translateY(0)" : "translateY(20px)",
                transition: `opacity 0.5s ease ${i * 0.07}s, transform 0.5s ease ${i * 0.07}s, border 0.2s`,
              }}
            >
              {/* Card top */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 14,
                    background: mod.color + "18",
                    border: `1px solid ${mod.color}33`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 22,
                  }}
                >
                  {mod.icon}
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
                  <span className="tag-pill">{mod.tag}</span>
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 600,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: levelColors[mod.level],
                    }}
                  >
                    {mod.level}
                  </span>
                </div>
              </div>

              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 20,
                  fontWeight: 700,
                  color: "#fff",
                  marginBottom: 4,
                  letterSpacing: "-0.01em",
                }}
              >
                {mod.title}
              </h2>
              <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginBottom: 14 }}>
                {mod.subtitle}
              </p>

              {/* Lessons preview */}
              <div style={{ marginBottom: 16 }}>
                {mod.lessons.slice(0, 3).map((lesson, li) => (
                  <div
                    key={li}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      marginBottom: 6,
                      fontSize: 12,
                      color: lesson.done ? "rgba(255,255,255,0.55)" : "rgba(255,255,255,0.3)",
                    }}
                  >
                    <div
                      style={{
                        width: 14,
                        height: 14,
                        borderRadius: "50%",
                        border: `1.5px solid ${lesson.done ? mod.color : "rgba(255,255,255,0.15)"}`,
                        background: lesson.done ? mod.color + "30" : "transparent",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 8,
                        flexShrink: 0,
                      }}
                    >
                      {lesson.done && "✓"}
                    </div>
                    <span style={{ textDecoration: lesson.done ? "line-through" : "none" }}>
                      {lesson.title}
                    </span>
                  </div>
                ))}
                {mod.lessons.length > 3 && (
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.2)", marginLeft: 22 }}>
                    +{mod.lessons.length - 3} more lessons
                  </div>
                )}
              </div>

              {/* Footer */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingTop: 14,
                  borderTop: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <div style={{ display: "flex", gap: 12 }}>
                  <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", display: "flex", alignItems: "center", gap: 4 }}>
                    ⏱ {mod.duration}
                  </span>
                  <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", display: "flex", alignItems: "center", gap: 4 }}>
                    📚 {mod.lessons.length} lessons
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div
                    style={{
                      width: 48,
                      height: 4,
                      borderRadius: 100,
                      background: "rgba(255,255,255,0.08)",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        width: `${pct}%`,
                        background: mod.color,
                        borderRadius: 100,
                      }}
                    />
                  </div>
                  <span style={{ fontSize: 11, color: mod.color, fontWeight: 600 }}>{pct}%</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {activeModule && (
        <div className="modal-overlay" onClick={() => setActive(null)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            {/* Modal header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 22 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 14,
                    background: activeModule.color + "20",
                    border: `1.5px solid ${activeModule.color}44`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 26,
                  }}
                >
                  {activeModule.icon}
                </div>
                <div>
                  <span className="tag-pill" style={{ marginBottom: 4, display: "inline-block" }}>
                    {activeModule.tag}
                  </span>
                  <h2
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: 22,
                      fontWeight: 700,
                      color: "#fff",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {activeModule.title}
                  </h2>
                </div>
              </div>
              <button
                className="close-btn"
                onClick={() => setActive(null)}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  border: "1px solid rgba(255,255,255,0.12)",
                  background: "transparent",
                  color: "rgba(255,255,255,0.5)",
                  cursor: "pointer",
                  fontSize: 16,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "background 0.15s",
                }}
              >
                ×
              </button>
            </div>

            {/* Description */}
            <p style={{ fontSize: 13.5, lineHeight: 1.75, color: "rgba(255,255,255,0.6)", marginBottom: 22 }}>
              {activeModule.description}
            </p>

            {/* Lessons */}
            <div style={{ marginBottom: 22 }}>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: 10 }}>
                Lessons
              </div>
              {activeModule.lessons.map((lesson, li) => (
                <div
                  key={li}
                  className="lesson-row"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    marginBottom: 2,
                    fontSize: 13,
                    color: lesson.done ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.85)",
                  }}
                >
                  <div
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: "50%",
                      border: `1.5px solid ${lesson.done ? activeModule.color : "rgba(255,255,255,0.2)"}`,
                      background: lesson.done ? activeModule.color + "25" : "transparent",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 11,
                      flexShrink: 0,
                      color: activeModule.color,
                      fontWeight: 700,
                    }}
                  >
                    {lesson.done ? "✓" : li + 1}
                  </div>
                  <span style={{ textDecoration: lesson.done ? "line-through" : "none", opacity: lesson.done ? 0.5 : 1 }}>
                    {lesson.title}
                  </span>
                  {!lesson.done && li === activeModule.lessons.findIndex((l) => !l.done) && (
                    <span
                      style={{
                        marginLeft: "auto",
                        fontSize: 9,
                        fontWeight: 700,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        background: activeModule.color + "20",
                        color: activeModule.color,
                        padding: "2px 7px",
                        borderRadius: 100,
                        whiteSpace: "nowrap",
                      }}
                    >
                      Up next
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Outcome callout */}
            <div
              style={{
                background: activeModule.color + "10",
                border: `1px solid ${activeModule.color}25`,
                borderRadius: 12,
                padding: "12px 16px",
                marginBottom: 24,
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <span style={{ fontSize: 16 }}>🎯</span>
              <div>
                <div style={{ fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: activeModule.color, marginBottom: 2 }}>
                  Module Outcome
                </div>
                <div style={{ fontSize: 12.5, color: "rgba(255,255,255,0.7)" }}>{activeModule.outcome}</div>
              </div>
            </div>

            {/* CTA */}
            <div style={{ display: "flex", gap: 12 }}>
              <button
                className="start-btn"
                style={{ "--mod-color": activeModule.color } as React.CSSProperties}
              >
                {activeModule.lessons.some((l) => l.done) ? "▶ Continue Module" : "▶ Start Module"}
              </button>
              <button
                onClick={() => setActive(null)}
                style={{
                  background: "transparent",
                  border: "1px solid rgba(255,255,255,0.12)",
                  color: "rgba(255,255,255,0.45)",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 13,
                  padding: "12px 20px",
                  borderRadius: 100,
                  cursor: "pointer",
                  transition: "border 0.2s",
                }}
              >
                Back to modules
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
