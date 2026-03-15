import React from "react";

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: "blue" | "yellow" | "green" | "purple" | "rose";
  onClick?: () => void;
}

const colorMap = {
  blue: "bg-blue-50 border-blue-200 text-blue-600",
  yellow: "bg-yellow-50 border-yellow-200 text-yellow-600",
  green: "bg-green-50 border-green-200 text-green-600",
  purple: "bg-purple-50 border-purple-200 text-purple-600",
  rose: "bg-rose-50 border-rose-200 text-rose-600",
};

const colorTitleMap = {
  blue: "text-blue-900",
  yellow: "text-yellow-900",
  green: "text-green-900",
  purple: "text-purple-900",
  rose: "text-rose-900",
};

const colorValueMap = {
  blue: "text-blue-600",
  yellow: "text-yellow-600",
  green: "text-green-600",
  purple: "text-purple-600",
  rose: "text-rose-600",
};

export const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  value,
  icon,
  color,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`${colorMap[color]} rounded-xl border-2 p-6 cursor-pointer hover:shadow-lg transition transform hover:scale-105 ${
        onClick ? "" : "cursor-default"
      }`}
    >
      <div className="flex justify-between items-start">
        <div>
          <p className={`text-sm font-medium ${colorTitleMap[color]}`}>
            {title}
          </p>
          <p className={`text-3xl font-bold mt-2 ${colorValueMap[color]}`}>
            {value}
          </p>
        </div>
        <span className={`text-3xl ${colorMap[color].split(" ")[3]}`}>
          {icon}
        </span>
      </div>
    </div>
  );
};

export default DashboardCard;
