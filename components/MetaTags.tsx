import Head from 'next/head'

interface MetaTagsProps {
  title?: string
  description?: string
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player'
  canonicalUrl?: string
  keywords?: string[]
}

const MetaTags: React.FC<MetaTagsProps> = ({
  title = '정경석 - AI & 금융 IT 전문가 포트폴리오',
  description = 'AI와 RAG 시스템 전문가, Koscom 금융 IT 엔지니어. 혁신적인 금융 기술 솔루션과 AI 프로젝트를 소개합니다.',
  ogTitle,
  ogDescription,
  ogImage = '/og-image.png',
  twitterCard = 'summary_large_image',
  canonicalUrl,
  keywords = ['정경석', 'AI 전문가', 'RAG 시스템', '금융 IT', 'Koscom', '포트폴리오', '정보통신전자공학']
}) => {
  // Use custom OG values or fall back to regular title/description
  const metaOgTitle = ogTitle || title
  const metaOgDescription = ogDescription || description

  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      
      {/* Keywords */}
      {keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(', ')} />
      )}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={metaOgTitle} />
      <meta property="og:description" content={metaOgDescription} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content="ko_KR" />
      <meta property="og:site_name" content="정경석 포트폴리오" />
      
      {/* Twitter */}
      <meta property="twitter:card" content={twitterCard} />
      <meta property="twitter:title" content={metaOgTitle} />
      <meta property="twitter:description" content={metaOgDescription} />
      <meta property="twitter:image" content={ogImage} />

      {/* Canonical URL */}
      {canonicalUrl && (
        <link rel="canonical" href={canonicalUrl} />
      )}

      {/* Additional Meta Tags */}
      <meta name="author" content="정경석" />
      <meta name="robots" content="index, follow" />
      <meta httpEquiv="Content-Language" content="ko" />
      
      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      
      {/* Theme Color */}
      <meta name="theme-color" content="#7C3AED" />
    </Head>
  )
}

export default MetaTags