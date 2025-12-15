<template>
  <div class="notice-page">
    <!-- Hero -->
    <section class="notice-hero section--hanji">
      <div class="container">
        <span class="section-heading__eyebrow">Notice</span>
        <h1 class="notice-hero__title">공지사항</h1>
        <p class="notice-hero__desc">초연의 최신 소식과 안내사항을 확인하세요.</p>
      </div>
    </section>

    <!-- Notice List -->
    <section class="notice-content section">
      <div class="container container--narrow">
        <div class="notice-list">
          <RouterLink
            v-for="notice in notices"
            :key="notice.id"
            :to="`/notices/${notice.id}`"
            class="notice-card"
          >
            <div class="notice-card__header">
              <time class="notice-card__date">{{ formatDate(notice.date) }}</time>
            </div>
            <h2 class="notice-card__title">{{ notice.title }}</h2>
            <p class="notice-card__excerpt">{{ notice.excerpt }}</p>
            <span class="notice-card__link">
              자세히 보기
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </span>
          </RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { notices } from '@/data/notices';

const formatDate = (value: string) => {
  const date = new Date(value);
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};
</script>

<style scoped>
/* Hero */
.notice-hero {
  padding: var(--space-4xl) var(--page-padding) var(--space-2xl);
  text-align: center;
}

.notice-hero__title {
  font-family: var(--font-display);
  font-size: var(--text-4xl);
  font-weight: 400;
  margin-bottom: var(--space-md);
}

.notice-hero__desc {
  font-size: var(--text-base);
  color: var(--color-stone);
}

/* Notice List */
.notice-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
}

/* Notice Card */
.notice-card {
  display: block;
  text-decoration: none;
  color: inherit;
  padding: var(--space-xl);
  background-color: var(--color-white);
  border: 1px solid var(--color-hanji-deep);
  transition: border-color var(--duration-fast) var(--ease-out),
              box-shadow var(--duration-fast) var(--ease-out);
}

.notice-card:hover {
  border-color: var(--color-gold);
  box-shadow: var(--shadow-md);
}

.notice-card__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--space-md);
}

.notice-card__date {
  font-size: var(--text-xs);
  letter-spacing: var(--tracking-widest);
  text-transform: uppercase;
  color: var(--color-stone);
}

.notice-card__title {
  font-family: var(--font-display);
  font-size: var(--text-xl);
  font-weight: 400;
  margin-bottom: var(--space-sm);
  transition: color var(--duration-fast) var(--ease-out);
}

.notice-card:hover .notice-card__title {
  color: var(--color-gold-deep);
}

.notice-card__excerpt {
  font-size: var(--text-sm);
  color: var(--color-stone);
  line-height: var(--leading-relaxed);
  margin-bottom: var(--space-lg);
}

.notice-card__link {
  display: inline-flex;
  align-items: center;
  gap: var(--space-xs);
  font-size: var(--text-xs);
  letter-spacing: var(--tracking-wider);
  text-transform: uppercase;
  color: var(--color-earth);
  transition: color var(--duration-fast) var(--ease-out);
}

.notice-card:hover .notice-card__link {
  color: var(--color-gold);
}

.notice-card__link svg {
  transition: transform var(--duration-fast) var(--ease-out);
}

.notice-card:hover .notice-card__link svg {
  transform: translateX(4px);
}
</style>
