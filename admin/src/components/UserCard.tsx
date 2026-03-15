import React, { useState } from 'react'
import { UserProfile, ApprovalStatus } from '@/types'

interface UserCardProps {
  user: UserProfile
  onApprove?: (userId: string) => void
  onSuspend?: (userId: string) => void
  isLoading?: boolean
}

const statusColors = {
  PENDING: 'bg-yellow-100 text-yellow-800',
  APPROVED: 'bg-green-100 text-green-800',
  SUSPENDED: 'bg-red-100 text-red-800',
}

const roleColors = {
  VENDOR: 'bg-purple-100 text-purple-800',
  DRIVER: 'bg-blue-100 text-blue-800',
  CUSTOMER: 'bg-pink-100 text-pink-800',
  ADMIN: 'bg-gray-100 text-gray-800',
}

export const UserCard: React.FC<UserCardProps> = ({
  user,
  onApprove,
  onSuspend,
  isLoading = false,
}) => {
  const [showActions, setShowActions] = useState(false)
  const [actionLoading, setActionLoading] = useState(false)

  const handleApprove = async () => {
    if (!onApprove) return
    setActionLoading(true)
    try {
      await onApprove(user.id)
    } finally {
      setActionLoading(false)
      setShowActions(false)
    }
  }

  const handleSuspend = async () => {
    if (!onSuspend) return
    setActionLoading(true)
    try {
      await onSuspend(user.id)
    } finally {
      setActionLoading(false)
      setShowActions(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
          <p className="text-sm text-gray-600 mt-1">{user.email}</p>
        </div>
        <div className="flex gap-2">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${roleColors[user.role]}`}>
            {user.role}
          </span>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[user.status]}`}>
            {user.status}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 text-sm mb-4">
        <div>
          <p className="text-gray-600">Phone:</p>
          <p className="font-medium">{user.phoneNumber || 'N/A'}</p>
        </div>
        <div>
          <p className="text-gray-600">Joined:</p>
          <p className="font-medium">{new Date(user.createdAt).toLocaleDateString()}</p>
        </div>
        <div className="col-span-2">
          <p className="text-gray-600">Address:</p>
          <p className="font-medium text-sm">{user.address || 'N/A'}</p>
        </div>
      </div>

      {user.approvedAt && (
        <div className="text-xs text-gray-500 mb-4">
          Approved on {new Date(user.approvedAt).toLocaleDateString()} by {user.approvedBy}
        </div>
      )}

      {user.suspendedAt && (
        <div className="text-xs text-red-600 mb-4">
          Suspended on {new Date(user.suspendedAt).toLocaleDateString()} by {user.suspendedBy}
        </div>
      )}

      {/* Actions */}
      <div className="relative">
        <button
          onClick={() => setShowActions(!showActions)}
          className="w-full px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium text-sm transition"
          disabled={isLoading || actionLoading}
        >
          {actionLoading ? 'Processing...' : 'Actions'}
        </button>

        {showActions && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white border rounded-lg shadow-lg z-10">
            {user.status === 'PENDING' && (
              <>
                <button
                  onClick={handleApprove}
                  disabled={actionLoading}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 text-green-600 font-medium text-sm border-b transition disabled:opacity-50"
                >
                  ✓ Approve
                </button>
                <button
                  onClick={handleSuspend}
                  disabled={actionLoading}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600 font-medium text-sm transition disabled:opacity-50"
                >
                  ✕ Suspend
                </button>
              </>
            )}
            {user.status === 'APPROVED' && (
              <button
                onClick={handleSuspend}
                disabled={actionLoading}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600 font-medium text-sm transition disabled:opacity-50"
              >
                ✕ Suspend
              </button>
            )}
            {user.status === 'SUSPENDED' && (
              <button
                onClick={handleApprove}
                disabled={actionLoading}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-green-600 font-medium text-sm transition disabled:opacity-50"
              >
                ✓ Reinstate
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
