<script setup lang="ts" generic="TValue extends AcceptableValue">
import {
  ComboboxAnchor,
  ComboboxArrow,
  ComboboxInput,
  ComboboxPortal,
  ComboboxRoot,
} from 'radix-vue'
import { computed, ref } from 'vue'

import type { Icon } from '@/icons/icons'

import type { ComboboxItem } from '../../types/comboboxItem.type'
import type { AcceptableValue } from '../../types/selectItem.type'
import AppInput from '../input/AppInput.vue'
import AppComboboxContent from './AppComboboxContent.vue'
import AppComboboxEmpty from './AppComboboxEmpty.vue'
import AppComboboxItem from './AppComboboxItem.vue'
import AppComboboxTrigger from './AppComboboxTrigger.vue'
import AppComboboxViewport from './AppComboboxViewport.vue'
import { useCombobox } from './combobox.composable'

const props = withDefaults(
  defineProps<{
    /**
     * Display function for the selected value
     */
    displayFn: (value: TValue) => string
    /**
     * The text to display when there are no options.
     * @default t('components.combobox.empty')
     */
    emptyText?: null | string
    /**
     * The icon to display on the left side of the combobox.
     * @default null
     */
    iconLeft?: Icon | null
    /**
     * The icon to display on the right side of the combobox.
     * @default null
     */
    iconRight?: Icon | null
    /**
     * Whether the chevron icon is hidden.
     * @default false
     */
    isChevronHidden?: boolean
    /**
     * Whether the combobox is disabled.
     * @default false
     */
    isDisabled?: boolean
    /**
     * Whether the combobox is in an invalid state.
     * @default false
     */
    isInvalid?: boolean
    /**
     * Whether the combobox is loading.
     * @default false
     */
    isLoading?: boolean
    /**
     * The options to display in the combobox.
     */
    items: ComboboxItem<TValue>[]
    /**
     * The value of the combobox.
     */
    modelValue: TValue | null
    /**
     * The placeholder text to display when the combobox is empty.
     * @default null
     */
    placeholder?: null | string
  }>(),
  {
    emptyText: null,
    iconLeft: undefined,
    iconRight: undefined,
    isChevronHidden: false,
    isDisabled: false,
    isInvalid: false,
    isLoading: false,
    placeholder: null,
  },
)

const emit = defineEmits<{
  'blur': []
  'update:modelValue': [value: TValue | null]
}>()

const searchModel = defineModel<null | string>('search', {
  required: true,
})

const isOpen = ref<boolean>(false)

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

const { canOpenDropdown } = useCombobox({
  isLoading: computed<boolean>(() => props.isLoading),
  items: computed<ComboboxItem<TValue>[]>(() => props.items),
  search: computed<null | string>(() => searchModel.value),
})

const placeholderValue = computed<string | undefined>(() => {
  if (model.value === undefined) {
    return props.placeholder ?? undefined
  }

  return props.displayFn(model.value as TValue)
})

function onClose(): void {
  isOpen.value = false
}
</script>

<template>
  <div>
    <ComboboxRoot
      v-model="model"
      v-model:open="isOpen"
      v-model:search-term="search"
      :filter-function="(options) => options"
      :display-value="displayFn"
      :disabled="props.isDisabled"
    >
      <ComboboxAnchor>
        <ComboboxInput :as-child="true">
          <AppInput
            v-model="searchModel"
            :is-loading="props.isLoading"
            :is-disabled="props.isDisabled"
            :icon-left="props.iconLeft"
            :icon-right="props.iconRight"
            :placeholder="placeholderValue"
            @keydown.escape="onClose"
          >
            <template #left>
              <slot name="left" />
            </template>

            <template
              v-if="props.iconRight === undefined && !props.isChevronHidden"
              #right
            >
              <AppComboboxTrigger :is-disabled="props.isDisabled" />
            </template>
          </AppInput>
        </ComboboxInput>
      </ComboboxAnchor>

      <ComboboxPortal>
        <Transition
          enter-active-class="duration-150"
          enter-from-class="opacity-0"
          enter-to-class="opacity-100"
          leave-active-class="duration-150"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <div v-if="isOpen && canOpenDropdown">
            <AppComboboxContent>
              <AppComboboxViewport>
                <AppComboboxEmpty :empty-text="props.emptyText">
                  <slot name="empty" />
                </AppComboboxEmpty>

                <AppComboboxItem
                  v-for="(item, i) of props.items"
                  :key="i"
                  :item="item"
                  :is-multiple="false"
                  :display-fn="props.displayFn"
                >
                  <template #default="{ item: itemValue }">
                    <slot
                      v-if="itemValue.type === 'option'"
                      :value="itemValue.value"
                      name="option"
                    />
                  </template>
                </AppComboboxItem>
              </AppComboboxViewport>

              <ComboboxArrow />
            </AppComboboxContent>
          </div>
        </Transition>
      </ComboboxPortal>
    </ComboboxRoot>
  </div>
</template>
