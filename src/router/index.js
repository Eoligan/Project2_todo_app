import { createRouter, createWebHistory } from "vue-router"
import LandingView from "@/views/LandingView.vue"
import LoginBox from "@/components/LoginBox.vue"
import RegisterBox from "@/components/RegisterBox.vue"
import DashboardView from "@/views/DashboardView.vue"
import supabase from "@/lib/supabase"

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "landing",
      component: LandingView,
      redirect: "/login",
      children: [
        {
          path: "login",
          name: "login",
          component: LoginBox,
        },
        {
          path: "register",
          name: "register",
          component: RegisterBox,
        },
      ],
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: DashboardView,
      meta: { requiresAuth: true },
    },
  ],
})

// router.beforeEach((to, from, next) => {
//   //get the authenticated user
//   const authUser = supabase.auth.getSession()
//   console.log(authUser);
//   //check sensitive routes
//   if (to.meta.requiresAuth) {
//     if (!authUser) {
//       next("/login")
//     } else {
//       next()
//     }
//   } else {
//     next()
//   }
// })

export default router
