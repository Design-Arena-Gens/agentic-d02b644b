'use client'

import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import VoxelLens from './VoxelLens'

interface Scene3DProps {
  scrollProgress: number
  mousePosition: { x: number; y: number }
  activeSection: number
  serviceHoverColor?: string
}

export default function Scene3D({ 
  scrollProgress, 
  mousePosition, 
  activeSection,
  serviceHoverColor 
}: Scene3DProps) {
  return (
    <div className="canvas-container">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <VoxelLens 
            scrollProgress={scrollProgress}
            mousePosition={mousePosition}
            activeSection={activeSection}
            serviceHoverColor={serviceHoverColor}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}
