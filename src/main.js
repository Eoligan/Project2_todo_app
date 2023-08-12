// import "./assets/main.css"
import "@/input.css"
import { createApp } from "vue"
import { createPinia } from "pinia"
import piniaPersist from "pinia-plugin-persist"

import App from "./App.vue"
import router from "./router"

createApp(App).use(createPinia().use(piniaPersist)).use(router).mount("#app")
