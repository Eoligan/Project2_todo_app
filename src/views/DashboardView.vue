<script setup async>
import { useUserStore } from "../stores/user"
import { onMounted, ref } from "vue"

const userStore = useUserStore()
const userName = ref()

onMounted(async () => {
  userName.value = await userStore.getName()
  // console.log("User data in dashboard: ", userName.value)
})
</script>

<template>
  <p class="bg-red-500">caracolaA!!</p>
  <Suspense>
    <p>User: {{ userName }}</p>
  </Suspense>
</template>
