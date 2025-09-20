import { TASKS_DONE_KEY, TASKS_KEY } from '@/constants/tasks'
import { ref, watchEffect } from 'vue'
import {
  compressToEncodedURIComponent,
  decompressFromEncodedURIComponent
} from 'lz-string'
import { useLocalStorage } from './useLocalStorage'
import { useRoute } from 'vue-router'

interface Task {
  id: number
  name: string
  isCompleted: boolean
  isEditMode: boolean
}

export const useTasks = () => {
  const taskList = ref<Task[]>([])
  const tasksDone = ref<Task[]>([])
  const newTask = ref<string>('')

  const { save: saveTaskListToStorage } = useLocalStorage(TASKS_KEY)
  const { save: saveTasksDoneToStorage } = useLocalStorage(TASKS_DONE_KEY)

  const handleAddTask = () => {
    if (newTask.value.trim() !== '') {
      taskList.value.push({
        id: Math.random(),
        name: newTask.value.trim(),
        isCompleted: false,
        isEditMode: false
      })

      saveTaskListToStorage(taskList.value)
      newTask.value = ''
    }
  }

  const removeTaskFromList = (id: number) => {
    taskList.value = taskList.value.filter((task) => task.id !== id)
    saveTaskListToStorage(taskList.value)
  }

  const removeTaskFromDone = (id: number) => {
    tasksDone.value = tasksDone.value.filter((task) => task.id !== id)
    saveTasksDoneToStorage(tasksDone.value)
  }

  const handleCompleteTask = (id: number) => {
    const task =
      taskList.value.find((task) => task.id === id) ||
      tasksDone.value.find((task) => task.id === id)

    if (!task) return

    task.isCompleted = !task.isCompleted

    if (task.isCompleted === true) {
      const taskAlreadyExists = tasksDone.value.find((t) => t.id === id)
      if (taskAlreadyExists) return

      tasksDone.value.push(task)
      removeTaskFromList(id)
      saveTasksDoneToStorage(tasksDone.value)
      return
    }

    const taskAlreadyExists = taskList.value.find((t) => t.id === id)
    if (taskAlreadyExists) return

    removeTaskFromDone(id)
    taskList.value.push(task)
    saveTaskListToStorage(taskList.value)
  }

  const handleUpdateTask = (id: number, newTitle: string) => {
    const task = taskList.value.find((task) => task.id === id)
    if (task) {
      task.name = newTitle
      task.isEditMode = true
      saveTaskListToStorage(taskList.value)
    }
  }

  const handleFinishEdit = (id: number) => {
    const task = taskList.value.find((task) => task.id === id)
    if (task) {
      task.isEditMode = false
      saveTaskListToStorage(taskList.value)
    }
  }

  const handleDeleteTask = (id: number) => {
    removeTaskFromList(id)

    const taskDone = tasksDone.value.find((task) => task.id === id)

    if (taskDone) {
      removeTaskFromDone(id)
    }
  }
  const route = useRoute()

  watchEffect(() => {
    const urlData = route.query.data as string | undefined
    if (urlData) {
      try {
        const decompressedUri = decompressFromEncodedURIComponent(urlData)
        if (!decompressedUri) return
        const decompressedData = JSON.parse(decompressedUri)

        const parsed = decompressedData.map((task: any) => ({
          id: task.i,
          name: task.n,
          isCompleted: task.c,
          isEditMode: false
        }))
        saveTaskListToStorage(parsed)
        taskList.value = parsed
      } catch (e) {
        console.error('Invalid compressed data in query param:', e)
      }
    }
  })

  const encodeTaskListJsonForUrl = (): string => {
    const minimalTasks = taskList.value.map(({ id, name, isCompleted }) => ({
      i: id,
      n: name,
      c: isCompleted
    }))
    return compressToEncodedURIComponent(JSON.stringify(minimalTasks))
  }

  function handleShareTaskList() {
    const url = `${window.location.origin}/todo?data=${encodeTaskListJsonForUrl()}`
    navigator
      .share({
        title: 'My Todo List',
        text: 'Check out my todo list!',
        url
      })
      .catch(() => {})
  }

  return {
    taskList,
    newTask,
    handleAddTask,
    handleCompleteTask,
    handleUpdateTask,
    handleFinishEdit,
    handleDeleteTask,
    tasksDone,
    handleShareTaskList
  }
}
