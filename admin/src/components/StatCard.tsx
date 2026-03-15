import React from 'react'

interface StatCardProps {
  title: string
  value: number | string
  icon?: string
  color?: 'purple' | 'blue' | 'green' | 'yellow' | 'red'
}

const colorClasses = {
  purple: 'bg-purple-50 text-purple-600 border-purple-200',
  blue: 'bg-blue-50 text-blue-600 border-blue-200',
  green: 'bg-green-50 text-green-600 border-green-200',
  yellow: 'bg-yellow-50 text-yellow-600 border-yellow-200',
  red: 'bg-red-50 text-red-600 border-red-200',
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  color = 'purple',
}) => {
  return (
    <div className={`${colorClasses[color]} border-l-4 rounded-lg p-6 shadow-sm`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold">{value}</p>
        </div>
        {icon && <span className="text-4xl">{icon}</span>}
      </div>
    </div>
  )
}
