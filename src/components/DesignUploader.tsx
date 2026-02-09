import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useSnapshot } from "valtio"
import state from "../store"

// ── Single upload zone (reused for front & back) ──────────────────

interface UploadZoneProps {
  label: string
  image: string | null
  fileName: string
  onFile: (file: File) => void
  onRemove: () => void
}

function UploadZone({ label, image, fileName, onFile, onRemove }: UploadZoneProps) {
  const [isDragOver, setIsDragOver] = useState(false)

  const openFilePicker = useCallback(() => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = "image/*,.pdf,.svg,.ai,.eps"
    input.onchange = () => {
      const file = input.files?.[0]
      if (file) onFile(file)
    }
    input.click()
  }, [onFile])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragOver(false)
      const file = e.dataTransfer.files?.[0]
      if (file) onFile(file)
    },
    [onFile],
  )

  return (
    <div>
      <label className="block text-[11px] font-semibold text-text-muted tracking-wide mb-1.5">
        {label}
      </label>
      <AnimatePresence mode="wait">
        {!image ? (
          <motion.div
            key="zone"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            onClick={openFilePicker}
            onDragOver={(e) => {
              e.preventDefault()
              setIsDragOver(true)
            }}
            onDragLeave={() => setIsDragOver(false)}
            onDrop={handleDrop}
            className={`flex flex-col items-center justify-center rounded-xl py-5 px-4 cursor-pointer transition-all duration-200 border-2 border-dashed ${
              isDragOver
                ? "border-accent/60 bg-accent/5"
                : "border-border hover:border-surface-3 bg-surface-1 hover:bg-surface-2"
            }`}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-text-muted mb-2"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            <span className="text-xs font-semibold text-text-secondary">
              Drop your design here
            </span>
            <span className="text-[10px] text-text-muted mt-0.5">
              PNG, JPG, SVG, PDF, AI, EPS
            </span>
          </motion.div>
        ) : (
          <motion.div
            key="preview"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="flex items-center gap-3 bg-surface-1 border border-border rounded-xl p-3"
          >
            <img
              src={image}
              alt="Design preview"
              className="w-12 h-12 object-contain rounded-lg bg-surface-2"
            />
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-text-secondary truncate">
                {fileName}
              </div>
              <div className="text-[11px] text-text-muted mt-0.5">Ready</div>
            </div>
            <button
              onClick={onRemove}
              className="shrink-0 w-8 h-8 flex items-center justify-center rounded-lg bg-surface-2 border border-border text-text-muted hover:text-danger hover:border-danger/30 transition-colors cursor-pointer"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ── Shared image-processing helper ────────────────────────────────

function processFile(
  file: File,
  setImage: (data: string) => void,
  setName: (name: string) => void,
) {
  const reader = new FileReader()
  reader.onload = (e) => {
    const result = e.target?.result
    if (typeof result !== "string") return

    const img = new Image()
    img.onload = () => {
      const MAX = 1024
      let { width, height } = img
      if (width > MAX || height > MAX) {
        const ratio = Math.min(MAX / width, MAX / height)
        width = Math.round(width * ratio)
        height = Math.round(height * ratio)
      }
      const canvas = document.createElement("canvas")
      canvas.width = width
      canvas.height = height
      const ctx = canvas.getContext("2d")!
      ctx.drawImage(img, 0, 0, width, height)
      setImage(canvas.toDataURL("image/png"))
      setName(file.name)
    }
    img.src = result
  }
  reader.readAsDataURL(file)
}

// ── Main component ────────────────────────────────────────────────

export default function DesignUploader() {
  const snap = useSnapshot(state)

  const handleFrontFile = useCallback((file: File) => {
    processFile(
      file,
      (data) => {
        state.frontDesignImage = data
        // Auto-select left-chest if no front print location set
        if (state.frontPrint === "none") {
          state.frontPrint = "left-chest"
        }
      },
      (name) => {
        state.frontDesignFileName = name
      },
    )
  }, [])

  const handleBackFile = useCallback((file: File) => {
    processFile(
      file,
      (data) => {
        state.backDesignImage = data
        // Auto-select full-back if no back print location set
        if (state.backPrint === "none") {
          state.backPrint = "full-back"
        }
      },
      (name) => {
        state.backDesignFileName = name
      },
    )
  }, [])

  const removeFront = () => {
    state.frontDesignImage = null
    state.frontDesignFileName = ""
  }

  const removeBack = () => {
    state.backDesignImage = null
    state.backDesignFileName = ""
  }

  const hasBackPrint = snap.backPrint === "full-back"
  const showBackUploader = hasBackPrint && !snap.useSameDesign

  return (
    <div className="flex flex-col gap-3">
      {/* "Same design" toggle — only relevant when back print is selected */}
      <AnimatePresence>
        {hasBackPrint && (
          <motion.label
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-2.5 cursor-pointer select-none group overflow-hidden"
          >
            <button
              type="button"
              role="switch"
              aria-checked={snap.useSameDesign}
              onClick={() => (state.useSameDesign = !state.useSameDesign)}
              className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full border transition-colors duration-200 cursor-pointer ${
                snap.useSameDesign
                  ? "bg-accent/80 border-accent/50"
                  : "bg-surface-2 border-border"
              }`}
            >
              <span
                className={`inline-block h-3.5 w-3.5 rounded-full bg-white shadow-sm transition-transform duration-200 ${
                  snap.useSameDesign ? "translate-x-[18px]" : "translate-x-[3px]"
                }`}
              />
            </button>
            <span className="text-xs text-text-secondary group-hover:text-text-primary transition-colors">
              Use same design for front &amp; back
            </span>
          </motion.label>
        )}
      </AnimatePresence>

      {/* Front design uploader */}
      <UploadZone
        label={showBackUploader ? "Front Design" : "Design"}
        image={snap.frontDesignImage}
        fileName={snap.frontDesignFileName}
        onFile={handleFrontFile}
        onRemove={removeFront}
      />

      {/* Back design uploader (only when back print selected + toggle off) */}
      <AnimatePresence>
        {showBackUploader && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <UploadZone
              label="Back Design"
              image={snap.backDesignImage}
              fileName={snap.backDesignFileName}
              onFile={handleBackFile}
              onRemove={removeBack}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
