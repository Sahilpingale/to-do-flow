import React from "react"
import { Route, Routes } from "react-router-dom"
import { Button } from "@mantine/core"
function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Button>Button</Button>
          </>
        }
      />
      <Route path="/test" element={<>test</>} />
    </Routes>
  )
}

export default App
