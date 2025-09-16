<script setup lang="ts">
  import { Trash, Check, GripVertical } from 'lucide-vue-next'

  interface Task {
    id: number
    name: string
    isCompleted: boolean
    isEditMode: boolean
  }

  interface Props {
    task: Task
  }

  interface Emits {
    'complete-task': [id: number]
    'update-name': [id: number, newName: string]
    'finish-edit': [id: number]
    'delete-task': [id: number]
  }

  defineProps<Props>()
  defineEmits<Emits>()
</script>

<template>
  <div class="flex w-full items-center rounded-sm bg-gray-800 p-2 px-1">
    <GripVertical
      class="drag-handle mr-2 w-8 cursor-grab text-gray-500 transition-colors duration-150 hover:text-gray-300 active:cursor-grabbing"
      style="touch-action: none"
    />
    <input
      class="h-6 w-6 rounded accent-purple-600"
      type="checkbox"
      :checked="task.isCompleted"
      @change="$emit('complete-task', task.id)"
    />
    <input
      type="text"
      :class="[
        'h-10 w-full rounded border-0 border-gray-700 bg-gray-800 p-2 text-gray-200 focus:border-0 focus:outline-none',
        { 'line-through': task.isCompleted }
      ]"
      :value="task.name"
      @input="
        $emit('update-name', task.id, ($event.target as HTMLInputElement).value)
      "
      @keyup.enter="
        ($emit(
          'update-name',
          task.id,
          ($event.target as HTMLInputElement).value
        ),
        $emit('finish-edit', task.id))
      "
    />
    <Check
      v-if="task.isEditMode"
      @click="
        ($emit('update-name', task.id, task.name),
        $emit('finish-edit', task.id))
      "
      class="ml-2 h-8 w-8 cursor-pointer text-green-500 hover:text-green-400"
    />
    <Trash
      class="mr-2 ml-auto h-8 w-8 cursor-pointer text-red-500 hover:text-red-400"
      @click="$emit('delete-task', task.id)"
    />
  </div>
</template>
