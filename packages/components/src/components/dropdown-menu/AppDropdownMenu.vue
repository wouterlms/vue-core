<script setup lang="ts">
import {
  DropdownMenuPortal,
  DropdownMenuRoot,
  DropdownMenuTrigger,
} from 'radix-vue'

import type { DropdownMenuItem } from '@/types/dropdownMenuItem.type'

import AppDropdownMenuArrow from './AppDropdownMenuArrow.vue'
import AppDropdownMenuContent from './AppDropdownMenuContent.vue'
import AppDropdownMenuItem from './AppDropdownMenuItem.vue'

const props = withDefaults(
  defineProps<{
    align?: 'center' | 'end' | 'start'
    hasArrow?: boolean
    items: DropdownMenuItem[]
    offset?: number
    side?: 'bottom' | 'left' | 'right' | 'top'
  }>(),
  {
    align: 'center',
    hasArrow: false,
    offset: 0,
    side: 'bottom',
  },
)
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
