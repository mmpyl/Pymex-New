import { Routes, Route, Navigate } from 'react-router-dom'
import UsersPage from './pages/admin/UsersPage'
import LoginForm from './components/auth/LoginForm'
import ProtectedRoute from './components/auth/ProtectedRoute'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route path="/" element={<Navigate to="/admin/users" replace />} />
        <Route path="/auth/login" element={<LoginForm />} />
        <Route 
          path="/admin/users" 
          element={
            <ProtectedRoute>
              <UsersPage />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </div>
  )
}

export default App
