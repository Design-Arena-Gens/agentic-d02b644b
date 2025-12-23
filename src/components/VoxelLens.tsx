'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface VoxelLensProps {
  scrollProgress: number
  mousePosition: { x: number; y: number }
  activeSection: number
  serviceHoverColor?: string
}

export default function VoxelLens({ 
  scrollProgress, 
  mousePosition, 
  activeSection,
  serviceHoverColor 
}: VoxelLensProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const particlesRef = useRef<THREE.Points>(null)
  const glowRef = useRef<THREE.Mesh>(null)
  
  // Create particle geometry for dissolution effect
  const particleCount = 500
  const particlePositions = useMemo(() => {
    const positions = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 4
      positions[i * 3 + 1] = (Math.random() - 0.5) * 4
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4
    }
    return positions
  }, [])

  // Base color - electric orange
  const baseColor = new THREE.Color('#ff3300')
  const terracottaColor = new THREE.Color('#d97d54')
  const taupeColor = new THREE.Color('#a89085')
  
  useFrame((state) => {
    if (!meshRef.current) return
    
    const time = state.clock.getElapsedTime()
    
    // Pulsing heartbeat effect in hero section
    if (activeSection === 0) {
      const pulse = Math.sin(time * 2) * 0.1 + 1
      meshRef.current.scale.setScalar(pulse)
      meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, 0, 0.05)
      meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, 0, 0.05)
    }
    
    // Move to right and transform to aperture in services section
    if (activeSection === 1) {
      meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, 3, 0.03)
      meshRef.current.rotation.z += 0.01
      meshRef.current.scale.setScalar(THREE.MathUtils.lerp(meshRef.current.scale.x, 0.8, 0.05))
    }
    
    // Dissolve into particles for process section
    if (activeSection === 2) {
      meshRef.current.scale.setScalar(THREE.MathUtils.lerp(meshRef.current.scale.x, 0.3, 0.02))
      if (particlesRef.current) {
        particlesRef.current.visible = true
        particlesRef.current.rotation.y += 0.002
      }
    } else {
      if (particlesRef.current) {
        particlesRef.current.visible = false
      }
    }
    
    // Reform into V logo for CTA section with magnetic effect
    if (activeSection === 3 || activeSection === 4) {
      const targetX = mousePosition.x * 2
      const targetY = mousePosition.y * 2
      meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX, 0.08)
      meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, 0.08)
      meshRef.current.scale.setScalar(THREE.MathUtils.lerp(meshRef.current.scale.x, 1.2, 0.05))
    }
    
    // Apply service hover color
    if (serviceHoverColor && meshRef.current.material) {
      const mat = meshRef.current.material as THREE.MeshStandardMaterial
      mat.emissive.lerp(new THREE.Color(serviceHoverColor), 0.1)
    }
    
    // Constant slow rotation
    meshRef.current.rotation.x += 0.003
    meshRef.current.rotation.y += 0.005
    
    // Glow effect
    if (glowRef.current) {
      const glowPulse = Math.sin(time * 3) * 0.3 + 1.5
      glowRef.current.scale.setScalar(meshRef.current.scale.x * glowPulse)
      glowRef.current.position.copy(meshRef.current.position)
    }
  })

  return (
    <group>
      {/* Main morphing shape - Icosahedron representing the lens/prism */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color={baseColor}
          emissive={baseColor}
          emissiveIntensity={0.5}
          metalness={0.9}
          roughness={0.1}
          transparent
          opacity={0.8}
          wireframe={activeSection === 1}
        />
      </mesh>
      
      {/* Inner glow */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshBasicMaterial
          color={baseColor}
          transparent
          opacity={0.15}
          side={THREE.BackSide}
        />
      </mesh>
      
      {/* Particles for dissolution effect */}
      <points ref={particlesRef} visible={false}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleCount}
            array={particlePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.05}
          color={terracottaColor}
          transparent
          opacity={0.8}
          sizeAttenuation
        />
      </points>
      
      {/* Ambient lighting */}
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#ff3300" />
      <pointLight position={[-5, -5, -5]} intensity={0.5} color="#d97d54" />
    </group>
  )
}
