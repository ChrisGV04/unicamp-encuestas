<script setup lang="ts">
import { onBeforeRouteLeave } from 'vue-router';
import { useCandidatesStore } from '~/stores/candidates';

const router = useRouter();
const hasWinner = ref(false);

const store = useCandidatesStore();
const success = await store.fetchCandidates();
if (!success) {
  hasWinner.value = true;
  router.replace({ name: 'home' });
}

onBeforeMount(() => {
  if (store.myVote) {
    hasWinner.value = true;
    router.replace({ name: 'my-vote' });
  }
});

const allCandidates = computed(() => store.allCandidates || []);

const currentView = ref<[number, number]>([0, 1]);
const currentIndex = ref(1);

const getImage = (index: any) => allCandidates.value[index];

const handleDecision = async (chosen: number) => {
  // If there are more options, continue
  if (currentIndex.value < allCandidates.value.length - 1) {
    currentIndex.value++;
    currentView.value.splice(chosen == 0 ? 1 : 0, 1, currentIndex.value);
    return;
  }

  const winner = allCandidates.value[currentView.value[chosen]];
  const success = await store.registerVote(winner.id);
  if (success) {
    hasWinner.value = true;
    router.push({ name: 'my-vote' });
  }
  // TODO: Also show errors
};

// Ask user to confirm page leave
const beforeUnload = function (e: any) {
  const confirmMsg = '¿Estás seguro que deseas salir? Se perderá tu progreso';

  (e || window.event).returnValue = confirmMsg;
  return confirmMsg;
};

onMounted(() => window.addEventListener('beforeunload', beforeUnload));

// Ask user to confirm route change
onBeforeRouteLeave(() => {
  if (!hasWinner.value) {
    const success = confirm('¿Estás seguro que deseas salir? Se perderá tu progreso');
    return success;
  }

  window.removeEventListener('beforeunload', beforeUnload);
  return true;
});
</script>

<template>
  <div
    class="min-h-screen w-full max-w-3xl mx-auto flex flex-col justify-center items-center gap-6 px-4 py-8"
  >
    <div class="flex flex-col items-center">
      <h1 class="text-2xl text-gray-900 font-bold">Elige tu obra favorita</h1>
      <span class="text-sm mt-2 text-gray-500 underline">
        La obra que selecciones pasará a la siguiente ronda y la otra se descartará.
      </span>
    </div>

    <ul class="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
      <li
        :key="`image-${getImage(currentView[i - 1]).id}`"
        v-for="i in 2"
        class="flex flex-col items-center hover:cursor-pointer"
        @click="handleDecision(i - 1)"
      >
        <img
          :alt="getImage(currentView[i - 1]).name"
          :src="getImage(currentView[i - 1]).imageUrl"
          class="block w-full rounded-lg shadow-md max-h-96 object-cover transition-all duration-300 hover:scale-105 hover:shadow-lg"
          :class="i % 2 == 0 ? 'hover:rotate-2' : 'hover:-rotate-2'"
        />
        <span class="block mt-2 text-gray-600 font-medium">{{ getImage(currentView[i - 1]).name }}</span>
      </li>
    </ul>

    <span class="text-xs text-gray-500">
      Imágenes por revisar: {{ allCandidates.length - currentIndex }}
    </span>
  </div>
</template>

<route lang="yaml">
name: form
</route>
