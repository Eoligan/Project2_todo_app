<script setup>
import { ref } from "vue"
import { useUserStore } from "@/stores/user"

const userStore = useUserStore()
const userName = ref(userStore.user.user.user_metadata.name)

const handleSignOut = () => {
  userStore.handleSignOut()
}
</script>

<template>
  <div>
    <p>User: {{ userName }}</p>
    <button class="rounded border bg-blue-500" @click="handleSignOut">
      Sign Out
    </button>
  </div>
</template>
