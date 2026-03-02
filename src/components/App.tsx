import { useSnapshot } from "valtio"
import { AnimatePresence, motion } from "framer-motion"
import state from "../store"
import TShirtViewer from "./TShirtViewer"
import ColorPicker from "./ColorPicker"
import PrintOptions from "./PrintOptions"
import DesignUploader from "./DesignUploader"
import RequestQuote from "./RequestQuote"
import Section from "./ui/Section"

export default function App() {
  const snap = useSnapshot(state)

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
              <span className="text-sm font-semibold text-text-primary">
                Removing background…{snap.bgProgress > 0 && ` ${snap.bgProgress}%`}
              </span>
              <span className="text-xs text-text-muted">This may take a few seconds</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero banner */}
      <motion.header
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="shrink-0 px-6 py-5 bg-gradient-to-r from-accent/15 via-accent/5 to-transparent border-b border-accent/10"
      >
        <h1 className="text-lg sm:text-xl font-extrabold tracking-tight text-text-primary">
          Your AI mockup is being generated!
        </h1>
        <p className="text-xs sm:text-sm text-text-secondary mt-1.5 max-w-xl leading-relaxed">
          Check your inbox shortly to see your design on a real model. While you
          wait — upload your design below to see it in 3D, try different shirt
          colours, and get instant pricing for your order.
        </p>
      </motion.header>

      {/* Main two-panel layout */}
      <div className="flex flex-1 min-h-0 flex-col lg:flex-row">
        {/* Left: 3D T-shirt viewer */}
        <div className="w-full lg:w-[55%] lg:max-w-[720px] h-[360px] sm:h-[420px] lg:h-auto lg:min-h-0 shrink-0 border-b lg:border-b-0 lg:border-r border-border-subtle">
          <TShirtViewer />
        </div>

        {/* Right: Configuration panel */}
        <div className="flex-1 min-w-0 overflow-y-auto bg-surface-0 p-5 lg:px-6 lg:py-4">
          <Section title="T-Shirt Colour" number="01">
            <ColorPicker />
          </Section>

          <Section title="Print Location" number="02">
            <PrintOptions />
          </Section>

          <Section title="Upload Your Design" number="03">
            <DesignUploader />
          </Section>

          <Section title="Get a Quote" number="04">
            <RequestQuote />
          </Section>
        </div>
      </div>
    </div>
  )
}
