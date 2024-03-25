<script setup lang="ts" generic="TValue extends AcceptableValue">
import type { ComboboxItem } from '../../types/comboboxItem.type'
import type { FormFieldErrors } from '../../types/formFieldErrors.type'
import type { AcceptableValue } from '../../types/selectItem.type'
import AppMultiCombobox from '../combobox/AppMultiCombobox.vue'
import FormInputContainer from '../form-input-container/FormInputContainer.vue'

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
     * The errors associated with the combobox.
     */
    errors: FormFieldErrors
    /**
     * Whether the combobox is disabled.
     */
    isDisabled?: boolean
    /**
     * Whether the select is loading.
     */
    isLoading?: boolean
    /**
     *  Whether the combobox is required.
     */
    isRequired?: boolean
    /**
     * Whether the combobox has been touched (focused and blurred).
     */
    isTouched: boolean
    /**
     * The options of the combobox.
     */
    items: ComboboxItem<TValue>[]
    /**
     * The label of the combobox.
     */
    label: string
    /**
     * The placeholder of the combobox.
     * @default null
     */
    placeholder?: null | string
  }>(),
  {
    emptyText: null,
    isDisabled: false,
    isLoading: false,
    isRequired: false,
    isTouched: false,
    placeholder: null,
  },
)

const emit = defineEmits<{
  blur: []
  filter: [value: string]
}>()

const model = defineModel<TValue[]>({
  required: true,
})

const search = defineModel<null | string>('search', {
  required: true,
})

function onBlur(): void {
  emit('blur')
}

function onFilter(filter: string): void {
  emit('filter', filter)
}
</script>

<template>
  <FormInputContainer
    v-slot="{ isInvalid, id }"
    :errors="props.errors"
    :is-required="props.isRequired"
    :is-touched="props.isTouched"
    :is-disabled="props.isDisabled"
    :placeholder="placeholder"
    :label="props.label"
  >
    <AppMultiCombobox
      :id="id"
      v-model:search="search"
      v-model="model"
      :is-invalid="isInvalid"
      :items="props.items"
      :display-fn="props.displayFn"
      :empty-text="props.emptyText"
      :is-disabled="props.isDisabled"
      :is-required="props.isRequired"
      :placeholder="props.placeholder"
      :is-loading="props.isLoading"
      @blur="onBlur"
      @filter="onFilter"
    >
      <template #option="{ value }">
        <slot
          :value="value"
          name="option"
        />
      </template>
    </AppMultiCombobox>
  </FormInputContainer>
</template>
