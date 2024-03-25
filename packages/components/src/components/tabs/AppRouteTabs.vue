<script setup lang="ts">
import {
  TabsIndicator,
  TabsList,
  TabsRoot,
  TabsTrigger,
} from 'radix-vue'
import {
  computed,
  ref,
  watch,
} from 'vue'
import type { RouteLocationNamedRaw, RouteRecordName } from 'vue-router'
import { useRoute, useRouter } from 'vue-router'

interface Tab {
  label: string
  to: RouteLocationNamedRaw
}

const props = defineProps<{
  tabs: Tab[]
}>()

const route = useRoute()
const router = useRouter()
const activeRouteName = ref<RouteRecordName>(route.name as RouteRecordName)

const computedModel = computed<string>({
  get: () => activeRouteName.value as string,
  set: (value) => {
    activeRouteName.value = value as RouteRecordName
  },
})

watch(() => route.name, (routeName) => {
  if (routeName !== null && routeName !== undefined) {
    activeRouteName.value = routeName
  }
}, {
  immediate: true,
})

watch(activeRouteName, (activeRouteName) => {
  const tab = props.tabs.find(tab => tab.to.name === activeRouteName) ?? null

  if (tab === null) {
    throw new Error(`Tab with route name "${String(activeRouteName)}" not found`)
  }

  void router.push(tab.to)
})

// TODO: tabs should render a RouterLink instead of a button
</script>

<template>
  <TabsRoot v-model="computedModel">
    <TabsList class="relative flex border-b border-solid border-border ring-offset-background duration-200 [&:has(:focus-visible)]:rounded [&:has(:focus-visible)]:ring-2 [&:has(:focus-visible)]:ring-ring [&:has(:focus-visible)]:ring-offset-2">
      <TabsIndicator class="absolute bottom-0 left-0 h-[2px] w-[--radix-tabs-indicator-size] translate-x-[--radix-tabs-indicator-position] rounded-t-full bg-primary px-8 duration-200" />

      <TabsTrigger
        v-for="tab of tabs"
        :key="tab.label"
        :value="(tab.to.name as string)"
        class="rounded px-4 py-3 outline-none"
      >
        {{ tab.label }}
      </TabsTrigger>
    </TabsList>
  </TabsRoot>
</template>
