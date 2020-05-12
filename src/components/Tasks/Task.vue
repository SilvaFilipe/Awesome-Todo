<template>
  <q-item
    clickable
    @click="updateTask({id:id, updates:{completed: !task.completed}})"
    v-ripple
    :class="!task.completed ? 'bg-orange-1' :  'bg-green-1' "
    v-touch-hold:1000.mouse="showEditTaskModal"
  >
    <q-item-section side top>
      <q-checkbox v-model="task.completed" />
    </q-item-section>

    <q-item-section>
      <q-item-label
        :class="{'text-striketrough':task.completed}"
        v-html="$options.filters.searchHighlight(task.name,search)"
      ></q-item-label>
    </q-item-section>

    <q-item-section side v-if="task.dueDate">
      <div class="row">
        <div class="column justify-center">
          <q-icon name="event" size="18px" class="q-mr-xs" />
        </div>

        <div class="column">
          <q-item-label class="row justify-end" caption>{{task.dueDate | niceDate}}</q-item-label>
          <q-item-label class="row justify-end" caption>
            <small>{{taskDueTime}}</small>
          </q-item-label>
        </div>
      </div>
    </q-item-section>

    <q-item-section side>
      <div class>
        <q-btn @click.stop="promptToDelete(id)" flat round color="red" dense icon="delete" />
        <q-btn @click.stop="showEditTaskModal" flat round color="primary" dense icon="edit" />
      </div>
    </q-item-section>

    <q-dialog v-model="showEditTask">
      <edit-task @close="showEditTask=false" :task="task" :id="id"></edit-task>
    </q-dialog>
  </q-item>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
import { date } from "quasar";

export default {
  props: ["task", "id"],
  data() {
    return {
      showEditTask: false
    };
  },
  computed: {
    ...mapState("tasks", ["search"]),
    ...mapGetters("settings", ["settings"]),
    taskDueTime() {
      if (this.settings.show12HourFormat) {
        return date.formatDate(
          this.task.dueDate + " " + this.task.dueTime,
          "h:mm A"
        );
      }
      return this.task.dueTime;
    }
  },
  methods: {
    ...mapActions("tasks", ["updateTask", "deleteTask"]),
    promptToDelete(id) {
      this.$q
        .dialog({
          title: "Confirm",
          message: "Really delete?",
          cancel: true,
          persistent: true
        })
        .onOk(() => {
          this.deleteTask(id);
        });
    },
    showEditTaskModal() {
      this.showEditTask = true;
    }
  },
  filters: {
    niceDate(value) {
      return date.formatDate(value, "MMM D");
    },
    searchHighlight(value, search) {
      if (search) {
        let searchRegExp = new RegExp(search, "ig");

        return value.replace(searchRegExp, match => {
          return '<span class="bg-yellow-6">' + match + "</span>";
        });
      }

      return value;
    }
  },
  components: {
    "edit-task": require("components/Tasks/Modals/EditTask.vue").default
  }
};
</script>

<style>
</style>