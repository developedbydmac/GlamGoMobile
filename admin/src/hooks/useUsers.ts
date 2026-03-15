import { useState, useEffect } from 'react'
import { UserProfile } from '@/types'
import { userServices } from '@/services/mockData'

interface UseUsersReturn {
  users: UserProfile[]
  loading: boolean
  error: string | null
  refetch: () => Promise<void>
  approveUser: (userId: string) => Promise<void>
  suspendUser: (userId: string) => Promise<void>
}

export function useUsers(filter?: 'pending' | 'role', filterValue?: string): UseUsersReturn {
  const [users, setUsers] = useState<UserProfile[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchUsers = async () => {
    try {
      setLoading(true)
      setError(null)
      let data: UserProfile[]

      if (filter === 'pending') {
        data = await userServices.listPendingUsers()
      } else if (filter === 'role' && filterValue) {
        data = await userServices.getUsersByRole(filterValue)
      } else {
        data = await userServices.listAllUsers()
      }

      setUsers(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch users')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [filter, filterValue])

  const approveUser = async (userId: string) => {
    try {
      await userServices.approveUser(userId)
      await fetchUsers()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to approve user')
    }
  }

  const suspendUser = async (userId: string) => {
    try {
      await userServices.suspendUser(userId)
      await fetchUsers()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to suspend user')
    }
  }

  return {
    users,
    loading,
    error,
    refetch: fetchUsers,
    approveUser,
    suspendUser,
  }
}
