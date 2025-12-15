<template>
  <header class="header" :class="{ 'header--scrolled': isScrolled, 'header--open': isMenuOpen }">
    <div class="header__inner">
      <!-- Logo -->
      <RouterLink to="/" class="header__logo" @click="closeMenu">
        <span class="header__logo-main">초연</span>
        <span class="header__logo-sub">初緣</span>
      </RouterLink>

      <!-- Desktop Navigation -->
      <nav class="header__nav" aria-label="메인 메뉴">
        <RouterLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="header__nav-link"
          :class="{ 'header__nav-link--active': isActive(item.to) }"
        >
          {{ item.label }}
        </RouterLink>
      </nav>

      <!-- Mobile Menu Button -->
      <button
        class="header__menu-btn"
        @click="toggleMenu"
        :aria-expanded="isMenuOpen"
        aria-controls="mobile-menu"
        aria-label="메뉴 열기/닫기"
      >
        <span class="header__menu-icon" :class="{ 'header__menu-icon--open': isMenuOpen }">
          <span></span>
          <span></span>
          <span></span>
        </span>
      </button>
    </div>

    <!-- Mobile Navigation -->
    <Transition name="slide-down">
      <nav
        v-if="isMenuOpen"
        id="mobile-menu"
        class="header__mobile-nav"
        aria-label="모바일 메뉴"
      >
        <RouterLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="header__mobile-link"
          @click="closeMenu"
        >
          {{ item.label }}
          <span class="header__mobile-link-arrow">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </span>
        </RouterLink>
      </nav>
    </Transition>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { RouterLink, useRoute } from 'vue-router';

const route = useRoute();
const isScrolled = ref(false);
const isMenuOpen = ref(false);

const navItems = [
  { to: '/gallery/dol', label: '갤러리' },
  { to: '/notices', label: '공지사항' },
  { to: '/inquiry/estimate', label: '견적문의' },
];

const isActive = (path: string) => {
  if (path.startsWith('/gallery')) {
    return route.path.startsWith('/gallery');
  }
  return route.path === path || route.path.startsWith(path + '/');
};

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50;
};

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
  document.body.style.overflow = isMenuOpen.value ? 'hidden' : '';
};

const closeMenu = () => {
  isMenuOpen.value = false;
  document.body.style.overflow = '';
};

onMounted(() => {
  handleScroll();
  window.addEventListener('scroll', handleScroll, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  document.body.style.overflow = '';
});

watch(() => route.fullPath, closeMenu);
</script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: var(--z-fixed);
  background-color: transparent;
  transition: background-color var(--duration-base) var(--ease-out),
              box-shadow var(--duration-base) var(--ease-out);
}

.header--scrolled,
.header--open {
  background-color: var(--color-hanji);
  box-shadow: 0 1px 0 var(--color-hanji-deep);
}

.header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: var(--max-width);
  margin-inline: auto;
  padding: var(--space-lg) var(--page-padding);
  transition: padding var(--duration-base) var(--ease-out);
}

.header--scrolled .header__inner {
  padding-block: var(--space-md);
}

/* Logo */
.header__logo {
  display: flex;
  align-items: baseline;
  gap: var(--space-xs);
  text-decoration: none;
  color: var(--color-ink-deep);
}

.header__logo:hover {
  color: var(--color-ink-deep);
}

.header__logo-main {
  font-family: var(--font-display);
  font-size: var(--text-2xl);
  font-weight: 700;
  letter-spacing: var(--tracking-wider);
}

.header__logo-sub {
  font-family: var(--font-display);
  font-size: var(--text-xs);
  color: var(--color-gold);
  letter-spacing: var(--tracking-wider);
}

/* Desktop Navigation */
.header__nav {
  display: none;
  align-items: center;
  gap: var(--space-2xl);
}

@media (min-width: 768px) {
  .header__nav {
    display: flex;
  }
}

.header__nav-link {
  position: relative;
  font-size: var(--text-sm);
  font-weight: 500;
  letter-spacing: var(--tracking-wide);
  color: var(--color-ink-soft);
  text-decoration: none;
  padding-block: var(--space-sm);
  transition: color var(--duration-fast) var(--ease-out);
}

.header__nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 1px;
  background-color: var(--color-gold);
  transition: width var(--duration-base) var(--ease-out);
}

.header__nav-link:hover,
.header__nav-link--active {
  color: var(--color-ink-deep);
}

.header__nav-link:hover::after,
.header__nav-link--active::after {
  width: 100%;
}

/* Mobile Menu Button */
.header__menu-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
}

@media (min-width: 768px) {
  .header__menu-btn {
    display: none;
  }
}

.header__menu-icon {
  position: relative;
  width: 24px;
  height: 16px;
}

.header__menu-icon span {
  position: absolute;
  left: 0;
  width: 100%;
  height: 1.5px;
  background-color: var(--color-ink);
  transition: transform var(--duration-base) var(--ease-out),
              opacity var(--duration-base) var(--ease-out);
}

.header__menu-icon span:nth-child(1) {
  top: 0;
}

.header__menu-icon span:nth-child(2) {
  top: 50%;
  transform: translateY(-50%);
}

.header__menu-icon span:nth-child(3) {
  bottom: 0;
}

.header__menu-icon--open span:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}

.header__menu-icon--open span:nth-child(2) {
  opacity: 0;
}

.header__menu-icon--open span:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

/* Mobile Navigation */
.header__mobile-nav {
  display: flex;
  flex-direction: column;
  background-color: var(--color-hanji);
  border-top: 1px solid var(--color-hanji-deep);
  padding: var(--space-lg) var(--page-padding);
}

@media (min-width: 768px) {
  .header__mobile-nav {
    display: none;
  }
}

.header__mobile-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-lg) 0;
  font-family: var(--font-display);
  font-size: var(--text-xl);
  color: var(--color-ink);
  text-decoration: none;
  border-bottom: 1px solid var(--color-hanji-deep);
}

.header__mobile-link:last-child {
  border-bottom: none;
}

.header__mobile-link-arrow {
  color: var(--color-mist);
  transition: transform var(--duration-fast) var(--ease-out),
              color var(--duration-fast) var(--ease-out);
}

.header__mobile-link:hover .header__mobile-link-arrow {
  transform: translateX(4px);
  color: var(--color-gold);
}

/* Slide Down Transition */
.slide-down-enter-active,
.slide-down-leave-active {
  transition: opacity var(--duration-base) var(--ease-out),
              transform var(--duration-base) var(--ease-out);
}

.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
