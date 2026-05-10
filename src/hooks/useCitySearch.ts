'use client'

import { useState, useEffect } from 'react'
import { useDebounce } from './useDebounce'
import type { CityResult } from '@/types/city'

export function useCitySearch() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<CityResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const debouncedQuery = useDebounce(query, 400)

  useEffect(() => {
    if (!debouncedQuery || debouncedQuery.trim().length < 2) {
      setResults([])
      return
    }
    setIsLoading(true)
    setError(null)
    fetch(`/api/cities/search?q=${encodeURIComponent(debouncedQuery)}&t=${Date.now()}`)
      .then((r) => r.json())
      .then((data: CityResult[]) => setResults(data))
      .catch(() => setError('City search failed. Please try again.'))
      .finally(() => setIsLoading(false))
  }, [debouncedQuery])

  return { query, setQuery, results, isLoading, error }
}
