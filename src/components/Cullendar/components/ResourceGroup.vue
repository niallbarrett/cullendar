<template>
  <div class="cullendar-resource-group">
    <span class="truncate">{{ resource.label }}</span>
  </div>
</template>

<script setup>
defineProps({
  resource: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
  .cullendar-resource-group {
    height: 100%;
    padding: 0 8px;
    display: flex;
    align-items: center;
  }
</style>
