import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Award, BookOpen, Users, Briefcase, Brain, Home } from 'lucide-react'

const AboutSectionUpdated: React.FC = () => {
  const achievements = [
    { icon: Award, text: "전산학 박사 (AI 전공)" },
    { icon: Briefcase, text: "금융 IT 데이터 분석 담당" },
    { icon: BookOpen, text: "5년차 금융 AI 강사" },
    { icon: Users, text: "지피터스 재테크/내집마련 파트너" }
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-white mb-12 text-center">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Kevin</span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Profile Image Section */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative w-80 h-80 mx-auto">
                {/* Gradient Circle Background */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-2xl opacity-50 animate-pulse" />
                
                {/* Profile Image Container */}
                <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white/20 backdrop-blur-sm group">
                  <Image
                    src="/정케빈.jpg"
                    alt="정케빈 (Kevin Jung) - AI 전문가 & 부동산 투자 컨설턴트"
                    width={320}
                    height={320}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    priority
                    onError={(e) => {
                      // Hide image and show fallback
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const fallback = target.nextElementSibling;
                      if (fallback) fallback.classList.remove('hidden');
                    }}
                  />
                  <div className="hidden w-full h-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center absolute inset-0">
                    <div className="text-center">
                      <div className="text-white text-6xl font-bold mb-2">KJ</div>
                      <div className="text-white/80 text-sm">Kevin Jung</div>
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <motion.div
                  className="absolute -top-4 -right-4 bg-blue-500 rounded-full p-3 shadow-lg"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Brain className="w-6 h-6 text-white" />
                </motion.div>
                <motion.div
                  className="absolute -bottom-4 -left-4 bg-purple-500 rounded-full p-3 shadow-lg"
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 3, delay: 1, repeat: Infinity }}
                >
                  <Home className="w-6 h-6 text-white" />
                </motion.div>
              </div>
            </motion.div>

            {/* Content Section */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                안녕하세요, <span className="text-white font-semibold">정케빈</span>입니다.
                <br /><br />
                AI 관련 직업 <span className="text-blue-400 font-semibold">20년</span>, 
                부동산 실전 투자 경력 <span className="text-purple-400 font-semibold">15년</span>의 
                경험을 바탕으로 투자 인사이트를 공유하고 있습니다.
                <br /><br />
                금융과 기술의 융합을 통해 더 나은 투자 의사결정을 돕고, 
                AI 기술을 활용한 혁신적인 부동산 분석 서비스를 제공하고 있습니다.
              </p>

              {/* Achievements Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {achievements.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3 bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10"
                  >
                    <item.icon className="w-5 h-5 text-purple-400 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">{item.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default AboutSectionUpdated