'use client'

import React from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from './ThemeProvider'
import { motion } from 'framer-motion'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      className="fixed top-4 right-4 z-50 p-3 rounded-full bg-gray-900/80 dark:bg-gray-100/80 backdrop-blur-sm border border-gray-700 dark:border-gray-300 hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors duration-200"
      aria-label="Toggle dark mode"
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === 'dark' ? 0 : 180 }}
        transition={{ duration: 0.3 }}
      >
        {theme === 'light' ? (
          <Moon className="w-5 h-5 text-gray-900" />
        ) : (
          <Sun className="w-5 h-5 text-gray-100" />
        )}
      </motion.div>
    </motion.button>
  )
}