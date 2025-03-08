<template>
  <div class="py-1 px-2 flex items-center gap-1 bg-white shrink-0 z-1">
    <span class="size-6 rounded-full bg-slate-100"/>
    <span class="truncate">{{ resource.title }}</span>
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
