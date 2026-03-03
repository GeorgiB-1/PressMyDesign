import { useState } from "react"

export default function ShareSection() {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard
      .writeText("https://pressmydesign.com/free-mockup")
      .catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section
      className="px-6 py-10 border-t border-white/[0.06]"
      style={{
        background:
          "linear-gradient(135deg, rgba(139,92,246,0.04), transparent)",
      }}
    >
      <div className="max-w-[500px] mx-auto text-center">
        <p className="text-[11px] uppercase tracking-[0.14em] text-accent-purple font-bold mb-2">
          Share The Love
        </p>
        <h3 className="text-xl font-bold tracking-tight mb-1.5">
          Know Someone Who Needs Custom Tees?
        </h3>
        <p className="text-sm text-text-secondary/45 mb-5">
          Send them our free mockup tool — they'll thank you.
        </p>
        <div className="flex gap-2 justify-center">
          <div className="flex-1 max-w-[300px] bg-white/[0.04] border border-white/[0.08] rounded-[10px] px-3.5 py-3 text-[13px] text-text-secondary/40 overflow-hidden text-ellipsis whitespace-nowrap">
            pressmydesign.com/free-mockup
          </div>
          <button
            onClick={handleCopy}
            className={`px-5 py-3 rounded-[10px] text-[13px] font-semibold cursor-pointer transition-all duration-200 border ${
              copied
                ? "bg-success border-success text-white"
                : "bg-accent-purple/15 border-accent-purple/30 text-white hover:brightness-110"
            }`}
          >
            {copied ? "Copied!" : "Copy Link"}
          </button>
        </div>
      </div>
    </section>
  )
}
