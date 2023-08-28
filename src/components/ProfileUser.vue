<script setup>
import { ref, watch } from "vue"
import { useUserStore } from "@/stores/user"
import { Icon } from "@iconify/vue"

const userStore = useUserStore()
let userName = ref(userStore.user?.user_metadata.user_name)

watch(
  () => userStore.user,
  () => {
    userName.value = userStore.user?.user_metadata.user_name
  }
)

const handleSignOut = () => {
  userStore.handleSignOut()
}
</script>

<template>
  <div class="block sm:inline-flex items-center justify-end gap-4 sm:mx-8">
    <p class="text-sm mx-2">
      Welcome
      <span v-show="userName" class="ml-0.5 font-averia-bold text-base">{{
        userName
      }}</span
      >!
    </p>

    <div class="group flex items-center justify-center sm:block">
      <button
        class="flex items-center rounded-3xl border bg-secondary py-0.5 pl-3 pt-1 sm:py-1 sm:pt-1.5 align-middle font-averia text-sm text-neutral-200 transition-colors duration-150 ease-in hover:bg-secondary-200 hover:text-neutral-100"
        @click="handleSignOut"
      >
        Sign Out
        <Icon
          class="mx-2 h-5 w-5 -translate-y-0.5 font-bold text-neutral-200 transition-colors duration-200 ease-in group-hover:text-brand"
          icon="humbleicons:logout"
        />
      </button>
    </div>
  </div>
</template>
