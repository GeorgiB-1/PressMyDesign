import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Center, OrbitControls } from "@react-three/drei"
import type { DirectionalLight } from "three"
import Shirt from "./Shirt"

/**
 * Key light + fill light that follow the camera position each frame.
 * This ensures whichever side of the shirt faces the viewer is always
 * well-lit, like a photography studio rig that orbits with the camera.
 */
function CameraTrackingLights() {
  const keyLightRef = useRef<DirectionalLight>(null)
  const fillLightRef = useRef<DirectionalLight>(null)
  const rimLightRef = useRef<DirectionalLight>(null)

  useFrame(({ camera }) => {
    if (keyLightRef.current) {
      // Key light: slightly above and to the right of camera
      keyLightRef.current.position.copy(camera.position)
      keyLightRef.current.position.y += 1.5
      keyLightRef.current.position.x += 0.8
    }
    if (fillLightRef.current) {
      // Fill light: slightly to the left of camera, softer
      fillLightRef.current.position.copy(camera.position)
      fillLightRef.current.position.y += 0.5
      fillLightRef.current.position.x -= 1.2
    }
    if (rimLightRef.current) {
      // Rim light: behind the shirt relative to camera (opposite direction)
      rimLightRef.current.position.set(
        -camera.position.x * 0.5,
        camera.position.y + 1,
        -camera.position.z * 0.5,
      )
    }
  })

  return (
    <>
      <directionalLight ref={keyLightRef} intensity={1.3} />
      <directionalLight ref={fillLightRef} intensity={0.5} color="#b0c4de" />
      <directionalLight ref={rimLightRef} intensity={0.4} />
    </>
  )
}

export default function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 2.8], fov: 30 }}
      gl={{ preserveDrawingBuffer: true, antialias: true, powerPreference: "default" }}
      className="w-full h-full"
      style={{ background: "transparent" }}
    >
      {/* Soft base ambient so no side is ever fully dark */}
      <ambientLight intensity={0.6} />

      {/* Lights that orbit with the camera */}
      <CameraTrackingLights />

      <OrbitControls
        enablePan={false}
        enableZoom={true}
        minDistance={1.5}
        maxDistance={4}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={(Math.PI * 3) / 4}
        autoRotate
        autoRotateSpeed={0.5}
      />

      <Center>
        <Shirt />
      </Center>
    </Canvas>
  )
}
