import { writable } from 'svelte/store'

import { sendMscsRequest } from '../lib/mscsRequest'

const createApiCall = cmd => {
  const { subscribe, set, update } = writable([])

  return {
    subscribe,
    get: async () => {
      const msgs = await sendMscsRequest(cmd)
      set(msgs)
    }
  }
}

export const list = createApiCall('list')
export const status = createApiCall('status')
export const query = createApiCall('query')

