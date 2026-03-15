import React from 'react';

interface StatCardProps {
  label: string;
  value: number | string;
  change?: number;
  color?: 'purple' | 'blue' | 'green' | 'yellow' | 'red';
  icon?: React.ReactNode;
}

export const VendorStatCard: React.FC<StatCardProps> = ({ label, value, change, color = 'purple', icon }) => {
  const colorClasses = {
    purple: 'bg-purple-50 text-purple-600',
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    yellow: 'bg-yellow-50 text-yellow-600',
    red: 'bg-red-50 text-red-600',
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100 hover:shadow-lg transition">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{label}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
          {change !== undefined && (
            <p className={`text-sm font-medium mt-2 ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {change >= 0 ? '+' : ''}{change}% from last month
            </p>
          )}
        </div>
        {icon && <div className={`${colorClasses[color]} p-3 rounded-lg`}>{icon}</div>}
      </div>
    </div>
  );
};
