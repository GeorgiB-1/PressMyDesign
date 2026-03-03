import { useSnapshot } from "valtio"
import { AnimatePresence, motion } from "framer-motion"
import state from "../store"
import StatusBanner from "./StatusBanner"
import WhatHappensNext from "./WhatHappensNext"
import TShirtViewer from "./TShirtViewer"
import ColorPicker from "./ColorPicker"
import PrintOptions from "./PrintOptions"
import DesignUploader from "./DesignUploader"
import RequestQuote from "./RequestQuote"
import Section from "./ui/Section"
import SocialProof from "./SocialProof"
import FAQ from "./FAQ"
import TrustBar from "./TrustBar"
import ShareSection from "./ShareSection"
import BottomCTA from "./BottomCTA"
import PageFooter from "./PageFooter"

export default function App() {
  const snap = useSnapshot(state)

  return (
    <div className="min-h-screen bg-surface-0">
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
              <svg
                className="animate-spin h-8 w-8 text-accent"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="3"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              <span className="text-sm font-semibold text-text-primary">
                Removing background…
                {snap.bgProgress > 0 && ` ${snap.bgProgress}%`}
              </span>
              <span className="text-xs text-text-muted">
                This may take a few seconds
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1. Status Banner */}
      <StatusBanner />

      {/* 2. What Happens Next */}
      <WhatHappensNext />

      {/* 3. Main Content: 3D Viewer + Configurator */}
      <section id="configurator" className="px-6 py-12">
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Left: 3D Shirt Preview (sticky on desktop) */}
          <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl overflow-hidden lg:sticky lg:top-6">
            <div className="aspect-square sm:aspect-[4/3] w-full">
              <TShirtViewer />
            </div>
          </div>

          {/* Right: Configurator */}
          <div className="flex flex-col gap-5">
            {/* 01 Colour */}
            <div className="bg-white/[0.02] border border-white/[0.06] rounded-[14px] p-6">
              <div className="flex items-center gap-2.5 mb-4">
                <span className="w-[26px] h-[26px] rounded-full bg-accent-purple/10 text-accent-purple flex items-center justify-center text-[11px] font-bold">
                  01
                </span>
                <h3 className="text-[15px] font-semibold">T-Shirt Colour</h3>
              </div>
              <ColorPicker />
            </div>

            {/* 02 Print Location */}
            <div className="bg-white/[0.02] border border-white/[0.06] rounded-[14px] p-6">
              <div className="flex items-center gap-2.5 mb-4">
                <span className="w-[26px] h-[26px] rounded-full bg-accent-purple/10 text-accent-purple flex items-center justify-center text-[11px] font-bold">
                  02
                </span>
                <h3 className="text-[15px] font-semibold">Print Location</h3>
              </div>
              <PrintOptions />
            </div>

            {/* 03 Upload */}
            <div className="bg-white/[0.02] border border-white/[0.06] rounded-[14px] p-6">
              <div className="flex items-center gap-2.5 mb-4">
                <span className="w-[26px] h-[26px] rounded-full bg-accent-purple/10 text-accent-purple flex items-center justify-center text-[11px] font-bold">
                  03
                </span>
                <h3 className="text-[15px] font-semibold">
                  Upload Your Design
                </h3>
              </div>
              <DesignUploader />
            </div>

            {/* 04 Quote */}
            <div className="bg-white/[0.02] border border-white/[0.06] rounded-[14px] p-6">
              <div className="flex items-center gap-2.5 mb-4">
                <span className="w-[26px] h-[26px] rounded-full bg-accent-purple/10 text-accent-purple flex items-center justify-center text-[11px] font-bold">
                  04
                </span>
                <h3 className="text-[15px] font-semibold">Get a Quote</h3>
              </div>
              <RequestQuote />
            </div>
          </div>
        </div>
      </section>

      {/* 4. Social Proof */}
      <SocialProof />

      {/* 5. FAQ */}
      <FAQ />

      {/* 6. Trust Bar */}
      <TrustBar />

      {/* 7. Share Section */}
      <ShareSection />

      {/* 8. Bottom CTA */}
      <BottomCTA />

      {/* 9. Footer */}
      <PageFooter />
    </div>
  )
}
