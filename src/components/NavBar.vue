<script setup>
import ProfileUser from "@/components/ProfileUser.vue"
</script>

<template>
  <nav class="mx-auto flex max-w-6xl items-center justify-between">
    Logo title
    <Suspense>
      <ProfileUser></ProfileUser>
    </Suspense>
  </nav>
</template>
