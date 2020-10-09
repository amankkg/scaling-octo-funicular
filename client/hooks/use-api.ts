import {useEffect, useState} from 'react'

import {api, ApiResult} from '../services'

const pending = {status: 'pending'} as const

export function useApi<T>(path: string, parameters?: Record<string, any>) {
  const [result, setState] = useState<typeof pending | ApiResult<T>>(pending)

  // TODO: cancel previous fetch on effect clean up
  useEffect(() => {
    setState(pending)

    api<T>(path, 'get', parameters).then(setState)
  }, [path, parameters])

  return result
}