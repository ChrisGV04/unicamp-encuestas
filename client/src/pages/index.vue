<script setup lang="ts">
import { useCandidatesStore } from '~/stores/candidates';

const store = useCandidatesStore();

const error = ref('');
const email = ref('');

// Clear the current email
localStorage.removeItem('currentEmail');
store.currentEmail = '';

const router = useRouter();

watch(email, (value) => {
  if (!value) error.value = 'Por favor, ingresa tu correo electrónico';
});

const validateAndContinue = async () => {
  if (!email.value) {
    error.value = 'Por favor, ingresa tu correo electrónico';
    return;
  }

  store.currentEmail = email.value;
  localStorage.setItem('currentEmail', email.value);
  router.push({ name: 'form' });
};
</script>

<template>
  <form
    @submit.prevent="validateAndContinue"
    class="min-h-screen w-full max-w-[24rem] mx-auto flex flex-col justify-center items-center gap-6 px-4"
  >
    <h1 class="text-gray-900 text-2xl font-bold">Encuesta Unicamp</h1>
    <TheInputField
      type="email"
      name="email"
      v-model="email"
      :error="!!error"
      wrapper-classes="w-full"
      label="Tu correo electrónico"
    >
      <template #hint>
        {{ error }}
      </template>
    </TheInputField>

    <BaseButton class="btn-default w-full">Continuar</BaseButton>
  </form>
</template>

<route lang="yaml">
name: home
</route>
