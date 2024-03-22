<script setup lang="ts">
import {
  DropdownMenuPortal,
  DropdownMenuRoot,
  DropdownMenuTrigger,
} from 'radix-vue'
import { computed } from 'vue'

import { useKeyboardCommand } from '@/composables/keyboardCommand.composable'
import type {
  DropdownMenuItem,
  DropdownMenuOption,
} from '@/types/dropdownMenuItem.type'

import AppDropdownMenuArrow from './AppDropdownMenuArrow.vue'
import AppDropdownMenuContent from './AppDropdownMenuContent.vue'
import AppDropdownMenuItem from './AppDropdownMenuItem.vue'

const props = withDefaults(
  defineProps<{
    align?: 'center' | 'end' | 'start'
    enableKeyboardCommands?: boolean
    hasArrow?: boolean
    items: DropdownMenuItem[]
    offset?: number
    side?: 'bottom' | 'left' | 'right' | 'top'
  }>(),
  {
    align: 'center',
    enableKeyboardCommands: false,
    hasArrow: false,
    offset: 0,
    side: 'bottom',
  },
)

function getAllItems(items: DropdownMenuItem[]): DropdownMenuItem[] {
  const allItems: DropdownMenuItem[] = []

  items.forEach((item) => {
    allItems.push(item)

    if (item.type === 'group' || item.type === 'trigger') {
      allItems.push(...getAllItems(item.items))
    }
  })

  return allItems
}

const optionItems = computed<DropdownMenuOption[]>(() => {
  return getAllItems(props.items).filter(item => item.type === 'option') as DropdownMenuOption[]
})

optionItems.value.forEach((item) => {
  useKeyboardCommand({
    command: {
      keys: item.command!.keys,
      onPressed: item.onSelect,
      type: item.command!.type,
    },
    isActive: computed<boolean>(() => props.enableKeyboardCommands),
    scope: 'controlled',
  })
})
</script>

<template>
  <DropdownMenuRoot>
    <DropdownMenuTrigger :as-child="true">
      <slot />
    </DropdownMenuTrigger>

    <DropdownMenuPortal>
      <AppDropdownMenuContent
        :align="props.align"
        :side="props.side"
        :side-offset="props.offset"
      >
        <AppDropdownMenuItem
          v-for="(item, i) of props.items"
          :key="i"
          :item="item"
        />

        <AppDropdownMenuArrow v-if="hasArrow" />
      </AppDropdownMenuContent>
    </DropdownMenuPortal>
  </DropdownMenuRoot>
</template>
