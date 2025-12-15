import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../pages/HomePage.vue')
    },
    {
      path: '/gallery/:category(dol|place|hanbok)',
      name: 'gallery-category',
      component: () => import('../pages/GalleryListPage.vue'),
      props: true
    },
    {
      path: '/gallery/:category/:id',
      name: 'gallery-detail',
      component: () => import('../pages/GalleryDetailPage.vue'),
      props: true
    },
    {
      path: '/gallery',
      redirect: '/gallery/dol'
    },
    {
      path: '/notices',
      name: 'notices',
      component: () => import('../pages/NoticeListPage.vue')
    },
    {
      path: '/notices/:id',
      name: 'notice-detail',
      component: () => import('../pages/NoticeDetailPage.vue'),
      props: true
    },
    {
      path: '/inquiry/reservation',
      name: 'reservation',
      component: () => import('../pages/ReservationInquiryPage.vue')
    },
    {
      path: '/inquiry/estimate',
      name: 'estimate',
      component: () => import('../pages/EstimateInquiryPage.vue')
    }
  ],
  scrollBehavior() {
    return { top: 0 };
  }
});

export default router;
