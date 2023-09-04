import { createRouter, createWebHistory } from "vue-router"
import LandingView from "@/views/LandingView.vue"
import LoginView from "@/views/LoginView.vue"
import RegisterView from "@/views/RegisterView.vue"
import DashboardView from "@/views/DashboardView.vue"
import CardView from "@/views/CardView.vue"
import TasksView from "@/views/TasksView.vue"
import supabase from "@/lib/supabase"

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "landing",
      component: LandingView,
      redirect: to  => {return {name:'login'}},
      children: [
        {
          path: "login",
          name: "login",
          component: LoginView,
          meta: { requiresGuest: true },
        },
        {
          path: "register",
          name: "register",
          component: RegisterView,
          meta: { requiresGuest: true },
        },
      ],
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: DashboardView,
      meta: { requiresAuth: true },
      redirect: (to) => {
        return { name: "cardview" }
      },
      children: [
        {
          path: "/dashboard/cards",
          name: "cardview",
          component: CardView,
          meta: { requiresAuth: true },
        },
        {
          path: "/dashboard/tasks/:id",
          name: "tasksview",
          component: TasksView,
          meta: { requiresAuth: true },
        },
        // {
        //   path: "register",
        //   name: "register",
        //   component: RegisterView,
        //   meta: { requiresAuth: true },
        // },
      ],
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  const authUser = await supabase.auth.getSession()
  const requiresAuth = to.matched.some((x) => x.meta.requiresAuth)
  const requiresGuest = to.matched.some((x) => x.meta.requiresGuest)

  if (requiresAuth) {
    if (authUser.data.session === null || authUser.data.session === undefined) {
      next("/login")
    } else {
      next()
    }
  } else if (requiresGuest) {
    if (authUser.data.session === null || authUser.data.session === undefined) {
      next()
    } else {
      next("/dashboard")
    }
  } else {
    next()
  }
})
export default router
