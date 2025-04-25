"use client"

import { useDispatch, useSelector } from "react-redux"
import { Button } from "./ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Input } from "./ui/input"
import { ArrowUpDown, Home, RefreshCw } from "lucide-react"
import { Link } from "react-router-dom"
import { selectSortConfig, setSortConfig, setFilterValue, fetchCryptoData } from "../lib/features/crypto-slice"
import { Badge } from "./ui/badge"
import { Switch } from "./ui/switch"
import { Label } from "./ui/label"
import { useToast } from "./ui/use-toast"
import { useWebSocket } from "../lib/websocket-context"

export default function CryptoHeader() {
  const dispatch = useDispatch()
  const sortConfig = useSelector(selectSortConfig)
  const { toast } = useToast()
  const { liveUpdates, toggleLiveUpdates, isConnected } = useWebSocket()

  const handleSortChange = (value: string) => {
    const [key, direction] = value.split("-")
    dispatch(setSortConfig({ key, direction: direction as "asc" | "desc" }))
  }

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setFilterValue(e.target.value))
  }

  const handleRefresh = () => {
    dispatch(fetchCryptoData() as any)
    toast({
      title: "Data refreshed",
      description: "Latest cryptocurrency data has been fetched.",
      duration: 3000,
    })
  }

  const handleToggleLiveUpdates = () => {
    toggleLiveUpdates()
    
    toast({
      title: liveUpdates ? "Live updates paused" : "Live updates resumed",
      description: liveUpdates
        ? "Real-time price updates have been paused."
        : "Real-time price updates have been resumed.",
      duration: 3000,
    })
  }

  return (
    <div className="mb-6 space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-2">
          <Link to="/">
            <Button variant="outline" size="icon">
              <Home className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Crypto Tracker</h1>
          {isConnected && (
            <Badge variant="outline" className="ml-2 bg-green-50 text-green-700 border-green-300">
              Live
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center space-x-2">
            <Switch id="live-updates" checked={liveUpdates} onCheckedChange={handleToggleLiveUpdates} />
            <Label htmlFor="live-updates">Live Updates</Label>
          </div>
          <Button variant="outline" size="sm" onClick={handleRefresh}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input placeholder="Filter by name or symbol..." onChange={handleFilterChange} className="w-full" />
        </div>
        <Select defaultValue={`${sortConfig.key}-${sortConfig.direction}`} onValueChange={handleSortChange}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name-asc">
              <div className="flex items-center">
                <ArrowUpDown className="mr-2 h-4 w-4" />
                Name (A-Z)
              </div>
            </SelectItem>
            <SelectItem value="name-desc">
              <div className="flex items-center">
                <ArrowUpDown className="mr-2 h-4 w-4" />
                Name (Z-A)
              </div>
            </SelectItem>
            <SelectItem value="price-desc">
              <div className="flex items-center">
                <ArrowUpDown className="mr-2 h-4 w-4" />
                Price (High-Low)
              </div>
            </SelectItem>
            <SelectItem value="price-asc">
              <div className="flex items-center">
                <ArrowUpDown className="mr-2 h-4 w-4" />
                Price (Low-High)
              </div>
            </SelectItem>
            <SelectItem value="change24h-desc">
              <div className="flex items-center">
                <ArrowUpDown className="mr-2 h-4 w-4" />
                24h % (Gainers)
              </div>
            </SelectItem>
            <SelectItem value="change24h-asc">
              <div className="flex items-center">
                <ArrowUpDown className="mr-2 h-4 w-4" />
                24h % (Losers)
              </div>
            </SelectItem>
            <SelectItem value="marketCap-desc">
              <div className="flex items-center">
                <ArrowUpDown className="mr-2 h-4 w-4" />
                Market Cap (High-Low)
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}