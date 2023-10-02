import { createRouter, createWebHistory } from 'vue-router'
 
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: import('@/views/HomeView.vue'),
    },
    {
      path: "/",
      name: "card",
      component: () => import("@/views/Card/CardView.vue"),
    },
  ],
})
 
export default router