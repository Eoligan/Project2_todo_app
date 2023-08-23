<script setup></script>

<template>
  <div class="relative flex min-h-screen flex-col overflow-hidden">
    <header class="m-10 flex flex-col">
      <div class="relative mx-auto">
        <h1
          class="absolute -left-2 -top-2 w-40 text-center font-averia-light-italic text-2xl lowercase tracking-widest text-brand"
        >
          There's a lot
        </h1>
      </div>
      <img
        class="mx-auto w-72"
        src="../assets/logo/default-monochrome.svg"
        alt=""
      />
    </header>
    <main class="relative">
      <RouterView> </RouterView>
    </main>
  </div>
</template>
