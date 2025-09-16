import { TASKS_DONE_KEY, TASKS_KEY } from '@/constants/tasks'
import { ref } from 'vue'
import { useLocalStorage } from './useLocalStorage'

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
      tasksDone.value.push(task)
      removeTaskFromList(id)
      saveTasksDoneToStorage(tasksDone.value)
      return
    }

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
    }
  }

  const handleDeleteTask = (id: number) => {
    removeTaskFromList(id)

    const taskDone = tasksDone.value.find((task) => task.id === id)

    if (taskDone) {
      removeTaskFromDone(id)
    }
  }

  return {
    taskList,
    newTask,
    handleAddTask,
    handleCompleteTask,
    handleUpdateTask,
    handleFinishEdit,
    handleDeleteTask,
    tasksDone
  }
}
