import { PortfolioCardProps } from './PortfolioCard'

export const kevinProjects: PortfolioCardProps[] = [
  {
    title: '아파트 급매물 검색 서비스',
    description: 'AI 기반 급매물 자동 탐지 시스템. 시세 대비 저평가된 매물을 실시간으로 분석하여 투자 기회를 제공합니다.',
    techStack: ['Python', 'Streamlit', 'Pandas', 'AI/ML'],
    projectType: 'fullstack',
    liveUrl: 'https://kevin-urgent-sale.streamlit.app'
  },
  {
    title: 'AI 금융 데이터 분석 플랫폼',
    description: '금융 IT 기업을 위한 대규모 데이터 분석 플랫폼. 머신러닝을 활용한 예측 모델과 실시간 대시보드를 제공합니다.',
    techStack: ['TensorFlow', 'Python', 'FastAPI', 'PostgreSQL'],
    projectType: 'api',
    githubUrl: '#'
  },
  {
    title: '부동산 투자 수익률 계산기',
    description: '15년 투자 경험을 바탕으로 개발한 정밀 수익률 계산기. 세금, 대출, 관리비 등 모든 변수를 고려한 정확한 분석을 제공합니다.',
    techStack: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS'],
    projectType: 'web',
    githubUrl: '#',
    liveUrl: '#'
  },
  {
    title: 'AI 강의 플랫폼',
    description: '금융 종사자를 위한 AI 교육 플랫폼. 5년간의 강의 경험을 바탕으로 실무 중심의 커리큘럼을 제공합니다.',
    techStack: ['Next.js', 'Node.js', 'MongoDB', 'WebRTC'],
    projectType: 'fullstack',
    githubUrl: '#'
  },
  {
    title: '지피터스 재테크 분석 도구',
    description: '지피터스 9기 재테크 서포터로 활동하며 개발한 투자 분석 도구. 데이터 기반의 투자 의사결정을 지원합니다.',
    techStack: ['Python', 'Jupyter', 'Plotly', 'Streamlit'],
    projectType: 'web',
    liveUrl: '#'
  },
  {
    title: 'RAG 기반 금융 문서 검색 시스템',
    description: '대용량 금융 문서에서 정확한 정보를 빠르게 검색하는 AI 시스템. 자연어 처리와 벡터 검색을 활용합니다.',
    techStack: ['LangChain', 'OpenAI', 'Pinecone', 'FastAPI'],
    projectType: 'api',
    githubUrl: '#'
  }
]