<script setup lang="ts" generic="TValue extends AcceptableValue">
import {
  ComboboxAnchor,
  ComboboxArrow,
  ComboboxInput,
  ComboboxPortal,
  ComboboxRoot,
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
import AppComboboxViewport from './AppComboboxViewport.vue'

const props = withDefaults(
  defineProps<{
    /**
     *
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
    modelValue: TValue | null
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

const isOpen = ref<boolean>(false)

const placeholderValue = computed<string | undefined>(() => {
  if (model.value === undefined) {
    return props.placeholder ?? undefined
  }

  return props.displayFn(model.value as TValue)
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
    >
      <ComboboxAnchor>
        <div class="relative">
          <ComboboxInput
            :class="{
              'border-input-border focus-visible:ring-ring': !props.isInvalid,
              'border-destructive focus-visible:ring-destructive': props.isInvalid,
            }"
            :placeholder="placeholderValue"
            class="h-10 w-full truncate rounded-input border bg-input pl-3 pr-9 text-sm outline-none ring-offset-background duration-200 placeholder:text-input-placeholder focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            tabindex="0"
            @blur="onBlur"
          />

          <slot name="right">
            <!-- <AppButton /> -->
          </slot>

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
              <AppComboboxViewport>
                <AppComboboxEmpty :empty-text="props.emptyText" />

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
