<script setup async>
import { useUserStore } from "../stores/user"

const userStore = useUserStore()
let userName = await userStore.getName()

console.log("User data in dashboard: ", userName)
</script>

<template>
  <Suspense>
    <p class="bg-red-500">caracolaA!!</p>
    <p>User: {{ userName }}</p>
  </Suspense>
</template>
