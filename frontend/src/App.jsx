import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route path="/" element={<h1 className="text-2xl font-bold p-4">Pymex - Bienvenido</h1>} />
      </Routes>
    </div>
  )
}

export default App
