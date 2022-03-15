<script setup lang="ts">
const route = useRoute();
const router = useRouter();

const voteLock = localStorage.getItem('lock');

watch(
  () => route.name,
  (currentRoute) => {
    if (currentRoute !== 'summary' && voteLock) router.replace({ name: 'my-vote' });
  },
  {
    immediate: true,
  }
);
</script>

<template>
  <main class="h-full min-h-screen bg-gray-50 flex flex-col">
    <router-view v-slot="{ Component }">
      <Suspense :timeout="0" :key="route.name || route.path">
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
          <div class="flex-1 flex justify-center items-center">
            <TablerLoader class="h-14 w-14 text-sky-600 animate-spin" />
          </div>
        </template>
      </Suspense>
    </router-view>
  </main>
</template>
