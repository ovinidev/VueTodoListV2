export const useLocalStorage = (key: string) => {
  const getAll = () => {
    const data = localStorage.getItem(key)

    if (data) {
      return JSON.parse(data)
    }
  }

  const save = (value: any) => {
    localStorage.setItem(key, JSON.stringify(value))
  }

  return {
    getAll,
    save
  }
}
