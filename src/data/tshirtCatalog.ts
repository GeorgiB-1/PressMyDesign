// ─── T-Shirt Catalog ───────────────────────────────────────────
// Single source of truth for all product data.
// To add a new color:
//   1. Drop the .webp image in public/tshirts/
//   2. Add an entry below with the image path
// Colors without an `image` will be rendered by tinting the white base.

export interface TShirtColor {
  name: string
  slug: string
  hex: string
  image?: string // path relative to public/, e.g. "/tshirts/gi64000-white-c1.webp"
}

export const TSHIRT_COLORS: TShirtColor[] = [
  // ── Colors WITH product images ──
  { name: "White", slug: "white", hex: "#f5f5f5", image: "/tshirts/gi64000-white-c1.webp" },
  { name: "Charcoal", slug: "charcoal", hex: "#4e4e50", image: "/tshirts/gi64000-charcoal-c1.webp" },
  { name: "Red", slug: "red", hex: "#c41e3a", image: "/tshirts/gi64000-red-c1.webp" },
  { name: "Royal", slug: "royal", hex: "#2d3a8c", image: "/tshirts/gi64000-royal-c1.webp" },
  { name: "Purple", slug: "purple", hex: "#4a1a6b", image: "/tshirts/gi64000-purple-c1.webp" },
  { name: "Orange", slug: "orange", hex: "#e8601c", image: "/tshirts/gi64000-orange-c1.webp" },
  { name: "Light Blue", slug: "light_blue", hex: "#a8d5e2", image: "/tshirts/gi64000-light_blue-c1.webp" },
  { name: "Irish Green", slug: "irish_green", hex: "#00843d", image: "/tshirts/gi64000-irish_green-c1.webp" },
  { name: "Daisy", slug: "daisy", hex: "#f2c93d", image: "/tshirts/gi64000-daisy-c1.webp" },
  { name: "Sport Grey", slug: "sport_grey", hex: "#94979c", image: "/tshirts/gi64000-rs_sport_grey-c1.webp" },
  { name: "Military Green", slug: "military_green", hex: "#585c3b", image: "/tshirts/gi64000-military_green-a1_5ef94072-13c5-4697-bcaa-dd1cf563a73c.webp" },

  // ── Colors WITHOUT images (tinted from white base) ──
  { name: "Black", slug: "black", hex: "#1a1a1a" },
  { name: "Navy", slug: "navy", hex: "#1b2a4a" },
  { name: "Dark Heather", slug: "dark_heather", hex: "#414545" },
  { name: "Forest Green", slug: "forest_green", hex: "#1b4332" },
  { name: "Maroon", slug: "maroon", hex: "#5c1024" },
  { name: "Sand", slug: "sand", hex: "#c7b299" },
  { name: "Heliconia", slug: "heliconia", hex: "#e84b8a" },
  { name: "Sapphire", slug: "sapphire", hex: "#00508f" },
  { name: "Cardinal Red", slug: "cardinal_red", hex: "#8b1a1a" },
  { name: "Cherry Red", slug: "cherry_red", hex: "#c4233c" },
  { name: "Coral Silk", slug: "coral_silk", hex: "#f28a80" },
  { name: "Ice Grey", slug: "ice_grey", hex: "#c8c8c8" },
  { name: "Natural", slug: "natural", hex: "#f0ead6" },
]

// The white base image used for tinting colors that lack a dedicated photo
export const WHITE_BASE_IMAGE = "/tshirts/gi64000-white-c1.webp"

// ─── Sizes ──────────────────────────────────────────────────────
export const SIZES = ["S", "M", "L", "XL", "2XL", "3XL"] as const
export type Size = (typeof SIZES)[number]

// ─── Pricing ────────────────────────────────────────────────────
export const TOTAL_QTY = 100
export const BASE_PRICE = 399.0
export const BACK_PRINT_SURCHARGE_PER_SHIRT = 2.5

// ─── Print Zones ────────────────────────────────────────────────
// Coordinates as percentages of the image dimensions (0-100)
// These define where the user's design can be placed
export type PrintLocation = "none" | "left-chest" | "full-front" | "full-back"

export interface PrintZone {
  label: string
  // Bounding box as % of image: [x, y, width, height]
  bounds: { x: number; y: number; w: number; h: number }
}

export const PRINT_ZONES: Record<string, PrintZone> = {
  "left-chest": {
    label: "Left Chest",
    bounds: { x: 28, y: 28, w: 18, h: 18 },
  },
  "full-front": {
    label: "Full Front",
    bounds: { x: 25, y: 25, w: 50, h: 50 },
  },
  "full-back": {
    label: "Full Back",
    bounds: { x: 25, y: 25, w: 50, h: 50 },
  },
}
