<template>
  <div class="home">
    <!-- Hero Section - Minimal Fullscreen Background -->
    <section ref="heroRef" class="hero">
      <!-- Fullscreen background image -->
      <div class="hero__bg">
        <img
          :src="`${baseUrl}images/hero-bg.jpg`"
          alt="초연 돌상 스타일링"
          class="hero__bg-img"
        />
        <!-- Layer 1: Base dark scrim -->
        <div class="hero__bg-scrim"></div>
        <!-- Layer 2: Center readability zone (darker behind text) -->
        <div class="hero__bg-focus"></div>
      </div>

      <!-- Minimal vertical accent -->
      <div class="hero__deco-left deco-vertical-text">
        <span class="hero__deco-char">初</span>
        <span class="hero__deco-char">緣</span>
      </div>

      <div class="hero__content" ref="contentRef">
        <span class="hero__eyebrow reveal-item">Traditional Table Styling</span>
        <h1 class="hero__title reveal-item">
          <span class="hero__title-line">첫 번째 생일,</span>
          <span class="hero__title-line"><span class="hero__title-accent">초연</span>과 함께</span>
        </h1>
        <p class="hero__desc reveal-item">
          처음 맺는 소중한 인연이라는 뜻을 담아<br>
          정성을 다해 준비합니다.
        </p>
        <div class="hero__actions reveal-item">
          <RouterLink to="/gallery/dol" class="btn btn--light hero__btn">
            <span class="btn__text">갤러리 보기</span>
          </RouterLink>
          <RouterLink to="/inquiry/estimate" class="btn btn--gold hero__btn">
            <span class="btn__text">견적 문의</span>
          </RouterLink>
        </div>
      </div>

      <div class="hero__scroll-hint" :class="{ 'is-hidden': scrollProgress > 0.3 }">
        <span class="hero__scroll-text">Scroll</span>
        <div class="hero__scroll-line" :style="{ transform: `scaleY(${1 - scrollProgress})` }"></div>
      </div>
    </section>

    <!-- Philosophy Section -->
    <section class="philosophy section section--hanji">
      <div class="container">
        <div class="philosophy__inner">
          <div class="philosophy__content">
            <span class="section-heading__eyebrow">Our Philosophy</span>
            <h2 class="philosophy__title">단아하고 기품있는 상차림</h2>
            <div class="deco-gold-line"></div>
            <p class="philosophy__desc">
              화려함보다는 피사체인 아이가 돋보일 수 있도록<br>
              절제된 색감과 고급스러운 소품을 사용합니다.
            </p>
            <p class="philosophy__desc">
              전통의 멋과 현대적인 감각이 어우러진<br>
              초연만의 스타일을 만나보세요.
            </p>
          </div>
          <div class="philosophy__visual">
            <div class="philosophy__image">
              <img
                :src="`${baseUrl}images/4.jpg`"
                alt="단아한 상차림"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Services Section - Editorial Style -->
    <section class="services section">
      <div class="container">
        <div class="services__editorial">
          <!-- Left: Editorial List -->
          <div class="services__list">
            <div class="services__header">
              <span class="services__eyebrow">Services</span>
              <h2 class="services__title">초연의 서비스</h2>
            </div>

            <nav class="services__nav">
              <RouterLink
                v-for="(service, index) in services"
                :key="service.key"
                :to="service.to"
                class="services__item"
                @mouseenter="activeServiceIndex = index"
                @mouseleave="activeServiceIndex = 0"
                @focus="activeServiceIndex = index"
              >
                <span class="services__item-index">{{ String(index + 1).padStart(2, '0') }}</span>
                <div class="services__item-content">
                  <h3 class="services__item-title">{{ service.title }}</h3>
                  <p class="services__item-desc">{{ service.desc }}</p>
                </div>
                <svg class="services__item-arrow" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </RouterLink>
            </nav>
          </div>

          <!-- Right: Sticky Preview Panel -->
          <div class="services__preview">
            <div class="services__preview-sticky">
              <div class="services__preview-frame">
                <div
                  v-for="(service, index) in services"
                  :key="`preview-${service.key}`"
                  class="services__preview-image"
                  :class="{ 'is-active': activeServiceIndex === index }"
                >
                  <img :src="service.image" :alt="service.title" loading="lazy" />
                </div>
                <div class="services__preview-caption">
                  <span class="services__preview-tag">{{ services[activeServiceIndex]?.tag || 'Premium' }}</span>
                  <span class="services__preview-name">{{ services[activeServiceIndex]?.title }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Mobile: Tap Preview Panel -->
        <div
          class="services__mobile-preview"
          :class="{ 'is-visible': mobilePreviewVisible }"
          @click="mobilePreviewVisible = false"
        >
          <div class="services__mobile-preview-content" @click.stop>
            <button class="services__mobile-preview-close" @click="mobilePreviewVisible = false">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
            <img :src="services[activeServiceIndex]?.image" :alt="services[activeServiceIndex]?.title" />
            <div class="services__mobile-preview-info">
              <span class="services__preview-tag">{{ services[activeServiceIndex]?.tag || 'Premium' }}</span>
              <h4>{{ services[activeServiceIndex]?.title }}</h4>
              <p>{{ services[activeServiceIndex]?.desc }}</p>
              <RouterLink :to="services[activeServiceIndex]?.to || '/'" class="btn btn--gold">
                자세히 보기
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Gallery Preview Section -->
    <section class="gallery-preview section section--hanji">
      <div class="container">
        <div class="gallery-preview__header">
          <div class="section-heading">
            <span class="section-heading__eyebrow">Gallery</span>
            <h2 class="section-heading__title">스타일링 갤러리</h2>
            <p class="section-heading__desc">
              아이의 분위기에 맞는 스타일을 선택하세요
            </p>
          </div>
          <RouterLink to="/gallery/dol" class="btn btn--ghost gallery-preview__more">
            전체 보기
          </RouterLink>
        </div>

        <div class="gallery-preview__grid animate-stagger">
          <RouterLink
            v-for="item in previewItems"
            :key="item.id"
            :to="`/gallery/${item.category}/${item.id}`"
            class="gallery-card"
            @mousemove="handleMouseMove"
            @mouseleave="handleMouseLeave"
          >
            <div class="gallery-card__image">
              <img :src="item.image" :alt="item.title" loading="lazy" />
            </div>
            <div class="gallery-card__content">
              <h3 class="gallery-card__title">{{ item.title }}</h3>
              <p class="gallery-card__subtitle">{{ item.subtitle }}</p>
              <div class="gallery-card__tags">
                <span v-for="tag in item.tags" :key="tag" class="tag">{{ tag }}</span>
              </div>
            </div>
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- Notice Section -->
    <section class="notice-section section">
      <div class="container">
        <div class="notice-section__inner">
          <div class="notice-section__content">
            <div class="section-heading">
              <span class="section-heading__eyebrow">Notice</span>
              <h2 class="section-heading__title">공지사항</h2>
            </div>
            <div class="notice-list">
              <RouterLink
                v-for="notice in recentNotices"
                :key="notice.id"
                :to="`/notices/${notice.id}`"
                class="notice-item"
              >
                <time class="notice-item__date">{{ formatDate(notice.date) }}</time>
                <h4 class="notice-item__title">{{ notice.title }}</h4>
                <p class="notice-item__excerpt">{{ notice.excerpt }}</p>
              </RouterLink>
            </div>
            <RouterLink to="/notices" class="btn btn--ghost notice-section__more">
              더보기
            </RouterLink>
          </div>

          <div class="notice-section__cta">
            <div class="cta-card">
              <span class="cta-card__eyebrow">Contact</span>
              <h3 class="cta-card__title">나만의 맞춤<br>돌상 문의</h3>
              <p class="cta-card__desc">
                원하시는 날짜와 장소, 컨셉을 남겨주시면<br>
                빠르고 친절하게 상담 도와드리겠습니다.
              </p>
              <div class="cta-card__actions">
                <RouterLink to="/inquiry/estimate" class="btn btn--primary">
                  견적 문의
                </RouterLink>
                <a href="#" class="btn btn--ghost cta-card__kakao">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 3C6.48 3 2 6.58 2 11c0 2.83 1.89 5.31 4.73 6.72-.17.62-.65 2.25-.74 2.6-.12.45.16.44.34.32.14-.09 2.23-1.51 3.13-2.12.51.07 1.04.11 1.58.11 5.52 0 10-3.58 10-8s-4.48-8-10-8z"/>
                  </svg>
                  카카오톡 상담
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue';
import { RouterLink } from 'vue-router';
import { galleryItems } from '@/data/galleryData';
import { notices } from '@/data/notices';

// Base URL for public assets
const baseUrl = import.meta.env.BASE_URL;

// ============================================
// HERO SECTION - Scroll & Reveal
// ============================================

const heroRef = ref<HTMLElement | null>(null);
const contentRef = ref<HTMLElement | null>(null);

// Scroll progress for scroll hint
const scrollProgress = ref(0);

// Scroll progress tracking
const handleScroll = () => {
  if (!heroRef.value) return;
  const rect = heroRef.value.getBoundingClientRect();
  const progress = Math.max(0, Math.min(1, -rect.top / rect.height));
  scrollProgress.value = progress;
};

// Intersection Observer for reveal animations
let revealObserver: IntersectionObserver | null = null;

const setupRevealObserver = () => {
  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  );

  const items = contentRef.value?.querySelectorAll('.reveal-item');
  items?.forEach((item) => revealObserver?.observe(item));
};

onMounted(() => {
  // Setup scroll listener
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // Setup reveal animations
  setupRevealObserver();
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  revealObserver?.disconnect();
});

// ============================================
// SERVICES SECTION - Editorial Style
// ============================================

const activeServiceIndex = ref(0);
const mobilePreviewVisible = ref(false);

const services = [
  {
    key: 'dol',
    to: '/gallery/dol',
    title: '돌잔치 스타일링',
    desc: '전통과 현대가 어우러진 품격 있는 돌상 연출',
    image: `${baseUrl}images/1.jpg`,
    tag: 'Signature',
  },
  {
    key: 'place',
    to: '/gallery/place',
    title: '장소 협찬',
    desc: '아이와 가족이 빛나는 공간 큐레이션',
    image: `${baseUrl}images/2.jpg`,
    tag: 'Curation',
  },
  {
    key: 'hanbok',
    to: '/gallery/hanbok',
    title: '한복 대여',
    desc: '품위 있는 실루엣의 프리미엄 한복',
    image: `${baseUrl}images/3.png`,
    tag: 'Premium',
  },
];

// ============================================
// REST OF PAGE DATA
// ============================================

const previewItems = computed(() => {
  // Get 2 from dol, 2 from place, 2 from hanbok
  const dol = galleryItems.filter((i) => i.category === 'dol').slice(0, 2);
  const place = galleryItems.filter((i) => i.category === 'place').slice(0, 2);
  const hanbok = galleryItems.filter((i) => i.category === 'hanbok').slice(0, 2);
  return [...dol, ...place, ...hanbok].slice(0, 6);
});

const recentNotices = computed(() => notices.slice(0, 3));

const formatDate = (value: string) => {
  const date = new Date(value);
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

// Ink bloom effect
const handleMouseMove = (e: MouseEvent) => {
  const target = e.currentTarget as HTMLElement;
  const rect = target.getBoundingClientRect();
  const x = ((e.clientX - rect.left) / rect.width) * 100;
  const y = ((e.clientY - rect.top) / rect.height) * 100;
  target.style.setProperty('--mouse-x', `${x}%`);
  target.style.setProperty('--mouse-y', `${y}%`);
};

const handleMouseLeave = (e: MouseEvent) => {
  const target = e.currentTarget as HTMLElement;
  target.style.setProperty('--mouse-x', '50%');
  target.style.setProperty('--mouse-y', '50%');
};
</script>

<style scoped>
/* ============================================
   HERO - Minimal Fullscreen Background
   ============================================ */

.hero {
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-4xl) var(--page-padding);
  position: relative;
  overflow: hidden;
}

/* Fullscreen background image */
.hero__bg {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.hero__bg-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 30%;
  filter: brightness(0.9) saturate(0.85);
}

/* Layer 1: Base dark scrim - covers entire image */
.hero__bg-scrim {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(20, 18, 16, 0.5) 0%,
    rgba(20, 18, 16, 0.35) 30%,
    rgba(20, 18, 16, 0.4) 70%,
    rgba(20, 18, 16, 0.6) 100%
  );
}

/* Layer 2: Center focus zone - extra darkness behind text for readability */
.hero__bg-focus {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse 70% 60% at 50% 50%,
    rgba(15, 13, 11, 0.5) 0%,
    rgba(15, 13, 11, 0.3) 40%,
    transparent 70%
  );
}

/* Subtle noise texture */
.hero__bg-focus::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  opacity: 0.06;
  mix-blend-mode: overlay;
  pointer-events: none;
}

/* Mobile: stronger overlay for better readability */
@media (max-width: 768px) {
  .hero__bg-scrim {
    background: linear-gradient(
      180deg,
      rgba(20, 18, 16, 0.6) 0%,
      rgba(20, 18, 16, 0.5) 30%,
      rgba(20, 18, 16, 0.5) 70%,
      rgba(20, 18, 16, 0.7) 100%
    );
  }

  .hero__bg-focus {
    background: radial-gradient(
      ellipse 90% 70% at 50% 45%,
      rgba(15, 13, 11, 0.55) 0%,
      rgba(15, 13, 11, 0.35) 50%,
      transparent 80%
    );
  }
}

/* Minimal vertical accent - single side only */
.hero__deco-left {
  position: absolute;
  top: 50%;
  left: clamp(1.5rem, 4vw, 3rem);
  transform: translateY(-50%);
  writing-mode: vertical-rl;
  font-family: var(--font-display), 'Noto Serif KR', serif;
  font-size: clamp(1rem, 1.8vw, 1.25rem);
  letter-spacing: 0.6em;
  color: rgba(255, 255, 255, 0.4);
  display: flex;
  flex-direction: column;
  gap: 0.4em;
  z-index: 1;
}

.hero__deco-char {
  display: block;
  font-weight: 300;
  text-shadow:
    0 1px 3px rgba(0, 0, 0, 0.6),
    0 4px 12px rgba(0, 0, 0, 0.3);
}

.hero__deco-char:nth-child(2) {
  opacity: 0.7;
}

@media (max-width: 768px) {
  .hero__deco-left {
    color: rgba(255, 255, 255, 0.3);
    font-size: 0.875rem;
    left: 1rem;
  }
}

/* === Hero Content === */
.hero__content {
  text-align: center;
  max-width: 680px;
  position: relative;
  z-index: 2;
  padding: var(--space-2xl) var(--space-lg);
}

/* Reveal animation items */
.reveal-item {
  opacity: 0;
  transform: translateY(20px);
  transition:
    opacity 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94),
    transform 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.reveal-item.is-revealed {
  opacity: 1;
  transform: translateY(0);
}

/* Stagger delays */
.reveal-item:nth-child(1) { transition-delay: 0.2s; }
.reveal-item:nth-child(2) { transition-delay: 0.4s; }
.reveal-item:nth-child(3) { transition-delay: 0.6s; }
.reveal-item:nth-child(4) { transition-delay: 0.8s; }

@media (prefers-reduced-motion: reduce) {
  .reveal-item {
    opacity: 1;
    transform: none;
    transition: none;
  }
}

.hero__eyebrow {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--color-gold, #c9a962);
  margin-bottom: var(--space-xl);
  text-shadow:
    0 1px 2px rgba(0, 0, 0, 0.8),
    0 4px 12px rgba(0, 0, 0, 0.5);
}

.hero__title {
  font-family: var(--font-display), 'Noto Serif KR', serif;
  font-size: clamp(2.5rem, 7vw, 4.5rem);
  font-weight: 400;
  line-height: 1.2;
  margin-bottom: var(--space-xl);
  color: #ffffff;
  letter-spacing: -0.01em;
  text-shadow:
    0 2px 4px rgba(0, 0, 0, 0.8),
    0 4px 16px rgba(0, 0, 0, 0.5),
    0 8px 32px rgba(0, 0, 0, 0.3);
}

.hero__title-line {
  display: block;
}

.hero__title-line:nth-child(2) {
  margin-top: 0.1em;
}

.hero__title-accent {
  font-weight: 600;
  color: var(--color-gold, #c9a962);
  position: relative;
  text-shadow:
    0 2px 4px rgba(0, 0, 0, 0.8),
    0 4px 16px rgba(0, 0, 0, 0.5);
}

.hero__desc {
  font-size: clamp(1rem, 2vw, 1.125rem);
  color: rgba(255, 255, 255, 0.95);
  line-height: 1.9;
  margin-bottom: var(--space-2xl);
  font-weight: 400;
  text-shadow:
    0 1px 3px rgba(0, 0, 0, 0.8),
    0 4px 12px rgba(0, 0, 0, 0.4);
}

/* === Buttons === */
.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-md);
  justify-content: center;
}

.hero__btn {
  backdrop-filter: blur(12px);
  transition: all 0.3s ease;
  font-weight: 500;
  padding: var(--space-md) var(--space-xl);
  min-width: 140px;
  text-align: center;
}

.hero__btn:focus-visible {
  outline: 2px solid var(--color-gold, #c9a962);
  outline-offset: 3px;
}

/* Secondary button - ghost style with strong border */
.btn--light {
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.6);
  color: #ffffff;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
}

.btn--light:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: #ffffff;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
}

/* Primary button - solid gold */
.hero__btn.btn--gold {
  background: var(--color-gold, #c9a962);
  border: 2px solid var(--color-gold, #c9a962);
  color: #1a1714;
  font-weight: 600;
  box-shadow: 0 4px 16px rgba(201, 169, 98, 0.3);
}

.hero__btn.btn--gold:hover {
  background: #d4b46d;
  border-color: #d4b46d;
  transform: translateY(-2px);
  box-shadow: 0 6px 24px rgba(201, 169, 98, 0.4);
}

/* Mobile button adjustments */
@media (max-width: 768px) {
  .hero__btn {
    padding: var(--space-md) var(--space-lg);
    min-width: 130px;
    font-size: 0.875rem;
  }

  .btn--light {
    border-width: 2px;
    background: rgba(255, 255, 255, 0.15);
  }
}

/* === Scroll Hint === */
.hero__scroll-hint {
  position: absolute;
  bottom: var(--space-2xl);
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-sm);
  opacity: 1;
  transition: opacity 0.5s ease, transform 0.5s ease;
  z-index: 2;
}

.hero__scroll-hint.is-hidden {
  opacity: 0;
  transform: translateX(-50%) translateY(10px);
  pointer-events: none;
}

.hero__scroll-text {
  font-size: 0.625rem;
  font-weight: 600;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.8);
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.6);
}

.hero__scroll-line {
  width: 1px;
  height: 48px;
  background: linear-gradient(
    180deg,
    var(--color-gold, #c9a962) 0%,
    rgba(201, 169, 98, 0.3) 60%,
    transparent 100%
  );
  transform-origin: top;
  animation: scrollBreath 3s ease-in-out infinite;
}

@keyframes scrollBreath {
  0%, 100% {
    opacity: 0.5;
  }
  50% {
    opacity: 1;
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero__scroll-line {
    animation: none;
    opacity: 0.7;
  }
}

/* === PHILOSOPHY === */
.philosophy__inner {
  display: grid;
  gap: var(--space-3xl);
  align-items: center;
}

@media (min-width: 768px) {
  .philosophy__inner {
    grid-template-columns: 1fr 1fr;
  }
}

.philosophy__content {
  position: relative;
  z-index: 1;
}

.philosophy__title {
  font-family: var(--font-display);
  font-size: var(--text-3xl);
  font-weight: 400;
  margin-bottom: var(--space-lg);
}

.philosophy__desc {
  font-size: var(--text-base);
  color: var(--color-stone);
  line-height: var(--leading-relaxed);
  margin-top: var(--space-lg);
}

.philosophy__visual {
  position: relative;
}

.philosophy__image {
  aspect-ratio: 4 / 5;
  max-width: 400px;
  margin-inline: auto;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
}

.philosophy__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

@media (min-width: 768px) {
  .philosophy__image {
    transform: translateX(20px);
  }
}

/* ============================================
   SERVICES - Editorial Style
   ============================================ */

.services {
  background: var(--color-hanji, #f4ede3);
}

.services__editorial {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-2xl);
}

@media (min-width: 1024px) {
  .services__editorial {
    grid-template-columns: 1fr 1fr;
    gap: var(--space-3xl);
    align-items: start;
  }
}

/* Left: Editorial List */
.services__list {
  padding: var(--space-lg) 0;
}

.services__header {
  margin-bottom: var(--space-2xl);
  padding-bottom: var(--space-lg);
  border-bottom: 1px solid rgba(44, 40, 36, 0.1);
}

.services__eyebrow {
  display: block;
  font-size: 0.6875rem;
  font-weight: 500;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--color-gold-deep, #a68a4c);
  margin-bottom: var(--space-sm);
}

.services__title {
  font-family: 'Cormorant Garamond', var(--font-display), serif;
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: 400;
  color: var(--color-ink, #2c2824);
  letter-spacing: -0.02em;
}

/* Navigation Items */
.services__nav {
  display: flex;
  flex-direction: column;
}

.services__item {
  display: flex;
  align-items: center;
  gap: var(--space-lg);
  padding: var(--space-xl) var(--space-md);
  border-bottom: 1px solid rgba(44, 40, 36, 0.08);
  text-decoration: none;
  color: inherit;
  transition:
    background-color 0.3s ease,
    padding-left 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  position: relative;
}

.services__item::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  background: var(--color-gold, #c9a962);
  transform: scaleY(0);
  transition: transform 0.3s ease;
}

.services__item:hover,
.services__item:focus {
  background-color: rgba(44, 40, 36, 0.03);
  padding-left: var(--space-xl);
}

.services__item:hover::before,
.services__item:focus::before {
  transform: scaleY(1);
}

.services__item:focus-visible {
  outline: 2px solid var(--color-gold, #c9a962);
  outline-offset: -2px;
}

.services__item-index {
  font-family: 'Cormorant Garamond', serif;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-gold, #c9a962);
  opacity: 0.8;
  min-width: 2rem;
}

.services__item-content {
  flex: 1;
}

.services__item-title {
  font-family: 'Cormorant Garamond', var(--font-display), serif;
  font-size: clamp(1.25rem, 2.5vw, 1.75rem);
  font-weight: 500;
  color: var(--color-ink, #2c2824);
  margin-bottom: 0.25rem;
  transition: color 0.3s ease;
}

.services__item:hover .services__item-title {
  color: var(--color-gold-deep, #a68a4c);
}

.services__item-desc {
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 0.875rem;
  font-weight: 300;
  color: var(--color-stone, #6b5c4c);
  line-height: 1.6;
}

.services__item-arrow {
  color: var(--color-stone, #6b5c4c);
  opacity: 0;
  transform: translateX(-8px);
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

.services__item:hover .services__item-arrow {
  opacity: 1;
  transform: translateX(0);
}

/* Right: Sticky Preview Panel */
.services__preview {
  display: none;
}

@media (min-width: 1024px) {
  .services__preview {
    display: block;
  }
}

.services__preview-sticky {
  position: sticky;
  top: calc(var(--space-3xl) + 80px);
}

.services__preview-frame {
  position: relative;
  aspect-ratio: 4 / 5;
  background: var(--color-ink, #2c2824);
  overflow: hidden;
}

.services__preview-frame::before {
  content: '';
  position: absolute;
  inset: 12px;
  border: 1px solid rgba(201, 169, 98, 0.3);
  z-index: 2;
  pointer-events: none;
}

.services__preview-image {
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 0.5s ease;
}

.services__preview-image.is-active {
  opacity: 1;
}

.services__preview-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.95) saturate(0.95);
}

.services__preview-caption {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: var(--space-xl);
  background: linear-gradient(to top, rgba(20, 18, 16, 0.85) 0%, transparent 100%);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  z-index: 3;
}

.services__preview-tag {
  font-size: 0.625rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--color-gold, #c9a962);
}

.services__preview-name {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.5rem;
  font-weight: 400;
  color: #ffffff;
}

/* Mobile Preview Panel */
.services__mobile-preview {
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(20, 18, 16, 0.9);
  z-index: 1000;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease;
}

.services__mobile-preview.is-visible {
  opacity: 1;
  visibility: visible;
}

@media (max-width: 1023px) {
  .services__mobile-preview {
    display: flex;
    align-items: flex-end;
    justify-content: center;
  }
}

.services__mobile-preview-content {
  background: var(--color-hanji, #f4ede3);
  width: 100%;
  max-height: 85vh;
  border-radius: 16px 16px 0 0;
  overflow: hidden;
  transform: translateY(100%);
  transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.services__mobile-preview.is-visible .services__mobile-preview-content {
  transform: translateY(0);
}

.services__mobile-preview-content img {
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
}

.services__mobile-preview-info {
  padding: var(--space-xl);
}

.services__mobile-preview-info h4 {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.5rem;
  margin: var(--space-sm) 0;
  color: var(--color-ink, #2c2824);
}

.services__mobile-preview-info p {
  font-size: 0.9375rem;
  color: var(--color-stone, #6b5c4c);
  margin-bottom: var(--space-lg);
  line-height: 1.7;
}

.services__mobile-preview-close {
  position: absolute;
  top: var(--space-md);
  right: var(--space-md);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-ink, #2c2824);
  transition: background 0.2s ease;
}

.services__mobile-preview-close:hover {
  background: #ffffff;
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .services__item,
  .services__item-arrow,
  .services__preview-image {
    transition: none;
  }
}

/* === GALLERY PREVIEW === */
.gallery-preview__header {
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
  margin-bottom: var(--space-2xl);
}

@media (min-width: 768px) {
  .gallery-preview__header {
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
  }
}

.gallery-preview__more {
  align-self: flex-start;
}

.gallery-preview__grid {
  display: grid;
  gap: var(--space-xl);
  grid-template-columns: repeat(2, 1fr);
}

@media (min-width: 768px) {
  .gallery-preview__grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* === NOTICE SECTION === */
.notice-section__inner {
  display: grid;
  gap: var(--space-3xl);
}

@media (min-width: 768px) {
  .notice-section__inner {
    grid-template-columns: 1.5fr 1fr;
  }
}

.notice-list {
  margin-bottom: var(--space-xl);
}

.notice-section__more {
  align-self: flex-start;
}

/* CTA Card */
.cta-card {
  background: linear-gradient(145deg, var(--color-ink-deep) 0%, var(--color-ink) 100%);
  color: var(--color-hanji);
  padding: var(--space-2xl);
  position: relative;
  overflow: hidden;
}

.cta-card::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 200px;
  height: 200px;
  background: radial-gradient(circle, rgba(201, 169, 98, 0.1) 0%, transparent 70%);
  pointer-events: none;
}

.cta-card__eyebrow {
  display: block;
  font-size: var(--text-xs);
  letter-spacing: var(--tracking-widest);
  text-transform: uppercase;
  color: var(--color-gold);
  margin-bottom: var(--space-md);
}

.cta-card__title {
  font-family: var(--font-display);
  font-size: var(--text-2xl);
  font-weight: 400;
  line-height: var(--leading-snug);
  margin-bottom: var(--space-lg);
  color: var(--color-hanji);
}

.cta-card__desc {
  font-size: var(--text-sm);
  color: var(--color-mist);
  line-height: var(--leading-relaxed);
  margin-bottom: var(--space-xl);
}

.cta-card__actions {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.cta-card__kakao {
  color: var(--color-mist);
  border-color: var(--color-ink-soft);
}

.cta-card__kakao:hover {
  color: var(--color-hanji);
  border-color: var(--color-mist);
}
</style>
