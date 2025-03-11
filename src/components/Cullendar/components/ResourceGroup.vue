<template>
  <div class="h-full px-2 flex items-center gap-1 shrink-0">
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
