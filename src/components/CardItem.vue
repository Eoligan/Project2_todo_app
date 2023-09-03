<script setup>
import { ref, onMounted, computed } from "vue"
import { useCardStore } from "@/stores/card"
import { Icon } from "@iconify/vue"
import { RouterLink } from "vue-router"

const cardStore = useCardStore()
const editMode = ref(null)
let cardTitle = ref("")

const isCardsEmpty = computed(() => {
  return cardStore.cards.length > 0 ? true : false
})

const isLoading = ref(true)

onMounted(async () => {
  try {
    await cardStore.fetchCards()
    // editMode.value = Array(cardStore.cards.length).fill(false)
    isLoading.value = false
  } catch (error) {
    console.error(error)
  }
})
</script>

<template>
  <div
    v-if="isLoading"
    class="mt-8 flex flex-col items-center justify-center font-sans-serif text-xl"
  >
    <Icon class="h-12 w-12 text-brand" icon="eos-icons:loading" />
    <p class="font-sans-serif font-bold">Loading</p>
  </div>

  <div
    v-else-if="isCardsEmpty"
    class="mt-8 flex w-full items-center justify-center"
  >
    <ul>
      <li
        v-for="card in cardStore.cards"
        class="group mb-4 flex w-full font-sans-serif"
      >
        <RouterLink
          to="Tasksview"
          class="flex h-32 w-32 items-start justify-center rounded border border-black p-2"
        >
          {{ card.title }}
        </RouterLink>
      </li>
    </ul>
  </div>
  <div v-else id="newCard" class="mt-10 font-sans-serif text-xl">
    You don't have cards yet!
    <span class="font-bold"> Add a new card </span>
    to start.
    <p class="mt-4">
      A card is used to group a list of tasks that share a common theme.
    </p>
  </div>
</template>

<style></style>
