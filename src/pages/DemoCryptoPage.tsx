"use client"

import { useEffect } from "react"
import { Provider } from "react-redux"
import { store } from "../lib/store"
import DemoCryptoTable from "../components/demo-crypto-table"
import CryptoHeader from "../components/crypto-header"
import { WebSocketProvider } from "../lib/websocket-context"
import { ThemeProvider } from "../components/theme-provider"
import { initializeDemoData } from "../lib/features/demo-crypto-slice"
import { Button } from "../components/ui/button"
import { ArrowLeft } from "lucide-react"
import { Link } from "react-router-dom"

export default function DemoCryptoPage() {
  useEffect(() => {
    // Initialize demo data when the page loads
    store.dispatch(initializeDemoData())
  }, [])

  return (
    <Provider store={store}>
      <WebSocketProvider>
        <ThemeProvider defaultTheme="system" storageKey="crypto-theme">
          <main className="container mx-auto py-8 px-4">
            <div className="mb-6">
              <Link to="/tracker">
                <Button variant="outline" size="sm" className="mb-4">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Live Tracker
                </Button>
              </Link>
              <h1 className="text-3xl font-bold">Crypto Demo Tracker</h1>
              <p className="text-muted-foreground mt-2">
                This page demonstrates simulated real-time updates with mock data. Updates occur every 2 seconds.
              </p>
            </div>
            <DemoCryptoTable />
          </main>
        </ThemeProvider>
      </WebSocketProvider>
    </Provider>
  )
}