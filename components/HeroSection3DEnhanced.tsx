'use client'

import React, { Suspense, useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { motion, AnimatePresence } from 'framer-motion'
import { Brain, TrendingUp, Home, ChevronDown, Award, Briefcase, ChartBar, Sparkles, Code, Building, DollarSign, Target } from 'lucide-react'
import Image from 'next/image'

// Dynamic import for 3D background
const ThreeBackground = dynamic(() => import('./ThreeBackgroundAdvanced'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900" />
})

const HeroSection3DEnhanced: React.FC = () => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  
  const rotatingTexts = [
    "AI와 부동산의 완벽한 시너지",
    "데이터 기반 투자 전략",
    "미래를 예측하는 인공지능",
    "성공적인 투자의 파트너"
  ]
  
  useEffect(() => {
    setIsLoaded(true)
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % rotatingTexts.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])
  
  const scrollToSection = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })
  }
  
  const scrollToContact = () => {
    const contactSection = document.querySelector('#contact-section')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const achievements = [
    { icon: Brain, label: "AI 전문가", value: "20년+", color: "from-blue-400 to-cyan-400" },
    { icon: Building, label: "부동산 투자", value: "15년+", color: "from-purple-400 to-pink-400" },
    { icon: Award, label: "전산학 박사", value: "AI전공", color: "from-green-400 to-emerald-400" },
    { icon: ChartBar, label: "금융 AI 강사", value: "5년+", color: "from-orange-400 to-red-400" }
  ]

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* 3D Background */}
      <Suspense fallback={<div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900" />}>
        <ThreeBackground />
      </Suspense>
      
      {/* Enhanced Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-transparent to-purple-900/20 z-10" />
      
      {/* Animated particles */}
      <div className="absolute inset-0 z-10">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight 
            }}
            animate={{ 
              y: [null, -window.innerHeight],
              opacity: [0, 1, 0]
            }}
            transition={{ 
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: Math.random() * 10
            }}
          />
        ))}
      </div>
      
      {/* Content Container */}
      <div className="relative z-20 text-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        {/* Profile Image with Glow Effect */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-8 relative inline-block"
        >
          <div className="relative w-40 h-40 mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full blur-2xl opacity-60 animate-pulse" />
            <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white/20 shadow-2xl">
              <Image
                src="/정케빈.jpg"
                alt="정케빈"
                fill
                className="object-cover"
                priority
              />
            </div>
            <motion.div
              className="absolute -bottom-2 -right-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full p-2"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-6 h-6 text-white" />
            </motion.div>
          </div>
        </motion.div>

        {/* Animated Greeting */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6"
        >
          <motion.span
            className="inline-block text-lg sm:text-xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 font-medium"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            안녕하세요, AI와 부동산의 미래를 만들어가는
          </motion.span>
        </motion.div>

        {/* Name with Enhanced Typography */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-6"
        >
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-2 relative">
            <span className="text-white">정</span>
            <span className="relative inline-block">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                케빈
              </span>
              <motion.span
                className="absolute inset-0 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 opacity-0"
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                케빈
              </motion.span>
            </span>
            <span className="text-gray-400 text-3xl sm:text-4xl md:text-5xl ml-4">Kevin Jung</span>
          </h1>
        </motion.div>
        
        {/* Rotating Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="h-12 mb-8 relative"
        >
          <AnimatePresence mode="wait">
            <motion.p
              key={currentTextIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 text-xl sm:text-2xl md:text-3xl text-gray-300 font-light"
            >
              {rotatingTexts[currentTextIndex]}
            </motion.p>
          </AnimatePresence>
        </motion.div>

        {/* Interactive Achievement Cards */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-5xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
              <div className="relative bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-white/30 transition-all duration-300">
                <achievement.icon className={`w-8 h-8 mb-3 text-transparent bg-clip-text bg-gradient-to-r ${achievement.color}`} />
                <h3 className={`text-2xl sm:text-3xl font-bold mb-1 text-transparent bg-clip-text bg-gradient-to-r ${achievement.color}`}>
                  {achievement.value}
                </h3>
                <p className="text-gray-400 text-sm">{achievement.label}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Expertise Tags */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-wrap justify-center gap-3 mb-10"
        >
          {[
            { icon: Code, text: "AI/ML 전문가" },
            { icon: Building, text: "부동산 투자" },
            { icon: DollarSign, text: "금융 데이터 분석" },
            { icon: Target, text: "투자 전략 수립" }
          ].map((tag, index) => (
            <motion.span
              key={index}
              whileHover={{ scale: 1.1 }}
              className="px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/20 flex items-center gap-2 text-gray-300 hover:border-white/40 transition-all duration-300"
            >
              <tag.icon className="w-4 h-4" />
              {tag.text}
            </motion.span>
          ))}
        </motion.div>

        {/* Enhanced CTA Buttons */}
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <motion.a 
            href="https://kevin-urgent-sale.streamlit.app" 
            target="_blank" 
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-8 py-4 overflow-hidden rounded-full font-semibold"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 group-hover:scale-110" />
            <div className="relative flex items-center justify-center gap-2 text-white">
              <Building className="w-5 h-5" />
              아파트 매물 검색 서비스
            </div>
          </motion.a>
          
          <motion.button 
            onClick={scrollToContact}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-8 py-4 overflow-hidden rounded-full font-semibold"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-sm border-2 border-white/30 rounded-full transition-all duration-300 group-hover:border-white/50" />
            <div className="relative flex items-center justify-center gap-2 text-white">
              <Briefcase className="w-5 h-5" />
              프로젝트 문의하기
            </div>
          </motion.button>
        </motion.div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer z-20 flex flex-col items-center gap-2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        onClick={scrollToSection}
      >
        <span className="text-white/50 text-sm">더 알아보기</span>
        <ChevronDown size={32} className="text-white/70" />
      </motion.div>
    </section>
  )
}

export default HeroSection3DEnhanced