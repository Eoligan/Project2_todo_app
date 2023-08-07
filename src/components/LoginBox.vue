<script setup></script>

<template>
  
  <section class="grid place-items-center">
    <div class="rounded-md bg-slate-300 px-8 pb-8 pt-4">
      <h2 class="text-center text-xl font-bold m-4">Login</h2>
      <div class="flex flex-col">
        <!-- <label class="mt-6 place-self-start" for="email">Email</label> -->
        <input
          placeholder=" Email"
          class="border-b-2 my-2 pb-1 border-slate-800 bg-slate-300 placeholder:text-slate-800"
          id="email"
          name="email"
          type="email"
        />
        <!-- <label for="pass">Password</label> -->
        <input placeholder=" Password"
          class="border-b-2 my-2 pb-1 border-slate-800 bg-slate-300 placeholder:text-slate-800"
          id="pass" name="pass" type="password" />

        <button class="bg-amber-600 mt-3 rounded-md font-bold text-white">Login</button>
        <a class="text-xs mt-3 text-amber-600 ">Don't have an account? Sign up</a>
      </div>
    </div>
  </section>
</template>
