---
sidebar: auto
---

# AppCombobox

## Props

| Prop         | Type           | Description                                                        | Default                          |
|--------------|----------------|--------------------------------------------------------------------|----------------------------------|
| options  **(required)**      | `DataItem<T>[]` | The options to display in the combobox.                           |                                  |
| emptyText    | `null` \| `string` | The text to display when there are no options.                    | `t('components.combobox.empty')` |
| isDisabled   | `boolean`        | Whether the combobox is disabled.                                 | `false`                          |
| isInvalid    | `boolean`        | Whether the combobox is in an invalid state.                      | `false`                          |
| isLoading    | `boolean`        | Whether the combobox is loading.                                  | `false`                          |
| placeholder  | `null` \| `string` | The placeholder text to display when the combobox is empty.       | `null`                           |

## v-model

| Prop       | Type          | Description                               |
|------------|---------------|-------------------------------------------|
| v-model **(required)** | `T \| T[] \| null` | The value of the combobox.                |

## Events

| Event Name  | Description                             |
|-------------|-----------------------------------------|
| blur        | Emitted when the combobox loses focus.  |
| filter      | Emitted when the combobox filters options based on user input. |

## Example Usage

```vue
<script setup lang="ts">
import { AppCombobox } from '@wisemen/vue-core'
import { ref } from 'vue'

const options = ref<DataItem<string>[]>([
  { label: 'Option 1', value: 'option1' },
  { label: 'Option 2', value: 'option2' },
])

const value = ref<string | null>(null)
</script>

<template>
  <AppCombobox 
    v-model="value" 
    :options="options"
  />
</template>
