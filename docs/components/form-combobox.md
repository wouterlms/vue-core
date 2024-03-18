---
sidebar: auto
---

# AppCombobox Component

## Props

| Prop       | Type                      | Description                                                  | Default          |
|------------|---------------------------|--------------------------------------------------------------|------------------|
| label **(required)**      | `string`                  | The label of the combobox.                                   |                 |
| options **(required)**    | `DataItem<T>[]`           | The options of the combobox.                                 |                 |
| isTouched **(required)**  | `boolean`                 | Whether the combobox has been touched (focused and blurred). | `false`          |
| errors **(required)**     | `FormFieldErrors`         | The errors associated with the combobox.                     |                 |
| emptyText  | `null` \| `string`          | The text to display when there are no options.               | `t('components.combobox.empty')` |
| isDisabled | `boolean`                 | Whether the combobox is disabled.                            | `false`          |
| isLoading  | `boolean`                 | Whether the combobox is loading.                             | `false`          |
| isRequired | `boolean`                 | Whether the combobox is required.                            | `false`          |
| placeholder| `null` \| `string`          | The placeholder of the combobox.                             | `null`           |

## v-model

| Prop       | Type           | Description                                          |
|------------|----------------|------------------------------------------------------|
| v-model    | `T` \| `T[]` \| `null` | The value of the combobox.                           |

## Events

| Event Name  | Description                                          |
|-------------|------------------------------------------------------|
| blur        | Emitted when the combobox loses focus.               |
| filter      | Emitted when the combobox is filtered.              |

## Example Usage

```vue
<script setup lang="ts">
import { AppComboboxInput } from '@wisemen/vue-core'

const options = ref<DataItem<string>[]>([
  { label: 'Option 1', value: 'option1' },
  { label: 'Option 2', value: 'option2' },
  { label: 'Option 3', value: 'option3' },
])

const value = ref<string | null>(null)
</script>

<template>
  <AppComboboxInput
    v-model="value"
    label="Options"
    :options="options"
  />
</template>
