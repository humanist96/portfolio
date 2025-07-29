'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { BarChart3, TrendingUp, PieChart, Activity } from 'lucide-react'

interface MetricCardProps {
  title: string
  value: string | number
  change?: string
  icon: React.ElementType
  color: string
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, change, icon: Icon, color }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      className="bg-gray-900/80 backdrop-blur-sm rounded-xl p-6 border border-gray-800 hover:border-gray-600 transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-lg bg-gradient-to-br ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        {change && (
          <span className={`text-sm font-medium ${change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
            {change}
          </span>
        )}
      </div>
      <h3 className="text-gray-400 text-sm font-medium mb-1">{title}</h3>
      <p className="text-2xl font-bold text-white">{value}</p>
    </motion.div>
  )
}

const DataVisualization: React.FC = () => {
  const metrics = [
    {
      title: 'AI 모델 정확도',
      value: '94.7%',
      change: '+2.3%',
      icon: Activity,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: '분석 완료 매물',
      value: '15,842',
      change: '+847',
      icon: BarChart3,
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: '투자 수익률',
      value: '23.4%',
      change: '+5.2%',
      icon: TrendingUp,
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: '고객 만족도',
      value: '4.9/5.0',
      change: '+0.2',
      icon: PieChart,
      color: 'from-orange-500 to-red-500'
    }
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-white mb-4 text-center">
            실시간 성과 지표
          </h2>
          <p className="text-gray-400 text-center mb-12">
            AI 기술과 부동산 투자 전문성의 시너지 효과
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {metrics.map((metric, index) => (
              <motion.div
                key={metric.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <MetricCard {...metric} />
              </motion.div>
            ))}
          </div>

          {/* Chart Area */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-12 bg-gray-900/50 backdrop-blur-sm rounded-xl p-8 border border-gray-800"
          >
            <h3 className="text-xl font-semibold text-white mb-6">투자 수익률 추이</h3>
            <div className="h-64 flex items-end justify-between gap-2">
              {[75, 82, 78, 90, 85, 92, 88, 94, 91, 96, 93, 98].map((height, index) => (
                <motion.div
                  key={index}
                  className="flex-1 bg-gradient-to-t from-blue-600 to-purple-600 rounded-t"
                  initial={{ height: 0 }}
                  whileInView={{ height: `${height}%` }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.05 }}
                  viewport={{ once: true }}
                />
              ))}
            </div>
            <div className="flex justify-between mt-4 text-sm text-gray-500">
              <span>1월</span>
              <span>6월</span>
              <span>12월</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default DataVisualization