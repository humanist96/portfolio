'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { RefreshCw, Mail, Calendar, User, MessageSquare, CheckCircle, Clock, XCircle } from 'lucide-react'
import { Contact, getContacts, updateContactStatus } from '@/lib/supabase'

export default function AdminPage() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedStatus, setSelectedStatus] = useState<Contact['status'] | 'all'>('all')
  const [error, setError] = useState<string | null>(null)

  const fetchContacts = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getContacts(selectedStatus === 'all' ? undefined : selectedStatus)
      setContacts(data)
    } catch (err) {
      setError('문의 목록을 불러오는데 실패했습니다.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchContacts()
  }, [selectedStatus])

  const handleStatusUpdate = async (id: number, newStatus: Contact['status']) => {
    try {
      await updateContactStatus(id, newStatus!)
      await fetchContacts()
    } catch (err) {
      alert('상태 업데이트에 실패했습니다.')
    }
  }

  const getStatusIcon = (status: Contact['status']) => {
    switch (status) {
      case 'new': return <Clock className="w-4 h-4" />
      case 'read': return <Mail className="w-4 h-4" />
      case 'replied': return <CheckCircle className="w-4 h-4" />
      case 'closed': return <XCircle className="w-4 h-4" />
      default: return null
    }
  }

  const getStatusColor = (status: Contact['status']) => {
    switch (status) {
      case 'new': return 'bg-blue-500'
      case 'read': return 'bg-yellow-500'
      case 'replied': return 'bg-green-500'
      case 'closed': return 'bg-gray-500'
      default: return 'bg-gray-400'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-white mb-8">문의 관리</h1>
          
          {/* Filters */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 mb-8 border border-gray-700">
            <div className="flex flex-wrap gap-4 items-center justify-between">
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedStatus('all')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    selectedStatus === 'all' 
                      ? 'bg-purple-600 text-white' 
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  전체
                </button>
                <button
                  onClick={() => setSelectedStatus('new')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    selectedStatus === 'new' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  신규
                </button>
                <button
                  onClick={() => setSelectedStatus('read')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    selectedStatus === 'read' 
                      ? 'bg-yellow-600 text-white' 
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  읽음
                </button>
                <button
                  onClick={() => setSelectedStatus('replied')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    selectedStatus === 'replied' 
                      ? 'bg-green-600 text-white' 
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  답변완료
                </button>
                <button
                  onClick={() => setSelectedStatus('closed')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    selectedStatus === 'closed' 
                      ? 'bg-gray-600 text-white' 
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  종료
                </button>
              </div>
              
              <button
                onClick={fetchContacts}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all"
              >
                <RefreshCw className="w-4 h-4" />
                새로고침
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-500/20 border border-red-500 text-red-400 p-4 rounded-lg mb-8">
              {error}
            </div>
          )}

          {/* Contacts List */}
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto"></div>
              <p className="text-gray-400 mt-4">문의 목록을 불러오는 중...</p>
            </div>
          ) : contacts.length === 0 ? (
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-12 text-center border border-gray-700">
              <MessageSquare className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400">아직 문의가 없습니다.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {contacts.map((contact) => (
                <motion.div
                  key={contact.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700 hover:border-gray-600 transition-all"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full ${getStatusColor(contact.status)}`}>
                        {getStatusIcon(contact.status)}
                      </div>
                      <div>
                        <h3 className="text-white font-semibold flex items-center gap-2">
                          <User className="w-4 h-4" />
                          {contact.name}
                        </h3>
                        <p className="text-gray-400 text-sm flex items-center gap-2">
                          <Mail className="w-4 h-4" />
                          {contact.email}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-400 text-sm flex items-center gap-2 justify-end">
                        <Calendar className="w-4 h-4" />
                        {new Date(contact.created_at!).toLocaleDateString('ko-KR')}
                      </p>
                      <p className="text-gray-500 text-xs">
                        {new Date(contact.created_at!).toLocaleTimeString('ko-KR')}
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-gray-900/50 rounded-lg p-4 mb-4">
                    <p className="text-gray-300 whitespace-pre-wrap">{contact.message}</p>
                  </div>
                  
                  <div className="flex gap-2">
                    {contact.status !== 'read' && (
                      <button
                        onClick={() => handleStatusUpdate(contact.id!, 'read')}
                        className="px-3 py-1 bg-yellow-600 text-white rounded text-sm hover:bg-yellow-700 transition-all"
                      >
                        읽음 표시
                      </button>
                    )}
                    {contact.status !== 'replied' && (
                      <button
                        onClick={() => handleStatusUpdate(contact.id!, 'replied')}
                        className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition-all"
                      >
                        답변 완료
                      </button>
                    )}
                    {contact.status !== 'closed' && (
                      <button
                        onClick={() => handleStatusUpdate(contact.id!, 'closed')}
                        className="px-3 py-1 bg-gray-600 text-white rounded text-sm hover:bg-gray-700 transition-all"
                      >
                        종료
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}