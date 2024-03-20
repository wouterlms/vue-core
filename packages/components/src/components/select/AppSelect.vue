<script setup lang="ts" generic="TValue extends AcceptableValue">
import {
  SelectIcon,
  SelectPortal,
} from 'radix-vue'
import { ref } from 'vue'

import type { AcceptableValue, SelectItem } from '@/types/selectItem.type'

import AppIcon from '../icon/AppIcon.vue'
import AppLoader from '../loader/AppLoader.vue'
import AppSelectContent from './AppSelectContent.vue'
import AppSelectItem from './AppSelectItem.vue'
import AppSelectRoot from './AppSelectRoot.vue'
import AppSelectTrigger from './AppSelectTrigger.vue'
import AppSelectValue from './AppSelectValue.vue'

const props = withDefaults(
  defineProps<{
    /**
     * display function for the selected value
     */
    displayFn: (value: TValue) => null | string
    /**
     * The id of the select.
     * @default null
     */
    id?: null | string
    /**
     * Whether the select is disabled.
     */
    isDisabled?: boolean
    /**
     * Whether the select is invalid.
     * @default false
     */
    isInvalid?: boolean
    /**
     * Whether the select is loading.
     */
    isLoading?: boolean
    /**
     * The items of the select.
     */
    items: SelectItem<TValue>[]
    /**
     * The placeholder of the select.
     */
    placeholder?: null | string
    /**
     *
     */
    triggerClasses?: null | string
  }>(),
  {
    id: null,
    isDisabled: false,
    isInvalid: false,
    isLoading: false,
    placeholder: null,
    triggerClasses: null,
  },
)

const emit = defineEmits<{
  'blur': []
  'update:modelValue': [value: TValue | null]
}>()

const model = defineModel<TValue | null>({
  required: true,
})

const isOpen = ref<boolean>(false)

function onBlur(): void {
  emit('blur')
}

function onTriggerBlur(): void {
  if (!isOpen.value) {
    onBlur()
  }
}
</script>

<template>
  <div>
    <AppSelectRoot
      v-model="model"
      v-model:is-open="isOpen"
      :is-disabled="props.isDisabled"
    >
      <AppSelectTrigger
        :id="id"
        :is-disabled="props.isDisabled"
        :is-invalid="props.isInvalid"
        :class="triggerClasses"
        @blur="onTriggerBlur"
      >
        <AppSelectValue :is-empty="model === null">
          <template v-if="placeholder !== null && model === null">
            {{ props.placeholder }}
          </template>

          <template v-else-if="model !== null">
            {{ props.displayFn(model) }}
          </template>
        </AppSelectValue>

        <AppLoader
          v-if="props.isLoading"
          class="size-4 text-muted-foreground"
        />

        <SelectIcon
          v-else
          :as-child="true"
        >
          <AppIcon
            class="text-muted-foreground"
            icon="chevronDown"
            size="sm"
          />
        </SelectIcon>
      </AppSelectTrigger>

      <SelectPortal>
        <Transition
          enter-active-class="duration-150"
          enter-from-class="opacity-0"
          enter-to-class="opacity-100"
          leave-active-class="duration-150"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <div v-if="isOpen">
            <AppSelectContent>
              <AppSelectItem
                v-for="(item, i) of props.items"
                :key="i"
                :item="item"
                :display-fn="props.displayFn"
              >
                <template #default="{ item: itemValue }">
                  <slot
                    v-if="itemValue.type === 'option'"
                    :value="itemValue.value"
                    name="option"
                  />
                </template>
              </AppSelectItem>
            </AppSelectContent>
          </div>
        </Transition>
      </SelectPortal>
    </AppSelectRoot>
  </div>
</template>

<style>
.select-content {
  width: var(--radix-select-trigger-width);
  max-height: var(--radix-select-content-available-height);
}
</style>
