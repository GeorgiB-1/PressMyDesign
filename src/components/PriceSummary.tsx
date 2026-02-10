import { useSnapshot } from "valtio"
import state from "../store"
import {
  BASE_PRICE,
  BACK_PRINT_SURCHARGE_PER_SHIRT,
  TOTAL_QTY,
} from "../data/tshirtCatalog"

interface PriceSummaryProps {
  remaining: number
}

export default function PriceSummary({ remaining }: PriceSummaryProps) {
  const snap = useSnapshot(state)

  const backSurcharge =
    snap.backPrint !== "none" ? BACK_PRINT_SURCHARGE_PER_SHIRT * TOTAL_QTY : 0
  const total = BASE_PRICE + backSurcharge
  const perShirt = total / TOTAL_QTY
  const canOrder = remaining === 0

  return (
    <div className="mt-4">
      {/* Price breakdown card */}
      <div className="bg-surface-1 border border-border rounded-xl px-4 py-3">
        <div className="flex justify-between text-xs text-text-secondary">
          <span>Base Price ({TOTAL_QTY} shirts)</span>
          <span>${BASE_PRICE.toFixed(2)}</span>
        </div>

        {backSurcharge > 0 && (
          <div className="flex justify-between text-xs text-text-secondary mt-1">
            <span>Back Print Surcharge</span>
            <span>+${backSurcharge.toFixed(2)}</span>
          </div>
        )}

        <div className="border-t border-border pt-2 mt-2 flex justify-between items-baseline">
          <span className="text-sm font-bold text-text-primary">Total</span>
          <div className="text-right">
            <span className="text-xl font-extrabold text-text-primary tracking-tight">
              ${total.toFixed(2)}
            </span>
            <div className="text-[10px] text-text-muted">
              ${perShirt.toFixed(2)} per shirt
            </div>
          </div>
        </div>
      </div>

      {/* CTA button */}
      <button
        disabled={!canOrder}
        className={`w-full mt-3 py-3 rounded-xl text-sm font-extrabold uppercase tracking-wide transition-all duration-200 cursor-pointer ${
          canOrder
            ? "bg-text-primary text-surface-0 hover:bg-white/90 active:scale-[0.99]"
            : "bg-surface-3 text-text-muted cursor-not-allowed"
        }`}
      >
        {canOrder
          ? "Add to Cart"
          : `Allocate all ${TOTAL_QTY} sizes to continue`}
      </button>

      <p className="text-[10px] text-text-muted text-center mt-2 leading-relaxed">
        Free shipping &middot; Free digital proof &middot; 100% quality
        guaranteed
      </p>
    </div>
  )
}
