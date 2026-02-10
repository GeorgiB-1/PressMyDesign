import { useSnapshot } from "valtio"
import { SIZES, TOTAL_QTY } from "../data/tshirtCatalog"
import type { Size } from "../data/tshirtCatalog"
import state from "../store"

const SIZE_COLORS = [
  "#6366f1", // S - indigo
  "#8b5cf6", // M - violet
  "#ec4899", // L - pink
  "#f97316", // XL - orange
  "#22c55e", // 2XL - green
  "#eab308", // 3XL - yellow
]

export default function SizeBreakdown() {
  const snap = useSnapshot(state)

  const totalAllocated = SIZES.reduce((acc, s) => acc + snap.sizes[s], 0)
  const remaining = TOTAL_QTY - totalAllocated

  const handleChange = (size: Size, value: string) => {
    state.sizes[size] = Math.max(0, parseInt(value) || 0)
  }

  const allocated = SIZES.map((size, i) => ({
    size,
    qty: snap.sizes[size],
    color: SIZE_COLORS[i],
    pct: (snap.sizes[size] / TOTAL_QTY) * 100,
  })).filter((s) => s.qty > 0)

  return (
    <div>
      {/* Status bar */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-text-secondary">
          Distribute{" "}
          <strong className="text-text-primary">{TOTAL_QTY}</strong> shirts
        </span>
        <span
          className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${
            remaining === 0
              ? "text-success bg-success/10 border-success/20"
              : remaining < 0
                ? "text-danger bg-danger/10 border-danger/20"
                : "text-warning bg-warning/10 border-warning/20"
          }`}
        >
          {remaining === 0
            ? "Complete"
            : remaining > 0
              ? `${remaining} left`
              : `${Math.abs(remaining)} over`}
        </span>
      </div>

      {/* Size input row — compact inline */}
      <div className="grid grid-cols-6 gap-1.5">
        {SIZES.map((size, i) => (
          <div key={size} className="text-center">
            <div
              className="text-[10px] font-bold tracking-wide mb-1"
              style={{ color: SIZE_COLORS[i] }}
            >
              {size}
            </div>
            <input
              type="number"
              min="0"
              max={TOTAL_QTY}
              value={snap.sizes[size]}
              onChange={(e) => handleChange(size, e.target.value)}
              className="w-full bg-surface-1 border border-border rounded-lg text-text-primary text-sm font-bold text-center py-1.5 px-0.5 outline-none focus:border-accent/50 transition-colors"
            />
          </div>
        ))}
      </div>

      {/* Distribution bar — tall with labels */}
      {allocated.length > 0 && (
        <div className="mt-2.5 h-8 bg-surface-2 rounded-lg overflow-hidden flex">
          {allocated.map((s) => (
            <div
              key={s.size}
              className="flex items-center justify-center overflow-hidden"
              style={{
                width: `${s.pct}%`,
                backgroundColor: s.color,
                transition: "width 0.3s ease",
                minWidth: s.pct > 0 ? "2px" : 0,
              }}
            >
              {s.pct >= 12 && (
                <span className="text-[11px] font-bold text-white drop-shadow-sm whitespace-nowrap px-1">
                  {s.qty}× {s.size}
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Chip summary below bar for smaller segments */}
      {allocated.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-2">
          {allocated.map((s) => (
            <div
              key={s.size}
              className="flex items-center gap-1.5 px-2 py-0.5 rounded-md text-xs font-semibold"
              style={{
                backgroundColor: s.color + "1a",
                color: s.color,
                border: `1px solid ${s.color}33`,
              }}
            >
              <span>{s.size}</span>
              <span className="opacity-70">×</span>
              <span>{s.qty}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
