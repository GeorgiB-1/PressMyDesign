import { useState } from "react"
import { useSnapshot } from "valtio"
import { motion, AnimatePresence } from "framer-motion"
import state from "../store"
import {
  BASE_PRICE,
  BACK_PRINT_SURCHARGE_PER_SHIRT,
  TOTAL_QTY,
} from "../data/tshirtCatalog"

const QUOTE_WEBHOOK_URL = "https://hook.us2.make.com/PLACEHOLDER"

export default function RequestQuote() {
  const snap = useSnapshot(state)
  const [submitting, setSubmitting] = useState(false)

  const backSurcharge =
    snap.backPrint !== "none" ? BACK_PRINT_SURCHARGE_PER_SHIRT * TOTAL_QTY : 0
  const total = BASE_PRICE + backSurcharge
  const perShirt = total / TOTAL_QTY

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!snap.email.trim()) return

    setSubmitting(true)
    state.quoteError = ""

    try {
      const res = await fetch(QUOTE_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: snap.email,
          name: snap.quoteName,
          notes: snap.quoteNotes,
          color: snap.color,
          colorName: snap.colorName,
          frontPrint: snap.frontPrint,
          backPrint: snap.backPrint,
          hasDesign: !!(snap.frontDesignImage || snap.backDesignImage),
          totalPrice: total,
        }),
      })

      if (!res.ok) throw new Error(`Request failed (${res.status})`)
      state.quoteSubmitted = true
    } catch (err) {
      state.quoteError =
        err instanceof Error ? err.message : "Something went wrong"
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="mt-4">
      {/* Pricing card */}
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
            <span className="text-2xl font-extrabold text-accent-orange tracking-tight">
              ${total.toFixed(2)}
            </span>
            <div className="text-[10px] text-text-muted">
              ${perShirt.toFixed(2)} per shirt
            </div>
          </div>
        </div>
      </div>

      {/* Quote form / success state */}
      <AnimatePresence mode="wait">
        {snap.quoteSubmitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-4 bg-success/10 border border-success/20 rounded-xl px-4 py-5 text-center"
          >
            <div className="text-2xl mb-1">&#10003;</div>
            <p className="text-sm font-bold text-success">
              Quote requested!
            </p>
            <p className="text-xs text-text-secondary mt-1">
              We'll be in touch soon.
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            className="mt-4 flex flex-col gap-2.5"
          >
            {/* Email */}
            <input
              type="email"
              required
              placeholder="Email address *"
              value={snap.email}
              onChange={(e) => (state.email = e.target.value)}
              className="w-full bg-surface-1 border border-border rounded-lg text-text-primary text-sm px-3 py-2.5 outline-none focus:border-accent/50 transition-colors placeholder:text-text-muted"
            />

            {/* Name */}
            <input
              type="text"
              placeholder="Your name (optional)"
              value={snap.quoteName}
              onChange={(e) => (state.quoteName = e.target.value)}
              className="w-full bg-surface-1 border border-border rounded-lg text-text-primary text-sm px-3 py-2.5 outline-none focus:border-accent/50 transition-colors placeholder:text-text-muted"
            />

            {/* Notes */}
            <textarea
              rows={3}
              placeholder="How many shirts? Any special requirements?"
              value={snap.quoteNotes}
              onChange={(e) => (state.quoteNotes = e.target.value)}
              className="w-full bg-surface-1 border border-border rounded-lg text-text-primary text-sm px-3 py-2.5 outline-none focus:border-accent/50 transition-colors placeholder:text-text-muted resize-none"
            />

            {/* Error message */}
            {snap.quoteError && (
              <p className="text-xs text-danger font-medium">
                {snap.quoteError} — please try again.
              </p>
            )}

            {/* Submit button */}
            <button
              type="submit"
              disabled={submitting || !snap.email.trim()}
              className={`w-full py-3.5 rounded-xl text-sm font-extrabold uppercase tracking-widest transition-all duration-200 cursor-pointer ${
                submitting || !snap.email.trim()
                  ? "bg-surface-3 text-text-muted cursor-not-allowed"
                  : "bg-accent-orange text-white hover:brightness-110 active:scale-[0.99] shadow-[0_4px_24px_rgba(255,61,0,0.25)]"
              }`}
              style={
                !submitting && snap.email.trim()
                  ? {
                      background:
                        "linear-gradient(135deg, #ff3d00, #e63500)",
                    }
                  : undefined
              }
            >
              {submitting ? "Sending…" : "Request Quote"}
            </button>

            <p className="text-[10px] text-text-muted text-center leading-relaxed">
              Free digital proof &middot; No obligation &middot; We'll reply
              within 24 hours
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}
