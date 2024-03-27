<script setup lang="ts" generic="TValue extends AcceptableValue">
import {
  ComboboxAnchor,
  ComboboxArrow,
  ComboboxInput,
  ComboboxPortal,
  ComboboxRoot,
  TagsInputInput,
  TagsInputRoot,
} from 'radix-vue'
import {
  computed,
  ref,
} from 'vue'

import type { ComboboxItem } from '../../types/comboboxItem.type'
import type { AcceptableValue } from '../../types/selectItem.type'
import AppIcon from '../icon/AppIcon.vue'
import AppLoader from '../loader/AppLoader.vue'
import AppTagsInputItem from '../tags-input/AppTagsInputItem.vue'
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

const model = defineModel<TValue[]>({
  required: true,
})

const searchModel = defineModel<null | string>('search', {
  required: true,
})

const search = computed<string | undefined>({
  get: () => searchModel.value ?? undefined,
  set: (value) => {
    searchModel.value = value ?? null
  },
})

const isOpen = ref<boolean>(false)

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
      :multiple="true"
      :display-value="displayFn"
      :disabled="props.isDisabled"
      :class="{
        'cursor-not-allowed': props.isDisabled,
      }"
    >
      <ComboboxAnchor>
        <div class="relative">
          <TagsInputRoot
            :model-value="(model as string[])"
            :disabled="props.isDisabled"
            :class="[
              model.length > 0 ? 'pl-2' : 'pl-3',
              {
                'border-input-border focus-within:ring-ring': !props.isInvalid,
                'border-destructive focus-within:ring-destructive': props.isInvalid,
              }]"
            class="flex h-10 w-full items-center truncate rounded-input border border-solid bg-input pr-9 ring-offset-background transition-shadow duration-200 placeholder:text-input-placeholder focus-within:ring-2 focus-within:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <div
              :class="{
                'mr-2': model.length > 0,
              }"
              class="flex items-center gap-1"
            >
              <template
                v-for="tag in model"
                :key="displayFn(tag)"
              >
                <slot
                  :value="tag"
                  name="tag"
                >
                  <AppTagsInputItem

                    :value="tag"
                    :is-disabled="props.isDisabled"
                    :display-fn="props.displayFn"
                  />
                </slot>
              </template>
            </div>

            <ComboboxInput :as-child="true">
              <TagsInputInput
                :placeholder="props.placeholder ?? undefined"
                class="size-full flex-1 bg-transparent text-sm outline-none placeholder:text-input-placeholder"
                @blur="onBlur"
                @keydown.enter.prevent
              />
            </ComboboxInput>

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
          </TagsInputRoot>
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
                  :is-multiple="true"
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
