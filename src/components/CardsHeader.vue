<script setup>
import { ref } from "vue"
import { useCardStore } from "@/stores/card"
import { useUserStore } from "@/stores/user"
import { Icon } from "@iconify/vue"
import ErrorComponent from "@/components/ErrorComponent.vue"

const cardStore = useCardStore()
const userStore = useUserStore()
let cardTitle = ref("")

const isLengthOk = ref(true)

const addCard = async () => {
  const title = cardTitle.value
  cardTitle.value = ""
  if (title.length < 3) {
    isLengthOk.value = false

    setTimeout(() => {
      isLengthOk.value = true
    }, 4000)
    return
  }
  await cardStore.addCard(userStore.user.id, title)
}
</script>

<template>
  <h2
    class="relative place-self-start font-averia-bold text-5xl text-secondary after:w-48 sm:text-6xl sm:after:h-6"
  >
    Cards
  </h2>
  <div
    class="group relative flex w-full items-center rounded ring-2 ring-secondary"
  >
    <div v-if="!isLengthOk" class="absolute left-0 top-[3.25rem]">
      <ErrorComponent message="At least 3 characters" />
    </div>
    <input
      id="addTask"
      v-model="cardTitle"
      placeholder="Add a title for the card"
      type="text"
      class="ml-2 w-full border-none pl-1 font-sans-serif ring-0 focus:border-none focus:outline-none focus:ring-0"
      @keydown.enter="addCard"
    />
    <button @click="addCard">
      <Icon
        icon="material-symbols:add"
        width="2.5rem"
        height="2.5rem"
        class="rounded-r bg-secondary text-white ring-2 ring-secondary hover:bg-secondary/80 hover:ring-secondary/80 active:bg-secondary/60 active:ring-secondary/60"
      />
    </button>
  </div>
</template>

<style></style>
