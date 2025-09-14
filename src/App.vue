<script setup lang="ts">
  import '@styles/global.css'
  import draggable from 'vuedraggable'
  import TaskItem from '@components/TaskItem.vue'
  import { useTasks } from '@composables/useTasks'
  import { onMounted } from 'vue'
  import { TASKS_KEY } from './constants/tasks'
  import { useLocalStorage } from './composables/useLocalStorage'

  const {
    taskList,
    newTask,
    handleAddTask,
    handleCompleteTask,
    handleUpdateTask,
    handleFinishEdit,
    handleDeleteTask
  } = useTasks()

  const { getAll, save } = useLocalStorage(TASKS_KEY)

  onMounted(() => {
    const savedTasks = getAll()

    if (savedTasks) {
      taskList.value = savedTasks
    }
  })
</script>

<template>
  <div
    class="flex flex-col items-center justify-start border-amber-500 bg-gray-900 p-6"
    :style="{ minHeight: '100vh' }"
  >
    <h1 class="my-2 text-3xl font-bold">To do list</h1>

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
        Add
      </button>
    </div>

    <draggable
      v-model="taskList"
      item-key="id"
      class="mt-4 flex w-full flex-col gap-3"
      @end="save(taskList)"
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
</template>
