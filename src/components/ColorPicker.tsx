import { motion } from "framer-motion"
import { useSnapshot } from "valtio"
import { TSHIRT_COLORS } from "../data/tshirtCatalog"
import type { TShirtColor } from "../data/tshirtCatalog"
import state from "../store"

export default function ColorPicker() {
  const snap = useSnapshot(state)

  const handleSelect = (c: TShirtColor) => {
    state.color = c.hex
    state.colorName = c.name
    state.colorSlug = c.slug
  }

  return (
    <div className="flex flex-wrap gap-[7px]">
      {TSHIRT_COLORS.map((c) => {
        const isSelected = snap.colorSlug === c.slug
        const isLight = isLightColor(c.hex)

        return (
          <motion.button
            key={c.slug}
            title={c.name}
            onClick={() => handleSelect(c)}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
            className="relative w-9 h-9 rounded-full cursor-pointer transition-shadow duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            style={{
              backgroundColor: c.hex,
              border: isSelected
                ? "3px solid #ff3d00"
                : isLight
                  ? "3px solid rgba(255,255,255,0.15)"
                  : "3px solid transparent",
              boxShadow: isSelected
                ? "0 0 0 3px rgba(255,61,0,0.15)"
                : "none",
            }}
          >
            {isSelected && (
              <span className="absolute inset-0 flex items-center justify-center text-[11px] font-extrabold"
                style={{
                  color: isLight ? "#ff3d00" : "#fff",
                  textShadow: !isLight ? "0 1px 2px rgba(0,0,0,0.6)" : "none",
                }}
              >
                &#10003;
              </span>
            )}
          </motion.button>
        )
      })}
    </div>
  )
}

function isLightColor(hex: string): boolean {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return (r * 299 + g * 587 + b * 114) / 1000 > 180
}
