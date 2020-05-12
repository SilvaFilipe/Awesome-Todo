<template>
  <q-page>
    <div class="q-pa-md absolute full-width full-height column">
      <template v-if="tasksDownloaded">
        <div class="row q-mb-lg">
          <search></search>
        </div>

        <q-scroll-area class="q-scroll-area-tasks">
          <div class="relative-position">
            <transition-group
              appear
              enter-active-class="animated zoomIn"
              leave-active-class="animated zoomOut absolute-top"
            >
              <q-banner
                key="todoBanner"
                v-if="Object.keys(tasksTodo).length"
                inline-actions
                class="list-header text-white bg-orange-4 text-center"
              >
                <span class="text-bold text-subtitle1">Todo</span>
              </q-banner>

              <q-list key="todoList" separator bordered v-if="Object.keys(tasksTodo).length">
                <task v-for="(task,key) in tasksTodo" :key="key" :task="task" :id="key"></task>
              </q-list>
            </transition-group>
            <hr />

            <transition-group
              appear
              enter-active-class="animated zoomIn"
              leave-active-class="animated zoomOut "
            >
              <q-banner
                key="completedBanner"
                v-if="Object.keys(tasksCompleted).length"
                inline-actions
                class="list-header text-white bg-green-4 text-center"
              >
                <span class="text-bold text-subtitle1">Completed</span>
              </q-banner>

              <q-list
                key="completedList"
                separator
                bordered
                v-if="Object.keys(tasksCompleted).length"
              >
                <task v-for="(task,key) in tasksCompleted" :key="key" :task="task" :id="key"></task>
              </q-list>
            </transition-group>
          </div>
        </q-scroll-area>
      </template>
      <template v-else>
        <span class="absolute-center">
          <q-spinner color="primary" size="3em" />
        </span>
      </template>

      <div class="absolute-bottom text-center q-mb-lg no-pointer-events">
        <q-btn
          @click="showAddTask=true"
          round
          color="primary"
          size="24px"
          icon="add"
          class="all-pointer-events"
        />
      </div>
    </div>

    <q-dialog v-model="showAddTask">
      <add-task @close="showAddTask=false"></add-task>
    </q-dialog>
  </q-page>
</template>

<script>
import { mapGetters, mapState } from "vuex";

export default {
  data() {
    return { showAddTask: false };
  },
  computed: {
    ...mapGetters("tasks", ["tasksTodo", "tasksCompleted"]),
    ...mapState("tasks", ["tasksDownloaded"])
  },
  components: {
    task: require("components/Tasks/Task.vue").default,
    "add-task": require("components/Tasks/Modals/AddTask.vue").default,
    search: require("components/Tasks/Tools/Search.vue").default
  }
};
</script>
<style lang="scss">
.list-header {
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}

.q-scroll-area-tasks {
  display: flex;
  flex-grow: 1;
  .mobile & {
    flex-basis: 100px;
  }
}
</style>
