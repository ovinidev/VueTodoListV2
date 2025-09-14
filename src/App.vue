<script setup lang="ts">
  import '@styles/global.css'
  import { Trash, Check } from 'lucide-vue-next'
  import { ref } from 'vue'
  import draggable from 'vuedraggable'

  interface Task {
    id: number
    name: string
    isCompleted: boolean
    isEditMode: boolean
  }

  const taskList = ref<Task[]>([])
  const newTask = ref<string>('')

  const addTask = () => {
    if (newTask.value.trim() !== '') {
      taskList.value.push({
        id: Math.random(),
        name: newTask.value.trim(),
        isCompleted: false,
        isEditMode: false
      })
      console.log(taskList.value)

      newTask.value = ''
    }
  }

  const updateTask = (id: number, newTitle: string) => {
    const task = taskList.value.find((task) => task.id === id)
    if (task) {
      task.name = newTitle
      task.isEditMode = false
    }
  }

  const startEdit = (id: number) => {
    const task = taskList.value.find((task) => task.id === id)
    if (task) {
      task.isEditMode = true
    }
  }

  const deleteTask = (id: number) => {
    taskList.value = taskList.value.filter((task) => task.id !== id)
  }
</script>

<template>
  <div
    class="flex h-screen flex-col items-center justify-start border-amber-500 bg-gray-900 p-6"
  >
    <h1 class="my-2 text-3xl font-bold">To do list</h1>

    <div class="mt-4 flex w-full items-center justify-center">
      <input
        type="text"
        placeholder="Add a new task"
        class="h-10 w-full rounded border border-gray-700 bg-gray-800 p-2 text-gray-200"
        v-model="newTask"
        @keyup.enter="addTask"
      />
      <button
        class="ml-2 flex h-10 items-center rounded bg-purple-600 p-2 text-white hover:bg-purple-700"
        @click="addTask"
      >
        Add
      </button>
    </div>

    <draggable
      v-model="taskList"
      item-key="id"
      class="mt-4 flex w-full flex-col gap-3"
    >
      <template #item="{ element: task }">
        <div
          class="bg flex w-full items-center space-x-2 rounded-sm bg-gray-800 p-2"
        >
          <input
            class="h-6 w-6 rounded accent-purple-600"
            type="checkbox"
            v-model="task.isCompleted"
            :checked="task.isCompleted"
          />
          <input
            type="text"
            class="h-10 w-full rounded border-0 border-gray-700 bg-gray-800 p-2 text-gray-200 focus:border-0 focus:outline-none"
            v-model="task.name"
            @input="startEdit(task.id)"
            @keyup.enter="updateTask(task.id, task.name)"
          />
          <Check
            v-if="task.isEditMode"
            @click="updateTask(task.id, task.name)"
            class="ml-2 h-5 w-5 cursor-pointer text-green-500 hover:text-green-400"
          />
          <Trash
            class="ml-auto h-5 w-5 cursor-pointer text-red-500 hover:text-red-400"
            @click="deleteTask(task.id)"
          />
        </div>
      </template>
    </draggable>
  </div>
</template>
