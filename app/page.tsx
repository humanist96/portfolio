'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import AboutSectionUpdated from '@/components/AboutSectionUpdated'
import AnimatedSection from '@/components/AnimatedSection'
import { PortfolioGrid } from '@/components/PortfolioCard'
import { kevinProjects } from '@/components/UpdatedPortfolioData'
import TechStack from '@/components/TechStack'
import { ThemeProvider } from '@/components/ThemeProvider'
import { ThemeToggle } from '@/components/ThemeToggle'

// Dynamic import for 3D Hero Section
const HeroSection3D = dynamic(() => import('@/components/HeroSection3D'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
      <div className="text-white text-2xl">Loading...</div>
    </div>
  )
})

export default function Home() {
  return (
    <ThemeProvider>
      <main className="min-h-screen bg-black dark:bg-black">
        {/* Theme Toggle */}
        <ThemeToggle />
        
        {/* Hero Section with 3D Background */}
        <Suspense fallback={<div className="min-h-screen bg-black" />}>
          <HeroSection3D />
        </Suspense>
        
        {/* About Section */}
        <AnimatedSection>
          <AboutSectionUpdated />
        </AnimatedSection>
        
        {/* Tech Stack Section */}
        <AnimatedSection>
          <TechStack />
        </AnimatedSection>
        
        {/* Portfolio Section */}
        <AnimatedSection className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 to-black">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center text-white mb-4">
              프로젝트 포트폴리오
            </h2>
            <p className="text-gray-400 text-center mb-12">
              AI와 부동산 투자의 시너지를 창출하는 혁신적인 프로젝트들
            </p>
            <PortfolioGrid projects={kevinProjects} />
          </div>
        </AnimatedSection>
        
        {/* Contact Section */}
        <AnimatedSection className="py-20 px-4 sm:px-6 lg:px-8 bg-black border-t border-gray-800">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-white mb-8">
              함께 성장하는 투자
            </h2>
            <p className="text-lg text-gray-400 mb-8">
              AI 기술과 부동산 투자 경험을 결합한 혁신적인 프로젝트에 대해 
              함께 논의하고 싶으시다면 언제든 연락주세요.
            </p>
            
            {/* Contact Links */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <a
                href="https://ordinarybusinessman.imweb.me/18"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
              >
                블로그 방문
              </a>
              <a
                href="https://youtube.com/watch"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-transparent border-2 border-white/50 text-white font-semibold rounded-full hover:bg-white/10 hover:border-white transform hover:scale-105 transition-all duration-200"
              >
                YouTube 채널
              </a>
            </div>
            
            {/* Email */}
            <p className="text-gray-400">
              이메일: <span className="text-white">humanist96@gmail.com</span>
            </p>
          </div>
        </AnimatedSection>
      </main>
    </ThemeProvider>
  )
}