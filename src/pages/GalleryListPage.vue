<template>
  <div class="gallery-page">
    <!-- Hero Header -->
    <section class="gallery-hero section--hanji">
      <div class="container">
        <div class="gallery-hero__content">
          <span class="section-heading__eyebrow">Gallery</span>
          <h1 class="gallery-hero__title">{{ categoryTitle }}</h1>
          <p class="gallery-hero__desc">{{ categoryDesc }}</p>
        </div>
      </div>
    </section>

    <!-- Category Tabs -->
    <section class="gallery-tabs">
      <div class="container">
        <nav class="tabs" aria-label="갤러리 카테고리">
          <RouterLink
            v-for="tab in tabs"
            :key="tab.key"
            :to="`/gallery/${tab.key}`"
            class="tabs__item"
            :class="{ 'tabs__item--active': category === tab.key }"
          >
            {{ tab.label }}
          </RouterLink>
        </nav>
      </div>
    </section>

    <!-- Filters -->
    <section class="gallery-filters">
      <div class="container">
        <div class="gallery-filters__inner">
          <!-- Search -->
          <div class="search-box">
            <span class="search-box__icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="M21 21l-4.35-4.35"></path>
              </svg>
            </span>
            <input
              v-model="searchTerm"
              type="text"
              class="search-box__input"
              placeholder="검색어를 입력하세요"
              aria-label="갤러리 검색"
            >
          </div>

          <!-- Tags -->
          <div class="gallery-filters__tags">
            <button
              v-for="tag in availableTags"
              :key="tag"
              class="tag tag--clickable"
              :class="{ 'tag--active': selectedTags.includes(tag) }"
              @click="toggleTag(tag)"
            >
              {{ tag }}
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Gallery Grid -->
    <section class="gallery-content section">
      <div class="container">
        <div v-if="paginatedItems.length" class="gallery-grid animate-stagger">
          <RouterLink
            v-for="item in paginatedItems"
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
              <h3 class="gallery-card__title" v-html="highlightText(item.title)"></h3>
              <p class="gallery-card__subtitle">{{ item.subtitle }}</p>
              <div class="gallery-card__tags">
                <span v-for="tag in item.tags" :key="tag" class="tag">{{ tag }}</span>
              </div>
            </div>
          </RouterLink>
        </div>

        <!-- Empty State -->
        <div v-else class="gallery-empty">
          <p class="gallery-empty__text">조건에 맞는 결과가 없습니다.</p>
          <button class="btn btn--ghost" @click="clearFilters">필터 초기화</button>
        </div>

        <!-- Pagination -->
        <div v-if="totalPages > 1" class="pagination">
          <button
            class="pagination__btn"
            :disabled="currentPage <= 1"
            @click="currentPage--"
            aria-label="이전 페이지"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          </button>
          <button
            v-for="page in visiblePages"
            :key="page"
            class="pagination__btn"
            :class="{ 'pagination__btn--active': page === currentPage }"
            @click="currentPage = page"
          >
            {{ page }}
          </button>
          <button
            class="pagination__btn"
            :disabled="currentPage >= totalPages"
            @click="currentPage++"
            aria-label="다음 페이지"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M9 6l6 6-6 6"/>
            </svg>
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { RouterLink } from 'vue-router';
import type { GalleryCategory } from '@/types';
import { galleryItems } from '@/data/gallery';

const props = defineProps<{ category: GalleryCategory }>();

const searchTerm = ref('');
const selectedTags = ref<string[]>([]);
const currentPage = ref(1);
const perPage = 12;

const tabs = [
  { key: 'dol', label: '돌잔치' },
  { key: 'place', label: '장소' },
  { key: 'hanbok', label: '한복' },
] as const;

const categoryMeta: Record<GalleryCategory, { title: string; desc: string }> = {
  dol: {
    title: '돌잔치 스타일링',
    desc: '전통과 현대가 공존하는 초연만의 돌상 스타일을 만나보세요',
  },
  place: {
    title: '장소 협찬',
    desc: '잔치를 품격 있게 완성하는 공간 큐레이션',
  },
  hanbok: {
    title: '한복 대여',
    desc: '품위 있는 실루엣의 프리미엄 한복 컬렉션',
  },
};

const categoryTitle = computed(() => categoryMeta[props.category]?.title || '갤러리');
const categoryDesc = computed(() => categoryMeta[props.category]?.desc || '');

const categoryItems = computed(() =>
  galleryItems.filter((item) => item.category === props.category)
);

const availableTags = computed(() => {
  const set = new Set<string>();
  categoryItems.value.forEach((item) => item.tags.forEach((tag) => set.add(tag)));
  return Array.from(set);
});

const filteredItems = computed(() => {
  const query = searchTerm.value.trim().toLowerCase();
  return categoryItems.value.filter((item) => {
    const matchQuery = query
      ? item.title.toLowerCase().includes(query) ||
        item.tags.some((t) => t.toLowerCase().includes(query))
      : true;
    const matchTags = selectedTags.value.length
      ? selectedTags.value.every((tag) => item.tags.includes(tag))
      : true;
    return matchQuery && matchTags;
  });
});

const totalPages = computed(() => Math.max(1, Math.ceil(filteredItems.value.length / perPage)));

const visiblePages = computed(() => {
  const pages: number[] = [];
  const start = Math.max(1, currentPage.value - 2);
  const end = Math.min(totalPages.value, start + 4);
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  return pages;
});

const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * perPage;
  return filteredItems.value.slice(start, start + perPage);
});

const toggleTag = (tag: string) => {
  const index = selectedTags.value.indexOf(tag);
  if (index > -1) {
    selectedTags.value.splice(index, 1);
  } else {
    selectedTags.value.push(tag);
  }
};

const clearFilters = () => {
  searchTerm.value = '';
  selectedTags.value = [];
};

const highlightText = (text: string) => {
  if (!searchTerm.value.trim()) return text;
  const regex = new RegExp(
    `(${searchTerm.value.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`,
    'gi'
  );
  return text.replace(regex, '<mark>$1</mark>');
};

// Reset page when filters change
watch([() => props.category, searchTerm, selectedTags], () => {
  currentPage.value = 1;
});

watch(currentPage, (value) => {
  if (value > totalPages.value) currentPage.value = totalPages.value;
  if (value < 1) currentPage.value = 1;
});

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
/* Hero */
.gallery-hero {
  padding: var(--space-4xl) var(--page-padding) var(--space-2xl);
  text-align: center;
  position: relative;
}

.gallery-hero__title {
  font-family: var(--font-display);
  font-size: var(--text-4xl);
  font-weight: 400;
  margin-bottom: var(--space-md);
}

.gallery-hero__desc {
  font-size: var(--text-base);
  color: var(--color-stone);
  max-width: 500px;
  margin-inline: auto;
}

/* Tabs */
.gallery-tabs {
  padding: var(--space-xl) var(--page-padding);
  background-color: var(--color-hanji-warm);
}

/* Filters */
.gallery-filters {
  padding: var(--space-xl) var(--page-padding);
  background-color: var(--color-hanji);
  border-bottom: 1px solid var(--color-hanji-deep);
}

.gallery-filters__inner {
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
}

@media (min-width: 768px) {
  .gallery-filters__inner {
    flex-direction: row;
    align-items: center;
  }

  .search-box {
    max-width: 300px;
  }
}

.gallery-filters__tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-sm);
}

/* Gallery Grid */
.gallery-grid {
  display: grid;
  gap: var(--space-xl);
  grid-template-columns: repeat(2, 1fr);
}

@media (min-width: 768px) {
  .gallery-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 1024px) {
  .gallery-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

/* Gallery Card */
.gallery-card__placeholder-text {
  font-family: var(--font-display);
  font-size: var(--text-sm);
  color: var(--color-ink-soft);
  opacity: 0.4;
  letter-spacing: var(--tracking-wider);
  position: relative;
  z-index: 1;
}

mark {
  background: rgba(201, 169, 98, 0.35);
  color: inherit;
  padding: 0 2px;
}

/* Empty State */
.gallery-empty {
  text-align: center;
  padding: var(--space-4xl) var(--space-xl);
}

.gallery-empty__text {
  font-size: var(--text-base);
  color: var(--color-stone);
  margin-bottom: var(--space-xl);
}
</style>
