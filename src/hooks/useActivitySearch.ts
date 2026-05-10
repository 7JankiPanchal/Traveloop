'use client'

import { useState, useEffect } from 'react'
import { useDebounce } from './useDebounce'
import type { Activity } from '@/lib/generated/prisma/client'
import { searchActivitiesAction } from '@/actions/search/searchActivitiesAction'

export function useActivitySearch() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Activity[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const debouncedQuery = useDebounce(query, 350)

  useEffect(() => {
    setIsLoading(true)
    searchActivitiesAction(debouncedQuery)
      .then((data: Activity[]) => setResults(data))
      .catch(() => setResults([]))
      .finally(() => setIsLoading(false))
  }, [debouncedQuery])

  return { query, setQuery, results, isLoading }
}
