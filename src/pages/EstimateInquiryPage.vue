<template>
  <div class="inquiry-page">
    <!-- Hero -->
    <section class="inquiry-hero section--hanji">
      <div class="container">
        <span class="section-heading__eyebrow">Estimate</span>
        <h1 class="inquiry-hero__title">견적 문의</h1>
        <p class="inquiry-hero__desc">
          희망하시는 구성과 예산을 알려주시면 맞춤 견적을 안내드립니다.
        </p>
      </div>
    </section>

    <!-- Form -->
    <section class="inquiry-form section">
      <div class="container container--narrow">
        <form @submit.prevent="handleSubmit" class="inquiry-form__inner" novalidate>
          <div class="form-grid form-grid--2col">
            <!-- Name -->
            <div class="form-group">
              <label for="name" class="form-label form-label--required">이름</label>
              <input
                id="name"
                v-model="form.name"
                type="text"
                class="form-input"
                :class="{ 'form-input--error': errors.name }"
                placeholder="홍길동"
              >
              <span v-if="errors.name" class="form-error">{{ errors.name }}</span>
            </div>

            <!-- Contact -->
            <div class="form-group">
              <label for="contact" class="form-label form-label--required">연락처</label>
              <input
                id="contact"
                v-model="form.contact"
                type="tel"
                class="form-input"
                :class="{ 'form-input--error': errors.contact }"
                placeholder="010-0000-0000"
              >
              <span v-if="errors.contact" class="form-error">{{ errors.contact }}</span>
            </div>

            <!-- Date -->
            <div class="form-group">
              <label for="date" class="form-label">희망일</label>
              <input
                id="date"
                v-model="form.date"
                type="date"
                class="form-input"
              >
            </div>

            <!-- Budget -->
            <div class="form-group">
              <label for="budget" class="form-label">예산 범위</label>
              <select id="budget" v-model="form.budget" class="form-input">
                <option value="">선택해 주세요</option>
                <option value="~100">100만원 이하</option>
                <option value="100~200">100~200만원</option>
                <option value="200~300">200~300만원</option>
                <option value="300~500">300~500만원</option>
                <option value="500~">500만원 이상</option>
              </select>
            </div>

            <!-- Services -->
            <div class="form-group form-grid--full">
              <label class="form-label">희망 서비스</label>
              <div class="inquiry-services">
                <label
                  v-for="service in services"
                  :key="service.value"
                  class="inquiry-service"
                >
                  <input
                    type="checkbox"
                    v-model="form.services"
                    :value="service.value"
                    class="inquiry-service__input"
                  >
                  <span class="inquiry-service__box">
                    <svg v-if="form.services.includes(service.value)" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </span>
                  <span class="inquiry-service__label">{{ service.label }}</span>
                </label>
              </div>
            </div>

            <!-- Details -->
            <div class="form-group form-grid--full">
              <label for="details" class="form-label">상세 요청</label>
              <textarea
                id="details"
                v-model="form.details"
                class="form-textarea"
                rows="5"
                placeholder="원하시는 스타일, 장소, 인원 등 상세한 내용을 적어주세요."
              ></textarea>
            </div>
          </div>

          <div class="inquiry-form__actions">
            <button type="submit" class="btn btn--primary btn--lg" :disabled="isSubmitting">
              {{ isSubmitting ? '접수 중...' : '견적 요청하기' }}
            </button>
          </div>

          <p class="inquiry-form__note">
            * 문의 접수 후 영업일 기준 1-2일 내에 연락드리겠습니다.
          </p>
        </form>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useToastStore } from '@/stores/toast';

const toastStore = useToastStore();
const isSubmitting = ref(false);

const services = [
  { value: 'dol', label: '돌잔치 스타일링' },
  { value: 'place', label: '장소 협찬' },
  { value: 'hanbok', label: '한복 대여' },
  { value: 'photo', label: '촬영 서비스' },
];

const form = reactive({
  name: '',
  contact: '',
  date: '',
  budget: '',
  services: [] as string[],
  details: '',
});

const errors = reactive({
  name: '',
  contact: '',
});

const validatePhone = (value: string) => {
  const pattern = /^01[0-9]-?[0-9]{3,4}-?[0-9]{4}$/;
  return pattern.test(value.replace(/-/g, ''));
};

const validate = () => {
  let isValid = true;
  errors.name = '';
  errors.contact = '';

  if (!form.name.trim()) {
    errors.name = '이름을 입력해 주세요.';
    isValid = false;
  }

  if (!form.contact.trim()) {
    errors.contact = '연락처를 입력해 주세요.';
    isValid = false;
  } else if (!validatePhone(form.contact)) {
    errors.contact = '올바른 연락처 형식이 아닙니다.';
    isValid = false;
  }

  return isValid;
};

const handleSubmit = async () => {
  if (!validate()) return;

  isSubmitting.value = true;

  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Save to localStorage
  const submissions = JSON.parse(localStorage.getItem('choyeon_estimates') || '[]');
  submissions.push({
    ...form,
    type: 'estimate',
    createdAt: new Date().toISOString(),
  });
  localStorage.setItem('choyeon_estimates', JSON.stringify(submissions));

  // Reset form
  Object.assign(form, { name: '', contact: '', date: '', budget: '', services: [], details: '' });
  isSubmitting.value = false;

  toastStore.success('견적 문의가 접수되었습니다. 빠른 시일 내에 연락드리겠습니다.');
};
</script>

<style scoped>
/* Hero */
.inquiry-hero {
  padding: var(--space-4xl) var(--page-padding) var(--space-2xl);
  text-align: center;
}

.inquiry-hero__title {
  font-family: var(--font-display);
  font-size: var(--text-4xl);
  font-weight: 400;
  margin-bottom: var(--space-md);
}

.inquiry-hero__desc {
  font-size: var(--text-base);
  color: var(--color-stone);
  max-width: 500px;
  margin-inline: auto;
}

/* Form */
.inquiry-form__inner {
  padding: var(--space-2xl);
  background-color: var(--color-white);
  border: 1px solid var(--color-hanji-deep);
}

.inquiry-form__actions {
  margin-top: var(--space-xl);
  text-align: center;
}

.inquiry-form__note {
  margin-top: var(--space-lg);
  text-align: center;
  font-size: var(--text-sm);
  color: var(--color-stone);
}

/* Services Checkboxes */
.inquiry-services {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-md);
}

.inquiry-service {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  cursor: pointer;
}

.inquiry-service__input {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.inquiry-service__box {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--color-hanji-deep);
  background-color: var(--color-white);
  transition: all var(--duration-fast) var(--ease-out);
}

.inquiry-service__input:checked + .inquiry-service__box {
  background-color: var(--color-ink);
  border-color: var(--color-ink);
  color: var(--color-white);
}

.inquiry-service__input:focus-visible + .inquiry-service__box {
  outline: 2px solid var(--color-gold);
  outline-offset: 2px;
}

.inquiry-service__label {
  font-size: var(--text-sm);
  color: var(--color-ink-soft);
}
</style>
