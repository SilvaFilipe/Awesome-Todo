<template>
  <div class="row q-mb-sm">
    <q-input outlined label="Due date" :value="dueDate" @input="$emit('update:dueDate', $event)">
      <template v-slot:append>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
            <q-date :value="dueDate" @input="handleInput" />
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
  </div>
</template>

<script>
export default {
  props: ["dueDate"],
  methods: {
    handleInput(event) {
      this.$emit("update:dueDate", event);
      this.$refs.qDateProxy.hide();
    }
  }
};
</script>

<style>
</style>