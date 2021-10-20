import { writable } from 'svelte/store'

import { sendMscsRequest } from '../lib/mscsRequest'

const createApiCall = cmd => {
  const { subscribe, set, update } = writable([])

  return {
    subscribe,
    get: async (suff) => {
      const msgs = await sendMscsRequest((cmd+' '+(suff || '').replace(/[^a-zA-Z0-9-]/, '')).trim())
      set(msgs)
    }
  }
}

export const list = createApiCall('list')
export const status = createApiCall('status-json')
export const query = createApiCall('query-json')
export const stop = createApiCall('stop')
export const start = createApiCall('start')
export const restart = createApiCall('restart')
export const update = createApiCall('update')

