'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Brain, TrendingUp, Home, BarChart3, Database, LineChart } from 'lucide-react'

const FloatingElements: React.FC = () => {
  const elements = [
    { icon: Brain, color: 'from-blue-400 to-cyan-400', delay: 0, position: 'top-20 left-10' },
    { icon: TrendingUp, color: 'from-green-400 to-emerald-400', delay: 0.5, position: 'top-40 right-20' },
    { icon: Home, color: 'from-purple-400 to-pink-400', delay: 1, position: 'bottom-40 left-20' },
    { icon: BarChart3, color: 'from-orange-400 to-red-400', delay: 1.5, position: 'bottom-20 right-10' },
    { icon: Database, color: 'from-indigo-400 to-purple-400', delay: 2, position: 'top-60 left-1/3' },
    { icon: LineChart, color: 'from-teal-400 to-blue-400', delay: 2.5, position: 'bottom-60 right-1/3' },
  ]

  return (
    <>
      {elements.map((Element, index) => (
        <motion.div
          key={index}
          className={`absolute ${Element.position} opacity-20 pointer-events-none`}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0.1, 0.3, 0.1],
            scale: [0.8, 1.2, 0.8],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 20,
            delay: Element.delay,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <div className={`p-4 rounded-full bg-gradient-to-br ${Element.color} blur-sm`}>
            <Element.icon size={48} className="text-white" />
          </div>
        </motion.div>
      ))}
    </>
  )
}

export default FloatingElements