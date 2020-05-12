<template>
  <q-card-actions align="right">
    <q-btn flat label="Cancel" v-close-popup />
    <q-btn label="Save" color="primary" @click="$emit('submit', '')" />
  </q-card-actions>
</template>

<script>
export default {};
</script>

<style>
</style>