<script setup lang="ts">
import { ref } from 'vue'

import AppCommand from '../../components/src/components/command/AppCommand.vue'

const value = ref('')
const search = ref('')
</script>

<template>
  <div class="p-24">
    <AppCommand
      v-model="value"
      v-model:search="search"
      placeholder="What can we help you with?"
    />
  </div>
</template>
