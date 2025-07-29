'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Lock, Info, CheckCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function AdminLoginPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  
  useEffect(() => {
    // Check if already authenticated
    checkAuth()
  }, [])
  
  const checkAuth = async () => {
    try {
      const response = await fetch('/api/admin/contacts?status=all')
      if (response.ok) {
        setIsAuthenticated(true)
        // Redirect to admin page
        setTimeout(() => {
          router.push('/admin')
        }, 1000)
      }
    } catch (error) {
      // Not authenticated
    }
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full"
      >
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-8 border border-gray-700 shadow-2xl">
          {isAuthenticated ? (
            <>
              <div className="flex items-center justify-center mb-6">
                <div className="p-4 bg-green-600/20 rounded-full">
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
              </div>
              
              <h1 className="text-2xl font-bold text-white text-center mb-6">인증 성공</h1>
              
              <p className="text-gray-300 text-center">
                관리자 페이지로 이동 중...
              </p>
            </>
          ) : (
            <>
              <div className="flex items-center justify-center mb-6">
                <div className="p-4 bg-purple-600/20 rounded-full">
                  <Lock className="w-8 h-8 text-purple-500" />
                </div>
              </div>
              
              <h1 className="text-2xl font-bold text-white text-center mb-6">관리자 인증</h1>
              
              <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4 mb-6">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-blue-300">
                    <p className="mb-2">브라우저의 인증 창에서 다음 정보를 입력하세요:</p>
                    <ul className="space-y-1">
                      <li>• 사용자명: <code className="bg-gray-700 px-2 py-1 rounded">admin</code></li>
                      <li>• 비밀번호: <code className="bg-gray-700 px-2 py-1 rounded">kevin2024!</code></li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => window.location.reload()}
                className="w-full px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all font-medium"
              >
                새로고침하여 로그인
              </button>
              
              <p className="text-gray-400 text-sm text-center mt-4">
                인증 후 관리자 페이지에 접근할 수 있습니다.
              </p>
            </>
          )}
        </div>
      </motion.div>
    </div>
  )
}