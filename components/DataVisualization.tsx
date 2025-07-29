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
      className="relative bg-gradient-to-br from-gray-900/90 to-gray-800/70 backdrop-blur-xl rounded-2xl p-8 border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 shadow-2xl hover:shadow-purple-500/25 overflow-hidden group"
    >
      {/* Background gradient effect */}
      <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`} />
      
      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className={`p-4 rounded-xl bg-gradient-to-br ${color} shadow-lg`}>
            <Icon className="w-7 h-7 text-white" />
          </div>
          {change && (
            <motion.span 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className={`text-sm font-semibold px-3 py-1 rounded-full ${
                change.startsWith('+') 
                  ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                  : 'bg-red-500/20 text-red-400 border border-red-500/30'
              }`}
            >
              {change}
            </motion.span>
          )}
        </div>
        <h3 className="text-gray-300 text-sm font-medium mb-2 tracking-wide">{title}</h3>
        <p className="text-3xl font-bold text-white bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
          {value}
        </p>
      </div>
      
      {/* Decorative element */}
      <div className={`absolute -bottom-8 -right-8 w-32 h-32 bg-gradient-to-br ${color} opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity duration-300`} />
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