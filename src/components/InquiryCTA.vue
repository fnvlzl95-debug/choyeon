<template>
  <div class="cta-card">
    <p class="cta-eyebrow">CONCIERGE</p>
    <h3>나만의 맞춤 돌상 문의</h3>
    <p>
      원하시는 날짜와 장소, 컨셉을 남겨주시면 빠르게 상담을 도와드립니다. 견적과 예약 문의 모두 이곳에서
      진행해 주세요.
    </p>
    <div class="cta-actions">
      <RouterLink to="/inquiry/reservation" class="base-button">예약 문의</RouterLink>
      <RouterLink to="/inquiry/estimate" class="base-button gold">견적 문의</RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<style scoped>
.cta-eyebrow {
  letter-spacing: 0.4em;
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.6);
  margin: 0;
}

h3 {
  font-family: var(--font-serif);
  font-size: 1.8rem;
  margin: 0;
}

p {
  margin: 0;
  line-height: 1.8;
}

.cta-actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

@media (min-width: 480px) {
  .cta-actions {
    flex-direction: row;
    justify-content: center;
  }
}

.cta-card .base-button {
  border-color: rgba(255, 255, 255, 0.4);
}

.cta-card .base-button.gold {
  color: rgba(255, 255, 255, 0.8);
}
</style>
