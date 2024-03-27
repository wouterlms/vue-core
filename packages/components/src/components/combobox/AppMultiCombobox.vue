<script setup lang="ts" generic="TValue extends AcceptableValue">
import {
  ComboboxAnchor,
  ComboboxArrow,
  ComboboxInput,
  ComboboxPortal,
  ComboboxRoot,
  ComboboxViewport,
} from 'radix-vue'
import { computed, ref } from 'vue'

import type { ComboboxItem } from '../../types/comboboxItem.type'
import type { AcceptableValue } from '../../types/selectItem.type'
import AppIcon from '../icon/AppIcon.vue'
import AppLoader from '../loader/AppLoader.vue'
import AppComboboxContent from './AppComboboxContent.vue'
import AppComboboxEmpty from './AppComboboxEmpty.vue'
import AppComboboxItem from './AppComboboxItem.vue'
import AppComboboxTrigger from './AppComboboxTrigger.vue'

const props = withDefaults(
  defineProps<{
    /**
     * The display function for the selected value.
     */
    displayFn: (value: TValue) => string
    /**
     * The text to display when there are no options.
     * @default t('components.combobox.empty')
     */
    emptyText?: null | string
    /**
     * Whether the combobox is disabled.
     */
    isDisabled?: boolean
    /**
     * Whether the combobox is in an invalid state.
     * @default false
     */
    isInvalid?: boolean
    /**
     * Whether the combobox is loading.
     */
    isLoading?: boolean
    /**
     * The options to display in the combobox.
     */
    items: ComboboxItem<TValue>[]
    /**
     * The value of the combobox.
     */
    modelValue: TValue[]
    /**
     * The placeholder text to display when the combobox is empty.
     * @default null
     */
    placeholder?: null | string
  }>(),
  {
    emptyText: null,
    isDisabled: false,
    isInvalid: false,
    isLoading: false,
    placeholder: null,
  },
)

const emit = defineEmits<{
  'blur': []
  'update:modelValue': [value: TValue[]]
}>()

const searchModel = defineModel<null | string>('search', {
  required: true,
})

const model = computed<TValue[]>({
  get: () => props.modelValue,
  set: (value) => {
    emit('update:modelValue', value ?? [])
  },
})

const search = computed<string | undefined>({
  get: () => searchModel.value ?? undefined,
  set: (value) => {
    searchModel.value = value ?? null
  },
})

const isOpen = ref<boolean>(false)

const placeholderValue = computed<string | undefined>(() => {
  if (model.value.length === 0) {
    return props.placeholder ?? undefined
  }

  return model.value.map(value => props.displayFn(value)).join(', ')
})

const isEmpty = computed<boolean>(() => {
  return model.value.length === 0
})

function onBlur(): void {
  if (!isOpen.value) {
    emit('blur')
  }
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
      :multiple="true"
    >
      <ComboboxAnchor>
        <div class="relative">
          <ComboboxInput
            :class="{
              'border-input-border [&:has(:focus-visible)]:ring-ring': !props.isInvalid,
              'border-destructive [&:has(:focus-visible)]:ring-destructive': props.isInvalid,
              'placeholder:text-input-placeholder': isEmpty,
              'placeholder:text-input-foreground focus:placeholder:text-input-placeholder': !isEmpty,
            }"
            :placeholder="placeholderValue"
            class="h-10 w-full truncate rounded-input border bg-input pl-3 pr-9 text-sm outline-none ring-offset-background duration-200 focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            tabindex="0"
            @blur="onBlur"
          />

          <AppComboboxTrigger :is-disabled="props.isDisabled">
            <AppLoader
              v-if="props.isLoading"
              class="pointer-events-none size-4 text-muted-foreground"
            />

            <AppIcon
              class="text-muted-foreground"
              icon="chevronDown"
              size="sm"
            />
          </AppComboboxTrigger>
        </div>
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
          <div v-if="isOpen">
            <AppComboboxContent>
              <ComboboxViewport class="max-h-[25rem] p-1.5">
                <AppComboboxEmpty :empty-text="props.emptyText" />

                <AppComboboxItem
                  v-for="(item, i) of props.items"
                  :key="i"
                  :item="item"
                  :display-fn="displayFn"
                  :is-multiple="true"
                >
                  <template #default="{ item: itemValue }">
                    <slot
                      v-if="itemValue.type === 'option'"
                      :value="itemValue.value"
                      name="option"
                    />
                  </template>
                </AppComboboxItem>
              </ComboboxViewport>

              <ComboboxArrow />
            </AppComboboxContent>
          </div>
        </Transition>
      </ComboboxPortal>
    </ComboboxRoot>
  </div>
</template>
