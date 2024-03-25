<script setup lang="ts" generic="TValue extends AcceptableValue">
import {
  ComboboxAnchor,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxRoot,
  ComboboxViewport,
} from 'radix-vue'
import { computed } from 'vue'

import type { AcceptableValue } from '@/types/selectItem.type'

import AppIcon from '../icon/AppIcon.vue'
import AppCommandItem from './AppCommandItem.vue'

const props = defineProps<{
  /**
   * The value of the combobox.
   */
  modelValue: TValue | null
  /**
   * The placeholder of the combobox.
   */
  placeholder: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: TValue | null]
}>()

const searchModel = defineModel<null | string>('search', {
  required: true,
})

const model = computed<TValue | undefined>({
  get: () => props.modelValue ?? undefined,
  set: (value) => {
    emit('update:modelValue', value ?? null)
  },
})

const search = computed<string | undefined>({
  get: () => searchModel.value ?? undefined,
  set: (value) => {
    searchModel.value = value ?? null
  },
})
</script>

<template>
  <div>
    <ComboboxRoot
      v-model="model"
      v-model:search-term="search"
      class="rounded-lg bg-background shadow-popover-shadow"
    >
      <ComboboxAnchor>
        <label class="flex items-center gap-x-3 border-b border-solid border-border p-5">
          <AppIcon
            icon="search"
            size="lg"
            class="text-muted-foreground"
          />

          <ComboboxInput
            :auto-focus="true"
            :placeholder="placeholder"
            class="w-full truncate bg-transparent outline-none placeholder:text-input-placeholder"
          />
        </label>
      </ComboboxAnchor>

      <ComboboxContent :force-mount="true">
        <ComboboxViewport>
          <ComboboxEmpty>
            Empty
          </ComboboxEmpty>

          <div class="p-2">
            <AppCommandItem
              value="github"
              label="Deploy from a Github repo"
            />

            <AppCommandItem
              value="template"
              label="Deploy from a template"
            />

            <AppCommandItem
              value="empty"
              label="Empty project"
            />
          </div>
        </ComboboxViewport>
      </ComboboxContent>
    </ComboboxRoot>
  </div>
</template>
