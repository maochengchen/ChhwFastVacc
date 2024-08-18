import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";
Vue.use(VueRouter);

// configure router
const router = new VueRouter({
  routes, // short for routes: routes
  linkActiveClass: "active",
});

router.beforeEach((to, from, next) => {
  const isLoggedIn = !!localStorage.getItem('token');
  const isLoginPage = to.path === '/login';
  console.log(isLoggedIn);
  if (!isLoggedIn && !isLoginPage) {
    // 如果使用者未登入且目標路徑不是 /login，則重定向到登入頁面
    next('/login');
  } else {
    // 否則允許路由繼續
    next();
  }
  // if (to.matched.some(record => record.meta.requiresAuth) && !isLoggedIn) {
  //   next({ name: 'Login' });
  // } else {
  //   next();
  // }
});

export default router;
