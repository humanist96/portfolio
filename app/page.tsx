'use client'

import HeroSection from '@/components/HeroSection'
import AboutSection from '@/components/AboutSection'
import AnimatedSection from '@/components/AnimatedSection'
import { PortfolioGrid } from '@/components/PortfolioCard'
import type { PortfolioCardProps } from '@/components/PortfolioCard'

// 샘플 프로젝트 데이터
const sampleProjects: PortfolioCardProps[] = [
  {
    title: 'AI 기반 금융 분석 시스템',
    description: '머신러닝을 활용한 실시간 금융 데이터 분석 및 예측 시스템. 고객 맞춤형 투자 전략을 제공합니다.',
    techStack: ['Python', 'TensorFlow', 'FastAPI', 'React'],
    projectType: 'fullstack',
    githubUrl: '#',
    liveUrl: '#'
  },
  {
    title: 'RAG 기반 문서 검색 엔진',
    description: '대용량 금융 문서에서 정확한 정보를 빠르게 검색하는 RAG 시스템. 자연어 처리 기술을 활용합니다.',
    techStack: ['LangChain', 'OpenAI', 'Pinecone', 'Next.js'],
    projectType: 'api',
    githubUrl: '#'
  },
  {
    title: '실시간 주식 대시보드',
    description: 'WebSocket을 활용한 실시간 주식 시세 모니터링 대시보드. 직관적인 UI로 시장 동향을 파악합니다.',
    techStack: ['Vue.js', 'WebSocket', 'D3.js', 'Node.js'],
    projectType: 'web',
    liveUrl: '#'
  }
]

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <HeroSection />
      
      {/* About Section */}
      <AnimatedSection>
        <AboutSection />
      </AnimatedSection>
      
      {/* Portfolio Section */}
      <AnimatedSection className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
          프로젝트 포트폴리오
        </h2>
        <PortfolioGrid projects={sampleProjects} />
      </AnimatedSection>
      
      {/* Contact Section */}
      <AnimatedSection className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            함께 만들어가요
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            새로운 프로젝트나 협업 기회에 대해 이야기를 나누고 싶으시다면 언제든 연락주세요.
          </p>
          <button className="px-8 py-4 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg">
            문의하기
          </button>
        </div>
      </AnimatedSection>
    </main>
  )
}