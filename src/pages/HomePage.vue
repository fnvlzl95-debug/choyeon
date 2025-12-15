<template>
  <div class="home">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero__deco-left deco-vertical-text">初緣</div>
      <div class="hero__deco-right deco-vertical-text">傳統</div>

      <div class="hero__content animate-stagger">
        <span class="hero__eyebrow">Traditional Table Styling</span>
        <h1 class="hero__title">
          첫 번째 생일,<br>
          <span class="hero__title-accent">초연</span>과 함께
        </h1>
        <p class="hero__desc">
          처음 맺는 소중한 인연이라는 뜻을 담아<br>
          정성을 다해 준비합니다.
        </p>
        <div class="hero__actions">
          <RouterLink to="/gallery/dol" class="btn btn--secondary">
            갤러리 보기
          </RouterLink>
          <RouterLink to="/inquiry/estimate" class="btn btn--gold">
            견적 문의
          </RouterLink>
        </div>
      </div>

      <!-- Decorative images -->
      <div class="hero__visuals">
        <div class="hero__image hero__image--main">
          <img
            src="https://images.unsplash.com/photo-1617104678098-de229db51175?w=600&q=80"
            alt="돌상 스타일링"
            loading="lazy"
          />
        </div>
        <div class="hero__image hero__image--sub">
          <img
            src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80"
            alt="한복"
            loading="lazy"
          />
        </div>
      </div>

      <div class="hero__scroll-hint">
        <span>Scroll</span>
        <div class="hero__scroll-line"></div>
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
                src="https://images.unsplash.com/photo-1545048702-79362596cdc9?w=600&q=80"
                alt="단아한 상차림"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Services Section -->
    <section class="services section">
      <div class="container">
        <div class="section-heading section-heading--center">
          <span class="section-heading__eyebrow">Services</span>
          <h2 class="section-heading__title">초연의 서비스</h2>
          <p class="section-heading__desc">
            돌잔치 상차림부터 장소, 한복까지 원스톱으로 준비해 드립니다.
          </p>
        </div>

        <div class="services__grid">
          <RouterLink
            v-for="service in services"
            :key="service.key"
            :to="service.to"
            class="service-card"
          >
            <div class="service-card__image">
              <img :src="service.image" :alt="service.title" loading="lazy" />
              <span class="service-card__number">{{ service.number }}</span>
            </div>
            <div class="service-card__content">
              <h3 class="service-card__title">{{ service.title }}</h3>
              <p class="service-card__desc">{{ service.desc }}</p>
              <span class="service-card__link">
                자세히 보기
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </span>
            </div>
          </RouterLink>
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
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import { galleryItems } from '@/data/gallery';
import { notices } from '@/data/notices';

const gradients = [
  'linear-gradient(145deg, #e8dfd2 0%, #d4c4b0 50%, #c9b89e 100%)',
  'linear-gradient(145deg, #f4ede3 0%, #e8dfd2 50%, #ddd0be 100%)',
  'linear-gradient(145deg, #ddd0be 0%, #d4c4b0 50%, #c9b89e 100%)',
];

const services = [
  {
    key: 'dol',
    to: '/gallery/dol',
    title: '돌잔치 스타일링',
    desc: '전통과 현대가 어우러진 품격 있는 돌상 연출',
    image: 'https://images.unsplash.com/photo-1606293926075-69a00dbfde81?w=500&q=80',
    number: '01',
  },
  {
    key: 'place',
    to: '/gallery/place',
    title: '장소 협찬',
    desc: '아이와 가족이 빛나는 공간 큐레이션',
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=500&q=80',
    number: '02',
  },
  {
    key: 'hanbok',
    to: '/gallery/hanbok',
    title: '한복 대여',
    desc: '품위 있는 실루엣의 프리미엄 한복',
    image: 'https://images.unsplash.com/photo-1580651315530-69c8e0026377?w=500&q=80',
    number: '03',
  },
];

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
/* === HERO === */
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-4xl) var(--page-padding);
  position: relative;
  overflow: hidden;
  background: linear-gradient(180deg, var(--color-hanji) 0%, var(--color-hanji-warm) 100%);
}

.hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--pattern-lines);
  pointer-events: none;
}

/* Decorative vertical text */
.hero__deco-left,
.hero__deco-right {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: var(--text-lg);
  opacity: 0.15;
}

.hero__deco-left {
  left: var(--page-padding);
}

.hero__deco-right {
  right: var(--page-padding);
}

@media (max-width: 768px) {
  .hero__deco-left,
  .hero__deco-right {
    display: none;
  }
}

.hero__content {
  text-align: center;
  max-width: 600px;
  position: relative;
  z-index: 1;
}

.hero__eyebrow {
  display: block;
  font-size: var(--text-xs);
  letter-spacing: var(--tracking-widest);
  text-transform: uppercase;
  color: var(--color-gold);
  margin-bottom: var(--space-lg);
}

.hero__title {
  font-family: var(--font-display);
  font-size: var(--text-hero);
  font-weight: 400;
  line-height: var(--leading-tight);
  margin-bottom: var(--space-xl);
}

.hero__title-accent {
  color: var(--color-gold-deep);
  font-weight: 700;
}

.hero__desc {
  font-size: var(--text-lg);
  color: var(--color-stone);
  line-height: var(--leading-relaxed);
  margin-bottom: var(--space-2xl);
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-md);
  justify-content: center;
}

/* Hero visuals (decorative placeholders) */
.hero__visuals {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}

.hero__image {
  position: absolute;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
}

.hero__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.95) contrast(1.05);
}

.hero__image--main {
  width: 280px;
  height: 350px;
  top: 15%;
  right: 8%;
  transform: rotate(3deg);
}

.hero__image--sub {
  width: 200px;
  height: 260px;
  bottom: 15%;
  left: 5%;
  transform: rotate(-5deg);
}

@media (max-width: 1024px) {
  .hero__image--main {
    width: 180px;
    height: 230px;
    right: 2%;
  }

  .hero__image--sub {
    width: 140px;
    height: 180px;
    left: 2%;
  }
}

@media (max-width: 768px) {
  .hero__visuals {
    display: none;
  }
}

.hero__placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.hero__placeholder::after {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--pattern-hanji);
  opacity: 0.1;
  mix-blend-mode: overlay;
}

.hero__placeholder-text {
  font-family: var(--font-display);
  font-size: var(--text-sm);
  color: var(--color-ink-soft);
  opacity: 0.5;
  letter-spacing: var(--tracking-wider);
}

/* Scroll hint */
.hero__scroll-hint {
  position: absolute;
  bottom: var(--space-2xl);
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-sm);
  color: var(--color-stone);
  font-size: var(--text-xs);
  letter-spacing: var(--tracking-widest);
  text-transform: uppercase;
}

.hero__scroll-line {
  width: 1px;
  height: 40px;
  background: linear-gradient(180deg, var(--color-gold) 0%, transparent 100%);
  animation: scrollPulse 2s infinite;
}

@keyframes scrollPulse {
  0%, 100% {
    opacity: 0.3;
    transform: scaleY(0.8);
  }
  50% {
    opacity: 1;
    transform: scaleY(1);
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

/* === SERVICES === */
.services__grid {
  display: grid;
  gap: var(--space-xl);
}

@media (min-width: 640px) {
  .services__grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.service-card {
  display: block;
  text-decoration: none;
  color: inherit;
}

.service-card__image {
  aspect-ratio: 3 / 4;
  margin-bottom: var(--space-lg);
  overflow: hidden;
  position: relative;
}

.service-card__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--duration-slow) var(--ease-out);
}

.service-card:hover .service-card__image img {
  transform: scale(1.05);
}

.service-card__number {
  position: absolute;
  bottom: var(--space-lg);
  left: var(--space-lg);
  font-family: var(--font-display);
  font-size: var(--text-4xl);
  color: var(--color-white);
  opacity: 0.8;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  z-index: 1;
}

.service-card__content {
  padding-right: var(--space-md);
}

.service-card__title {
  font-family: var(--font-display);
  font-size: var(--text-xl);
  font-weight: 400;
  margin-bottom: var(--space-sm);
  transition: color var(--duration-fast) var(--ease-out);
}

.service-card:hover .service-card__title {
  color: var(--color-gold-deep);
}

.service-card__desc {
  font-size: var(--text-sm);
  color: var(--color-stone);
  line-height: var(--leading-relaxed);
  margin-bottom: var(--space-md);
}

.service-card__link {
  display: inline-flex;
  align-items: center;
  gap: var(--space-sm);
  font-size: var(--text-xs);
  letter-spacing: var(--tracking-wider);
  text-transform: uppercase;
  color: var(--color-earth);
  transition: color var(--duration-fast) var(--ease-out);
}

.service-card:hover .service-card__link {
  color: var(--color-gold);
}

.service-card__link svg {
  transition: transform var(--duration-fast) var(--ease-out);
}

.service-card:hover .service-card__link svg {
  transform: translateX(4px);
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
