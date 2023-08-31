<script setup></script>

<template>
  <div class="relative flex h-screen flex-col">
    <header class="m-6 flex flex-col md:m-10">
      <div class="relative mx-auto">
        <h1
          class="absolute -top-2 left-3 w-28 text-center font-averia-light-italic text-xl lowercase tracking-wide text-brand md:-left-2 md:-top-2 md:w-40 md:text-2xl md:tracking-widest"
        >
          There's a lot
        </h1>
      </div>
      <img
        class="mx-auto w-60 md:w-72"
        src="../assets/logo/default-monochrome.svg"
        alt=""
      />
    </header>
    <main class="relative flex h-screen grow">
      <img
        class="absolute -z-10 h-full w-full object-cover opacity-30 grayscale"
        src="../assets/logo/background.jpg"
        alt=""
      />

      <RouterView></RouterView>
    </main>
  </div>
</template>

<style scoped></style>
