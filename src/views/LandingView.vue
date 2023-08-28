<script setup></script>

<template>
  <div class="relative flex flex-col overflow-hidden">
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
    <main>
      
      <div class="w-full flex place-items-center justify-center h-full bg-[url('assets/logo/background.jpg')] bg-cover backdrop-grayscale  ">
        <RouterView></RouterView>
      </div> 
    </main>
  </div>
</template>
