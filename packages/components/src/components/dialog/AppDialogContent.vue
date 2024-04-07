<script setup lang="ts">
import { DialogContent } from 'radix-vue'

import AppDialogCloseButton from './AppDialogCloseButton.vue'

const props = defineProps<{
  hideCloseButton: boolean
}>()

function onInteractOutside(e: CustomEvent): void {
  const target = e.target as HTMLElement

  const isOverlay = target.classList.contains('dialog-overlay')

  if (!isOverlay) {
    e.preventDefault()
  }
}
</script>

<template>
  <DialogContent
    :force-mount="true"
    :disable-outside-pointer-events="false"
    class="fixed left-1/2 top-1/2 z-dialog -translate-x-1/2 -translate-y-1/2 rounded-dialog bg-background shadow-dialog-shadow outline-none"
    @interact-outside="onInteractOutside"
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
