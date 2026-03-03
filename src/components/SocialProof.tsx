const GALLERY = [
  { label: "Team Event", customer: "TechFlow Inc", qty: "200 tees", bg: "#1a1a1a", img: "/gallery/1.jpg" },
  { label: "Brand Merch", customer: "BrandLab Agency", qty: "150 tees", bg: "#1b2a4a", img: "/gallery/2.jpg" },
  { label: "Festival Crew", customer: "Coastal Events", qty: "500 tees", bg: "#1e5631", img: "/gallery/3.jpg" },
  { label: "Sports Team", customer: "Riverside FC", qty: "100 tees", bg: "#c0392b", img: "/gallery/4.jpg" },
  { label: "Startup Launch", customer: "NovaTech", qty: "250 tees", bg: "#7b2d8e", img: "/gallery/5.jpg" },
  { label: "Charity Run", customer: "RunForHope", qty: "300 tees", bg: "#e67e22", img: "/gallery/6.jpg" },
  { label: "University Club", customer: "UCLA Robotics", qty: "80 tees", bg: "#2471a3", img: "/gallery/7.jpg" },
  { label: "Wedding Party", customer: "The Johnsons", qty: "60 tees", bg: "#555", img: "/gallery/8.jpg" },
]

const STATS = [
  { val: "500+", label: "Orders Shipped", color: "#ff3d00" },
  { val: "100%", label: "Satisfaction Rate", color: "#22c55e" },
  { val: "7\u201310", label: "Day Turnaround", color: "#8b5cf6" },
  { val: "$0", label: "Setup & Shipping", color: "#fbbf24" },
]

const REVIEWS_PHOTO = [
  {
    quote:
      "We ordered 200 tees for our company retreat. Print quality was incredible \u2014 vibrant colours, soft feel. Everyone thought we paid double what we did.",
    name: "Marcus R.",
    role: "Ops Manager, TechFlow Inc",
    detail: "200 Black Tees \u00b7 Full Front Print",
    bg: "#1a1a1a",
    img: "/reviews/1.jpg",
  },
  {
    quote:
      "The AI mockup sold our client before we even ordered. They saw the design on a real model and approved immediately. Total game changer for approvals.",
    name: "Sarah K.",
    role: "Creative Director, BrandLab",
    detail: "150 Navy Tees \u00b7 Left Chest",
    bg: "#1b2a4a",
    img: "/reviews/2.jpg",
  },
  {
    quote:
      "$3.99 a shirt is insane. We switched from our old printer and saved over $400 on our last order. Same Gildan Softstyle quality, way less money.",
    name: "Jake T.",
    role: "Founder, Coastal Events Co",
    detail: "100 Red Tees \u00b7 Full Front Print",
    bg: "#c0392b",
    img: "/reviews/3.jpg",
  },
]

const REVIEWS_TEXT = [
  {
    quote:
      "Our nonprofit needed 300 shirts on a tight budget. PressMyDesign came through \u2014 $3.99 each, free shipping, and they arrived a day early. Will order again for our fall fundraiser.",
    name: "Diana L.",
    role: "Director, Hope Foundation",
    detail: "300 White Tees",
  },
  {
    quote:
      "I run a screen printing shop and even I use PressMyDesign for DTF jobs. Their quality is better than what I can produce in-house for small runs. No shame in outsourcing to the best.",
    name: "Chris M.",
    role: "Owner, InkWorks Studio",
    detail: "100 Charcoal Tees",
  },
  {
    quote:
      "Needed custom tees for my daughter's birthday party \u2014 25 shirts with her artwork on them. The mockup showed exactly how they'd look. Ordered Friday, had them Wednesday. Kids loved them.",
    name: "Rachel P.",
    role: "Happy Customer",
    detail: "25 Sand Tees",
  },
]

export default function SocialProof() {
  return (
    <section className="px-6 py-16 border-t border-white/[0.06]">
      <div className="max-w-[1100px] mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-[11px] uppercase tracking-[0.14em] text-accent-purple font-bold mb-2">
            Real Customers. Real Prints.
          </p>
          <h2 className="text-[28px] font-bold tracking-tight">
            Here's What Our Customers Are Printing
          </h2>
          <p className="text-sm text-text-secondary/40 mt-2 max-w-[480px] mx-auto">
            Every order printed with DTF technology on Gildan Softstyle tees. See
            the quality for yourself.
          </p>
        </div>

        {/* Photo gallery 2x4 */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-12">
          {GALLERY.map((p, i) => (
            <div
              key={i}
              className="rounded-[14px] overflow-hidden relative border border-white/[0.06] cursor-pointer transition-transform duration-300 hover:scale-[1.02]"
              style={{ aspectRatio: "4/5", background: p.bg }}
            >
              <img
                src={p.img}
                alt={p.label}
                className="absolute inset-0 w-full h-full object-cover"
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none" }}
              />
              <div
                className="absolute bottom-0 left-0 right-0 px-3.5 pb-3.5 pt-10"
                style={{
                  background:
                    "linear-gradient(transparent, rgba(0,0,0,0.85))",
                }}
              >
                <p className="text-[13px] font-bold text-white">{p.label}</p>
                <p className="text-[11px] text-white/50">
                  {p.customer} &middot; {p.qty}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 mb-12">
          {STATS.map((s, i) => (
            <div
              key={i}
              className="bg-white/[0.02] border border-white/[0.06] rounded-[14px] py-5 px-4 text-center"
            >
              <p
                className="text-[28px] font-bold tracking-tight"
                style={{ color: s.color }}
              >
                {s.val}
              </p>
              <p className="text-xs text-text-secondary/40 mt-0.5">
                {s.label}
              </p>
            </div>
          ))}
        </div>

        {/* Reviews header */}
        <div className="text-center mb-7">
          <p className="text-[11px] uppercase tracking-[0.14em] text-accent-orange font-bold mb-2">
            Customer Reviews
          </p>
          <h2 className="text-2xl font-bold tracking-tight">
            What People Are Saying
          </h2>
        </div>

        {/* Photo reviews */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          {REVIEWS_PHOTO.map((t, i) => (
            <div
              key={i}
              className="bg-white/[0.02] border border-white/[0.06] rounded-[14px] overflow-hidden"
            >
              <div
                className="w-full overflow-hidden"
                style={{ aspectRatio: "4/3", background: t.bg }}
              >
                <img
                  src={t.img}
                  alt={`${t.name} order`}
                  className="w-full h-full object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none" }}
                />
              </div>
              <div className="p-5">
                <p className="text-gold tracking-widest mb-2.5 text-sm">
                  ★★★★★
                </p>
                <p className="text-sm text-text-secondary/65 leading-relaxed italic mb-3.5">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-sm font-semibold">{t.name}</p>
                    <p className="text-xs text-text-secondary/35">{t.role}</p>
                  </div>
                  <span className="text-[10px] px-2.5 py-1 rounded-full font-semibold bg-accent-orange/[0.08] text-accent-orange/70 tracking-wide whitespace-nowrap">
                    {t.detail}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Text-only reviews */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {REVIEWS_TEXT.map((t, i) => (
            <div
              key={i}
              className="bg-white/[0.02] border border-white/[0.06] rounded-[14px] p-6"
            >
              <p className="text-gold tracking-widest mb-2.5 text-sm">
                ★★★★★
              </p>
              <p className="text-sm text-text-secondary/65 leading-relaxed italic mb-3.5">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-text-secondary/35">{t.role}</p>
                </div>
                <span className="text-[10px] px-2.5 py-1 rounded-full font-semibold bg-accent-purple/[0.08] text-accent-purple/60 tracking-wide whitespace-nowrap">
                  {t.detail}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
