<script setup lang="ts">
import AppTable from '../../components/src/components/table/AppTable.vue'
import { useTablePagination } from '../../components/src/composables/tablePagination.composable'
import type { TableColumn } from '../../components/src/types/table.type'

interface Client {
  email: string
  name: string
}

const data: Client[] = [
  {
    email: 'john.doe@email.com',
    name: 'John Doe',
  },
  {
    email: 'jane.doe@email.com',
    name: 'Jane Doe',
  },
]

const pagination = useTablePagination({
  defaultPaginationOptions: {
    pagination: {
      page: 0,
      perPage: 1,
    },
  },
  id: 'clients',
})

const columns: TableColumn<Client>[] = [
  {
    id: 'name',
    label: 'Name',
    size: '2fr',
    value: row => row.name,
  },
  {
    id: 'email',
    label: 'Email',
    size: '2fr',
    value: row => row.email,
  },
]
</script>

<template>
  <div class="p-24">
    <AppTable
      :pagination="pagination"
      :columns="columns"
      :data="{
        data,
        total: data.length,
      }"
      :row-click="() => ({
        name: '',
      })"
      :filters="[]"
      :is-loading="false"
      empty-message="Empty"
      title="Clients"
    />
  </div>
</template>
