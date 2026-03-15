import React from 'react'
import { Link } from 'react-router-dom'

interface NavbarProps {
  title?: string
  onSignOut?: () => void
}

export const Navbar: React.FC<NavbarProps> = ({ title = 'GlamGo Admin', onSignOut }) => {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/dashboard" className="flex items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {title}
            </h1>
          </Link>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex gap-4">
              <Link to="/dashboard" className="text-gray-600 hover:text-gray-900 font-medium">
                Dashboard
              </Link>
              <Link to="/users" className="text-gray-600 hover:text-gray-900 font-medium">
                Users
              </Link>
              <Link to="/orders" className="text-gray-600 hover:text-gray-900 font-medium">
                Orders
              </Link>
              <Link to="/drivers" className="text-gray-600 hover:text-gray-900 font-medium">
                Drivers
              </Link>
            </div>

            <button
              onClick={onSignOut}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
