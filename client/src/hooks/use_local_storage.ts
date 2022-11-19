import { storage } from '../utils'

export const useLocalStorage = () => {
  const set = (key: string, value: any) => storage.set(key, value)
  const get = (key: string) => storage.get(key)
  const remove = (key: string) => storage.remove(key)

  return { set, get,remove }
}
