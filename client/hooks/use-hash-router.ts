import {useEffect, useMemo, useState} from 'react'

export function useHashRouter<T>(routes: Record<string, T>, defaultData: T) {
  const getPage = useMemo(
    () => () => {
      const x = routes[window.location.hash] ?? defaultData
      console.log(x)

      return x
    },
    [routes, defaultData],
  )

  const [data, setData] = useState(getPage)

  useEffect(() => {
    const onHashChange = () => setData(getPage)

    window.addEventListener('hashchange', onHashChange)

    return () => {
      window.removeEventListener('hashchange', onHashChange)
    }
  }, [setData, getPage])

  return data
}
