<template>
  <div class="px-2 flex items-center gap-1 bg-white shrink-0 z-1">
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
