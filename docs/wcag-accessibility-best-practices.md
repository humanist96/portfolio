# WCAG AA Accessibility Best Practices for React/Tailwind

## 1. 색상 대비 (Color Contrast)

### 최소 대비율 준수
- **일반 텍스트**: 4.5:1 이상
- **큰 텍스트 (18pt/24px 이상)**: 3:1 이상

### 구현 예시
```tsx
// ❌ 나쁜 예: 낮은 대비
<p className="text-gray-400 bg-gray-100">읽기 어려운 텍스트</p>

// ✅ 좋은 예: 충분한 대비
<p className="text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-900">
  읽기 쉬운 텍스트
</p>

// 상태 표시에도 색상만 의존하지 않기
<button className="bg-red-500 text-white flex items-center gap-2">
  <XCircle className="w-5 h-5" /> {/* 아이콘 추가 */}
  삭제
</button>
```

## 2. 키보드 내비게이션 (Keyboard Navigation)

### 포커스 관리
```tsx
// 포커스 표시자 스타일링
<button className="
  px-4 py-2 bg-blue-500 text-white rounded
  focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2
  hover:bg-blue-600 transition-colors
">
  클릭하세요
</button>

// 스킵 링크 구현
<a href="#main-content" className="
  sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4
  bg-blue-600 text-white px-4 py-2 rounded
">
  메인 콘텐츠로 건너뛰기
</a>

// 탭 순서 관리
<form>
  <input tabIndex={1} type="text" />
  <input tabIndex={2} type="email" />
  <button tabIndex={3}>제출</button>
</form>
```

## 3. ARIA 레이블 (ARIA Labels)

### 의미있는 레이블 제공
```tsx
// 아이콘 버튼
<button aria-label="메뉴 열기" className="p-2">
  <Menu className="w-6 h-6" />
</button>

// 폼 요소
<div>
  <label htmlFor="email" className="sr-only">이메일 주소</label>
  <input
    id="email"
    type="email"
    aria-describedby="email-error"
    aria-invalid={hasError}
    placeholder="이메일을 입력하세요"
  />
  {hasError && (
    <p id="email-error" className="text-red-500 text-sm mt-1">
      유효한 이메일 주소를 입력해주세요
    </p>
  )}
</div>

// 동적 콘텐츠
<div aria-live="polite" aria-atomic="true">
  {loading && <p>로딩 중...</p>}
  {message && <p>{message}</p>}
</div>
```

## 4. 시맨틱 HTML 활용

### 올바른 HTML 요소 사용
```tsx
// ❌ 나쁜 예
<div onClick={handleClick}>클릭하세요</div>

// ✅ 좋은 예
<button onClick={handleClick}>클릭하세요</button>

// 페이지 구조
<header>
  <nav aria-label="주 메뉴">
    <ul>
      <li><a href="/">홈</a></li>
      <li><a href="/about">소개</a></li>
    </ul>
  </nav>
</header>

<main id="main-content">
  <h1>페이지 제목</h1>
  <section aria-labelledby="section-title">
    <h2 id="section-title">섹션 제목</h2>
  </section>
</main>
```

## 5. 반응형 및 확대 지원

### 텍스트 확대 대응
```tsx
// rem 단위 사용으로 브라우저 확대 지원
<p className="text-base md:text-lg"> {/* 16px → 18px */}
  브라우저 설정에 따라 확대됩니다
</p>

// 고정 높이 대신 min-height 사용
<div className="min-h-screen p-4">
  {/* 콘텐츠가 늘어나도 잘림 없음 */}
</div>

// 터치 타겟 최소 크기 확보 (44x44px)
<button className="min-w-[44px] min-h-[44px] p-3">
  <Icon className="w-5 h-5" />
</button>
```

## 검증 도구
- **axe DevTools**: Chrome/Firefox 확장 프로그램
- **WAVE**: 웹 접근성 평가 도구
- **Lighthouse**: Chrome DevTools 내장
- **NVDA/JAWS**: 스크린 리더 테스트