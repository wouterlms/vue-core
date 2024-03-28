<script setup lang="ts">
import AppRovingFocusGroup from './AppRovingFocusGroup.vue'
import AppRovingFocusItem from './AppRovingFocusItem.vue'
</script>

<template>
  <div class="p-24">
    <AppRovingFocusGroup>
      <AppRovingFocusItem as="button">
        item
      </AppRovingFocusItem>

      <AppRovingFocusItem as="button">
        item
      </AppRovingFocusItem>
    </AppRovingFocusGroup>
  </div>
</template>
