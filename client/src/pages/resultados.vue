<script setup lang="ts">
import { useCandidatesStore } from '~/stores/candidates';

const store = useCandidatesStore();

const password = ref('');
const error = ref('');
const canView = ref(false);

const cache = localStorage.getItem('view');
if (cache) {
  const success = await store.fetchSummary(cache);
  canView.value = !!success;
}

const validateAndFetch = async () => {
  if (!password.value) {
    error.value = 'Por favor, ingresa la clave de acceso';
    return;
  }

  const success = await store.fetchSummary(password.value);
  if (!success) {
    error.value = 'Clave incorrecta';
    return;
  }

  canView.value = true;
  localStorage.setItem('view', password.value);
};
</script>

<template>
  <form
    v-if="!canView"
    @submit.prevent="validateAndFetch"
    class="min-h-screen w-96 mx-auto flex flex-col justify-center items-center gap-6"
  >
    <h1 class="text-gray-900 text-2xl font-bold">Resultados Encuesta Unicamp</h1>
    <TheInputField
      name="password"
      type="password"
      v-model="password"
      :error="!!error"
      wrapper-classes="w-full"
      label="Clave de acceso"
    >
      <template #hint>
        {{ error }}
      </template>
    </TheInputField>

    <BaseButton class="btn-default w-full">Continuar</BaseButton>
  </form>

  <div v-else class="min-h-screen w-full max-w-xl mx-auto flex flex-col justify-center items-center px-4">
    <h1 class="text-gray-900 text-2xl font-bold">Resultados Encuesta Unicamp</h1>

    <ul class="mt-6 w-full flex flex-col gap-2">
      <li
        v-for="(candidate, idx) in store.sortedCandidates"
        :key="candidate.id"
        class="overflow-hidden bg-white rounded-md shadow flex gap-4 items-center"
      >
        <div class="w-24">
          <img :src="candidate.imageUrl" :alt="candidate.name" class="w-full max-h-20 object-cover" />
        </div>

        <div class="flex-1">
          <span class="block truncate font-semibold text-sky-600">{{ candidate.name }}</span>
          <span class="block truncate text-gray-600 text-sm">Votos: {{ candidate.votes ?? '--' }}</span>
        </div>

        <div class="mr-4 w-8 h-8 flex justify-center items-center rounded-full bg-sky-100">
          <span class="text-sm font-semibold text-sky-700">{{ idx + 1 }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<route lang="yaml">
name: summary
</route>
