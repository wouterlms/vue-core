<script setup lang="ts">
import { computed } from 'vue'

import { useKeyboardCommand } from '@/composables/keyboardCommand.composable'
import type { CommandScope, KeyboardCommand } from '@/types/keyboard.type'

import AppText from '../text/AppText.vue'
import AppKeyboardKey from './AppKeyboardKey.vue'

const props = withDefaults(defineProps<{
  command: Omit<KeyboardCommand, 'onPressed'>
  hasBorder?: boolean
  isActive?: boolean | null
  scope: CommandScope
}>(), {
  hasBorder: false,
  isActive: null,
})

const emit = defineEmits<{
  commandFired: []
}>()

if (props.isActive === null && props.scope === 'controlled') {
  throw new Error('[AppKeyboardCommand] `isActive` prop is required when scope is `controlled`')
}

const command = computed<KeyboardCommand>(() => ({
  ...props.command,
  onPressed: () => {
    emit('commandFired')
  },
}))

useKeyboardCommand({
  command: command.value,
  isActive: computed<boolean>(() => props.isActive ?? true),
  scope: 'controlled',
})
</script>

<template>
  <div class="flex items-center gap-x-1">
    <template
      v-for="(keyboardKey, index) of props.command.keys"
      :key="keyboardKey"
    >
      <AppKeyboardKey
        :has-border="props.hasBorder"
        :keyboard-key="keyboardKey"
      />

      <template v-if="index < props.command.keys.length - 1 && props.command.type === 'sequence'">
        <AppText
          variant="caption"
          class="text-muted-foreground"
        >
          then
        </AppText>
      </template>
    </template>
  </div>
</template>
