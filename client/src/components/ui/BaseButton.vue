<script setup lang="ts">
defineProps({
  disabled: { type: Boolean, default: false },
  loading: { type: Boolean, default: false },
});
</script>

<template>
  <button
    class="relative inline-flex items-center justify-center font-bold uppercase transition-colors duration-100 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed disabled:select-none"
    :class="{ 'animate-pulse': loading }"
    :disabled="disabled || loading"
  >
    <div v-if="$slots['left-icon']" class="flex-shrink mr-2">
      <slot name="left-icon" />
    </div>

    <div class="flex-grow">
      <slot />
    </div>

    <div v-if="loading" class="flex flex-shrink ml-2 items-center pointer-events-none">
      <FeatherLoader class="animate-spin" />
    </div>

    <div v-else-if="$slots['right-icon']" class="flex-shrink ml-2">
      <slot name="right-icon" />
    </div>
  </button>
</template>
