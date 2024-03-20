<script setup lang="ts">
import { SelectValue } from 'radix-vue'

const props = defineProps<{
  isEmpty: boolean
}>()
</script>

<template>
  <SelectValue
    :class="{
      'text-input-placeholder': props.isEmpty,
    }"
    class="truncate text-sm"
  >
    <slot />
  </SelectValue>
</template>
