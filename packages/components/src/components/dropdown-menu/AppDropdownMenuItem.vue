<script setup lang="ts">
import { DropdownMenuItem as RadixDropdownMenuItem, DropdownMenuPortal } from 'radix-vue'

import type { DropdownMenuItem } from '@/types/dropdownMenuItem.type'

import AppIcon from '../icon/AppIcon.vue'
import AppText from '../text/AppText.vue'
import AppDropdownMenuDivider from './AppDropdownMenuDivider.vue'
import AppDropdownMenuGroup from './AppDropdownMenuGroup.vue'
import AppDropdownMenuSub from './AppDropdownMenuSub.vue'
import AppDropdownMenuSubContent from './AppDropdownMenuSubContent.vue'
import AppDropdownMenuSubTrigger from './AppDropdownMenuSubTrigger.vue'

const props = defineProps<{
  item: DropdownMenuItem
}>()
</script>

<template>
  <AppDropdownMenuDivider v-if="props.item.type === 'divider'" />

  <AppDropdownMenuGroup v-else-if="props.item.type === 'group'">
    <AppDropdownMenuItem
      v-for="(groupItem, i) of props.item.items"
      :key="i"
      :item="groupItem"
    />
  </AppDropdownMenuGroup>

  <AppDropdownMenuSub v-else-if="props.item.type === 'trigger'">
    <AppDropdownMenuSubTrigger :icon="props.item.icon">
      {{ props.item.label }}
    </AppDropdownMenuSubTrigger>

    <DropdownMenuPortal>
      <AppDropdownMenuSubContent>
        <AppDropdownMenuItem
          v-for="(subItem, i) of props.item.items"
          :key="i"
          :item="subItem"
        />
      </AppDropdownMenuSubContent>
    </DropdownMenuPortal>
  </AppDropdownMenuSub>

  <RadixDropdownMenuItem
    v-if="props.item.type === 'option'"
    class="group cursor-default overflow-hidden rounded-md p-2 outline-none focus:bg-muted-background"
    @select="props.item.onSelect"
  >
    <div class="flex items-center gap-x-3 overflow-hidden">
      <AppIcon
        v-if="props.item.icon !== null"
        :icon="props.item.icon"
        class="shrink-0 text-muted-foreground group-focus:text-foreground"
        size="default"
      />

      <AppText
        class="truncate group-focus:text-foreground"
        variant="subtext"
      >
        {{ props.item.label }}
      </AppText>
    </div>
  </RadixDropdownMenuItem>
</template>
