'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { 
  Brain, 
  LineChart, 
  Home, 
  GraduationCap, 
  Users, 
  Search,
  TrendingUp,
  Shield,
  Target
} from 'lucide-react'

interface Service {
  icon: React.ElementType
  title: string
  description: string
  features: string[]
  gradient: string
}

const ExpertServices: React.FC = () => {
  const services: Service[] = [
    {
      icon: Brain,
      title: 'AI 기반 부동산 분석',
      description: '20년 AI 경험과 15년 부동산 투자 노하우를 결합한 혁신적인 분석 서비스',
      features: [
        '머신러닝 기반 가격 예측',
        '급매물 자동 탐지 시스템',
        '투자 수익률 시뮬레이션',
        '리스크 평가 모델'
      ],
      gradient: 'from-blue-600 to-cyan-600'
    },
    {
      icon: GraduationCap,
      title: 'AI 금융 전문 교육',
      description: '금융 종사자를 위한 실무 중심 AI 교육 프로그램',
      features: [
        '맞춤형 커리큘럼 설계',
        '실습 중심 교육',
        '1:1 멘토링',
        '프로젝트 기반 학습'
      ],
      gradient: 'from-purple-600 to-pink-600'
    },
    {
      icon: LineChart,
      title: '투자 컨설팅',
      description: '데이터 기반의 전략적 부동산 투자 컨설팅',
      features: [
        '포트폴리오 최적화',
        '시장 트렌드 분석',
        '투자 타이밍 조언',
        '세금 최적화 전략'
      ],
      gradient: 'from-green-600 to-emerald-600'
    },
    {
      icon: Target,
      title: '맞춤형 솔루션 개발',
      description: '기업별 니즈에 맞는 AI 기반 부동산 솔루션 개발',
      features: [
        'API 연동 서비스',
        '대시보드 구축',
        '자동화 시스템',
        '데이터 파이프라인'
      ],
      gradient: 'from-orange-600 to-red-600'
    }
  ]

  const stats = [
    { label: '누적 분석 매물', value: '50,000+' },
    { label: '교육 수료생', value: '1,200+' },
    { label: '평균 투자 수익률', value: '23.4%' },
    { label: '고객 재계약률', value: '92%' }
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-white mb-4 text-center">
            전문가 서비스
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-3xl mx-auto">
            AI 기술과 부동산 투자 경험을 결합하여 고객님께 최적화된 솔루션을 제공합니다
          </p>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-gray-900/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-800 hover:border-gray-600 transition-all duration-300"
              >
                <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${service.gradient} mb-6`}>
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-3">{service.title}</h3>
                <p className="text-gray-400 mb-6">{service.description}</p>
                
                <ul className="space-y-3">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="mt-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-400 to-pink-400" />
                      </div>
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-2xl p-8 backdrop-blur-sm border border-purple-800/30"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ 
                      duration: 0.5, 
                      delay: 0.6 + index * 0.1,
                      type: "spring",
                      stiffness: 100
                    }}
                    viewport={{ once: true }}
                  >
                    <p className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-2">
                      {stat.value}
                    </p>
                  </motion.div>
                  <p className="text-gray-400 text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <p className="text-gray-400 mb-6">
              전문가와 함께 시작하세요
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-lg shadow-purple-500/25"
            >
              무료 상담 신청
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default ExpertServices