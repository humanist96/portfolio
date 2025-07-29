import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '정케빈 - AI 전문가 & 부동산 투자 컨설턴트',
  description: 'AI 20년, 부동산 투자 15년 경력. 전산학 박사, 금융 IT 데이터 분석가, AI 강사. 혁신적인 부동산 분석 서비스 제공.',
  keywords: ['정케빈', 'Kevin Jung', 'AI 전문가', '부동산 투자', '금융 IT', '데이터 분석', '지피터스'],
  authors: [{ name: '정케빈 (Kevin Jung)' }],
  openGraph: {
    title: '정케빈 - AI 전문가 & 부동산 투자 컨설턴트',
    description: 'AI 20년, 부동산 투자 15년 경력. 혁신적인 부동산 분석 서비스 제공.',
    type: 'website',
    locale: 'ko_KR',
    siteName: '정케빈 포트폴리오',
  },
  twitter: {
    card: 'summary_large_image',
    title: '정케빈 - AI 전문가 & 부동산 투자 컨설턴트',
    description: 'AI 20년, 부동산 투자 15년 경력. 혁신적인 부동산 분석 서비스 제공.',
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