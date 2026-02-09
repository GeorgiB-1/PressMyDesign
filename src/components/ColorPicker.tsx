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
    <div className="flex flex-wrap gap-1.5">
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
            className="relative w-8 h-8 rounded-full cursor-pointer transition-shadow duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            style={{
              backgroundColor: c.hex,
              border: isSelected
                ? "2.5px solid #fff"
                : isLight
                  ? "1.5px solid rgba(255,255,255,0.15)"
                  : "1.5px solid transparent",
              boxShadow: isSelected
                ? `0 0 0 2px #09090b, 0 0 16px ${c.hex}66`
                : "none",
            }}
          >
            {isSelected && (
              <motion.div
                layoutId="color-indicator"
                className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white"
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              />
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
