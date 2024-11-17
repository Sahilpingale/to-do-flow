import React from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import Home from "./pages/home"
import Project from "./pages/project"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/home" element={<Home />} />
      <Route path="/project/:id" element={<Project />} />
    </Routes>
  )
}

export default App
