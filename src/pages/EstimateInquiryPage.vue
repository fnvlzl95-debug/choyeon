<template>
  <div class="wizard-page">
    <!-- Ambient Background -->
    <div class="wizard-page__bg">
      <div class="wizard-page__bg-grain"></div>
      <div class="wizard-page__bg-gradient"></div>
    </div>

    <!-- Header -->
    <header class="wizard-header">
      <div class="container">
        <div class="wizard-header__badge">
          <span class="wizard-header__badge-line"></span>
          <span class="wizard-header__badge-text">Estimate</span>
          <span class="wizard-header__badge-line"></span>
        </div>
        <h1 class="wizard-header__title">견적 문의</h1>
      </div>
    </header>

    <!-- Progress Indicator -->
    <div class="wizard-progress">
      <div class="wizard-progress__track">
        <div
          class="wizard-progress__fill"
          :style="{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }"
        ></div>
      </div>
      <div class="wizard-progress__steps">
        <button
          v-for="step in totalSteps"
          :key="step"
          type="button"
          class="wizard-progress__step"
          :class="{
            'wizard-progress__step--active': currentStep === step,
            'wizard-progress__step--completed': currentStep > step
          }"
          @click="goToStep(step)"
          :disabled="step > currentStep"
        >
          <span class="wizard-progress__step-dot">
            <svg v-if="currentStep > step" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            <span v-else>{{ step }}</span>
          </span>
          <span class="wizard-progress__step-label">{{ stepLabels[step - 1] }}</span>
        </button>
      </div>
    </div>

    <!-- Form Container -->
    <main class="wizard-main">
      <div class="container">
        <form @submit.prevent="handleSubmit" class="wizard-form" novalidate>

          <!-- Step Content with Transitions -->
          <Transition :name="transitionName" mode="out-in">

            <!-- Step 1: 기본 정보 -->
            <div v-if="currentStep === 1" key="step1" class="wizard-step">
              <div class="wizard-step__header">
                <h2 class="wizard-step__title">기본 정보</h2>
                <p class="wizard-step__desc">연락 가능한 정보를 입력해 주세요</p>
              </div>

              <div class="wizard-step__content">
                <FloatingField
                  id="name"
                  v-model="form.name"
                  label="이름"
                  type="text"
                  placeholder="홍길동"
                  required
                  :error="errors.name"
                  helper="실명으로 입력해 주세요"
                />

                <FloatingField
                  id="contact"
                  v-model="form.contact"
                  label="연락처"
                  type="tel"
                  placeholder="010-0000-0000"
                  required
                  :error="errors.contact"
                  helper="견적서 발송 및 상담용"
                />
              </div>
            </div>

            <!-- Step 2: 서비스·예산 -->
            <div v-else-if="currentStep === 2" key="step2" class="wizard-step">
              <div class="wizard-step__header">
                <h2 class="wizard-step__title">서비스 · 예산</h2>
                <p class="wizard-step__desc">원하시는 서비스와 예산을 선택해 주세요</p>
              </div>

              <div class="wizard-step__content">
                <!-- Service Selection -->
                <div class="service-field">
                  <label class="service-field__label">희망 서비스 <span class="service-field__hint">(복수 선택 가능)</span></label>
                  <div class="service-selector">
                    <button
                      v-for="service in services"
                      :key="service.value"
                      type="button"
                      class="service-chip"
                      :class="{ 'service-chip--active': form.services.includes(service.value) }"
                      @click="toggleService(service.value)"
                    >
                      <span class="service-chip__icon">{{ service.icon }}</span>
                      <span class="service-chip__label">{{ service.label }}</span>
                      <span class="service-chip__check">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                      </span>
                    </button>
                  </div>
                </div>

                <!-- Budget Selection -->
                <div class="budget-field">
                  <label class="budget-field__label">예산 범위</label>
                  <div class="budget-selector">
                    <button
                      v-for="option in budgetOptions"
                      :key="option.value"
                      type="button"
                      class="budget-chip"
                      :class="{ 'budget-chip--active': form.budget === option.value }"
                      @click="form.budget = option.value"
                    >
                      <span class="budget-chip__amount">{{ option.label }}</span>
                      <span class="budget-chip__unit">만원</span>
                    </button>
                  </div>
                </div>

                <FloatingField
                  id="date"
                  v-model="form.date"
                  label="희망 행사일"
                  type="date"
                  helper="확정 전이라면 대략적인 일정도 괜찮아요"
                />
              </div>
            </div>

            <!-- Step 3: 요청사항 + 확인 -->
            <div v-else-if="currentStep === 3" key="step3" class="wizard-step">
              <div class="wizard-step__header">
                <h2 class="wizard-step__title">요청사항 · 확인</h2>
                <p class="wizard-step__desc">마지막으로 요청사항을 적고 내용을 확인해 주세요</p>
              </div>

              <div class="wizard-step__content">
                <FloatingField
                  id="details"
                  v-model="form.details"
                  label="상세 요청사항"
                  type="textarea"
                  placeholder="원하시는 스타일, 장소, 인원, 특별히 원하시는 구성 등을 자유롭게 적어주세요."
                  :rows="4"
                />

                <!-- Summary Card -->
                <div class="wizard-summary">
                  <div class="wizard-summary__header">
                    <span class="wizard-summary__badge">견적 정보 확인</span>
                    <div class="wizard-summary__hanja">初緣</div>
                  </div>
                  <div class="wizard-summary__body">
                    <div class="wizard-summary__row">
                      <span class="wizard-summary__label">고객명</span>
                      <span class="wizard-summary__value">{{ form.name }}</span>
                    </div>
                    <div class="wizard-summary__divider"></div>
                    <div class="wizard-summary__row">
                      <span class="wizard-summary__label">연락처</span>
                      <span class="wizard-summary__value">{{ formatPhone(form.contact) }}</span>
                    </div>
                    <div class="wizard-summary__divider"></div>
                    <div class="wizard-summary__row">
                      <span class="wizard-summary__label">서비스</span>
                      <span class="wizard-summary__value">
                        {{ form.services.length > 0 ? form.services.map(s => serviceLabels[s]).join(', ') : '미선택' }}
                      </span>
                    </div>
                    <div class="wizard-summary__divider"></div>
                    <div class="wizard-summary__row">
                      <span class="wizard-summary__label">예산</span>
                      <span class="wizard-summary__value wizard-summary__value--accent">
                        {{ budgetLabels[form.budget] || '미선택' }}
                      </span>
                    </div>
                    <div class="wizard-summary__divider"></div>
                    <div class="wizard-summary__row">
                      <span class="wizard-summary__label">희망일</span>
                      <span class="wizard-summary__value">{{ formatDate(form.date) || '미정' }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Transition>

          <!-- Navigation -->
          <div class="wizard-nav">
            <button
              v-if="currentStep > 1"
              type="button"
              class="wizard-nav__btn wizard-nav__btn--prev"
              @click="prevStep"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
              이전
            </button>
            <div v-else></div>

            <button
              v-if="currentStep < totalSteps"
              type="button"
              class="wizard-nav__btn wizard-nav__btn--next"
              @click="nextStep"
            >
              다음
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>

            <button
              v-else
              type="submit"
              class="wizard-nav__btn wizard-nav__btn--submit"
              :disabled="isSubmitting"
            >
              <span>{{ isSubmitting ? '접수 중...' : '견적 요청하기' }}</span>
              <svg v-if="!isSubmitting" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
              <svg v-else class="wizard-nav__spinner" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10" stroke-dasharray="60" stroke-dashoffset="20"/>
              </svg>
            </button>
          </div>

          <!-- Secondary Actions -->
          <div class="wizard-secondary">
            <a href="tel:02-1234-5678" class="wizard-secondary__link">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
              </svg>
              전화 상담
            </a>
            <span class="wizard-secondary__divider">·</span>
            <a href="https://pf.kakao.com/choyeon" target="_blank" class="wizard-secondary__link">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3C6.48 3 2 6.58 2 11c0 2.8 1.8 5.27 4.5 6.7l-.9 3.38c-.1.35.3.64.6.44l4-2.6c.6.08 1.2.08 1.8.08 5.52 0 10-3.58 10-8s-4.48-8-10-8z"/>
              </svg>
              카카오톡
            </a>
          </div>
        </form>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useToastStore } from '@/stores/toast';
import FloatingField from '@/components/FloatingField.vue';

const toastStore = useToastStore();
const isSubmitting = ref(false);
const currentStep = ref(1);
const totalSteps = 3;
const transitionName = ref('slide-left');
const stepLabels = ['기본 정보', '서비스·예산', '확인'];

const services = [
  { value: 'dol', label: '돌잔치', icon: '🎂' },
  { value: 'place', label: '장소', icon: '🏠' },
  { value: 'hanbok', label: '한복', icon: '👘' },
  { value: 'photo', label: '촬영', icon: '📷' },
];

const serviceLabels: Record<string, string> = {
  dol: '돌잔치',
  place: '장소',
  hanbok: '한복',
  photo: '촬영',
};

const budgetOptions = [
  { value: '~100', label: '~100' },
  { value: '100~200', label: '100~200' },
  { value: '200~300', label: '200~300' },
  { value: '300~500', label: '300~500' },
  { value: '500~', label: '500+' },
];

const budgetLabels: Record<string, string> = {
  '~100': '100만원 이하',
  '100~200': '100~200만원',
  '200~300': '200~300만원',
  '300~500': '300~500만원',
  '500~': '500만원 이상',
};

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

const toggleService = (value: string) => {
  const index = form.services.indexOf(value);
  if (index === -1) {
    form.services.push(value);
  } else {
    form.services.splice(index, 1);
  }
};

const formatPhone = (value: string) => {
  if (!value) return '';
  const numbers = value.replace(/\D/g, '');
  if (numbers.length <= 3) return numbers;
  if (numbers.length <= 7) return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
  return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`;
};

const formatDate = (value: string) => {
  if (!value) return '';
  const date = new Date(value);
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'short',
  });
};

const validatePhone = (value: string) => {
  const pattern = /^01[0-9]-?[0-9]{3,4}-?[0-9]{4}$/;
  return pattern.test(value.replace(/-/g, ''));
};

const validateStep = (step: number): boolean => {
  errors.name = '';
  errors.contact = '';

  if (step === 1) {
    let isValid = true;
    if (!form.name.trim()) {
      errors.name = '이름을 입력해 주세요';
      isValid = false;
    }
    if (!form.contact.trim()) {
      errors.contact = '연락처를 입력해 주세요';
      isValid = false;
    } else if (!validatePhone(form.contact)) {
      errors.contact = '올바른 형식으로 입력해 주세요';
      isValid = false;
    }
    return isValid;
  }

  return true;
};

const nextStep = () => {
  if (validateStep(currentStep.value)) {
    transitionName.value = 'slide-left';
    currentStep.value++;
  }
};

const prevStep = () => {
  transitionName.value = 'slide-right';
  currentStep.value--;
};

const goToStep = (step: number) => {
  if (step < currentStep.value) {
    transitionName.value = 'slide-right';
    currentStep.value = step;
  }
};

const handleSubmit = async () => {
  if (!validateStep(currentStep.value)) return;

  isSubmitting.value = true;

  await new Promise((resolve) => setTimeout(resolve, 1200));

  const submissions = JSON.parse(localStorage.getItem('choyeon_estimates') || '[]');
  submissions.push({
    ...form,
    type: 'estimate',
    createdAt: new Date().toISOString(),
  });
  localStorage.setItem('choyeon_estimates', JSON.stringify(submissions));

  Object.assign(form, { name: '', contact: '', date: '', budget: '', services: [], details: '' });
  currentStep.value = 1;
  isSubmitting.value = false;

  toastStore.success('견적 문의가 접수되었습니다. 빠른 시일 내에 연락드리겠습니다.');
};
</script>

<style scoped>
/* ========================================
   WIZARD FORM - 3-Step Flow (Estimate)
   ======================================== */

.wizard-page {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Background */
.wizard-page__bg {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: -1;
}

.wizard-page__bg-grain {
  position: absolute;
  inset: 0;
  background: var(--pattern-hanji);
  opacity: 0.5;
}

.wizard-page__bg-gradient {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse at 70% 0%, rgba(200, 170, 120, 0.1) 0%, transparent 50%),
    linear-gradient(180deg, var(--color-hanji) 0%, var(--color-hanji-warm) 100%);
}

/* Header */
.wizard-header {
  padding: var(--space-lg) var(--page-padding) var(--space-sm);
  text-align: center;
}

.wizard-header__badge {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-sm);
  margin-bottom: var(--space-xs);
}

.wizard-header__badge-line {
  width: 32px;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--color-gold), transparent);
}

.wizard-header__badge-text {
  font-size: var(--text-xs);
  letter-spacing: var(--tracking-widest);
  text-transform: uppercase;
  color: var(--color-gold-deep);
}

.wizard-header__title {
  font-family: var(--font-display);
  font-size: var(--text-2xl);
  font-weight: 400;
  color: var(--color-ink);
}

/* Progress Indicator */
.wizard-progress {
  position: relative;
  padding: 0 var(--page-padding);
  margin-bottom: var(--space-md);
}

.wizard-progress__track {
  position: absolute;
  top: 12px;
  left: calc(var(--page-padding) + 40px);
  right: calc(var(--page-padding) + 40px);
  height: 2px;
  background: var(--color-hanji-deep);
}

.wizard-progress__fill {
  height: 100%;
  background: linear-gradient(90deg, var(--color-gold), var(--color-gold-deep));
  transition: width 0.5s var(--ease-out);
}

.wizard-progress__steps {
  display: flex;
  justify-content: space-between;
  max-width: 400px;
  margin: 0 auto;
}

.wizard-progress__step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-sm);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  transition: opacity var(--duration-fast) var(--ease-out);
}

.wizard-progress__step:disabled {
  cursor: default;
  opacity: 0.5;
}

.wizard-progress__step-dot {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-hanji);
  border: 2px solid var(--color-hanji-deep);
  border-radius: 50%;
  font-family: var(--font-display);
  font-size: var(--text-xs);
  color: var(--color-stone);
  transition: all var(--duration-normal) var(--ease-out);
}

.wizard-progress__step--active .wizard-progress__step-dot {
  background: var(--color-gold);
  border-color: var(--color-gold);
  color: var(--color-white);
  transform: scale(1.1);
  box-shadow: 0 0 0 4px rgba(201, 169, 98, 0.2);
}

.wizard-progress__step--completed .wizard-progress__step-dot {
  background: var(--color-ink);
  border-color: var(--color-ink);
  color: var(--color-white);
}

.wizard-progress__step-label {
  font-size: var(--text-xs);
  color: var(--color-stone);
  letter-spacing: var(--tracking-wide);
  white-space: nowrap;
  transition: color var(--duration-fast) var(--ease-out);
}

.wizard-progress__step--active .wizard-progress__step-label {
  color: var(--color-gold-deep);
  font-weight: 500;
}

.wizard-progress__step--completed .wizard-progress__step-label {
  color: var(--color-ink);
}

/* Main Content */
.wizard-main {
  flex: 1;
  padding: 0 var(--page-padding) var(--space-lg);
}

.wizard-form {
  max-width: 480px;
  margin: 0 auto;
}

/* Step Content */
.wizard-step {
  background: var(--color-white);
  border: 1px solid var(--color-hanji-deep);
  padding: var(--space-md) var(--space-lg);
}

.wizard-step__header {
  text-align: center;
  margin-bottom: var(--space-md);
  padding-bottom: var(--space-sm);
  border-bottom: 1px solid var(--color-hanji-deep);
}

.wizard-step__title {
  font-family: var(--font-display);
  font-size: var(--text-lg);
  font-weight: 400;
  color: var(--color-ink);
  margin-bottom: var(--space-2xs);
}

.wizard-step__desc {
  font-size: var(--text-xs);
  color: var(--color-stone);
}

.wizard-step__content {
  min-height: auto;
}

/* Service Selector */
.service-field {
  margin-bottom: var(--space-md);
}

.service-field__label {
  display: block;
  font-size: var(--text-xs);
  color: var(--color-earth);
  letter-spacing: var(--tracking-wide);
  margin-bottom: var(--space-md);
}

.service-field__hint {
  color: var(--color-stone);
  font-weight: 400;
}

.service-selector {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-sm);
}

.service-chip {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-xs);
  padding: var(--space-md);
  background: var(--color-hanji-warm);
  border: 1px solid var(--color-hanji-deep);
  cursor: pointer;
  transition: all var(--duration-normal) var(--ease-out);
}

.service-chip:hover {
  border-color: var(--color-gold);
  background: var(--color-white);
}

.service-chip--active {
  border-color: var(--color-gold);
  background: var(--color-white);
  box-shadow: 0 0 0 1px var(--color-gold);
}

.service-chip__icon {
  font-size: var(--text-lg);
  filter: grayscale(0.3);
  transition: filter var(--duration-fast) var(--ease-out);
}

.service-chip--active .service-chip__icon {
  filter: grayscale(0);
}

.service-chip__label {
  font-size: var(--text-xs);
  color: var(--color-stone);
  letter-spacing: var(--tracking-wide);
  transition: color var(--duration-fast) var(--ease-out);
}

.service-chip--active .service-chip__label {
  color: var(--color-ink);
}

.service-chip__check {
  position: absolute;
  top: var(--space-2xs);
  right: var(--space-2xs);
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-gold);
  color: var(--color-white);
  border-radius: 50%;
  opacity: 0;
  transform: scale(0.5);
  transition: all var(--duration-fast) var(--ease-out);
}

.service-chip--active .service-chip__check {
  opacity: 1;
  transform: scale(1);
}

/* Budget Selector */
.budget-field {
  margin-bottom: var(--space-md);
}

.budget-field__label {
  display: block;
  font-size: var(--text-xs);
  color: var(--color-earth);
  letter-spacing: var(--tracking-wide);
  margin-bottom: var(--space-md);
}

.budget-selector {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-xs);
}

.budget-chip {
  display: flex;
  align-items: baseline;
  gap: var(--space-2xs);
  padding: var(--space-sm) var(--space-md);
  background: transparent;
  border: 1px solid var(--color-hanji-deep);
  cursor: pointer;
  transition: all var(--duration-fast) var(--ease-out);
}

.budget-chip:hover {
  border-color: var(--color-gold);
}

.budget-chip--active {
  background: var(--color-ink);
  border-color: var(--color-ink);
}

.budget-chip__amount {
  font-family: var(--font-display);
  font-size: var(--text-sm);
  color: var(--color-ink);
  transition: color var(--duration-fast) var(--ease-out);
}

.budget-chip--active .budget-chip__amount {
  color: var(--color-white);
}

.budget-chip__unit {
  font-size: var(--text-xs);
  color: var(--color-stone);
  transition: color var(--duration-fast) var(--ease-out);
}

.budget-chip--active .budget-chip__unit {
  color: var(--color-hanji);
  opacity: 0.7;
}

/* Summary Card */
.wizard-summary {
  margin-top: var(--space-xl);
  background: var(--color-hanji-warm);
  border: 1px solid var(--color-hanji-deep);
}

.wizard-summary__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-sm) var(--space-md);
  border-bottom: 1px solid var(--color-hanji-deep);
}

.wizard-summary__badge {
  font-size: var(--text-xs);
  letter-spacing: var(--tracking-wider);
  color: var(--color-stone);
}

.wizard-summary__hanja {
  font-family: var(--font-display);
  font-size: var(--text-base);
  color: var(--color-gold);
  opacity: 0.5;
}

.wizard-summary__body {
  padding: var(--space-md);
}

.wizard-summary__row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: var(--space-xs) 0;
}

.wizard-summary__label {
  font-size: var(--text-xs);
  color: var(--color-stone);
  letter-spacing: var(--tracking-wide);
}

.wizard-summary__value {
  font-size: var(--text-sm);
  color: var(--color-ink);
  text-align: right;
  max-width: 60%;
}

.wizard-summary__value--accent {
  color: var(--color-gold-deep);
  font-weight: 500;
}

.wizard-summary__divider {
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--color-hanji-deep), transparent);
  margin: var(--space-2xs) 0;
}

/* Navigation */
.wizard-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: var(--space-md);
  gap: var(--space-md);
}

.wizard-nav__btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-xs);
  padding: var(--space-md) var(--space-lg);
  font-family: var(--font-body);
  font-size: var(--text-sm);
  border: none;
  cursor: pointer;
  transition: all var(--duration-normal) var(--ease-out);
}

.wizard-nav__btn--prev {
  background: transparent;
  color: var(--color-stone);
  border: 1px solid var(--color-hanji-deep);
}

.wizard-nav__btn--prev:hover {
  color: var(--color-ink);
  border-color: var(--color-ink);
}

.wizard-nav__btn--next {
  background: var(--color-hanji-warm);
  color: var(--color-ink);
  border: 1px solid var(--color-hanji-deep);
}

.wizard-nav__btn--next:hover {
  background: var(--color-hanji-deep);
}

.wizard-nav__btn--submit {
  flex: 1;
  justify-content: center;
  background: var(--color-ink);
  color: var(--color-white);
  padding: var(--space-lg) var(--space-xl);
  position: relative;
  overflow: hidden;
}

.wizard-nav__btn--submit::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, var(--color-gold) 0%, var(--color-gold-deep) 100%);
  opacity: 0;
  transition: opacity var(--duration-normal) var(--ease-out);
}

.wizard-nav__btn--submit:hover:not(:disabled)::before {
  opacity: 1;
}

.wizard-nav__btn--submit span,
.wizard-nav__btn--submit svg {
  position: relative;
  z-index: 1;
}

.wizard-nav__btn--submit:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.wizard-nav__spinner {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Secondary Actions */
.wizard-secondary {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-md);
  margin-top: var(--space-md);
  padding-top: var(--space-sm);
  border-top: 1px solid var(--color-hanji-deep);
}

.wizard-secondary__link {
  display: inline-flex;
  align-items: center;
  gap: var(--space-xs);
  font-size: var(--text-sm);
  color: var(--color-stone);
  text-decoration: none;
  transition: color var(--duration-fast) var(--ease-out);
}

.wizard-secondary__link:hover {
  color: var(--color-gold-deep);
}

.wizard-secondary__divider {
  color: var(--color-hanji-deep);
}

/* Step Transitions */
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.35s var(--ease-out);
}

.slide-left-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.slide-left-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

.slide-right-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.slide-right-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* Mobile Optimizations */
@media (max-width: 480px) {
  .wizard-header {
    padding: var(--space-md) var(--page-padding) var(--space-xs);
  }

  .wizard-header__title {
    font-size: var(--text-xl);
  }

  .wizard-progress__track {
    left: calc(var(--page-padding) + 20px);
    right: calc(var(--page-padding) + 20px);
  }

  .wizard-progress__step-label {
    font-size: 10px;
  }

  .wizard-step {
    padding: var(--space-lg);
  }

  .service-selector {
    grid-template-columns: repeat(2, 1fr);
  }

  .service-chip {
    padding: var(--space-sm);
  }

  .budget-chip {
    flex: 1;
    justify-content: center;
    min-width: calc(50% - var(--space-xs));
  }

  .wizard-nav__btn {
    padding: var(--space-md);
  }

  .wizard-nav__btn--submit {
    padding: var(--space-md) var(--space-lg);
  }
}
</style>
