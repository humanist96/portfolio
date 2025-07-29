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
import FloatingElements from '@/components/FloatingElements'
import DataVisualization from '@/components/DataVisualization'
import ExpertServices from '@/components/ExpertServices'
import ContactForm from '@/components/ContactForm'

// Dynamic import for Enhanced 3D Hero Section
const HeroSection3DEnhanced = dynamic(() => import('@/components/HeroSection3DEnhanced'), {
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
      <main className="min-h-screen bg-black dark:bg-black relative overflow-hidden">
        {/* Floating Elements */}
        <FloatingElements />
        
        {/* Theme Toggle */}
        <ThemeToggle />
        
        {/* Enhanced Hero Section with 3D Background */}
        <Suspense fallback={<div className="min-h-screen bg-black" />}>
          <HeroSection3DEnhanced />
        </Suspense>
        
        {/* About Section */}
        <AnimatedSection>
          <AboutSectionUpdated />
        </AnimatedSection>
        
        {/* Data Visualization Section */}
        <AnimatedSection>
          <DataVisualization />
        </AnimatedSection>
        
        {/* Expert Services Section */}
        <AnimatedSection>
          <ExpertServices />
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
        <AnimatedSection id="contact-section" className="py-20 px-4 sm:px-6 lg:px-8 bg-black border-t border-gray-800">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-8 text-center">
              함께 성장하는 투자
            </h2>
            <p className="text-lg text-gray-400 mb-12 text-center max-w-3xl mx-auto">
              AI 기술과 부동산 투자 경험을 결합한 혁신적인 프로젝트에 대해 
              함께 논의하고 싶으시다면 언제든 연락주세요.
            </p>
            
            {/* Contact Form */}
            <ContactForm />
            
            {/* Contact Links */}
            <div className="flex justify-center mt-12 mb-8">
              <a
                href="https://www.threads.com/@humanist96?hl=ko"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-200 shadow-lg flex items-center gap-2"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.964-.065-1.19.408-2.285 1.33-3.082.88-.76 2.119-1.207 3.583-1.291a13.853 13.853 0 0 1 3.02.142c-.126-.742-.375-1.332-.75-1.757-.513-.586-1.308-.883-2.359-.89h-.029c-.844 0-1.992.232-2.721 1.32L7.734 7.847c.98-1.454 2.568-2.256 4.478-2.256h.044c3.194.02 5.097 1.975 5.287 5.388.108.046.216.094.321.142 1.49.7 2.58 1.761 3.154 3.07.797 1.82.871 4.79-1.548 7.158-1.85 1.81-4.094 2.628-7.277 2.65Zm1.003-11.69c-.242 0-.487.007-.739.021-1.836.103-2.98.946-2.916 2.143.067 1.256 1.452 1.839 2.784 1.767 1.224-.065 2.818-.543 3.086-3.71a10.5 10.5 0 0 0-2.215-.221z"/>
                </svg>
                Threads 팔로우
              </a>
            </div>
            
            {/* Email */}
            <p className="text-gray-400 text-center">
              직접 연락: <span className="text-white">humanist96@gmail.com</span>
            </p>
          </div>
        </AnimatedSection>
      </main>
    </ThemeProvider>
  )
}