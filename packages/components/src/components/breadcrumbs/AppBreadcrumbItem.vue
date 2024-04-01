<script setup lang="ts">
import { RouterLink } from 'vue-router'

import type { BreadcrumbItem } from '../../types/breadcrumbItem.type'
import AppText from '../text/AppText.vue'
import AppBreadcrumbEllipsis from './AppBreadcrumbEllipsis.vue'

const props = defineProps<{
  item: BreadcrumbItem
}>()
</script>

<template>
  <li>
    <RouterLink
      v-if="props.item.type === 'route'"
      :to="props.item.to"
      class="block rounded p-0.5 outline-none ring-offset-background duration-200 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      <AppText
        variant="subtext"
        class="max-w-32 truncate text-muted-foreground"
      >
        {{ props.item.label }}
      </AppText>
    </RouterLink>

    <AppBreadcrumbEllipsis
      v-else-if="props.item.type === 'ellipsis'"
      :item="props.item"
    />

    <div
      v-else-if="props.item.type === 'page'"
      class="p-0.5"
    >
      <AppText
        variant="subtext"
        class="max-w-32 truncate text-muted-foreground/75"
      >
        {{ props.item.label }}
      </AppText>
    </div>
  </li>
</template>
