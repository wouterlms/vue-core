<script setup lang="ts">
import { DialogContent } from 'radix-vue'

import AppDialogCloseButton from './AppDialogCloseButton.vue'

const props = defineProps<{
  hideCloseButton: boolean
}>()
</script>

<template>
  <DialogContent
    :force-mount="true"
    class="fixed left-1/2 top-1/2 z-dialog -translate-x-1/2 -translate-y-1/2 rounded-dialog bg-background shadow-dialog-shadow outline-none"
  >
    <div>
      <slot />

      <AppDialogCloseButton
        v-if="!props.hideCloseButton"
        class="!absolute right-2 top-2"
      />
    </div>
  </DialogContent>
</template>
