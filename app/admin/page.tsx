'use client'

import React, { useEffect, useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { RefreshCw, Mail, Calendar, User, MessageSquare, CheckCircle, Clock, XCircle, BarChart3, TrendingUp, Search, Download, Filter } from 'lucide-react'
import { Contact } from '@/lib/supabase'
import { demoStorage, DemoContact } from '@/lib/demo-storage'

export default function AdminPage() {
  const [contacts, setContacts] = useState<(Contact | DemoContact)[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedStatus, setSelectedStatus] = useState<Contact['status'] | 'all'>('all')
  const [error, setError] = useState<string | null>(null)
  const [stats, setStats] = useState<{
    total: number
    new: number
    read: number
    replied: number
    closed: number
    todayCount: number
    weekCount: number
  }>({ total: 0, new: 0, read: 0, replied: 0, closed: 0, todayCount: 0, weekCount: 0 })
  const [isDemo, setIsDemo] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [dateFilter, setDateFilter] = useState<'all' | 'today' | 'week' | 'month'>('all')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const fetchContacts = async () => {
    if (!mounted) return;
    
    setLoading(true)
    setError(null)
    try {
      // Try API first
      const url = selectedStatus === 'all' 
        ? '/api/admin/contacts' 
        : `/api/admin/contacts?status=${selectedStatus}`
      const response = await fetch(url)
      
      if (!response.ok) {
        throw new Error('Failed to fetch contacts')
      }
      
      const result = await response.json()
      
      if (result.success && result.contacts) {
        setContacts(result.contacts)
        setIsDemo(false)
        
        // Calculate stats
        const now = new Date()
        const today = now.toDateString()
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
        
        setStats({
          total: result.contacts.length,
          new: result.contacts.filter((c: Contact) => c.status === 'new').length,
          read: result.contacts.filter((c: Contact) => c.status === 'read').length,
          replied: result.contacts.filter((c: Contact) => c.status === 'replied').length,
          closed: result.contacts.filter((c: Contact) => c.status === 'closed').length,
          todayCount: result.contacts.filter((c: Contact) => new Date(c.created_at!).toDateString() === today).length,
          weekCount: result.contacts.filter((c: Contact) => new Date(c.created_at!) >= weekAgo).length
        })
      } else {
        // Fallback to demo storage
        console.log('API 연결 실패, 데모 모드로 전환')
        const demoData = demoStorage.getContactsByStatus(selectedStatus === 'all' ? undefined : selectedStatus)
        setContacts(demoData)
        setStats(demoStorage.getStats())
        setIsDemo(true)
      }
    } catch (err) {
      // Fallback to demo storage
      console.log('API 연결 실패, 데모 모드로 전환:', err)
      setError('데이터베이스 연결에 실패했습니다. 데모 모드로 전환됩니다.')
      
      // Use demo storage only on client side
      if (typeof window !== 'undefined') {
        const demoData = demoStorage.getContactsByStatus(selectedStatus === 'all' ? undefined : selectedStatus)
        setContacts(demoData)
        setStats(demoStorage.getStats())
        setIsDemo(true)
        setError(null) // Clear error after successful demo mode switch
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (mounted) {
      fetchContacts()
    }
  }, [selectedStatus, mounted])

  const handleStatusUpdate = async (id: number, newStatus: Contact['status']) => {
    try {
      if (isDemo) {
        demoStorage.updateContactStatus(id, newStatus)
        await fetchContacts()
      } else {
        const response = await fetch('/api/admin/contacts', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id, status: newStatus })
        })
        
        if (!response.ok) {
          throw new Error('Failed to update contact')
        }
        
        await fetchContacts()
      }
    } catch (err) {
      console.error('Status update error:', err)
      alert('상태 업데이트에 실패했습니다.')
    }
  }
  
  const handleDelete = async (id: number) => {
    if (!confirm('정말로 이 문의를 삭제하시겠습니까?')) return
    
    try {
      if (isDemo) {
        demoStorage.deleteContact(id)
        await fetchContacts()
      } else {
        alert('Supabase 모드에서는 삭제가 지원되지 않습니다.')
      }
    } catch (err) {
      alert('삭제에 실패했습니다.')
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
  
  // Filter contacts based on search and date
  const filteredContacts = useMemo(() => {
    let filtered = contacts
    
    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(contact => 
        contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.message.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    
    // Date filter
    if (dateFilter !== 'all') {
      const now = new Date()
      filtered = filtered.filter(contact => {
        const contactDate = new Date(contact.created_at!)
        const diffTime = now.getTime() - contactDate.getTime()
        const diffDays = diffTime / (1000 * 60 * 60 * 24)
        
        switch (dateFilter) {
          case 'today': return diffDays < 1
          case 'week': return diffDays < 7
          case 'month': return diffDays < 30
          default: return true
        }
      })
    }
    
    return filtered
  }, [contacts, searchTerm, dateFilter])
  
  // Export to CSV
  const exportToCSV = () => {
    const headers = ['ID', '이름', '이메일', '메시지', '상태', '생성일시']
    const csvContent = [
      headers.join(','),
      ...filteredContacts.map(contact => [
        contact.id,
        `"${contact.name}"`,
        contact.email,
        `"${contact.message.replace(/"/g, '""')}"`,
        contact.status,
        new Date(contact.created_at!).toLocaleString('ko-KR')
      ].join(','))
    ].join('\n')
    
    const blob = new Blob([`\uFEFF${csvContent}`], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `contacts_${new Date().toISOString().split('T')[0]}.csv`
    link.click()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-bold text-white">문의 관리</h1>
            {isDemo && (
              <span className="px-4 py-2 bg-yellow-500/20 text-yellow-400 rounded-full text-sm font-medium border border-yellow-500/30">
                데모 모드
              </span>
            )}
          </div>
          
          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700"
            >
              <div className="flex items-center justify-between mb-4">
                <BarChart3 className="w-8 h-8 text-purple-500" />
                <span className="text-2xl font-bold text-white">{stats.total}</span>
              </div>
              <p className="text-gray-400">전체 문의</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700"
            >
              <div className="flex items-center justify-between mb-4">
                <Clock className="w-8 h-8 text-blue-500" />
                <span className="text-2xl font-bold text-white">{stats.new}</span>
              </div>
              <p className="text-gray-400">신규 문의</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700"
            >
              <div className="flex items-center justify-between mb-4">
                <TrendingUp className="w-8 h-8 text-green-500" />
                <span className="text-2xl font-bold text-white">{stats.todayCount}</span>
              </div>
              <p className="text-gray-400">오늘 문의</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700"
            >
              <div className="flex items-center justify-between mb-4">
                <MessageSquare className="w-8 h-8 text-orange-500" />
                <span className="text-2xl font-bold text-white">{stats.weekCount}</span>
              </div>
              <p className="text-gray-400">주간 문의</p>
            </motion.div>
          </div>
          
          {/* Search and Filters */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 mb-8 border border-gray-700">
            <div className="flex flex-wrap gap-4 mb-4">
              <div className="flex-1 min-w-[300px]">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="이름, 이메일 또는 메시지 검색..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>
              
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value as any)}
                className="px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="all">전체 기간</option>
                <option value="today">오늘</option>
                <option value="week">최근 7일</option>
                <option value="month">최근 30일</option>
              </select>
              
              <button
                onClick={exportToCSV}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all"
              >
                <Download className="w-4 h-4" />
                CSV 내보내기
              </button>
            </div>
            
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
          ) : filteredContacts.length === 0 ? (
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-12 text-center border border-gray-700">
              <MessageSquare className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400">아직 문의가 없습니다.</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="text-sm text-gray-400 mb-2">
                {searchTerm || dateFilter !== 'all' 
                  ? `${filteredContacts.length}개의 검색 결과` 
                  : `전체 ${contacts.length}개의 문의`}
              </div>
              {filteredContacts.map((contact) => (
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
                    {isDemo && (
                      <button
                        onClick={() => handleDelete(contact.id!)}
                        className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition-all ml-auto"
                      >
                        삭제
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