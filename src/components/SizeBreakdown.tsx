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

  return (
    <div>
      {/* Status bar */}
      <div className="flex items-center justify-between mb-3">
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

      {/* Size grid */}
      <div className="grid grid-cols-3 gap-2">
        {SIZES.map((size, i) => (
          <div
            key={size}
            className="bg-surface-1 border border-border rounded-xl p-3 text-center"
          >
            <div
              className="text-[10px] font-bold tracking-widest mb-1.5"
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
              className="w-full bg-surface-0 border border-border rounded-lg text-text-primary text-base font-bold text-center py-2 px-1 outline-none focus:border-accent/50 transition-colors"
            />
          </div>
        ))}
      </div>

      {/* Visual distribution bar */}
      <div className="mt-3 h-1.5 bg-surface-2 rounded-full overflow-hidden flex">
        {SIZES.map((size, i) => {
          const pct = (snap.sizes[size] / TOTAL_QTY) * 100
          return pct > 0 ? (
            <div
              key={size}
              style={{
                width: `${pct}%`,
                backgroundColor: SIZE_COLORS[i],
                transition: "width 0.3s ease",
              }}
            />
          ) : null
        })}
      </div>

      {/* Size legend */}
      <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2">
        {SIZES.map((size, i) =>
          snap.sizes[size] > 0 ? (
            <div key={size} className="flex items-center gap-1.5">
              <div
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: SIZE_COLORS[i] }}
              />
              <span className="text-[10px] text-text-muted">
                {size}: {snap.sizes[size]}
              </span>
            </div>
          ) : null,
        )}
      </div>
    </div>
  )
}
