<template>
  <div class="detail-page" v-if="item">
    <!-- Breadcrumb -->
    <nav class="detail-breadcrumb" aria-label="경로">
      <div class="container">
        <RouterLink to="/" class="detail-breadcrumb__link">홈</RouterLink>
        <span class="detail-breadcrumb__sep">/</span>
        <RouterLink :to="`/gallery/${item.category}`" class="detail-breadcrumb__link">
          {{ categoryLabel }}
        </RouterLink>
        <span class="detail-breadcrumb__sep">/</span>
        <span class="detail-breadcrumb__current">{{ item.title }}</span>
      </div>
    </nav>

    <!-- Main Content -->
    <section class="detail-main section">
      <div class="container">
        <div class="detail-layout">
          <!-- Image Gallery -->
          <div class="detail-gallery">
            <div class="detail-gallery__main">
              <div class="detail-gallery__placeholder" :style="{ background: item.palette }">
                <span class="detail-gallery__placeholder-text">{{ item.title }}</span>
              </div>
            </div>
            <div class="detail-gallery__thumbs">
              <button
                v-for="i in 4"
                :key="i"
                class="detail-gallery__thumb"
                :class="{ 'detail-gallery__thumb--active': i === 1 }"
              >
                <div class="detail-gallery__thumb-inner" :style="{ background: item.palette, opacity: 0.6 + i * 0.1 }"></div>
              </button>
            </div>
          </div>

          <!-- Info -->
          <div class="detail-info">
            <span class="section-heading__eyebrow">{{ categoryLabel }}</span>
            <h1 class="detail-info__title">{{ item.title }}</h1>
            <p class="detail-info__subtitle">{{ item.subtitle }}</p>

            <div class="deco-gold-line"></div>

            <div class="detail-info__desc">
              <p>{{ item.description }}</p>
              <p>
                화려함보다는 피사체인 아이가 돋보일 수 있도록 절제된 색감과 고급스러운 소품을 사용합니다.
                전통의 멋과 현대적인 감각이 어우러진 초연만의 스타일입니다.
              </p>
            </div>

            <div class="detail-info__tags">
              <span v-for="tag in item.tags" :key="tag" class="tag">{{ tag }}</span>
            </div>

            <div class="detail-info__note">
              <h4 class="detail-info__note-title">안내사항</h4>
              <ul class="detail-info__note-list">
                <li>예약은 최소 2주 전에 문의해 주세요.</li>
                <li>세부 구성은 상담 시 조정 가능합니다.</li>
                <li>장소에 따라 추가 비용이 발생할 수 있습니다.</li>
              </ul>
            </div>

            <div class="detail-info__actions">
              <RouterLink :to="`/inquiry/reservation?style=${item.id}`" class="btn btn--primary btn--lg">
                이 스타일로 예약 문의
              </RouterLink>
              <RouterLink to="/inquiry/estimate" class="btn btn--gold">
                견적 문의
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Related Items -->
    <section class="detail-related section section--hanji">
      <div class="container">
        <div class="section-heading">
          <span class="section-heading__eyebrow">Related</span>
          <h2 class="section-heading__title">다른 스타일 보기</h2>
        </div>

        <div class="detail-related__grid">
          <RouterLink
            v-for="related in relatedItems"
            :key="related.id"
            :to="`/gallery/${related.category}/${related.id}`"
            class="gallery-card"
          >
            <div class="gallery-card__image">
              <div class="gallery-card__placeholder" :style="{ background: related.palette }">
                <span class="gallery-card__placeholder-text">{{ related.title }}</span>
              </div>
            </div>
            <div class="gallery-card__content">
              <h3 class="gallery-card__title">{{ related.title }}</h3>
              <p class="gallery-card__subtitle">{{ related.subtitle }}</p>
            </div>
          </RouterLink>
        </div>
      </div>
    </section>
  </div>

  <!-- Not Found -->
  <div v-else class="detail-notfound section">
    <div class="container text-center">
      <h1>갤러리를 찾을 수 없습니다</h1>
      <p class="text-stone">요청하신 스타일이 존재하지 않습니다.</p>
      <RouterLink to="/gallery/dol" class="btn btn--primary">갤러리로 돌아가기</RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import type { GalleryCategory } from '@/types';
import { galleryItems } from '@/data/galleryData';

const props = defineProps<{ category: GalleryCategory; id: string }>();

const item = computed(() => galleryItems.find((entry) => entry.id === props.id));

const categoryLabels: Record<GalleryCategory, string> = {
  dol: '돌잔치 스타일링',
  place: '장소 협찬',
  hanbok: '한복 대여',
};

const categoryLabel = computed(() => categoryLabels[props.category] || '갤러리');

const relatedItems = computed(() => {
  if (!item.value) return [];
  return galleryItems
    .filter((i) => i.category === item.value!.category && i.id !== item.value!.id)
    .slice(0, 3);
});
</script>

<style scoped>
/* Breadcrumb */
.detail-breadcrumb {
  padding: var(--space-lg) var(--page-padding);
  background-color: var(--color-hanji-warm);
  border-bottom: 1px solid var(--color-hanji-deep);
}

.detail-breadcrumb .container {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  font-size: var(--text-sm);
}

.detail-breadcrumb__link {
  color: var(--color-stone);
  text-decoration: none;
}

.detail-breadcrumb__link:hover {
  color: var(--color-gold);
}

.detail-breadcrumb__sep {
  color: var(--color-mist);
}

.detail-breadcrumb__current {
  color: var(--color-ink);
}

/* Layout */
.detail-layout {
  display: grid;
  gap: var(--space-3xl);
}

@media (min-width: 768px) {
  .detail-layout {
    grid-template-columns: 1.2fr 1fr;
    align-items: start;
  }
}

/* Gallery */
.detail-gallery__main {
  aspect-ratio: 4 / 5;
  margin-bottom: var(--space-md);
}

.detail-gallery__placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.detail-gallery__placeholder::after {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--pattern-hanji);
  opacity: 0.08;
  mix-blend-mode: overlay;
}

.detail-gallery__placeholder-text {
  font-family: var(--font-display);
  font-size: var(--text-xl);
  color: var(--color-ink-soft);
  opacity: 0.3;
  letter-spacing: var(--tracking-wider);
  position: relative;
  z-index: 1;
}

.detail-gallery__thumbs {
  display: flex;
  gap: var(--space-sm);
}

.detail-gallery__thumb {
  flex: 1;
  aspect-ratio: 1;
  padding: 0;
  border: 2px solid transparent;
  background: none;
  cursor: pointer;
  transition: border-color var(--duration-fast) var(--ease-out);
}

.detail-gallery__thumb--active,
.detail-gallery__thumb:hover {
  border-color: var(--color-gold);
}

.detail-gallery__thumb-inner {
  width: 100%;
  height: 100%;
}

/* Info */
.detail-info__title {
  font-family: var(--font-display);
  font-size: var(--text-3xl);
  font-weight: 400;
  margin-bottom: var(--space-sm);
}

.detail-info__subtitle {
  font-size: var(--text-base);
  color: var(--color-stone);
  margin-bottom: var(--space-xl);
}

.detail-info__desc {
  margin: var(--space-xl) 0;
}

.detail-info__desc p {
  font-size: var(--text-base);
  color: var(--color-ink-soft);
  line-height: var(--leading-relaxed);
  margin-bottom: var(--space-md);
}

.detail-info__tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-sm);
  margin-bottom: var(--space-xl);
}

.detail-info__note {
  padding: var(--space-lg);
  background-color: var(--color-hanji-warm);
  margin-bottom: var(--space-xl);
}

.detail-info__note-title {
  font-family: var(--font-display);
  font-size: var(--text-sm);
  font-weight: 400;
  letter-spacing: var(--tracking-wide);
  margin-bottom: var(--space-md);
}

.detail-info__note-list {
  font-size: var(--text-sm);
  color: var(--color-stone);
  line-height: var(--leading-relaxed);
  padding-left: var(--space-lg);
  list-style-type: disc;
}

.detail-info__note-list li {
  margin-bottom: var(--space-xs);
}

.detail-info__actions {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

@media (min-width: 480px) {
  .detail-info__actions {
    flex-direction: row;
  }
}

/* Related */
.detail-related__grid {
  display: grid;
  gap: var(--space-xl);
  grid-template-columns: repeat(2, 1fr);
}

@media (min-width: 768px) {
  .detail-related__grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.gallery-card__placeholder-text {
  font-family: var(--font-display);
  font-size: var(--text-sm);
  color: var(--color-ink-soft);
  opacity: 0.4;
  letter-spacing: var(--tracking-wider);
  position: relative;
  z-index: 1;
}

/* Not Found */
.detail-notfound {
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.detail-notfound h1 {
  margin-bottom: var(--space-md);
}

.detail-notfound p {
  margin-bottom: var(--space-xl);
}
</style>
