import { useSnapshot } from "valtio"
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
      {/* Header */}
      <header className="shrink-0 px-6 py-4 border-b border-border-subtle flex items-center justify-between">
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
        <div className="flex-1 lg:flex-[1.2] min-h-[400px] lg:min-h-0 border-b lg:border-b-0 lg:border-r border-border-subtle">
          <TShirtViewer />
        </div>

        {/* Right: Configuration panel */}
        <div className="flex-1 lg:max-w-[480px] overflow-y-auto bg-surface-0 p-6">
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
