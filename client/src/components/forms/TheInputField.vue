<script setup lang="ts">
import { PropType } from 'vue';

const emit = defineEmits(['click.trailing', 'update:modelValue']);
const props = defineProps({
  label: String,
  required: Boolean,
  wrapperClasses: String,
  modelValue: null as any as PropType<any>,
  name: { type: String, required: true },
  disabled: { type: Boolean, default: false },
  error: { type: Boolean, default: false },
});

const inputValue = computed({
  get(): any {
    return props.modelValue;
  },
  set(newValue: any): void {
    emit('update:modelValue', newValue);
  },
});

const increment = (min?: number) => {
  if (isNaN(inputValue.value) || (min != undefined && inputValue.value < min)) {
    inputValue.value = min;
  } else {
    inputValue.value++;
  }
};

const decrement = (min?: number) => {
  if (isNaN(inputValue.value) || (min != undefined && inputValue.value <= min)) {
    inputValue.value = min;
  } else {
    inputValue.value--;
  }
};
</script>

<script lang="ts">
export default defineComponent({
  inheritAttrs: false,
});
</script>

<template>
  <div :class="['flex flex-col space-y-1', wrapperClasses]">
    <label v-if="props.label" :for="props.name" class="block text-sm font-medium text-gray-600">
      <span class="text-red-500" v-show="required">*</span> {{ props.label }}
    </label>

    <div class="flex shadow-sm items-stretch">
      <div
        v-if="$attrs.type == 'number'"
        class="flex flex-col divide-y border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm"
      >
        <!-- Number arrows -->
        <button
          tabindex="0"
          type="button"
          aria-label="Sumar 1"
          @click="increment($attrs.min as number)"
          class="flex-1 w-6 flex justify-center items-center hover:bg-gray-200 focus:bg-gray-200 focus:outline-none"
        >
          <HeroiconsSolidChevronUp aria-hidden="true" class="w-4 h-4" />
        </button>
        <button
          type="button"
          aria-label="Restar 1"
          @click="decrement($attrs.min as number)"
          class="flex-1 w-6 flex justify-center items-center hover:bg-gray-200 focus:bg-gray-200 focus:outline-none"
        >
          <HeroiconsSolidChevronDown aria-hidden="true" class="w-4 h-4" />
        </button>
      </div>

      <div
        v-if="$slots['addon']"
        class="inline-flex items-center border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm"
      >
        <!-- Inline Add-on slot -->
        <slot name="addon" />
      </div>

      <!-- Inner input -->
      <div class="relative flex-grow">
        <!-- Leading content -->
        <div
          v-if="$slots['leading']"
          class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
        >
          <slot name="leading" />
        </div>

        <!-- Main input -->
        <input
          v-model="inputValue"
          v-bind="$attrs"
          :id="props.name"
          :disabled="props.disabled"
          :class="[
            'block w-full',
            {
              'pl-10': $slots['leading'],
              'border-red-600 placeholder-red-300 text-red-900 focus:ring-red-600 focus:border-red-600':
                error,
            },
          ]"
        />

        <!-- Trailing content -->
        <div
          v-if="props.error || $slots['trailing']"
          class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
          @click="emit('click.trailing')"
        >
          <slot v-if="!props.error" name="trailing" />
          <HeroiconsSolidExclamationCircle v-else class="h-5 w-5 text-red-500" />
        </div>
      </div>
    </div>

    <!-- Bottom hint -->
    <div
      v-show="$slots.hint"
      :class="['text-xs', error ? 'text-red-500' : 'text-gray-400']"
      :id="`${props.name}_details`"
    >
      <slot name="hint" />
    </div>
  </div>
</template>
