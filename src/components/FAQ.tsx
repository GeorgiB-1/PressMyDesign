import { useState } from "react"

const FAQS = [
  {
    q: "What's included in the $399 package?",
    a: "100 Gildan Softstyle T-shirts with full-colour DTF printing on one side. Includes free digital proof, free setup, and free US shipping.",
  },
  {
    q: "What if I need a different quantity?",
    a: "We do any quantity from 25 to 10,000+. Pricing gets better at higher volumes. Request a quote and we'll send you a custom price within 24 hours.",
  },
  {
    q: "How long does production take?",
    a: "7-10 business days for most orders. Rush orders (3-5 days) available for an additional fee. We'll confirm timing when you approve your proof.",
  },
  {
    q: "Can I mix sizes in my order?",
    a: "Absolutely! You can mix any combination of sizes from S-3XL at no extra cost. Just tell us your size breakdown when ordering.",
  },
]

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null)

  return (
    <section className="px-6 py-14 border-t border-white/[0.06]">
      <div className="max-w-[720px] mx-auto">
        <div className="text-center mb-8">
          <p className="text-[11px] uppercase tracking-[0.14em] text-accent-orange font-bold mb-2">
            Common Questions
          </p>
          <h2 className="text-2xl font-bold tracking-tight">
            Everything You Need to Know
          </h2>
        </div>

        <div className="flex flex-col gap-2">
          {FAQS.map((f, i) => (
            <div
              key={i}
              className="bg-white/[0.02] border border-white/[0.06] rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                className="w-full px-5 py-4.5 flex items-center justify-between bg-transparent border-none text-text-primary text-sm font-semibold cursor-pointer text-left gap-4"
              >
                {f.q}
                <span
                  className={`w-[26px] h-[26px] rounded-full flex items-center justify-center text-base shrink-0 transition-all duration-200 ${
                    openIdx === i
                      ? "bg-accent-orange/12 text-accent-orange rotate-45"
                      : "bg-white/[0.04] text-text-secondary/35"
                  }`}
                >
                  +
                </span>
              </button>
              {openIdx === i && (
                <div className="px-5 pb-4.5">
                  <p className="text-sm text-text-secondary/50 leading-relaxed">
                    {f.a}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
