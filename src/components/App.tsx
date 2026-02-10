import { useSnapshot } from "valtio"
import { AnimatePresence, motion } from "framer-motion"
import { SIZES, TOTAL_QTY } from "../data/tshirtCatalog"
import state from "../store"
import TShirtViewer from "./TShirtViewer"
import ColorPicker from "./ColorPicker"
import PrintOptions from "./PrintOptions"
import DesignUploader from "./DesignUploader"
import SizeBreakdown from "./SizeBreakdown"
import PriceSummary from "./PriceSummary"
import Section from "./ui/Section"

export default function App() {
  const snap = useSnapshot(state)

  const totalAllocated = SIZES.reduce((acc, s) => acc + snap.sizes[s], 0)
  const remaining = TOTAL_QTY - totalAllocated

  return (
    <div className="min-h-screen flex flex-col bg-surface-0">
      {/* Background removal processing overlay */}
      <AnimatePresence>
        {snap.bgProcessing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/30 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col items-center gap-3 bg-surface-1/95 border border-border rounded-2xl px-8 py-6 shadow-xl"
            >
              <svg className="animate-spin h-8 w-8 text-accent" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              <span className="text-sm font-semibold text-text-primary">Removing background…</span>
              <span className="text-xs text-text-muted">This may take a few seconds</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="shrink-0 px-6 py-3 border-b border-border-subtle flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold tracking-tight text-text-primary">
            100 Gildan SoftStyle&reg; T-Shirts
          </h1>
          <p className="text-xs text-text-muted mt-0.5">
            Package Deal &middot; Custom Print Configurator
          </p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-extrabold text-text-primary tracking-tight">
            ${(
              399 +
              (snap.backPrint !== "none" ? 2.5 * TOTAL_QTY : 0)
            ).toFixed(2)}
          </div>
          <div className="text-[10px] text-text-muted">incl. printing</div>
        </div>
      </header>

      {/* Main two-panel layout */}
      <div className="flex flex-1 min-h-0 flex-col lg:flex-row">
        {/* Left: 3D T-shirt viewer */}
        <div className="w-full lg:w-[55%] lg:max-w-[720px] h-[360px] sm:h-[420px] lg:h-auto lg:min-h-0 shrink-0 border-b lg:border-b-0 lg:border-r border-border-subtle">
          <TShirtViewer />
        </div>

        {/* Right: Configuration panel */}
        <div className="flex-1 min-w-0 overflow-y-auto bg-surface-0 p-5 lg:px-6 lg:py-4">
          <Section title="T-Shirt Color" number="01">
            <ColorPicker />
          </Section>

          <Section title="Print Location" number="02">
            <PrintOptions />
          </Section>

          <Section title="Upload Your Design" number="03">
            <DesignUploader />
          </Section>

          <Section title="Size Breakdown" number="04">
            <SizeBreakdown />
          </Section>

          <PriceSummary remaining={remaining} />
        </div>
      </div>
    </div>
  )
}
