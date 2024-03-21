<script setup lang="ts">
import parsePhoneNumber, {
  AsYouType,
  getCountries,
  getCountryCallingCode,
  validatePhoneNumberLength,
} from 'libphonenumber-js'
import { computed } from 'vue'

import type { Icon } from '@/icons/icons'
import type { FormFieldErrors } from '@/types/formFieldErrors.type'

import FormInput from './FormInput.vue'

const props = withDefaults(
  defineProps<{
    /**
     * The errors associated with the input.
     */
    errors: FormFieldErrors<string>
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
     * Whether the input is touched.
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
    iconRight: undefined,
    isDisabled: false,
    isLoading: false,
    isRequired: false,
    isTouched: false,
    placeholder: null,
  },
)

const model = defineModel<null | string>({
  required: true,
})

const countries = getCountries()

const formattedPhoneNumber = computed<null | string>({
  get() {
    if (model.value === null) {
      return null
    }

    const formattedPhoneNumber = new AsYouType().input(model.value)
    return formattedPhoneNumber
  },
  set(newValue) {
    if (newValue === null) {
      model.value = null
      return
    }

    const parsedPhoneNumber = parsePhoneNumber(newValue)

    const phoneNumber = parsedPhoneNumber?.number ?? null

    if (phoneNumber === null) {
      model.value = newValue
      return
    }

    model.value = phoneNumber
  },
})

const maxLength = computed<null | number>(() => {
  if (formattedPhoneNumber.value === null) {
    return null
  }

  // Add 1 to the length to account for an extra digit
  // if the phone number is too long, it means the max length was reached
  const length = validatePhoneNumberLength(`${formattedPhoneNumber.value}0`)

  if (length === 'TOO_LONG') {
    return formattedPhoneNumber.value.length - 1
  }

  return null
})

const country = computed<null | string>(() => {
  if (formattedPhoneNumber.value === null) {
    return null
  }

  const parsedPhoneNumber = parsePhoneNumber(formattedPhoneNumber.value)

  // Get the calling code from the parsed phone number or the formatted phone number
  // The parsed phone number is preferred because it is more accurate, but it is not always available
  const callingCode = parsedPhoneNumber?.countryCallingCode ?? formattedPhoneNumber.value.split(' ')[0]
  const callingCodeWithoutPlus = callingCode.replace('+', '')

  // Find the country based on the calling code
  // the parsed phone number is preferred because it is more accurate, but it is not always available
  const country = parsedPhoneNumber?.country
    ?? countries.find(country => getCountryCallingCode(country) === callingCodeWithoutPlus)

  return country ?? null
})

function getCountryFlagUrl(countryCode: string): string {
  return `https://purecatamphetamine.github.io/country-flag-icons/3x2/${countryCode}.svg`
}
</script>

<template>
  <FormInput
    v-model="formattedPhoneNumber"
    :errors="props.errors"
    :icon-right="props.iconRight"
    :is-disabled="props.isDisabled"
    :is-loading="props.isLoading"
    :is-required="props.isRequired"
    :is-touched="props.isTouched"
    :label="props.label"
    :placeholder="props.placeholder"
    :maxlength="maxLength"
  >
    <template #left>
      <div class="ml-3 h-3 w-5 overflow-hidden rounded-sm">
        <img
          v-if="country !== null"
          :src="getCountryFlagUrl(country)"
        >

        <div
          v-else
          class="h-full bg-neutral-200"
        />
      </div>
    </template>
  </FormInput>
</template>
