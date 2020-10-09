import {read as readToken} from './token-storage'

const {SNOWPACK_PUBLIC_API: API = 'http://localhost:8081'} = import.meta.env

type FetchOptions = RequestInit & {headers: Headers}
type HttpMethod = 'get' | 'post'

type Fulfilled<T> = {
  status: 'fulfilled'
  data: T
}

type Rejected = {
  status: 'rejected'
  error: string
  errorCode: number
}

export type ApiResult<T> = Fulfilled<T> | Rejected

export async function api<T>(
  path: string,
  method?: HttpMethod,
  parameters?: Record<string, any>,
): Promise<ApiResult<T>> {
  const headers = new Headers()
  const options: FetchOptions = {method, headers}
  const token = readToken()

  if (token) headers.append('Authorization', `Bearer ${token}`)

  switch (method) {
    case 'post':
      if (parameters) {
        options.body = JSON.stringify(parameters)
        headers.append('Content-Type', 'application/json')
      }
      break
    case 'get':
    default:
      // TODO: encode payload as query string
      break
  }

  const response = await fetch(API + path, options)

  const payloadPromise = response.headers
    .get('Content-Type')
    ?.startsWith('application/json')
    ? response.json()
    : response.text()

  const payload = await payloadPromise

  const state: ApiResult<T> = response.ok
    ? {status: 'fulfilled', data: payload}
    : {
        status: 'rejected',
        // TODO: try extracting error message?
        error: JSON.stringify(payload),
        errorCode: response.status,
      }

  return state
}
