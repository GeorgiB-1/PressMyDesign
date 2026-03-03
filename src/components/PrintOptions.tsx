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
    <div className="flex flex-col gap-2">
      {/* Front print */}
      <div>
        <label className="block text-[11px] font-semibold text-text-muted tracking-wide mb-1">
          Front Print
        </label>
        <div className="flex gap-1.5">
          {FRONT_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => (state.frontPrint = opt.value)}
              className={`flex-1 px-2.5 py-3 rounded-[10px] text-[13px] font-semibold transition-all duration-150 border-[1.5px] cursor-pointer text-center ${
                snap.frontPrint === opt.value
                  ? "bg-accent-purple/10 border-accent-purple text-text-primary"
                  : "bg-white/[0.03] border-white/[0.06] text-text-secondary/50 hover:text-text-primary"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Back print */}
      <div>
        <label className="block text-[11px] font-semibold text-text-muted tracking-wide mb-1">
          Back Print
        </label>
        <div className="flex gap-1.5">
          {BACK_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => {
                state.backPrint = opt.value
                state.useSameDesign = false
              }}
              className={`flex-1 px-2.5 py-3 rounded-[10px] text-[13px] font-semibold transition-all duration-150 border-[1.5px] cursor-pointer text-center ${
                snap.backPrint === opt.value
                  ? "bg-accent-purple/10 border-accent-purple text-text-primary"
                  : "bg-white/[0.03] border-white/[0.06] text-text-secondary/50 hover:text-text-primary"
              }`}
            >
              <span>{opt.label}</span>
              {opt.value === "full-back" && (
                <span className="block text-[11px] font-normal text-text-secondary/35 mt-0.5">
                  +${BACK_PRINT_SURCHARGE_PER_SHIRT.toFixed(2)}/ea
                </span>
              )}
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
