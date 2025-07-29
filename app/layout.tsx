import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '정경석 - AI & 금융 IT 전문가 포트폴리오',
  description: 'AI와 RAG 시스템 전문가, Koscom 금융 IT 엔지니어. 혁신적인 금융 기술 솔루션과 AI 프로젝트를 소개합니다.',
  keywords: ['정경석', 'AI 전문가', 'RAG 시스템', '금융 IT', 'Koscom', '포트폴리오'],
  authors: [{ name: '정경석' }],
  openGraph: {
    title: '정경석 - AI & 금융 IT 전문가 포트폴리오',
    description: 'AI와 RAG 시스템 전문가, Koscom 금융 IT 엔지니어',
    type: 'website',
    locale: 'ko_KR',
    siteName: '정경석 포트폴리오',
  },
  twitter: {
    card: 'summary_large_image',
    title: '정경석 - AI & 금융 IT 전문가',
    description: 'AI와 RAG 시스템 전문가, Koscom 금융 IT 엔지니어',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className={inter.className}>{children}</body>
    </html>
  )
}