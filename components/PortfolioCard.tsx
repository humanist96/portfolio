import React from 'react'
import { ExternalLink, Github, Globe, Server, Database, Code2 } from 'lucide-react'

interface TechBadgeProps {
  tech: string
}

const TechBadge: React.FC<TechBadgeProps> = ({ tech }) => {
  return (
    <span className="inline-block px-3 py-1 text-xs font-medium bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full">
      {tech}
    </span>
  )
}

interface PortfolioCardProps {
  title: string
  description: string
  techStack: string[]
  projectType?: 'web' | 'api' | 'database' | 'fullstack'
  githubUrl?: string
  liveUrl?: string
}

const PortfolioCard: React.FC<PortfolioCardProps> = ({
  title,
  description,
  techStack,
  projectType = 'fullstack',
  githubUrl,
  liveUrl
}) => {
  const getProjectIcon = () => {
    switch (projectType) {
      case 'web':
        return <Globe className="w-6 h-6" />
      case 'api':
        return <Server className="w-6 h-6" />
      case 'database':
        return <Database className="w-6 h-6" />
      default:
        return <Code2 className="w-6 h-6" />
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 border border-gray-200 dark:border-gray-700">
      {/* Project Type Icon & Title */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="text-purple-600 dark:text-purple-400">
            {getProjectIcon()}
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            {title}
          </h3>
        </div>
        <div className="flex gap-2">
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
              aria-label="View on GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
          )}
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
              aria-label="View live project"
            >
              <ExternalLink className="w-5 h-5" />
            </a>
          )}
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
        {description}
      </p>

      {/* Tech Stack Badges */}
      <div className="flex flex-wrap gap-2 mb-4">
        {techStack.map((tech, index) => (
          <TechBadge key={index} tech={tech} />
        ))}
      </div>

      {/* CTA Link */}
      <a
        href="#"
        className="inline-flex items-center gap-2 text-purple-600 dark:text-purple-400 font-medium hover:text-purple-700 dark:hover:text-purple-300 transition-colors group"
      >
        자세히 보기
        <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </a>
    </div>
  )
}

// Portfolio Grid Component
export const PortfolioGrid: React.FC<{ projects: PortfolioCardProps[] }> = ({ projects }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project, index) => (
        <PortfolioCard key={index} {...project} />
      ))}
    </div>
  )
}

export default PortfolioCard