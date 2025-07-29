# Tailwind CSS Dark Mode Configuration

## 1. 설정 방법 (Class Strategy)

### tailwind.config.js 수정
```javascript
module.exports = {
  darkMode: 'class', // 'class' 전략 사용
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      // 커스텀 다크 모드 색상 추가 가능
    },
  },
  plugins: [],
}
```

## 2. Dark Mode Toggle 구현

### ThemeProvider 컴포넌트
```tsx
'use client'

import { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => {},
})

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    // 초기 테마 설정 (localStorage 또는 시스템 설정)
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light')
    setTheme(initialTheme)
    
    if (initialTheme === 'dark') {
      document.documentElement.classList.add('dark')
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    
    localStorage.setItem('theme', newTheme)
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
```

## 3. 색상 조정 예시

### 텍스트 색상
```css
/* Light mode (default) */
text-gray-900

/* Dark mode */
dark:text-white
dark:text-gray-100
```

### 배경 색상
```css
/* Light mode */
bg-white
bg-gray-50

/* Dark mode */
dark:bg-gray-900
dark:bg-gray-800
```

### 실제 사용 예시
```tsx
<div className="bg-white dark:bg-gray-900">
  <h1 className="text-gray-900 dark:text-white">
    다크 모드 지원 제목
  </h1>
  <p className="text-gray-600 dark:text-gray-400">
    다크 모드에서도 읽기 편한 텍스트
  </p>
  <button className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white">
    버튼
  </button>
</div>
```

## 4. 추천 색상 매핑

### 주요 배경색
- `bg-white` → `dark:bg-gray-900`
- `bg-gray-50` → `dark:bg-gray-800`
- `bg-gray-100` → `dark:bg-gray-700`

### 주요 텍스트색
- `text-gray-900` → `dark:text-white`
- `text-gray-700` → `dark:text-gray-300`
- `text-gray-500` → `dark:text-gray-400`

### 보더 색상
- `border-gray-200` → `dark:border-gray-700`
- `border-gray-300` → `dark:border-gray-600`

## 5. Toggle 버튼 예시
```tsx
import { Moon, Sun } from 'lucide-react'
import { useTheme } from './ThemeProvider'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      aria-label="Toggle dark mode"
    >
      {theme === 'light' ? (
        <Moon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
      ) : (
        <Sun className="w-5 h-5 text-gray-700 dark:text-gray-300" />
      )}
    </button>
  )
}
```