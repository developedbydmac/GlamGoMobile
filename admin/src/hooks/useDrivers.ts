import { useState, useEffect } from 'react'
import { Driver } from '@/types'
import { driverServices } from '@/services/mockData'

interface UseDriversReturn {
  drivers: Driver[]
  availableDrivers: Driver[]
  loading: boolean
  error: string | null
  refetch: () => Promise<void>
}

export function useDrivers(): UseDriversReturn {
  const [drivers, setDrivers] = useState<Driver[]>([])
  const [availableDrivers, setAvailableDrivers] = useState<Driver[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchDrivers = async () => {
    try {
      setLoading(true)
      setError(null)
      const allDrivers = await driverServices.listDrivers()
      const available = await driverServices.getAvailableDrivers()
      setDrivers(allDrivers)
      setAvailableDrivers(available)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch drivers')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDrivers()
  }, [])

  return {
    drivers,
    availableDrivers,
    loading,
    error,
    refetch: fetchDrivers,
  }
}
