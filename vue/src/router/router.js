import { createRouter, createWebHistory } from 'vue-router'
import PostPage from '@/pages/PostPage'
import MainPage from '@/pages/MainPage'

// Добавим руты - пути для указания разных страниц в массиве
const routes = [
  {
    path: '/',
    component: MainPage
  },
  {
    path: '/posts',
    component: PostPage
  }
]

const router = createRouter({
  routes,
  history: createWebHistory(process.env.BASE_URL)
})

export default router
