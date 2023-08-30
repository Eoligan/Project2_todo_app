<script setup>
import { Icon } from "@iconify/vue"

const props = defineProps({
  message: String,
})
</script>

<template>
  <Transition name="error-transition" mode="out-in" appear leave>
    <div class="relative tracking-tight">
      <Icon
        class="absolute -top-3 left-3 text-red-500"
        icon="iconoir:nav-arrow-up"
      />
      <div class="error-message relative">
        {{ props.message }}
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.error-transition-enter-active,
.error-transition-leave-active {
  transition: all 0.5s;
}
.error-transition-enter-from,
.error-transition-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
.error-transition-leave-from,
.error-transition-enter-to {
  opacity: 100;
}

.error-message {
  border: 1px solid #ef4444;
  color: #ef4444;
  padding: 0.2rem 0.5rem;
  border-radius: 5px;
  text-align: center;
  z-index: 25;
}
</style>
