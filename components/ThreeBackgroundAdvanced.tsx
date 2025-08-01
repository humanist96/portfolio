'use client'

import React, { useRef, useMemo, Suspense } from 'react'
import { Canvas, useFrame, useThree, extend } from '@react-three/fiber'
import { 
  Points, 
  PointMaterial, 
  Preload, 
  Float, 
  Sphere, 
  Box, 
  Torus, 
  MeshDistortMaterial,
  OrbitControls,
  Sparkles,
  Cloud,
  Stars,
  Trail,
  PerspectiveCamera,
  Environment,
  ContactShadows
} from '@react-three/drei'
import * as THREE from 'three'
import { shaderMaterial } from '@react-three/drei'

// Custom shader for gradient background
const GradientShaderMaterial = shaderMaterial(
  {
    time: 0,
    colorA: new THREE.Color('#0a0e27'), // Deep navy
    colorB: new THREE.Color('#0f172a'), // Midnight blue
    colorC: new THREE.Color('#1e293b'), // Royal navy
    colorD: new THREE.Color('#334155')  // Soft navy gray (no red)
  },
  // Vertex shader
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment shader
  `
    uniform float time;
    uniform vec3 colorA;
    uniform vec3 colorB;
    uniform vec3 colorC;
    uniform vec3 colorD;
    varying vec2 vUv;
    
    void main() {
      vec2 displacedUv = vUv + vec2(sin(time * 0.1), cos(time * 0.1)) * 0.1;
      
      vec3 color = mix(colorA, colorB, displacedUv.x);
      color = mix(color, colorC, displacedUv.y);
      color = mix(color, colorD, sin(displacedUv.x * displacedUv.y + time * 0.2) * 0.3 + 0.3);
      
      gl_FragColor = vec4(color, 1.0);
    }
  `
)

extend({ GradientShaderMaterial })

// TypeScript declaration
declare global {
  namespace JSX {
    interface IntrinsicElements {
      gradientShaderMaterial: any
    }
  }
}

// DNA Helix Component
const DNAHelix = () => {
  const group = useRef<THREE.Group>(null)
  const spheres = useMemo(() => {
    const temp = []
    const count = 40
    for (let i = 0; i < count; i++) {
      const t = i / count * Math.PI * 4
      const x1 = Math.sin(t) * 4  // Doubled from 2 to 4
      const z1 = Math.cos(t) * 4  // Doubled from 2 to 4
      const x2 = Math.sin(t + Math.PI) * 4  // Doubled from 2 to 4
      const z2 = Math.cos(t + Math.PI) * 4  // Doubled from 2 to 4
      const y = (i - count / 2) * 0.8  // Increased from 0.5 to 0.8
      temp.push({ position: [x1, y, z1], color: '#8B5CF6' })
      temp.push({ position: [x2, y, z2], color: '#EC4899' })
    }
    return temp
  }, [])

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.elapsedTime * 0.2
      group.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.5
    }
  })

  return (
    <group ref={group} position={[5, 0, -5]}>
      {spheres.map((sphere, i) => (
        <Trail key={i} width={4} length={8} color={sphere.color} attenuation={(t) => t * t}>
          <Sphere args={[0.2, 16, 16]} position={sphere.position as [number, number, number]}>
            <meshStandardMaterial
              color={sphere.color}
              emissive={sphere.color}
              emissiveIntensity={0.5}
              roughness={0.2}
              metalness={0.8}
            />
          </Sphere>
        </Trail>
      ))}
    </group>
  )
}

// Animated Torus Knot
const AnimatedTorusKnot = () => {
  const mesh = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x = state.clock.elapsedTime * 0.3
      mesh.current.rotation.y = state.clock.elapsedTime * 0.2
      mesh.current.scale.setScalar(2 + Math.sin(state.clock.elapsedTime) * 0.3)  // Increased base scale from 1 to 2
    }
  })

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={mesh} position={[-5, 2, -5]}>
        <torusKnotGeometry args={[2, 0.6, 128, 16]} />
        <MeshDistortMaterial
          color="#3B82F6"
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.8}
          opacity={0.9}
          transparent
        />
      </mesh>
    </Float>
  )
}

// Particle Network
const ParticleNetwork = () => {
  const points = useRef<THREE.Points>(null)
  const { mouse } = useThree()
  
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(3000)
    for (let i = 0; i < 1000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30  // Increased from 20 to 30
      positions[i * 3 + 1] = (Math.random() - 0.5) * 30  // Increased from 20 to 30
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30  // Increased from 20 to 30
    }
    return positions
  }, [])

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.x = state.clock.elapsedTime * 0.05
      points.current.rotation.y = state.clock.elapsedTime * 0.075
      
      // Mouse interaction
      points.current.rotation.x += mouse.y * 0.1
      points.current.rotation.y += mouse.x * 0.1
    }
  })

  return (
    <Points ref={points} positions={particlesPosition} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#8B5CF6"
        size={0.1}  // Increased from 0.05 to 0.1
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  )
}

// Animated Background Plane
const AnimatedBackground = () => {
  const mesh = useRef<THREE.Mesh>(null)
  const material = useRef<any>(null)

  useFrame((state) => {
    if (material.current) {
      material.current.time = state.clock.elapsedTime
    }
  })

  return (
    <mesh ref={mesh} position={[0, 0, -30]} scale={[50, 50, 1]}>
      <planeGeometry args={[1, 1]} />
      <gradientShaderMaterial ref={material} />
    </mesh>
  )
}

// Floating Crystals
const FloatingCrystals = () => {
  const crystals = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 20,  // Increased from 15 to 20
        (Math.random() - 0.5) * 15,  // Increased from 10 to 15
        (Math.random() - 0.5) * 15 - 3  // Adjusted depth
      ] as [number, number, number],
      scale: Math.random() * 1.5 + 1,  // Increased from 0.5-1 to 1-2.5
      color: ['#8B5CF6', '#6366F1', '#3B82F6', '#2563EB'][i % 4]
    }))
  }, [])

  return (
    <>
      {crystals.map((crystal, i) => (
        <Float key={i} speed={1 + i * 0.2} rotationIntensity={2} floatIntensity={1}>
          <mesh position={crystal.position} scale={crystal.scale}>
            <octahedronGeometry args={[2, 0]} />
            <meshStandardMaterial
              color={crystal.color}
              emissive={crystal.color}
              emissiveIntensity={0.5}
              roughness={0.2}
              metalness={0.8}
              opacity={0.8}
              transparent
            />
          </mesh>
        </Float>
      ))}
    </>
  )
}

// Main Scene
const Scene = () => {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#8B5CF6" />
      <pointLight position={[-10, -10, -10]} intensity={1} color="#EC4899" />
      <spotLight
        position={[0, 20, 0]}
        angle={0.3}
        penumbra={1}
        intensity={0.5}
        color="#3B82F6"
        castShadow
      />
      
      {/* Environment */}
      <Environment preset="night" />
      
      {/* Background */}
      <AnimatedBackground />
      
      {/* 3D Elements */}
      <DNAHelix />
      <AnimatedTorusKnot />
      <ParticleNetwork />
      <FloatingCrystals />
      
      {/* Additional Effects */}
      <Sparkles 
        count={150}  // Increased from 100
        scale={30}   // Increased from 20
        size={3}     // Increased from 2
        speed={0.5} 
        color="#ffffff"
        opacity={0.5}
      />
      
      <Stars 
        radius={100} 
        depth={50} 
        count={5000} 
        factor={4} 
        saturation={0} 
        fade 
        speed={1} 
      />
      
      {/* Fog for depth */}
      <fog attach="fog" args={['#0a0e27', 10, 50]} />
    </>
  )
}

const ThreeBackgroundAdvanced: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 12], fov: 75 }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.5
        }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
        <Preload all />
      </Canvas>
      
      {/* Gradient Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-transparent to-slate-900/90 pointer-events-none" />
    </div>
  )
}

export default ThreeBackgroundAdvanced