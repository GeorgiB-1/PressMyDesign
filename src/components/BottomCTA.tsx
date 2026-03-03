export default function BottomCTA() {
  return (
    <section className="px-6 py-16 text-center relative overflow-hidden border-t border-white/[0.06]">
      {/* Glow */}
      <div
        className="absolute -top-20 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(255,61,0,0.06), transparent 70%)",
        }}
      />
      <div className="relative max-w-[500px] mx-auto">
        <h2 className="text-[28px] font-bold tracking-tight mb-2.5">
          Ready to Print?
        </h2>
        <p className="text-[15px] text-text-secondary/45 mb-6">
          100 Gildan Softstyle Tees &middot; Full-colour DTF print &middot; Free
          shipping &middot; Just $3.99 each
        </p>
        <a
          href="#configurator"
          className="inline-flex items-center gap-2.5 bg-accent-orange text-white px-10 py-4.5 rounded-full text-base font-bold no-underline shadow-[0_4px_24px_rgba(255,61,0,0.3)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(255,61,0,0.35)]"
        >
          Request Your Free Quote
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </section>
  )
}
