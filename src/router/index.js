import { createRouter, createWebHistory } from "vue-router"
import LandingView from "@/views/LandingView.vue"
import LoginBox from "@/components/LoginBox.vue"
import RegisterBox from "@/components/RegisterBox.vue"
import DashboardView from "@/views/DashboardView.vue"

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
    },
  ],
})

export default router
