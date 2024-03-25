<script setup lang="ts" generic="TValue extends AcceptableValue">
import type { FormFieldErrors } from '../../types/formFieldErrors.type'
import type { AcceptableValue, SelectItem } from '../../types/selectItem.type'
import FormInputContainer from '../form-input-container/FormInputContainer.vue'
import AppSelect from '../select/AppSelect.vue'

const props = withDefaults(
  defineProps<{
    /**
     * display function for the selected value
     */
    displayFn: (value: TValue) => string
    /**
     * The errors associated with the select.
     */
    errors: FormFieldErrors
    /**
     * Whether the select is disabled.
     */
    isDisabled?: boolean
    /**
     * Whether the select is loading.
     */
    isLoading?: boolean
    /**
     *  Whether the select is required.
     */
    isRequired?: boolean
    /**
     * Whether the select has been touched (focused and blurred).
     */
    isTouched: boolean
    /**
     * The options of the select.
     */
    items: SelectItem<TValue>[]
    /**
     * The label of the select.
     */
    label: string
    /**
     * The placeholder of the select.
     * @default null
     */
    placeholder?: null | string
  }>(),
  {
    isDisabled: false,
    isLoading: false,
    isRequired: false,
    isTouched: false,
    placeholder: null,
  },
)

const emit = defineEmits<{
  blur: []
}>()

const model = defineModel<TValue | null>({
  required: true,
})

function onBlur(): void {
  emit('blur')
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
    <AppSelect
      :id="id"
      v-model="model"
      :is-invalid="isInvalid"
      :items="props.items"
      :display-fn="props.displayFn"
      :is-disabled="props.isDisabled"
      :is-required="props.isRequired"
      :is-loading="props.isLoading"
      :placeholder="props.placeholder"
      @blur="onBlur"
    >
      <template #option="{ value }">
        <slot
          :value="value"
          name="option"
        />
      </template>
    </AppSelect>
  </FormInputContainer>
</template>
