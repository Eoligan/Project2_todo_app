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
  <div class="inline-flex items-center justify-end gap-4">
    <p>
      Welcome <span v-show="userName" class="font-bold">{{ userName }}</span
      >!
    </p>

    <div class="group">
      <button
        class="flex items-center rounded-xl border bg-secondary py-1 pl-3 font-averia-bold text-sm uppercase text-neutral-200 transition-colors duration-150 ease-in hover:bg-secondary-200 hover:text-neutral-100"
        @click="handleSignOut"
      >
        Sign Out
        <Icon
          class="mx-2 h-6 w-6 font-bold text-neutral-200 transition-colors duration-200 ease-in group-hover:text-brand"
          icon="humbleicons:logout"
        />
      </button>
    </div>
  </div>
</template>
