<script setup lang="ts">
import { ref } from 'vue'

import AppButton from '../../components/src/components/button/AppButton.vue'
import AppViewTransition from '../../components/src/components/view-transition/AppViewTransition.vue'

const isTest = ref<boolean>(false)
</script>

<template>
  <div class="p-24">
    <AppViewTransition :is-toggled="isTest">
      <template #a>
        <div class="h-24 w-40 rounded-card bg-card p-8 shadow-card-shadow">
          A
        </div>
      </template>

      <template #b>
        <div class="w-80 rounded-card bg-card p-8 shadow-card-shadow">
          This is B
        </div>
      </template>
    </AppViewTransition>

    <AppButton @click="isTest = !isTest">
      Toggle
    </AppButton>
  </div>
</template>
