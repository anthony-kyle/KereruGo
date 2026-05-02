const localStorageRef = global.window.localStorage
export const localStorageKeyName = 'token'

export function saveToken(token, storage = localStorageRef) {
  if (!token) {
    storage.removeItem(localStorageKeyName)
  } else {
    storage.setItem(localStorageKeyName, token)
  }
}

export function getToken(storage = localStorageRef) {
  return storage.getItem(localStorageKeyName)
}
