<script setup lang="ts" generic="TValue extends AcceptableValue">
import {
  ComboboxAnchor,
  ComboboxArrow,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxPortal,
  ComboboxRoot,
  ComboboxTrigger,
  ComboboxViewport,
} from 'radix-vue'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import type { ComboboxItem } from '../../types/comboboxItem.type'
import type { AcceptableValue } from '../../types/selectItem.type'
import AppIcon from '../icon/AppIcon.vue'
import AppLoader from '../loader/AppLoader.vue'
import AppText from '../text/AppText.vue'
import AppComboboxItem from './AppComboboxItem.vue'

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

const { t } = useI18n()

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
              'border-input-border [&:has(:focus-visible)]:ring-ring': !props.isInvalid,
              'border-destructive [&:has(:focus-visible)]:ring-destructive': props.isInvalid,
            }"
            :placeholder="placeholderValue"
            class="h-10 w-full truncate rounded-input border bg-input pl-3 pr-9 text-sm outline-none ring-offset-background duration-200 placeholder:text-input-placeholder focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            tabindex="0"
            @blur="onBlur"
          />

          <ComboboxTrigger
            :disabled="props.isDisabled"
            :class="{
              'opacity-50': props.isDisabled,
            }"
            class="absolute right-1 top-1/2 box-content -translate-y-1/2 p-2 outline-none"
          >
            <AppLoader
              v-if="props.isLoading"
              class="pointer-events-none size-4 text-muted-foreground"
            />

            <AppIcon
              class="text-muted-foreground"
              icon="chevronDown"
              size="sm"
            />
          </ComboboxTrigger>
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
            <!-- eslint-disable tailwindcss/no-custom-classname -->
            <ComboboxContent
              :force-mount="true"
              class="combobox-content popover-content relative z-popover min-w-min overflow-hidden rounded-popover border border-solid border-border bg-background shadow-popover-shadow"
              position="popper"
            >
              <!-- eslint-enable tailwindcss/no-custom-classname -->
              <ComboboxViewport class="max-h-[25rem] p-1.5">
                <ComboboxEmpty>
                  <AppText
                    variant="subtext"
                    class="p-2"
                  >
                    {{ props.emptyText ?? t('components.combobox.empty') }}
                  </AppText>
                </ComboboxEmpty>

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
              </ComboboxViewport>

              <ComboboxArrow />
            </ComboboxContent>
          </div>
        </Transition>
      </ComboboxPortal>
    </ComboboxRoot>
  </div>
</template>

<style>
.combobox-content {
  width: var(--radix-combobox-trigger-width);
  max-height: var(--radix-combobox-content-available-height);
}
</style>
