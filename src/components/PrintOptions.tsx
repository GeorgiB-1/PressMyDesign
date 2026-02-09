import { useSnapshot } from "valtio"
import state from "../store"
import type { PrintLocation } from "../data/tshirtCatalog"
import { BACK_PRINT_SURCHARGE_PER_SHIRT, TOTAL_QTY } from "../data/tshirtCatalog"

const FRONT_OPTIONS: { value: PrintLocation; label: string }[] = [
  { value: "none", label: "No Front Print" },
  { value: "left-chest", label: "Left Chest" },
  { value: "full-front", label: "Full Front Print" },
]

const BACK_OPTIONS: { value: PrintLocation; label: string }[] = [
  { value: "none", label: "No Back Print" },
  { value: "full-back", label: "Full Back Print" },
]

export default function PrintOptions() {
  const snap = useSnapshot(state)
  const surchargeTotal = BACK_PRINT_SURCHARGE_PER_SHIRT * TOTAL_QTY

  return (
    <div className="flex flex-col gap-3">
      {/* Front print */}
      <div>
        <label className="block text-[11px] font-semibold text-text-muted tracking-wide mb-1.5">
          Front Print
        </label>
        <div className="flex gap-2">
          {FRONT_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => (state.frontPrint = opt.value)}
              className={`flex-1 px-3 py-2.5 rounded-lg text-xs font-medium transition-all duration-150 border cursor-pointer ${
                snap.frontPrint === opt.value
                  ? "bg-accent/15 border-accent/50 text-text-primary"
                  : "bg-surface-2 border-border text-text-secondary hover:border-surface-3 hover:text-text-primary"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Back print */}
      <div>
        <label className="block text-[11px] font-semibold text-text-muted tracking-wide mb-1.5">
          Back Print
        </label>
        <div className="flex gap-2">
          {BACK_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => {
                state.backPrint = opt.value
                state.useSameDesign = false
              }}
              className={`flex-1 px-3 py-2.5 rounded-lg text-xs font-medium transition-all duration-150 border cursor-pointer ${
                snap.backPrint === opt.value
                  ? "bg-accent/15 border-accent/50 text-text-primary"
                  : "bg-surface-2 border-border text-text-secondary hover:border-surface-3 hover:text-text-primary"
              }`}
            >
              {opt.value === "full-back"
                ? `${opt.label} (+$${BACK_PRINT_SURCHARGE_PER_SHIRT.toFixed(2)}/ea)`
                : opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Surcharge notice */}
      {snap.backPrint !== "none" && (
        <div className="text-[11px] text-warning bg-warning/10 border border-warning/20 rounded-lg px-3 py-2">
          Back print adds <strong>${surchargeTotal.toFixed(2)}</strong> to your
          order ({TOTAL_QTY} x ${BACK_PRINT_SURCHARGE_PER_SHIRT.toFixed(2)})
        </div>
      )}
    </div>
  )
}
