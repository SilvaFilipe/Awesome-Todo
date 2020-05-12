<template>
  <div class="row q-mb-sm">
    <q-input
      clearable
      outlined
      ref="name"
      :value="name"
      @input="$emit('update:name', $event)"
      v-select-all
      v-autofocus="{delayCordova:700}"
      label="Task name"
      class="col"
      :rules="[val => !!val || 'Field is required']"
    />
  </div>
</template>

<script>
import { selectAll } from "src/directives/directive-select-all";
import { autofocus } from "src/directives/directive-autofocus";

export default {
  props: ["name"],
  directives: {
    selectAll,
    autofocus
  }
};
</script>

<style>
</style>