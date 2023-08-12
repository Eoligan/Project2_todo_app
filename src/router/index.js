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

router.beforeEach(async (to, from, next) => {
  //get the authenticated user
  const authUser = await supabase.auth.getSession()

  // check if the route requires authentication
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // if the user is not authenticated, redirect to the login page
    if (authUser.data.session === null || authUser.data.session === undefined) {
      next("/login")
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
