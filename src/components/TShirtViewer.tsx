import { Suspense } from "react"
import { useSnapshot } from "valtio"
import state from "../store"
import Scene from "./canvas/Scene"

export default function TShirtViewer() {
  const snap = useSnapshot(state)

  const activePrint =
    snap.frontPrint !== "none"
      ? snap.frontPrint
      : snap.backPrint !== "none"
        ? snap.backPrint
        : null

  return (
    <div className="relative w-full h-full bg-surface-1 overflow-hidden">
      {/* 3D Scene */}
      <Suspense
        fallback={
          <div className="w-full h-full flex items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
              <span className="text-xs text-text-muted">Loading 3D model...</span>
            </div>
          </div>
        }
      >
        <Scene />
      </Suspense>

      {/* Color badge */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-black/60 backdrop-blur-sm border border-white/10 rounded-lg px-3 py-1.5">
        <div
          className="w-3 h-3 rounded-full ring-1 ring-white/20"
          style={{ backgroundColor: snap.color }}
        />
        <span className="text-[11px] font-medium text-text-secondary">
          {snap.colorName}
        </span>
      </div>

      {/* Interaction hint */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20">
        <span className="text-[10px] font-semibold tracking-wider uppercase text-text-muted bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10">
          {activePrint
            ? snap.frontDesignImage || snap.backDesignImage
              ? "Drag to rotate · Scroll to zoom"
              : "Upload a design to preview"
            : "Drag to rotate · Select a print location"}
        </span>
      </div>
    </div>
  )
}
