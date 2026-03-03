const ITEMS = [
  "100% Satisfaction Guarantee",
  "Free US Shipping",
  "No Setup Fees",
  "Free Digital Proof",
]

export default function TrustBar() {
  return (
    <section className="px-6 py-7 border-t border-white/[0.06]">
      <div className="max-w-[1100px] mx-auto flex justify-center gap-8 flex-wrap">
        {ITEMS.map((t, i) => (
          <div
            key={i}
            className="flex items-center gap-1.5 text-[13px] text-text-secondary/50 font-medium"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#22c55e"
              strokeWidth="2.5"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            {t}
          </div>
        ))}
      </div>
    </section>
  )
}
