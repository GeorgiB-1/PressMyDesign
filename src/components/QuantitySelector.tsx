import { useState } from "react"
import { useSnapshot } from "valtio"
import state from "../store"
import { MIN_QTY, QTY_PRESETS } from "../data/tshirtCatalog"

export default function QuantitySelector() {
  const snap = useSnapshot(state)
  const [customMode, setCustomMode] = useState(false)
  const [customValue, setCustomValue] = useState("")

  const isPreset = QTY_PRESETS.includes(snap.quantity as (typeof QTY_PRESETS)[number])

  const handlePresetClick = (qty: number) => {
    state.quantity = qty
    setCustomMode(false)
    setCustomValue("")
  }

  const handleCustomToggle = () => {
    setCustomMode(true)
    setCustomValue(isPreset ? "" : String(snap.quantity))
  }

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "")
    setCustomValue(raw)
    const num = parseInt(raw, 10)
    if (!isNaN(num) && num >= MIN_QTY) {
      state.quantity = num
    }
  }

  const handleCustomBlur = () => {
    const num = parseInt(customValue, 10)
    if (isNaN(num) || num < MIN_QTY) {
      state.quantity = MIN_QTY
      setCustomValue(String(MIN_QTY))
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap gap-2">
        {QTY_PRESETS.map((qty) => (
          <button
            key={qty}
            onClick={() => handlePresetClick(qty)}
            className={`px-4 py-2.5 rounded-[10px] text-[13px] font-semibold transition-all duration-150 border-[1.5px] cursor-pointer ${
              snap.quantity === qty && !customMode
                ? "bg-accent-purple/10 border-accent-purple text-text-primary"
                : "bg-white/[0.03] border-white/[0.06] text-text-secondary/50 hover:text-text-primary"
            }`}
          >
            {qty}
          </button>
        ))}
        <button
          onClick={handleCustomToggle}
          className={`px-4 py-2.5 rounded-[10px] text-[13px] font-semibold transition-all duration-150 border-[1.5px] cursor-pointer ${
            customMode || (!isPreset && !customMode)
              ? "bg-accent-purple/10 border-accent-purple text-text-primary"
              : "bg-white/[0.03] border-white/[0.06] text-text-secondary/50 hover:text-text-primary"
          }`}
        >
          Custom
        </button>
      </div>

      {customMode && (
        <div className="flex items-center gap-2">
          <input
            type="text"
            inputMode="numeric"
            placeholder={`Min ${MIN_QTY}`}
            value={customValue}
            onChange={handleCustomChange}
            onBlur={handleCustomBlur}
            autoFocus
            className="w-32 bg-surface-1 border border-border rounded-lg text-text-primary text-sm px-3 py-2.5 outline-none focus:border-accent-purple/50 transition-colors placeholder:text-text-muted"
          />
          <span className="text-xs text-text-muted">shirts (min {MIN_QTY})</span>
        </div>
      )}

      <p className="text-[11px] text-text-muted">
        Selected: <strong className="text-text-secondary">{snap.quantity} shirts</strong>
        {" "}&middot; Pricing gets better at higher volumes
      </p>
    </div>
  )
}
