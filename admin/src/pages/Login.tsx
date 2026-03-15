import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login: React.FC = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('admin@test.com')
  const [password, setPassword] = useState('TestPassword123!')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // Simulate API call with mock auth
      await new Promise((resolve) => setTimeout(resolve, 500))

      if (email.toLowerCase().includes('admin')) {
        // Store auth info (in real app, use AWS Cognito)
        localStorage.setItem('authToken', 'mock-token-' + Date.now())
        localStorage.setItem('userEmail', email)
        navigate('/dashboard')
      } else {
        setError('Only admin accounts can access this portal')
      }
    } catch (err) {
      setError('Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-600 via-purple-500 to-pink-500">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            GlamGo Admin
          </h1>
          <p className="text-gray-600">Dashboard & Management Portal</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-red-700 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@test.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
              disabled={loading}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
              disabled={loading}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:shadow-lg transition disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-6 pt-6 border-t">
          <p className="text-xs text-gray-600 mb-3 font-medium">Demo Credentials:</p>
          <div className="bg-gray-50 rounded-lg p-3 space-y-2 text-xs">
            <p><strong>Email:</strong> admin@test.com</p>
            <p><strong>Password:</strong> Any password</p>
            <p className="text-gray-500 italic mt-2">
              ℹ️ Using mock authentication for demo
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
