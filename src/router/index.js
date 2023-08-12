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
      requiresGuest: true,
      redirect: "/login",
      children: [
        {
          path: "login",
          name: "login",
          component: LoginBox,
          requiresGuest: true,
        },
        {
          path: "register",
          name: "register",
          component: RegisterBox,
          requiresGuest: true,
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

router.beforeEach(async (to, from, next) => {
  const authUser = await supabase.auth.getSession()
  const requiresAuth = to.matched.some((x) => x.meta.requiresAuth)
  const requiresGuest = to.matched.some((x) => x.meta.requiresGuest)
  // check if the route requires authentication
  if (requiresAuth) {
    // if the user is not authenticated, redirect to the login page
    if (!authUser.data.session) {
      next("/login")
    } else if (authUser.data.session) {
      next("/dashboard")
    }
  } else if (requiresGuest) {
    if (!authUser.data.session) {
      next("/login")
    } else if (authUser.data.session) {
      next("/dashboard")
    }
  } else next()
})

export default router
