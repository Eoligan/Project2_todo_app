<script setup>
import { ref, onMounted, computed } from "vue"
import { useCardStore } from "@/stores/card"
import { Icon } from "@iconify/vue"
import { RouterLink } from "vue-router"
import CardItem from "@/components/CardItem.vue"

const cardStore = useCardStore()

const isCardsEmpty = computed(() => {
  return cardStore.cards.length > 0 ? true : false
})

const isLoading = ref(true)

onMounted(async () => {
  try {
    await cardStore.fetchCards()
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
    <ul class="flex gap-4">
      <li
        v-for="card in cardStore.cards"
        :key="card.id"
        class="0.2s mb-4 w-full rounded font-sans-serif shadow shadow-stone-400 transition-all ease-in hover:-translate-y-1 hover:shadow-md hover:shadow-brand/70"
      >
        <RouterLink
          :to="{ name: 'tasksview', params: { id: card.id } }"
          class="start flex h-52 w-52 cursor-pointer flex-col items-center justify-start"
        >
          <CardItem :card="card"></CardItem>
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
