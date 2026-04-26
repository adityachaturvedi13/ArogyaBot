/**
 * Location hook for ArogyaBot.
 * Manages city input and fetches health resources via the CARE module.
 */

'use client'

import { useState, useCallback } from 'react'
import { useChatStore } from '@/store/chatStore'
import { HealthResource, Helpline, LocationResponse } from '@/types'

/**
 * Hook for managing user location and fetching nearby health resources.
 *
 * @returns Location state and actions
 */
export function useLocation() {
  const userCity = useChatStore((state) => state.userCity)
  const setCity = useChatStore((state) => state.setCity)

  const [resources, setResources] = useState<HealthResource[]>([])
  const [helplines, setHelplines] = useState<Helpline[]>([])
  const [isLoading, setIsLoading] = useState(false)

  /**
   * Fetch health resources for a given city.
   *
   * @param city - The city name to search for
   */
  const fetchResources = useCallback(async (city: string) => {
    if (!city.trim()) return

    setIsLoading(true)
    try {
      const response = await fetch(
        `/api/location?city=${encodeURIComponent(city.trim())}`
      )

      if (!response.ok) {
        throw new Error('Failed to fetch resources')
      }

      const data: LocationResponse = await response.json()
      setResources(data.resources)
      setHelplines(data.helplines)
    } catch (error) {
      console.error('[useLocation] Error fetching resources:', error)
      setResources([])
      setHelplines([])
    } finally {
      setIsLoading(false)
    }
  }, [])

  /**
   * Update the user's city and fetch resources.
   *
   * @param city - The new city name
   */
  const updateCity = useCallback(
    (city: string) => {
      setCity(city)
      fetchResources(city)
    },
    [setCity, fetchResources]
  )

  return {
    /** The user's current city */
    city: userCity,
    /** Set the city and fetch resources */
    setCity: updateCity,
    /** Nearby health resources */
    locationResources: resources,
    /** Relevant helplines */
    locationHelplines: helplines,
    /** Whether resources are currently loading */
    isLoadingResources: isLoading,
    /** Manually trigger resource fetch */
    fetchResources,
  }
}
