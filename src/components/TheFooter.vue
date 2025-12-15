<template>
  <footer class="footer">
    <!-- CTA Section -->
    <div class="footer__cta">
      <div class="footer__cta-inner">
        <div class="footer__cta-content">
          <span class="footer__cta-eyebrow">Contact Us</span>
          <h2 class="footer__cta-title">소중한 첫 시작,<br>함께 준비하겠습니다</h2>
          <p class="footer__cta-desc">
            원하시는 날짜와 스타일을 말씀해 주시면<br>
            맞춤 견적과 상담을 도와드립니다.
          </p>
        </div>
        <div class="footer__cta-actions">
          <RouterLink to="/inquiry/reservation" class="btn btn--secondary footer__cta-btn">
            예약 문의
          </RouterLink>
          <RouterLink to="/inquiry/estimate" class="btn btn--primary footer__cta-btn">
            견적 문의
          </RouterLink>
        </div>
      </div>
    </div>

    <!-- Main Footer -->
    <div class="footer__main">
      <div class="footer__inner">
        <!-- Brand -->
        <div class="footer__brand">
          <RouterLink to="/" class="footer__logo">
            <span class="footer__logo-main">초연</span>
            <span class="footer__logo-sub">初緣</span>
          </RouterLink>
          <p class="footer__tagline">
            처음 맺는 소중한 인연,<br>
            정성을 다해 준비합니다.
          </p>
        </div>

        <!-- Links -->
        <div class="footer__links">
          <div class="footer__link-group">
            <h4 class="footer__link-title">서비스</h4>
            <RouterLink to="/gallery/dol" class="footer__link">돌잔치 스타일링</RouterLink>
            <RouterLink to="/gallery/place" class="footer__link">장소 협찬</RouterLink>
            <RouterLink to="/gallery/hanbok" class="footer__link">한복 대여</RouterLink>
          </div>
          <div class="footer__link-group">
            <h4 class="footer__link-title">안내</h4>
            <RouterLink to="/notices" class="footer__link">공지사항</RouterLink>
            <RouterLink to="/inquiry/estimate" class="footer__link">견적 문의</RouterLink>
            <RouterLink to="/inquiry/reservation" class="footer__link">예약 문의</RouterLink>
          </div>
        </div>

        <!-- Contact -->
        <div class="footer__contact">
          <h4 class="footer__link-title">연락처</h4>
          <div class="footer__contact-item">
            <span class="footer__contact-label">전화</span>
            <a href="tel:010-1234-5678" class="footer__contact-value">010-1234-5678</a>
          </div>
          <div class="footer__contact-item">
            <span class="footer__contact-label">이메일</span>
            <a href="mailto:contact@choyeon.com" class="footer__contact-value">contact@choyeon.com</a>
          </div>
          <div class="footer__contact-item">
            <span class="footer__contact-label">카카오톡</span>
            <a href="#" class="footer__contact-value">@초연</a>
          </div>
          <div class="footer__social">
            <a href="#" class="footer__social-link" aria-label="인스타그램">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <a href="#" class="footer__social-link" aria-label="카카오채널">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3C6.48 3 2 6.58 2 11c0 2.83 1.89 5.31 4.73 6.72-.17.62-.65 2.25-.74 2.6-.12.45.16.44.34.32.14-.09 2.23-1.51 3.13-2.12.51.07 1.04.11 1.58.11 5.52 0 10-3.58 10-8s-4.48-8-10-8z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Bar -->
    <div class="footer__bottom">
      <div class="footer__bottom-inner">
        <div class="footer__business">
          <p>상호명: 초연 돌상 | 대표: 홍길동 | 사업자등록번호: 000-00-00000</p>
          <p>주소: 서울특별시 강남구 어딘가 123번지</p>
        </div>
        <p class="footer__copyright">
          &copy; {{ currentYear }} CHOYEON. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';

const currentYear = new Date().getFullYear();
</script>

<style scoped>
.footer {
  margin-top: auto;
}

/* CTA Section */
.footer__cta {
  background-color: var(--color-hanji-warm);
  position: relative;
}

.footer__cta::before {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--pattern-lines);
  pointer-events: none;
}

.footer__cta-inner {
  position: relative;
  max-width: var(--max-width);
  margin-inline: auto;
  padding: var(--space-4xl) var(--page-padding);
  display: flex;
  flex-direction: column;
  gap: var(--space-2xl);
  text-align: center;
}

@media (min-width: 768px) {
  .footer__cta-inner {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    text-align: left;
  }
}

.footer__cta-eyebrow {
  display: block;
  font-size: var(--text-xs);
  letter-spacing: var(--tracking-widest);
  text-transform: uppercase;
  color: var(--color-gold);
  margin-bottom: var(--space-sm);
}

.footer__cta-title {
  font-family: var(--font-display);
  font-size: var(--text-3xl);
  font-weight: 400;
  line-height: var(--leading-snug);
  margin-bottom: var(--space-md);
}

.footer__cta-desc {
  font-size: var(--text-base);
  color: var(--color-stone);
  line-height: var(--leading-relaxed);
}

.footer__cta-actions {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

@media (min-width: 480px) {
  .footer__cta-actions {
    flex-direction: row;
  }
}

.footer__cta-btn {
  min-width: 140px;
  justify-content: center;
}

/* Main Footer */
.footer__main {
  background-color: var(--color-ink-deep);
  color: var(--color-hanji);
}

.footer__inner {
  max-width: var(--max-width);
  margin-inline: auto;
  padding: var(--space-4xl) var(--page-padding);
  display: grid;
  gap: var(--space-2xl);
}

@media (min-width: 768px) {
  .footer__inner {
    grid-template-columns: 1.5fr 2fr 1fr;
    gap: var(--space-3xl);
  }
}

/* Brand */
.footer__logo {
  display: inline-flex;
  align-items: baseline;
  gap: var(--space-xs);
  margin-bottom: var(--space-lg);
  color: var(--color-hanji);
  text-decoration: none;
}

.footer__logo:hover {
  color: var(--color-hanji);
}

.footer__logo-main {
  font-family: var(--font-display);
  font-size: var(--text-2xl);
  font-weight: 700;
  letter-spacing: var(--tracking-wider);
}

.footer__logo-sub {
  font-family: var(--font-display);
  font-size: var(--text-xs);
  color: var(--color-gold);
  letter-spacing: var(--tracking-wider);
}

.footer__tagline {
  font-size: var(--text-sm);
  color: var(--color-mist);
  line-height: var(--leading-relaxed);
}

/* Links */
.footer__links {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-xl);
}

.footer__link-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.footer__link-title {
  font-family: var(--font-display);
  font-size: var(--text-sm);
  font-weight: 400;
  letter-spacing: var(--tracking-wide);
  color: var(--color-hanji);
  margin-bottom: var(--space-sm);
}

.footer__link {
  font-size: var(--text-sm);
  color: var(--color-mist);
  text-decoration: none;
  transition: color var(--duration-fast) var(--ease-out);
}

.footer__link:hover {
  color: var(--color-gold);
}

/* Contact */
.footer__contact {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.footer__contact-item {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
}

.footer__contact-label {
  font-size: var(--text-xs);
  letter-spacing: var(--tracking-wider);
  text-transform: uppercase;
  color: var(--color-stone);
}

.footer__contact-value {
  font-size: var(--text-sm);
  color: var(--color-mist);
  text-decoration: none;
  transition: color var(--duration-fast) var(--ease-out);
}

.footer__contact-value:hover {
  color: var(--color-gold);
}

.footer__social {
  display: flex;
  gap: var(--space-md);
  margin-top: var(--space-md);
}

.footer__social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  color: var(--color-mist);
  border: 1px solid var(--color-ink-soft);
  transition: color var(--duration-fast) var(--ease-out),
              border-color var(--duration-fast) var(--ease-out);
}

.footer__social-link:hover {
  color: var(--color-gold);
  border-color: var(--color-gold);
}

/* Bottom Bar */
.footer__bottom {
  background-color: var(--color-ink-deep);
  border-top: 1px solid var(--color-ink-soft);
}

.footer__bottom-inner {
  max-width: var(--max-width);
  margin-inline: auto;
  padding: var(--space-xl) var(--page-padding);
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
  text-align: center;
}

@media (min-width: 768px) {
  .footer__bottom-inner {
    flex-direction: row;
    justify-content: space-between;
    text-align: left;
  }
}

.footer__business {
  font-size: var(--text-xs);
  color: var(--color-earth);
  line-height: var(--leading-relaxed);
}

.footer__business p {
  margin: 0;
}

.footer__copyright {
  font-size: var(--text-xs);
  color: var(--color-earth);
  letter-spacing: var(--tracking-wide);
}
</style>
