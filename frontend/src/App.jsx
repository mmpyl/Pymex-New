import { Routes, Route, Navigate } from 'react-router-dom'
import UsersPage from './pages/admin/UsersPage'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route path="/" element={<Navigate to="/admin/users" replace />} />
        <Route path="/admin/users" element={<UsersPage />} />
      </Routes>
    </div>
  )
}

export default App
