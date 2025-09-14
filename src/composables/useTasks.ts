import { TASKS_KEY } from '@/constants/tasks'
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
  const newTask = ref<string>('')

  const { save } = useLocalStorage(TASKS_KEY)

  const handleAddTask = () => {
    if (newTask.value.trim() !== '') {
      taskList.value.push({
        id: Math.random(),
        name: newTask.value.trim(),
        isCompleted: false,
        isEditMode: false
      })

      save(taskList.value)
      newTask.value = ''
    }
  }

  const handleCompleteTask = (id: number) => {
    const task = taskList.value.find((task) => task.id === id)
    if (task) {
      task.isCompleted = !task.isCompleted
      save(taskList.value)
    }
  }

  const handleUpdateTask = (id: number, newTitle: string) => {
    const task = taskList.value.find((task) => task.id === id)
    if (task) {
      console.log('task', task)

      task.name = newTitle
      task.isEditMode = false

      save(taskList.value)
    }
  }

  const handleStartEdit = (id: number) => {
    const task = taskList.value.find((task) => task.id === id)
    if (task) {
      task.isEditMode = true
    }
  }

  const handleDeleteTask = (id: number) => {
    taskList.value = taskList.value.filter((task) => task.id !== id)
    save(taskList.value)
  }

  return {
    taskList,
    newTask,
    handleAddTask,
    handleCompleteTask,
    handleUpdateTask,
    handleStartEdit,
    handleDeleteTask
  }
}
