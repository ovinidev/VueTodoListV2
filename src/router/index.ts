import { createRouter, createWebHistory } from 'vue-router'
import Home from '@pages/Home.vue'
import Todo from '@pages/Todo.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/todo',
    name: 'Todo',
    component: Todo
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})
