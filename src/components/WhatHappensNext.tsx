const STEPS = [
  {
    icon: "\u2713",
    label: "Design Received",
    desc: "Your file is uploaded and queued",
    time: "\u2713 Done",
    active: true,
  },
  {
    icon: "\u2709",
    label: "Mockup Emailed",
    desc: "AI mockup on a real model sent to you",
    time: "~5 min",
    active: false,
  },
  {
    icon: "\u2192",
    label: "Ready to Order",
    desc: "Approve, configure sizes & order",
    time: "When ready",
    active: false,
  },
]

export default function WhatHappensNext() {
  return (
    <section className="px-6 py-10 border-b border-white/[0.06]">
      <div className="max-w-[860px] mx-auto">
        <p className="text-[11px] uppercase tracking-[0.14em] text-accent-orange font-bold mb-5">
          What Happens Next
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {STEPS.map((s, i) => (
            <div
              key={i}
              className={`rounded-xl border p-5 text-center ${
                s.active
                  ? "bg-accent-orange/[0.06] border-accent-orange/20"
                  : "bg-white/[0.02] border-white/[0.06]"
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full mx-auto mb-3 flex items-center justify-center text-[15px] font-bold ${
                  s.active
                    ? "bg-accent-orange text-white shadow-[0_0_0_5px_rgba(255,61,0,0.12)]"
                    : "bg-white/[0.06] text-text-secondary/35"
                }`}
              >
                {s.icon}
              </div>
              <p className="text-sm font-semibold mb-0.5">{s.label}</p>
              <p className="text-xs text-text-secondary/40 leading-snug mb-2">
                {s.desc}
              </p>
              <span
                className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                  s.active
                    ? "bg-success/12 text-success"
                    : "bg-white/[0.04] text-text-secondary/35"
                }`}
              >
                {s.time}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
