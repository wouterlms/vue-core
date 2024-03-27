<script setup lang="ts">
import { ComboboxTrigger } from 'radix-vue'

const props = defineProps<{
  isDisabled: boolean
}>()
</script>

<template>
  <ComboboxTrigger
    :disabled="props.isDisabled"
    :class="{
      'opacity-50': props.isDisabled,
    }"
    class="absolute right-1 top-1/2 box-content -translate-y-1/2 p-2 outline-none"
  >
    <slot />
  </ComboboxTrigger>
</template>
