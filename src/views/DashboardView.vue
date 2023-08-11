<script setup async>
import { useUserStore } from "../stores/user"
import { onMounted, ref } from "vue"

const userStore = useUserStore()
const userName = ref()

onMounted(async () => {
  userName.value = await userStore.getName()
})
</script>

<template>
  <p class="bg-red-500">caracolaA!!</p>
  <button
    class="rounded border bg-blue-500"
    @click="userStore.handleSignOut"
  >Sign Out</button>
  <Suspense>
    <p>User: {{ userName }}</p>
  </Suspense>
</template>
