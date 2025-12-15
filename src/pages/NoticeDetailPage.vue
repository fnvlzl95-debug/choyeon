<template>
  <div class="notice-detail" v-if="notice">
    <!-- Hero -->
    <section class="notice-detail-hero section--hanji">
      <div class="container container--narrow">
        <RouterLink to="/notices" class="notice-detail__back">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          목록으로
        </RouterLink>
        <span class="section-heading__eyebrow">Notice</span>
        <h1 class="notice-detail__title">{{ notice.title }}</h1>
        <time class="notice-detail__date">{{ formatDate(notice.date) }}</time>
      </div>
    </section>

    <!-- Content -->
    <section class="notice-detail-content section">
      <div class="container container--narrow">
        <article class="notice-detail__body">
          <p>{{ notice.content }}</p>
          <p>
            문의사항이 있으시면 언제든지 연락 주세요.
            빠르고 친절하게 안내해 드리겠습니다.
          </p>
        </article>

        <div class="notice-detail__footer">
          <RouterLink to="/notices" class="btn btn--ghost">목록으로</RouterLink>
          <RouterLink to="/inquiry/estimate" class="btn btn--gold">문의하기</RouterLink>
        </div>
      </div>
    </section>
  </div>

  <!-- Not Found -->
  <div v-else class="notice-notfound section">
    <div class="container text-center">
      <h1>공지사항을 찾을 수 없습니다</h1>
      <p class="text-stone">요청하신 공지사항이 존재하지 않습니다.</p>
      <RouterLink to="/notices" class="btn btn--primary">목록으로 돌아가기</RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import { notices } from '@/data/notices';

const props = defineProps<{ id: string }>();

const notice = computed(() => notices.find((entry) => entry.id === props.id));

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
.notice-detail-hero {
  padding: var(--space-3xl) var(--page-padding);
}

.notice-detail__back {
  display: inline-flex;
  align-items: center;
  gap: var(--space-xs);
  font-size: var(--text-sm);
  color: var(--color-stone);
  text-decoration: none;
  margin-bottom: var(--space-xl);
  transition: color var(--duration-fast) var(--ease-out);
}

.notice-detail__back:hover {
  color: var(--color-gold);
}

.notice-detail__title {
  font-family: var(--font-display);
  font-size: var(--text-3xl);
  font-weight: 400;
  margin-bottom: var(--space-md);
}

.notice-detail__date {
  display: block;
  font-size: var(--text-sm);
  color: var(--color-stone);
  letter-spacing: var(--tracking-wide);
}

/* Content */
.notice-detail__body {
  padding: var(--space-2xl);
  background-color: var(--color-white);
  border: 1px solid var(--color-hanji-deep);
}

.notice-detail__body p {
  font-size: var(--text-base);
  color: var(--color-ink-soft);
  line-height: var(--leading-relaxed);
  margin-bottom: var(--space-lg);
}

.notice-detail__body p:last-child {
  margin-bottom: 0;
}

.notice-detail__footer {
  display: flex;
  gap: var(--space-md);
  margin-top: var(--space-xl);
  padding-top: var(--space-xl);
  border-top: 1px solid var(--color-hanji-deep);
}

/* Not Found */
.notice-notfound {
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.notice-notfound h1 {
  margin-bottom: var(--space-md);
}

.notice-notfound p {
  margin-bottom: var(--space-xl);
}
</style>
