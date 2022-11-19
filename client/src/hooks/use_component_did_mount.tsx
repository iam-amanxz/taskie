import { useEffect, useState } from 'react'

export const useComponentDidMount = (
  effect: () => any,
  watcher: any[] = [],
) => {
  const [hasMounted, setHasMounted] = useState(false)
  useEffect(() => {
    if (hasMounted) {
      return effect()
    }
    setHasMounted(true)
    return () => null
  }, watcher)
}
