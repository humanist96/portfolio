import React from 'react'

const AboutSection: React.FC = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">About</h2>
      <div className="prose prose-lg dark:prose-invert mx-auto text-center">
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          정경석은 정보통신전자공학을 전공하고 AI와 RAG 시스템 분야의 전문가로 활동하고 있습니다. 
          현재 Koscom에서 금융 IT 엔지니어로 근무하며, 동시에 기술 강사로서 지식을 공유하고 있습니다. 
          복잡한 금융 시스템과 최신 AI 기술을 융합하여 혁신적인 솔루션을 개발하는 데 열정을 쏟고 있습니다.
        </p>
      </div>
    </section>
  )
}

export default AboutSection