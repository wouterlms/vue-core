<script setup lang="ts">
import { DropdownMenuSubTrigger } from 'radix-vue'

import type { DropdownMenuTrigger } from '../../types/dropdownMenuItem.type'
import AppIcon from '../icon/AppIcon.vue'
import AppText from '../text/AppText.vue'

const props = defineProps<{
  item: DropdownMenuTrigger
}>()
</script>

<template>
  <DropdownMenuSubTrigger class="group cursor-default overflow-hidden rounded-md p-2 py-1.5 outline-none focus:bg-muted-background">
    <div class="flex items-center justify-between gap-x-3 overflow-hidden">
      <div class="flex items-center gap-x-3 overflow-hidden">
        <AppIcon
          :icon="props.item.icon"
          class="shrink-0 text-muted-foreground group-focus:text-foreground"
          size="default"
        />

        <AppText
          class="truncate text-muted-foreground group-focus:text-foreground"
          variant="subtext"
        >
          {{ props.item.label }}
        </AppText>
      </div>

      <AppIcon
        class="ml-4 shrink-0 text-muted-foreground"
        icon="chevronRight"
        size="sm"
      />
    </div>
  </DropdownMenuSubTrigger>
</template>
