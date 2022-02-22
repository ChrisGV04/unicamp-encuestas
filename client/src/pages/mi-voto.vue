<script setup lang="ts">
import { useCandidatesStore } from '~/stores/candidates';

const router = useRouter();

const store = useCandidatesStore();
const success = await store.fetchCandidates();
if (!success) router.replace({ name: 'home' });

onBeforeMount(() => {
  if (!store.myVote) router.replace({ name: 'form' });
});
</script>

<template>
  <div class="min-h-screen w-full max-w-3xl mx-auto flex flex-col justify-center items-center px-4">
    <h1 class="text-2xl text-gray-900 font-bold">¡Gracias por tu voto!</h1>
    <span class="text-sm mt-2 text-gray-500">Hemos registrado tu voto correctamente</span>

    <div class="mt-6 w-full flex flex-col items-center">
      <img
        :alt="store.myVote?.candidate.name"
        :src="store.myVote?.candidate.imageUrl"
        class="block w-full rounded-2xl shadow-md object-cover"
      />
      <span class="block mt-6 text-gray-600 font-medium">{{ store.myVote?.candidate.name || '--' }}</span>
    </div>
  </div>
</template>

<route lang="yaml">
name: my-vote
</route>
