<template>
  <div>
    
    <img src="/public/favicon.ico" alt="Oldies" preload :class="classSize" />
  </div>
</template>

<script setup>
defineProps({
  classSize: {
    type: String,
    required: false,
    default: "h-8 w-auto",
  },
});
</script>

<style></style>
