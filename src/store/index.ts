import { proxy } from "valtio"
import { TSHIRT_COLORS } from "../data/tshirtCatalog"
import type { PrintLocation, Size } from "../data/tshirtCatalog"

const state = proxy({
  // T-shirt color (hex)
  color: TSHIRT_COLORS[0].hex,
  colorName: TSHIRT_COLORS[0].name,
  colorSlug: TSHIRT_COLORS[0].slug,

  // Print locations
  frontPrint: "none" as PrintLocation,
  backPrint: "none" as PrintLocation,

  // Design uploads (separate front / back)
  frontDesignImage: null as string | null,
  frontDesignFileName: "",
  backDesignImage: null as string | null,
  backDesignFileName: "",
  useSameDesign: false, // when true, back uses the front design

  // Background removal processing state (drives global overlay)
  bgProcessing: false,

  // Size breakdown
  sizes: {
    S: 0,
    M: 0,
    L: 25,
    XL: 50,
    "2XL": 25,
    "3XL": 0,
  } as Record<Size, number>,
})

export default state
