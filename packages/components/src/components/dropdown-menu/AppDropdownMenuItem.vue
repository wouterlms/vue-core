<script setup lang="ts">
import { DropdownMenuPortal } from 'radix-vue'

import type { DropdownMenuItem } from '../../types/dropdownMenuItem.type'
import AppDropdownMenuDivider from './AppDropdownMenuDivider.vue'
import AppDropdownMenuGroup from './AppDropdownMenuGroup.vue'
import AppDropdownMenuOption from './AppDropdownMenuOption.vue'
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

  <AppDropdownMenuSub v-else-if="props.item.type === 'subMenu'">
    <AppDropdownMenuSubTrigger :item="props.item" />

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

  <AppDropdownMenuOption
    v-if="props.item.type === 'option'"
    :item="props.item"
  />
</template>
