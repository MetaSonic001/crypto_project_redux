import { Routes, Route } from "react-router-dom"
import LandingPage from "./pages/LandingPage"
import TrackerPage from "./pages/TrackerPage"
import DemoCryptoPage from "./pages/DemoCryptoPage"
import { WebSocketProvider } from "./lib/websocket-context"

function App() {
  return (
    // <WebSocketProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/tracker" element={<TrackerPage />} />
        <Route path="/demo" element={<DemoCryptoPage />} />
      </Routes>
    // </WebSocketProvider>
  )
}

export default App