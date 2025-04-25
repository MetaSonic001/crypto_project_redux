"use client"

import React, { createContext, useContext, useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { connectToWebSocket } from "./websocket-service"
import { updatePrices } from "./features/crypto-slice"

interface WebSocketContextType {
  isConnected: boolean
  liveUpdates: boolean
  toggleLiveUpdates: () => void
}

const WebSocketContext = createContext<WebSocketContextType>({
  isConnected: false,
  liveUpdates: true,
  toggleLiveUpdates: () => {},
})

export const useWebSocket = () => useContext(WebSocketContext)

export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false)
  const [liveUpdates, setLiveUpdates] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    let cleanup: (() => void) | undefined

    if (liveUpdates) {
      cleanup = connectToWebSocket((id, updates) => {
        dispatch(updatePrices({ id, updates }))
      })
      setIsConnected(true)
    } else if (cleanup) {
      cleanup()
      setIsConnected(false)
    }

    return () => {
      if (cleanup) cleanup()
    }
  }, [liveUpdates, dispatch])

  const toggleLiveUpdates = () => {
    setLiveUpdates((prev) => !prev)
  }

  return (
    <WebSocketContext.Provider value={{ isConnected, liveUpdates, toggleLiveUpdates }}>
      {children}
    </WebSocketContext.Provider>
  )
}