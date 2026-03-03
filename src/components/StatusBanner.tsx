import { useState, useEffect } from "react"
import { useSnapshot } from "valtio"
import state from "../store"

function ProgressBar() {
  const [width, setWidth] = useState(0)
  const [label, setLabel] = useState("Uploading design...")

  useEffect(() => {
    const steps = [
      { w: 30, t: 800, l: "Analysing design..." },
      { w: 55, t: 2200, l: "Generating mockup..." },
      { w: 78, t: 4000, l: "Applying to model..." },
      { w: 92, t: 6000, l: "Sending to your email..." },
    ]
    const timers = steps.map(({ w, t, l }) =>
      setTimeout(() => {
        setWidth(w)
        setLabel(l)
      }, t),
    )
    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <div className="mt-6">
      <div className="h-[5px] bg-white/[0.06] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-[width] duration-[1500ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
          style={{
            width: `${width}%`,
            background: "linear-gradient(90deg, #ff3d00, #ff6d3a)",
          }}
        />
      </div>
      <p className="text-xs text-text-secondary/45 mt-2">{label}</p>
    </div>
  )
}

function InboxReminder() {
  const snap = useSnapshot(state)
  const [show, setShow] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 1500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div
      className="mt-5 flex items-center gap-3 rounded-xl border px-5 py-3.5 transition-all duration-500"
      style={{
        background: "rgba(34, 197, 94, 0.08)",
        borderColor: "rgba(34, 197, 94, 0.2)",
        opacity: show ? 1 : 0,
        transform: show ? "translateY(0)" : "translateY(8px)",
      }}
    >
      <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 bg-success/15">
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#22c55e"
          strokeWidth="2"
        >
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="M22 4L12 13 2 4" />
        </svg>
      </div>
      <div>
        <p className="text-[13px] font-semibold text-success">
          Check your inbox
        </p>
        <p className="text-xs text-text-secondary/50">
          We're sending your mockup to{" "}
          <strong className="text-text-secondary/70">
            {snap.email || "your email"}
          </strong>
        </p>
      </div>
    </div>
  )
}

export default function StatusBanner() {
  return (
    <section
      className="relative overflow-hidden border-b border-white/[0.06] px-6 pt-9 pb-10"
      style={{
        background: "linear-gradient(135deg, #1a0f2e, #0c0a14)",
      }}
    >
      {/* Glow */}
      <div
        className="absolute -top-20 left-1/2 -translate-x-1/2 w-[700px] h-[300px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(255,61,0,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-[860px] mx-auto relative">
        <div className="flex items-start gap-4 sm:gap-5">
          {/* Pulsing icon */}
          <div className="w-[52px] h-[52px] rounded-full border-2 border-accent-orange/25 bg-accent-orange/12 flex items-center justify-center shrink-0 animate-pulse-orange">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ff3d00"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="3" />
              <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M16.36 16.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M16.36 7.64l1.42-1.42" />
            </svg>
          </div>

          <div>
            <h1 className="text-2xl sm:text-[26px] font-bold tracking-tight leading-tight">
              Your AI Mockup is Being{" "}
              <span className="text-accent-orange">Generated!</span>
            </h1>
            <p className="text-[15px] text-text-secondary/60 max-w-[520px] leading-relaxed mt-1.5">
              Check your inbox shortly to see your design on a real model. While
              you wait — explore colours, pick print locations, and get instant
              pricing.
            </p>
            <InboxReminder />
          </div>
        </div>
        <ProgressBar />
      </div>
    </section>
  )
}
