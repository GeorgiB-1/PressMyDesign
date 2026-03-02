import { proxy } from "valtio"
import { TSHIRT_COLORS } from "../data/tshirtCatalog"
import type { PrintLocation } from "../data/tshirtCatalog"

// Read email from URL params on load
const params = new URLSearchParams(window.location.search)

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
  bgProgress: 0,

  // Quote form fields
  email: params.get("email") || "",
  quoteName: "",
  quoteNotes: "",

  // Quote submission state
  quoteSubmitted: false,
  quoteError: "",
})

export default state
