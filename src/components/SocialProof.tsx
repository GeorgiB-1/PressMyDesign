const FEATURES = [
  {
    title: "Incredible Image Quality",
    desc: "Our custom T-shirts are printed with specially formulated inks that deliver deeper colors and a broader color gamut. We ensure precise color registration by adhering to G7 Color Standards, with weekly certification for near-perfect machine linearization.",
    img: "/gallery/1.webp",
    bg: "#1a1a1a",
  },
  {
    title: "Crisp Bright Whites",
    desc: "We use the brightest white ink in the industry, offering exceptional stretchability. Every design, whether it includes white or not, is underbased with white ink to prevent any dye migration.",
    img: "/gallery/2.jpg",
    bg: "#1b2a4a",
  },
  {
    title: "Super Fine Details",
    desc: "Our DTF prints are capable of capturing details as fine as 3 pixels, allowing us to accurately reproduce all design accents and small text, even if they're isolated from other parts of the design.",
    img: "/gallery/3.webp",
    bg: "#1e5631",
  },
  {
    title: "Beautiful Color Contrast",
    desc: "Vibrant colors and accurate color representation are crucial for our customers when ordering custom t-shirts. Our prints deliver vivid colors on any garment, regardless of the color combination.",
    img: "/gallery/4.webp",
    bg: "#7b2d8e",
  },
  {
    title: "Stretchability means Durability",
    desc: "The stretch test showcases the durability of our DTF transfers. You won't see any cracking when stretching them. We've subjected them to over 100 washes, with minimal degradation.",
    img: "/gallery/5.webp",
    bg: "#c0392b",
  },
]

const STATS = [
  { val: "3,000+", label: "Orders Shipped", color: "#ff3d00" },
  { val: "100%", label: "Satisfaction Rate", color: "#22c55e" },
  { val: "10\u201314", label: "Day Turnaround", color: "#8b5cf6" },
  { val: "$0", label: "Setup & Shipping", color: "#fbbf24" },
]

const REVIEWS_PHOTO = [
  {
    quote: "I love the T Shirts good quality my family love them too, wish had children sizes. We will be using for our next year for our Family Reunion. I referred a lot of people to your company.",
    img: "/reviews/1.avif",
    bg: "#1a1a1a",
  },
  {
    quote: "Amazing Quality for the price, can't believe it. Very happy with the band shirts I ordered, now putting in another order for business shirts.",
    img: "/reviews/2.avif",
    bg: "#1b2a4a",
  },
  {
    quote: "INCREDIBLE WORK! OUR SUMMER YOUTH PROGRAM IS A STAND OUT! WE WILL USE PRESS MY DESIGN AGAIN! VERY SATISFIED!",
    img: "/reviews/3.avif",
    bg: "#1e5631",
  },
  {
    quote: "Nice soft T-shirts. Printing looks great",
    img: "/reviews/4.avif",
    bg: "#c0392b",
  },
  {
    quote: "Amazing!!!!",
    img: "/reviews/5.avif",
    bg: "#7b2d8e",
  },
  {
    quote: "Incredibly fast and wonderful quality. I will definitely be using them again.",
    img: "/reviews/6.avif",
    bg: "#e67e22",
  },
  {
    quote: "The shirts and the quality are amazing 100% pleased",
    img: "/reviews/7.avif",
    bg: "#2471a3",
  },
  {
    quote: "I love the quality of their shirts. Soft Tshirts that don't shrink and you can't beat their pricing!!! My new place to shop for merchandise. \ud83d\udc4f\ud83c\udffd\ud83d\udc4f\ud83c\udffd\ud83d\udc4f\ud83c\udffd",
    img: "/reviews/8.avif",
    bg: "#555",
  },
]

const REVIEWS_TEXT = [
  {
    quote: "I like the design, it came out the exact way I wanted it to come I do like the t-shirts and how they feel, great job",
    name: "Sultann F.",
  },
  {
    quote: "I received my order and the shirts are of great quality. My logo is very vibrant and well done. You really can't beat this price!!!",
    name: "Billie W.",
  },
  {
    quote: "Shirts are nice and soft, print is crisp and delivery was quicker than I was told! I will be ordering again.",
    name: "Tracie C.",
  },
]

export default function SocialProof() {
  return (
    <section className="px-6 py-16 border-t border-white/[0.06]">
      <div className="max-w-[1100px] mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-[11px] uppercase tracking-[0.14em] text-accent-purple font-bold mb-2">
            Quality You Can See & Feel
          </p>
          <h2 className="text-[28px] font-bold tracking-tight">
            Why Choose Us?
          </h2>
          <p className="text-sm text-text-secondary/40 mt-2 max-w-[520px] mx-auto">
            Every order printed with DTF technology on Gildan Softstyle tees.
            Here's what sets our prints apart.
          </p>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {FEATURES.map((f, i) => (
            <div
              key={i}
              className={`bg-white/[0.02] border border-white/[0.06] rounded-[14px] overflow-hidden transition-transform duration-300 hover:scale-[1.02] ${
                i >= 3 ? "sm:col-span-1 lg:col-span-1" : ""
              }`}
            >
              <div
                className="w-full overflow-hidden"
                style={{ aspectRatio: "4/3", background: f.bg }}
              >
                <img
                  src={f.img}
                  alt={f.title}
                  className="w-full h-full object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none" }}
                />
              </div>
              <div className="p-5">
                <p className="text-[15px] font-bold text-text-primary mb-1.5">
                  {f.title}
                </p>
                <p className="text-[13px] text-text-secondary/50 leading-relaxed">
                  {f.desc}
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
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
                  alt="Customer review"
                  className="w-full h-full object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none" }}
                />
              </div>
              <div className="p-4">
                <p className="text-gold tracking-widest mb-2 text-sm">
                  ★★★★★
                </p>
                <p className="text-[13px] text-text-secondary/65 leading-relaxed italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
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
              <p className="text-sm font-semibold">&mdash; {t.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
