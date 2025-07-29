'use client'

import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial, Preload } from '@react-three/drei'
import * as THREE from 'three'

const StarField = (props: any) => {
  const ref = useRef<any>()
  const sphere = useMemo(() => {
    const points = new Float32Array(5000 * 3)
    for (let i = 0; i < 5000; i++) {
      const theta = THREE.MathUtils.randFloatSpread(360)
      const phi = THREE.MathUtils.randFloatSpread(360)
      const radius = Math.random() * 1.2
      
      points[i * 3] = radius * Math.sin(theta) * Math.cos(phi)
      points[i * 3 + 1] = radius * Math.sin(theta) * Math.sin(phi)
      points[i * 3 + 2] = radius * Math.cos(theta)
    }
    return points
  }, [])

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10
      ref.current.rotation.y -= delta / 15
    }
  })

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
        <PointMaterial
          transparent
          color="#f272c8"
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  )
}

const ThreeBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <StarField />
        <Preload all />
      </Canvas>
    </div>
  )
}

export default ThreeBackground