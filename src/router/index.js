import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import LoginView from '../views/LoginView.vue'
import FirebaseSigninView from '../views/FirebaseSigninView.vue'
import FirebaseRegisterView from '@/views/FirebaseRegisterView.vue'
import AddBookView from '@/views/AddBookView.vue'
import GetBookCountView from '../views/GetBookCountView.vue';
import WeatherView from '../views/WeatherView.vue';
import CountBookAPI from '../views/CountBookAPI.vue';
import GetAllBookAPI from '../views/GetAllBookAPI.vue';
const routes = [
  {
    path: '/FireLogin',
    name: 'FireLogin',
    component: FirebaseSigninView
  },
  {
    path: '/FireRegister',
    name: 'FireRegister',
    component: FirebaseRegisterView
  },
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView,
    meta: { requiresAuth: true } 
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/addbook',
    name: 'addbook',
    component: AddBookView
  },
  {
    path: '/GetBookCountView',
    name: 'GetBookCountView',
    component: GetBookCountView
  },
  {
    path: '/WeatherView',
    name: 'WeatherView',
    component: WeatherView
  },
  {
    path: '/CountBookAPI',
    name: 'CountBookAPI',
    component: CountBookAPI
  },
  {
    path: '/GetAllBookAPI',
    name: 'GetAllBookAPI',
    component: GetAllBookAPI
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    if (!isAuthenticated) {
      next({ name: 'Login' }); 
    } else {
      next(); 
    }
  } else {
    next(); 
  }
});

export default router
