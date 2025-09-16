import { createRouter, createWebHistory } from 'vue-router'
import Home from '../App.vue'

const routes = [
  {
    path: '/:catchAll(.*)*',
    name: 'Home',
    component: Home
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})
