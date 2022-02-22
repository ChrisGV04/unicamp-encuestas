<script setup lang="ts">
useHead({
  title: 'Votos Unicamp',
  meta: [{ name: 'description', content: 'Vota por tu obra favorita' }],
});
</script>

<template>
  <client-only>
    <router-view v-slot="{ Component }">
      <Suspense>
        <transition
          appear
          mode="out-in"
          appear-active-class="transition-opacity duration-500"
          enter-active-class="transition-opacity duration-300"
          leave-active-class="transition-opacity duration-150"
          enter-from-class="opacity-0"
          leave-from-class="opacity-100"
          enter-to-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <component :is="Component" />
        </transition>

        <template #fallback>
          <div class="h-screen flex justify-center items-center">
            <TablerLoader class="h-14 w-14 text-sky-600 animate-spin" />
          </div>
        </template>
      </Suspense>
    </router-view>
  </client-only>
</template>

<style>
#nprogress {
  pointer-events: none;
}

#nprogress .bar {
  @apply bg-sky-600 opacity-75 fixed top-0 left-0 w-full h-0.5 z-50;
}
</style>
