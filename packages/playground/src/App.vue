<script setup lang="ts">
import { computed, ref } from 'vue'

import FormCheckbox from '../../components/src/components/checkbox/FormCheckbox.vue'
import AppCombobox from '../../components/src/components/combobox/AppCombobox.vue'
import AppTagsCombobox from '../../components/src/components/combobox/AppTagsCombobox.vue'
import AppSelect from '../../components/src/components/select/AppSelect.vue'
import AppText from '../../components/src/components/text/AppText.vue'
import type { ComboboxItem } from '../../components/src/types/comboboxItem.type'
import type { SelectItem } from '../../components/src/types/selectItem.type'

interface User {
  firstName: string
  lastName: string
}

const checkboxValue = ref<boolean>(true)

const appSelectValue = ref<User | null>(null)
const selectItems: SelectItem<User>[] = [
  {
    type: 'option',
    value: { firstName: 'John', lastName: 'Doe' },
  },
  {
    type: 'option',
    value: { firstName: 'Jane', lastName: 'Doe' },
  },
  {
    type: 'divider',
  },
  {
    type: 'option',
    value: { firstName: 'John', lastName: 'Smith' },
  },
]

const appComboboxValue = ref<User | null>(null)
const appComboboxSearch = ref<string>('')
const comboboxItems: ComboboxItem<User>[] = [
  {
    type: 'option',
    value: { firstName: 'John', lastName: 'Doe' },
  },
  {
    type: 'option',
    value: { firstName: 'Jane', lastName: 'Doe' },
  },
  {
    type: 'divider',
  },
  {
    type: 'option',
    value: { firstName: 'John', lastName: 'Smith' },
  },
]

const filteredComboboxItems = computed<ComboboxItem<User>[]>(() => {
  return comboboxItems.filter((item) => {
    if (item.type === 'option') {
      return item.value.firstName.toLowerCase().includes(appComboboxSearch.value.toLowerCase())
    }

    return true
  })
})

const appTagsComboboxValue = ref<User[]>([])
</script>

<template>
  <div class="p-24">
    <div class="grid grid-cols-4 gap-4">
      <label for="test">
        <FormCheckbox
          id="test"
          v-model="checkboxValue"
          :is-disabled="false"
          :is-invalid="true"
        />

        label
      </label>

      <AppSelect
        v-model="appSelectValue"
        :items="selectItems"
        :display-fn="item => item.firstName"
      >
        <template #option="{ value }">
          <div>
            <AppText variant="subtext">
              {{ value.firstName }}
            </AppText>

            <AppText variant="caption">
              {{ value.lastName }}
            </AppText>
          </div>
        </template>
      </AppSelect>

      <AppCombobox
        v-model="appComboboxValue"
        v-model:search="appComboboxSearch"
        :items="filteredComboboxItems"
        :display-fn="(item) => item.firstName"
      />

      <AppTagsCombobox
        v-model="appTagsComboboxValue"
        v-model:search="appComboboxSearch"
        :items="filteredComboboxItems"
        :display-fn="(item) => item.firstName"
      />
    </div>
  </div>
</template>
