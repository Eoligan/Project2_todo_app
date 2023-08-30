<script setup>
import { ref } from "vue"

const errorMessage = ref("")

const props = defineProps({
  message: String,
})
</script>

<template>
  <Transition name="error-transition" mode="out-in" appear leave>
    <div class="error-message">
      {{ props.message }}
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
  background-color: #be0000;
  color: white;
  padding: 1rem;
  border-radius: 5px;
  text-align: center;
  position: fixed;
  z-index: 25;
  top: 20%;
  left: 50%;
  translate: (0%, -50%);
  position: absolute;
}
</style>
