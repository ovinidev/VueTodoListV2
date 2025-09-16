<script setup lang="ts">
  import draggable from 'vuedraggable'
  import TaskItem from '@components/TaskItem.vue'
  import { useTasks } from '@composables/useTasks'
  import { onMounted } from 'vue'
  import { TASKS_DONE_KEY, TASKS_KEY } from './constants/tasks'
  import { useLocalStorage } from './composables/useLocalStorage'
  import { Check, GripVertical } from 'lucide-vue-next'

  const {
    taskList,
    newTask,
    handleAddTask,
    handleCompleteTask,
    handleUpdateTask,
    handleFinishEdit,
    handleDeleteTask,
    tasksDone
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
      @end="saveTasks(taskList)"
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
