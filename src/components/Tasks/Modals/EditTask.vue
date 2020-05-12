<template>
  <q-card>
    <modal-header>Edit task</modal-header>
    <q-card-section class="q-pt-none">
      <modal-task-name ref="modalTaskName" :name.sync="taskToSubmit.name"></modal-task-name>

      <modal-due-date :dueDate.sync="taskToSubmit.dueDate"></modal-due-date>

      <modal-due-time v-if="taskToSubmit.dueDate" :dueTime.sync="taskToSubmit.dueTime"></modal-due-time>
    </q-card-section>

    <q-card-actions align="right">
      <q-btn flat label="Cancel" v-close-popup />
      <q-btn label="Save" color="primary" @click="submitForm" />
    </q-card-actions>
  </q-card>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: ["task", "id"],
  data() {
    return {
      taskToSubmit: {}
    };
  },
  mounted() {
    this.taskToSubmit = Object.assign({}, this.task);
  },
  methods: {
    ...mapActions("tasks", ["updateTask"]),
    submitForm() {
      this.$refs.modalTaskName.$refs.name.validate();
      if (!this.$refs.modalTaskName.$refs.name.hasError) {
        this.submitTask();
      }
    },
    submitTask() {
      this.updateTask({
        id: this.id,
        updates: this.taskToSubmit
      });
      this.$emit("close");
    }
  },
  components: {
    "modal-header": require("components/Tasks/Modals/Shared/ModalHeader.vue")
      .default,
    "modal-task-name": require("components/Tasks/Modals/Shared/ModalTaskName.vue")
      .default,
    "modal-due-date": require("components/Tasks/Modals/Shared/ModalDueDate.vue")
      .default,
    "modal-due-time": require("components/Tasks/Modals/Shared/ModalDueTime.vue")
      .default,
    "modal-buttons": require("components/Tasks/Modals/Shared/ModalButtons.vue")
      .default
  }
};
</script>

<style>
</style>