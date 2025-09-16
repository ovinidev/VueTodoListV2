<script setup lang="ts">
  import draggable from 'vuedraggable'
  import TaskItem from '@components/TaskItem.vue'
  import { useTasks } from '@composables/useTasks'
  import { onMounted } from 'vue'
  import { TASKS_DONE_KEY, TASKS_KEY } from './constants/tasks'
  import { useLocalStorage } from './composables/useLocalStorage'
  import { Check, Share, Plus } from 'lucide-vue-next'

  const {
    taskList,
    newTask,
    handleAddTask,
    handleCompleteTask,
    handleUpdateTask,
    handleFinishEdit,
    handleDeleteTask,
    tasksDone,
    handleShareTaskList
  } = useTasks()

  const { getAll: getAllTasks, save: saveTasks } = useLocalStorage(TASKS_KEY)
  const { getAll: getAllTasksDone, save: saveTasksDone } =
    useLocalStorage(TASKS_DONE_KEY)

  onMounted(() => {
    const savedTasks = getAllTasks()
    const savedTasksDone = getAllTasksDone()

    if (savedTasks) {
      taskList.value = savedTasks
    }

    if (savedTasksDone) {
      tasksDone.value = savedTasksDone
    }
  })
</script>

<template>
  <div
    class="flex flex-col items-center justify-start border-amber-500 bg-gray-900 p-6 md:px-18"
    :style="{ minHeight: '100vh' }"
  >
    <div class="flex w-full items-center justify-center gap-4">
      <h1 class="my-2 text-3xl font-bold">Task admin</h1>
      <Share
        @click="handleShareTaskList"
        class="h-6 w-6 cursor-pointer text-purple-300"
      />
    </div>

    <div class="mt-4 flex w-full items-center justify-center">
      <input
        type="text"
        placeholder="Add a new task"
        class="h-10 w-full rounded border border-gray-700 bg-gray-800 p-2 text-gray-200"
        v-model="newTask"
        @keyup.enter="handleAddTask"
      />
      <button
        class="ml-2 flex h-10 items-center rounded bg-purple-600 p-2 text-white hover:bg-purple-700"
        @click="handleAddTask"
      >
        <Plus />
      </button>
    </div>

    <span v-if="taskList.length === 0" class="mt-6 text-gray-500"
      >Hello! Create your first task</span
    >

    <draggable
      v-model="taskList"
      item-key="id"
      class="mt-4 flex w-full flex-col gap-3"
      @end="saveTasks(taskList)"
      :handle="'.drag-handle'"
      :animation="200"
      name="task"
    >
      <template #item="{ element: task }">
        <TaskItem
          :key="task.id"
          :task="task"
          @complete-task="handleCompleteTask"
          @update-task="handleUpdateTask"
          @update-name="handleUpdateTask"
          @finish-edit="handleFinishEdit"
          @delete-task="handleDeleteTask"
        />
      </template>
    </draggable>

    <div class="w-full" v-if="tasksDone.length">
      <div class="mt-6 flex w-full items-center space-x-2">
        <span class="text-xl font-bold text-gray-100">Done </span>
        <Check class="text-green-300" />
      </div>

      <draggable
        v-model="tasksDone"
        item-key="id"
        class="mt-4 flex w-full flex-col gap-3"
        @end="saveTasksDone(tasksDone)"
        :handle="'.drag-handle'"
        :animation="200"
      >
        <template #item="{ element: task }">
          <TaskItem
            :task="task"
            @complete-task="handleCompleteTask"
            @update-task="handleUpdateTask"
            @update-name="handleUpdateTask"
            @finish-edit="handleFinishEdit"
            @delete-task="handleDeleteTask"
          />
        </template>
      </draggable>
    </div>
  </div>
</template>

<style>
  .task-enter-active,
  .task-leave-active {
    transition: all 0.3s ease;
  }
  .task-enter-from {
    opacity: 0;
    transform: translateY(-10px);
  }
  .task-enter-to {
    opacity: 1;
    transform: translateY(0);
  }
  .task-leave-from {
    opacity: 1;
    transform: translateY(0);
  }
  .task-leave-to {
    opacity: 0;
    transform: translateY(10px);
  }
</style>
