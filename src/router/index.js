import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/posts',
    name: 'Posts',
    component: () => import('../views/PostsView.vue'),
  },
  {
    path: '/post/:id',
    name: 'Post',
    component: () => import('../views/PostView.vue'),
  },
  {
    path: '/grafico/:id',
    name: 'Grafico',
    component: () => import('../views/GraficoView.vue'),
  },
  {
    path: '/imagem/:id',
    name: 'Image',
    component: () => import('../views/ImagemView.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/LoginView.vue'),
  },
  {
    path: '/create-account',
    name: 'Create Account',
    component: () => import('../views/CreateAccountView.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// Global navigation guard
router.beforeEach((to, from, next) => {
  const authToken = localStorage.getItem('auth-token');

  // If the user is trying to access a protected route
  const protectedRoutes = ['Posts', 'Post', 'Grafico', 'Image']; // Add your protected route names here
  if (protectedRoutes.includes(to.name) && !authToken) {
    // Redirect to login if not authenticated
    next({ name: 'Login' });
  } else {
    next(); // Allow the route
  }
});

export default router;
