import { createRouter, createWebHistory } from 'vue-router';


import AllProduct from './components/AllProduct.vue'
import OneProduct from './components/One-Product.vue'




const routes = [
  {
    path: '/',
    name: 'AllProduct',
    component: AllProduct,
  },
  {
    path: '/OneProduct/:id',
    name: 'OneProduct',
    component: OneProduct,
  },
 

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// router.beforeEach((to, from, next) => {
//   const publicPages = ['/', '/admin-login'];
//   const authRequired = !publicPages.includes(to.path);
//   console.log(loggedIn);
//   if (authRequired && !loggedIn) {
//     return next('/admin-login');
//   }
//   next();
// });

export default router;
