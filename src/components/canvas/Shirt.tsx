import { useState, useEffect, useRef, useCallback } from "react"
import { useSnapshot } from "valtio"
import { useFrame, useThree } from "@react-three/fiber"
import { Decal, useGLTF } from "@react-three/drei"
import { easing } from "maath"
import { TextureLoader, SRGBColorSpace, LinearFilter } from "three"
import type { Texture } from "three"
import state from "../../store"

/** Imperatively load a texture from a data-URL (no Suspense). */
function useImperativeTexture(src: string | null) {
  const { gl } = useThree()
  const [texture, setTexture] = useState<Texture | null>(null)
  const loaderRef = useRef(new TextureLoader())

  const configure = useCallback(
    (tex: Texture) => {
      tex.colorSpace = SRGBColorSpace
      tex.minFilter = LinearFilter
      tex.anisotropy = gl.capabilities.getMaxAnisotropy()
      tex.needsUpdate = true
    },
    [gl],
  )

  useEffect(() => {
    if (!src) {
      setTexture((prev) => {
        prev?.dispose()
        return null
      })
      return
    }

    loaderRef.current.load(
      src,
      (tex) => {
        configure(tex)
        setTexture(tex)
      },
      undefined,
      (err) => {
        console.error("Failed to load design texture:", err)
        setTexture(null)
      },
    )

    return () => {
      setTexture((prev) => {
        prev?.dispose()
        return null
      })
    }
  }, [src, configure])

  return texture
}

export default function Shirt() {
  const snap = useSnapshot(state)
  const { nodes, materials } = useGLTF("/models/shirt.glb") as any

  // Resolve which image each side should use
  const frontSrc = snap.frontDesignImage
  const backSrc = snap.useSameDesign ? snap.frontDesignImage : snap.backDesignImage

  const frontTexture = useImperativeTexture(frontSrc)
  const backTexture = useImperativeTexture(backSrc)

  useFrame((_s, delta) => {
    if (materials.lambert1) {
      easing.dampC(materials.lambert1.color, snap.color, 0.25, delta)
    }
  })

  const showFront = snap.frontPrint !== "none" && !!frontTexture
  const showBack = snap.backPrint !== "none" && !!backTexture

  const frontProps =
    snap.frontPrint === "left-chest"
      ? { position: [-0.08, 0.06, 0.13] as [number, number, number], scale: 0.08 }
      : { position: [0, 0.02, 0.14] as [number, number, number], scale: 0.18 }

  const backProps = {
    position: [0, 0.02, -0.12] as [number, number, number],
    rotation: [0, Math.PI, 0] as [number, number, number],
    scale: 0.18,
  }

  return (
    <mesh
      castShadow
      geometry={nodes.T_Shirt_male.geometry}
      material={materials.lambert1}
      material-roughness={1}
      dispose={null}
    >
      {showFront && (
        <Decal
          position={frontProps.position}
          rotation={[0, 0, 0]}
          scale={frontProps.scale}
        >
          <meshPhysicalMaterial
            map={frontTexture}
            transparent
            polygonOffset
            polygonOffsetFactor={-1}
            roughness={0.85}
            metalness={0}
            clearcoat={0.05}
          />
        </Decal>
      )}
      {showBack && (
        <Decal
          position={backProps.position}
          rotation={backProps.rotation}
          scale={backProps.scale}
        >
          <meshPhysicalMaterial
            map={backTexture}
            transparent
            polygonOffset
            polygonOffsetFactor={-1}
            roughness={0.85}
            metalness={0}
            clearcoat={0.05}
          />
        </Decal>
      )}
    </mesh>
  )
}

useGLTF.preload("/models/shirt.glb")
