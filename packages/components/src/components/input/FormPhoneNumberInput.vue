<script setup lang="ts">
import { vMaska } from 'maska'
import {
  computed,
  ref,
  watch,
} from 'vue'

import type { Icon } from '@/icons/icons'
import type { FormFieldErrors } from '@/types/formFieldErrors.type'
import type { SelectItem } from '@/types/selectItem.type'

import AppSelect from '../select/AppSelect.vue'
import FormInput from './FormInput.vue'

interface Country {
  dialCode: string
  format: string
}

const props = withDefaults(
  defineProps<{
    /**
     * The errors associated with the input.
     */
    errors: FormFieldErrors<{
      dialCode: string
      number: string
    }>
    /**
     * The left icon of the input.
     * @default null
     */
    iconLeft?: Icon | null
    /**
     * The right icon of the input.
     * @default null
     */
    iconRight?: Icon | null
    /**
     * Whether the input is disabled.
     */
    isDisabled?: boolean
    /**
     * Whether the input is loading.
     * @default false
     */
    isLoading?: boolean
    /**
     *  Whether the input is required.
     */
    isRequired?: boolean
    /**
     *
     */
    isTouched: boolean
    /**
     * The label of the input.
     */
    label: string
    /**
     * The placeholder of the input.
     * @default null
     */
    placeholder?: null | string
  }>(),
  {
    iconLeft: undefined,
    iconRight: undefined,
    isDisabled: false,
    isLoading: false,
    isRequired: false,
    isTouched: false,
    placeholder: null,
  },
)

const model = defineModel<{
  dialCode: string
  number: null | string
}>({
  required: true,
})

const countries: Country[] = [
  {
    dialCode: '+31',
    format: '# ## ## ## ##',
  },
  {
    dialCode: '+32',
    format: '### ## ## ##',
  },
]

const dialCode = ref<string>(model.value.dialCode)
const number = ref<null | string>(model.value.number)

const items: SelectItem<string>[] = countries.map(country => ({
  type: 'option',
  value: country.dialCode,
}))

const mask = computed<string>(() => {
  const country = countries.find(country => country.dialCode === dialCode.value) ?? null

  return country?.format ?? ''
})

watch([
  dialCode,
  number,
], ([
  dialCode,
  number,
]) => {
  if (dialCode !== null) {
    model.value = {
      dialCode,
      number,
    }
  }
})

watch(
  () => model.value,
  (value) => {
    dialCode.value = value.dialCode
    number.value = value.number
  },
)
</script>

<template>
  <FormInput
    v-model="number"
    v-maska
    :errors="props.errors?.number"
    :icon-left="props.iconLeft"
    :icon-right="props.iconRight"
    :is-disabled="props.isDisabled"
    :is-loading="props.isLoading"
    :is-required="props.isRequired"
    :is-touched="props.isTouched"
    :label="props.label"
    :placeholder="props.placeholder"
    :data-maska="mask"
  >
    <template #left>
      <div class="flex h-full w-20 shrink-0 items-center border-r border-solid border-input-border">
        <AppSelect
          v-model="dialCode"
          :items="items"
          :display-fn="(dialCode) => dialCode"
          class="size-full"
          trigger-classes="border-0 h-full rounded-r-none focus-visible:ring-transparent outline-none focus-visible:ring-offset-transparent focus-visible:bg-ring/10 focus-visible:ring-0"
        />
      </div>
    </template>
  </FormInput>
</template>
