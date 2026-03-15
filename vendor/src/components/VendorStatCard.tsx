import React from 'react';

interface StatCardProps {
  label: string;
  value: number | string;
  change?: number;
  color?: 'purple' | 'blue' | 'green' | 'yellow' | 'red';
  icon?: React.ReactNode;
}

const colorBgMap = {
  purple: 'bg-purple-50 border-purple-200',
  blue: 'bg-blue-50 border-blue-200',
  green: 'bg-green-50 border-green-200',
  yellow: 'bg-yellow-50 border-yellow-200',
  red: 'bg-red-50 border-red-200',
};

const colorLabelMap = {
  purple: 'text-purple-900',
  blue: 'text-blue-900',
  green: 'text-green-900',
  yellow: 'text-yellow-900',
  red: 'text-red-900',
};

const colorValueMap = {
  purple: 'text-purple-600',
  blue: 'text-blue-600',
  green: 'text-green-600',
  yellow: 'text-yellow-600',
  red: 'text-red-600',
};

const colorIconMap = {
  purple: 'text-purple-600',
  blue: 'text-blue-600',
  green: 'text-green-600',
  yellow: 'text-yellow-600',
  red: 'text-red-600',
};

export const VendorStatCard: React.FC<StatCardProps> = ({ label, value, change, color = 'purple', icon }) => {
  return (
    <div className={`${colorBgMap[color]} rounded-xl border-2 p-6 hover:shadow-lg transition`}>
      <div className="flex items-start justify-between">
        <div>
          <p className={`${colorLabelMap[color]} text-sm font-medium`}>{label}</p>
          <p className={`${colorValueMap[color]} text-3xl font-bold mt-2`}>{value}</p>
          {change !== undefined && (
            <p className={`text-sm font-medium mt-2 ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {change >= 0 ? '+' : ''}{change}% from last month
            </p>
          )}
        </div>
        {icon && <span className={`${colorIconMap[color]} text-2xl`}>{icon}</span>}
      </div>
    </div>
  );
};
