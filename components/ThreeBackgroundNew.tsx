'use client'

import React, { useRef, useMemo, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Points, PointMaterial, Preload, Float, Sphere, Box, Torus, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

// Animated particle wave
const ParticleWave = () => {
  const ref = useRef<any>()
  const count = 10000
  
  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 10
      const y = (Math.random() - 0.5) * 10
      const z = (Math.random() - 0.5) * 10
      
      positions[i * 3] = x
      positions[i * 3 + 1] = y
      positions[i * 3 + 2] = z
      
      // Gradient colors from blue to purple to pink
      const mix = i / count
      colors[i * 3] = 0.2 + mix * 0.3     // R
      colors[i * 3 + 1] = 0.3 + mix * 0.2 // G
      colors[i * 3 + 2] = 0.9 - mix * 0.3 // B
    }
    
    return [positions, colors]
  }, [])
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.05
      ref.current.rotation.y = state.clock.elapsedTime * 0.075
      
      // Wave animation
      const positions = ref.current.geometry.attributes.position.array
      const time = state.clock.elapsedTime
      
      for (let i = 0; i < count; i++) {
        const x = positions[i * 3]
        const y = positions[i * 3 + 1]
        
        positions[i * 3 + 2] = Math.sin(x * 2 + time) * 0.3 + Math.cos(y * 2 + time) * 0.3
      }
      
      ref.current.geometry.attributes.position.needsUpdate = true
    }
  })
  
  return (
    <Points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <PointMaterial
        size={0.015}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </Points>
  )
}

// Floating geometric shapes
const FloatingShapes = () => {
  const { viewport } = useThree()
  
  return (
    <>
      {/* Main sphere with distortion */}
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <Sphere args={[1, 64, 64]} position={[viewport.width / 4, 0, -2]}>
          <MeshDistortMaterial
            color="#8B5CF6"
            attach="material"
            distort={0.3}
            speed={2}
            roughness={0.2}
            metalness={0.8}
            opacity={0.8}
            transparent
          />
        </Sphere>
      </Float>
      
      {/* Rotating torus */}
      <Float speed={3} rotationIntensity={2} floatIntensity={1}>
        <Torus args={[0.7, 0.3, 32, 64]} position={[-viewport.width / 4, 1, -3]}>
          <MeshDistortMaterial
            color="#EC4899"
            attach="material"
            distort={0.2}
            speed={3}
            roughness={0.3}
            metalness={0.7}
            opacity={0.7}
            transparent
          />
        </Torus>
      </Float>
      
      {/* Morphing box */}
      <Float speed={4} rotationIntensity={1.5} floatIntensity={1.5}>
        <Box args={[0.8, 0.8, 0.8]} position={[0, -viewport.height / 4, -2.5]}>
          <MeshDistortMaterial
            color="#3B82F6"
            attach="material"
            distort={0.4}
            speed={1.5}
            roughness={0.4}
            metalness={0.6}
            opacity={0.6}
            transparent
          />
        </Box>
      </Float>
    </>
  )
}

// Grid plane for depth
const GridPlane = () => {
  const ref = useRef<any>()
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.position.z = (state.clock.elapsedTime * 0.5) % 5 - 5
    }
  })
  
  return (
    <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
      <planeGeometry args={[50, 50, 50, 50]} />
      <meshBasicMaterial
        color="#8B5CF6"
        wireframe
        transparent
        opacity={0.1}
      />
    </mesh>
  )
}

// Light effects
const Lights = () => {
  const light1 = useRef<any>()
  const light2 = useRef<any>()
  
  useFrame((state) => {
    const time = state.clock.elapsedTime
    if (light1.current) {
      light1.current.position.x = Math.sin(time) * 5
      light1.current.position.z = Math.cos(time) * 5
    }
    if (light2.current) {
      light2.current.position.x = Math.cos(time * 0.7) * 5
      light2.current.position.z = Math.sin(time * 0.7) * 5
    }
  })
  
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight ref={light1} position={[5, 5, 5]} intensity={1} color="#8B5CF6" />
      <pointLight ref={light2} position={[-5, 5, -5]} intensity={1} color="#EC4899" />
      <spotLight
        position={[0, 10, 0]}
        angle={0.3}
        penumbra={1}
        intensity={0.5}
        color="#3B82F6"
      />
    </>
  )
}

const ThreeBackgroundNew: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <Lights />
          <ParticleWave />
          <FloatingShapes />
          <GridPlane />
        </Suspense>
        <Preload all />
      </Canvas>
    </div>
  )
}

export default ThreeBackgroundNew