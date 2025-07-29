import React from 'react'
import { motion } from 'framer-motion'
import { 
  SiPython, SiTensorflow, SiReact, SiNextdotjs, 
  SiTypescript, SiDocker, SiGooglecloud, SiStreamlit,
  SiPandas, SiScikitlearn, SiFastapi, SiPostgresql
} from 'react-icons/si'

interface TechItem {
  icon: React.ElementType
  name: string
  color: string
  category: 'AI/ML' | 'Frontend' | 'Backend' | 'Database' | 'Cloud'
}

const TechStack: React.FC = () => {
  const techStack: TechItem[] = [
    // AI/ML
    { icon: SiPython, name: 'Python', color: '#3776AB', category: 'AI/ML' },
    { icon: SiTensorflow, name: 'TensorFlow', color: '#FF6F00', category: 'AI/ML' },
    { icon: SiPandas, name: 'Pandas', color: '#150458', category: 'AI/ML' },
    { icon: SiScikitlearn, name: 'Scikit-learn', color: '#F7931E', category: 'AI/ML' },
    
    // Frontend
    { icon: SiReact, name: 'React', color: '#61DAFB', category: 'Frontend' },
    { icon: SiNextdotjs, name: 'Next.js', color: '#000000', category: 'Frontend' },
    { icon: SiTypescript, name: 'TypeScript', color: '#3178C6', category: 'Frontend' },
    { icon: SiStreamlit, name: 'Streamlit', color: '#FF4B4B', category: 'Frontend' },
    
    // Backend & Cloud
    { icon: SiFastapi, name: 'FastAPI', color: '#009688', category: 'Backend' },
    { icon: SiDocker, name: 'Docker', color: '#2496ED', category: 'Cloud' },
    { icon: SiGooglecloud, name: 'Google Cloud', color: '#4285F4', category: 'Cloud' },
    { icon: SiPostgresql, name: 'PostgreSQL', color: '#4169E1', category: 'Database' },
  ]

  const categories = ['AI/ML', 'Frontend', 'Backend', 'Database', 'Cloud'] as const

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-white mb-4 text-center">
            기술 스택
          </h2>
          <p className="text-gray-400 text-center mb-12">
            20년간 축적한 AI 전문성과 최신 기술 스택
          </p>

          {categories.map((category, categoryIndex) => {
            const categoryTech = techStack.filter(tech => tech.category === category)
            if (categoryTech.length === 0) return null

            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                viewport={{ once: true }}
                className="mb-10"
              >
                <h3 className="text-xl font-semibold text-gray-300 mb-6">{category}</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                  {categoryTech.map((tech, index) => (
                    <motion.div
                      key={tech.name}
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ 
                        duration: 0.3, 
                        delay: categoryIndex * 0.1 + index * 0.05,
                        type: "spring",
                        stiffness: 260,
                        damping: 20
                      }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="group"
                    >
                      <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-6 border border-gray-800 hover:border-gray-600 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10">
                        <div className="flex flex-col items-center">
                          <tech.icon 
                            className="w-12 h-12 mb-3 transition-all duration-300 group-hover:scale-110"
                            style={{ color: tech.color }}
                          />
                          <span className="text-gray-400 text-sm font-medium group-hover:text-white transition-colors">
                            {tech.name}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

export default TechStack