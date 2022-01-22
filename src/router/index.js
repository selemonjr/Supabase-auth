import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import {supabase} from "../supabase/supabaseConfig";
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      title:"Login"
    }
  },
  {
    path: "/about",
    name: "About",
    meta: {
      title:"Welcome",
      auth:true,
    },
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/register",
    name: "Register",
    meta:{
      title:"Register",
    },
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Register.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
router.beforeEach((to,from,next) => {
  document.title = `${to.meta.title} | Supabase`;
  next();
});

router.beforeEach((to,from,next) => {
  const user = supabase.auth.user();
  if(to.matched.some((res) => res.meta.auth)) {
    if(user) {
      next();
      return;
    }
    next({name:"Home"});
    return;
  } 
  next();
})
export default router;
