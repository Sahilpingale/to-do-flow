import React from "react"
import { Route, Routes } from "react-router-dom"

function App() {
  return (
    <Routes>
      <Route path="/" element={<>123</>} />
      <Route path="/test" element={<>test</>} />
    </Routes>
  )
}

export default App
