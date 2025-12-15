<template>
  <div class="inquiry-page">
    <!-- Hero -->
    <section class="inquiry-hero section--hanji">
      <div class="container">
        <span class="section-heading__eyebrow">Reservation</span>
        <h1 class="inquiry-hero__title">예약 문의</h1>
        <p class="inquiry-hero__desc">
          희망하시는 일정과 장소를 남겨주시면 빠르게 안내드리겠습니다.
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
              <label for="date" class="form-label form-label--required">희망 날짜</label>
              <input
                id="date"
                v-model="form.date"
                type="date"
                class="form-input"
                :class="{ 'form-input--error': errors.date }"
              >
              <span v-if="errors.date" class="form-error">{{ errors.date }}</span>
            </div>

            <!-- Place -->
            <div class="form-group">
              <label for="place" class="form-label">장소 / 지역</label>
              <input
                id="place"
                v-model="form.place"
                type="text"
                class="form-input"
                placeholder="예: 서울 강남, 호텔 등"
              >
            </div>

            <!-- Message -->
            <div class="form-group form-grid--full">
              <label for="message" class="form-label">추가 요청사항</label>
              <textarea
                id="message"
                v-model="form.message"
                class="form-textarea"
                rows="5"
                placeholder="원하시는 스타일이나 특별한 요청사항이 있으면 적어주세요."
              ></textarea>
            </div>
          </div>

          <div class="inquiry-form__actions">
            <button type="submit" class="btn btn--primary btn--lg" :disabled="isSubmitting">
              {{ isSubmitting ? '접수 중...' : '예약 문의하기' }}
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

const form = reactive({
  name: '',
  contact: '',
  date: '',
  place: '',
  message: '',
});

const errors = reactive({
  name: '',
  contact: '',
  date: '',
});

const validatePhone = (value: string) => {
  const pattern = /^01[0-9]-?[0-9]{3,4}-?[0-9]{4}$/;
  return pattern.test(value.replace(/-/g, ''));
};

const validate = () => {
  let isValid = true;
  errors.name = '';
  errors.contact = '';
  errors.date = '';

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

  if (!form.date) {
    errors.date = '희망 날짜를 선택해 주세요.';
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
  const submissions = JSON.parse(localStorage.getItem('choyeon_reservations') || '[]');
  submissions.push({
    ...form,
    type: 'reservation',
    createdAt: new Date().toISOString(),
  });
  localStorage.setItem('choyeon_reservations', JSON.stringify(submissions));

  // Reset form
  Object.assign(form, { name: '', contact: '', date: '', place: '', message: '' });
  isSubmitting.value = false;

  toastStore.success('예약 문의가 접수되었습니다. 빠른 시일 내에 연락드리겠습니다.');
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
</style>
