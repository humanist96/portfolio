'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Loader2, CheckCircle, AlertCircle } from 'lucide-react'

interface FormData {
  name: string
  email: string
  message: string
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')
    setErrorMessage('')

    try {
      console.log('Sending contact form:', formData)
      
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      console.log('Response status:', response.status)
      const data = await response.json()
      console.log('Response data:', data)

      if (response.ok && data.success) {
        setSubmitStatus('success')
        setFormData({ name: '', email: '', message: '' })
        setTimeout(() => setSubmitStatus('idle'), 5000)
      } else {
        setSubmitStatus('error')
        setErrorMessage(data.error || data.errors?.join(', ') || '문의 전송에 실패했습니다.')
        console.error('Form submission error:', data)
      }
    } catch (error) {
      console.error('Network error:', error)
      setSubmitStatus('error')
      setErrorMessage('네트워크 오류가 발생했습니다. 콘솔을 확인해주세요.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="bg-gray-900/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-800 max-w-2xl mx-auto"
    >
      <h3 className="text-2xl font-bold text-white mb-6 text-center">
        프로젝트 문의하기
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Input */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
            이름 *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            placeholder="홍길동"
          />
        </div>

        {/* Email Input */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
            이메일 *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            placeholder="example@email.com"
          />
        </div>

        {/* Message Textarea */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
            문의 내용 *
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={5}
            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
            placeholder="AI 기반 부동산 분석 서비스에 대해 자세히 알고 싶습니다..."
          />
        </div>

        {/* Status Messages */}
        {submitStatus === 'success' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-green-400 bg-green-400/10 px-4 py-3 rounded-lg"
          >
            <CheckCircle size={20} />
            <span>문의가 성공적으로 전송되었습니다. 곧 연락드리겠습니다!</span>
          </motion.div>
        )}

        {submitStatus === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-red-400 bg-red-400/10 px-4 py-3 rounded-lg"
          >
            <AlertCircle size={20} />
            <span>{errorMessage}</span>
          </motion.div>
        )}

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="animate-spin" size={20} />
              전송 중...
            </>
          ) : (
            <>
              <Send size={20} />
              문의 전송
            </>
          )}
        </motion.button>
      </form>

      <p className="text-gray-500 text-sm text-center mt-6">
        * 표시는 필수 입력 항목입니다. 24시간 이내에 답변드리겠습니다.
      </p>
    </motion.div>
  )
}

export default ContactForm