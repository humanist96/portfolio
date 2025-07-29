'use client'

import React, { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { Brain, TrendingUp, Home, ChevronDown } from 'lucide-react'

// Dynamic import for 3D background
const ThreeBackground = dynamic(() => import('./ThreeBackgroundAdvanced'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900" />
})

const HeroSection3D: React.FC = () => {
  const scrollToSection = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })
  }
  
  const scrollToContact = () => {
    const contactSection = document.querySelector('#contact-section')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* 3D Background */}
      <Suspense fallback={<div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900" />}>
        <ThreeBackground />
      </Suspense>
      
      {/* Enhanced Gradient Overlays for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/20 to-black/60 z-10" />
      
      {/* Content Container */}
      <div className="relative z-20 text-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Animated Icons */}
        <motion.div 
          className="flex justify-center gap-8 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-blue-400"
          >
            <Brain size={48} />
          </motion.div>
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, delay: 0.3, repeat: Infinity }}
            className="text-green-400"
          >
            <TrendingUp size={48} />
          </motion.div>
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, delay: 0.6, repeat: Infinity }}
            className="text-purple-400"
          >
            <Home size={48} />
          </motion.div>
        </motion.div>

        {/* Name and Title */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-4">
            정케빈
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              {' '}Kevin Jung
            </span>
          </h1>
          
          <p className="text-xl sm:text-2xl md:text-3xl text-gray-300 mb-2">
            AI 전문가 & 부동산 투자 컨설턴트
          </p>
          
          <p className="text-lg sm:text-xl text-gray-400 mb-8">
            20년 AI 경력 | 15년 부동산 투자 | 금융 IT 데이터 분석
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 shadow-2xl hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-purple-500/20">
            <h3 className="text-4xl font-bold text-white mb-1 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">20+</h3>
            <p className="text-gray-300">년 AI 경력</p>
          </div>
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 shadow-2xl hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-pink-500/20">
            <h3 className="text-4xl font-bold text-white mb-1 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">15+</h3>
            <p className="text-gray-300">년 부동산 투자</p>
          </div>
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 shadow-2xl hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-blue-500/20">
            <h3 className="text-4xl font-bold text-white mb-1 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">박사</h3>
            <p className="text-gray-300">전산학 AI전공</p>
          </div>
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 shadow-2xl hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-green-500/20">
            <h3 className="text-4xl font-bold text-white mb-1 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">5년</h3>
            <p className="text-gray-300">금융 AI 강사</p>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <a 
            href="https://kevin-urgent-sale.streamlit.app" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            아파트 매물 검색 서비스
          </a>
          <button 
            onClick={scrollToContact}
            className="px-8 py-4 bg-transparent border-2 border-white/50 text-white font-semibold rounded-full hover:bg-white/10 hover:border-white transform hover:scale-105 transition-all duration-200 backdrop-blur-sm"
          >
            문의하기
          </button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        onClick={scrollToSection}
      >
        <ChevronDown size={32} className="text-white/70" />
      </motion.div>
    </section>
  )
}

export default HeroSection3D