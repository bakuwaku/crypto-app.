"use client"

import { useState, useEffect } from "react"
import { ArrowDown, ArrowUp } from "lucide-react"

import { Skeleton } from "@/components/ui/skeleton"

interface MarketStats {
  total_market_cap: {
    usd: number
  }
  total_volume: {
    usd: number
  }
  market_cap_percentage: {
    btc: number
    eth: number
  }
  market_cap_change_percentage_24h_usd: number
}

export function MarketStats() {
  const [stats, setStats] = useState<MarketStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMarketStats = async () => {
      try {
        const response = await fetch("https://api.coingecko.com/api/v3/global")
        if (!response.ok) {
          throw new Error("Failed to fetch market data")
        }
        const data = await response.json()
        setStats(data.data)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching market data:", error)
        // Use mock data if API fails
        setStats({
          total_market_cap: {
            usd: 1240000000000,
          },
          total_volume: {
            usd: 48800000000,
          },
          market_cap_percentage: {
            btc: 52.3,
            eth: 18.7,
          },
          market_cap_change_percentage_24h_usd: 2.5,
        })
        setLoading(false)
      }
    }

    fetchMarketStats()
  }, [])

  const formatValue = (value: number) => {
    if (value >= 1e12) {
      return `$${(value / 1e12).toFixed(2)}T`
    }
    if (value >= 1e9) {
      return `$${(value / 1e9).toFixed(2)}B`
    }
    if (value >= 1e6) {
      return `$${(value / 1e6).toFixed(2)}M`
    }
    return `$${value.toLocaleString()}`
  }

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="flex items-center justify-between">
            <Skeleton className="h-4 w-[120px]" />
            <Skeleton className="h-4 w-[80px]" />
          </div>
        ))}
      </div>
    )
  }

  if (!stats) {
    return <div className="text-center text-zinc-400">Failed to load market statistics</div>
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="text-zinc-400">Total Market Cap</div>
        <div className="font-medium">{formatValue(stats.total_market_cap.usd)}</div>
      </div>
      <div className="flex items-center justify-between">
        <div className="text-zinc-400">24h Trading Volume</div>
        <div className="font-medium">{formatValue(stats.total_volume.usd)}</div>
      </div>
      <div className="flex items-center justify-between">
        <div className="text-zinc-400">BTC Dominance</div>
        <div className="font-medium">{stats.market_cap_percentage.btc.toFixed(1)}%</div>
      </div>
      <div className="flex items-center justify-between">
        <div className="text-zinc-400">ETH Dominance</div>
        <div className="font-medium">{stats.market_cap_percentage.eth.toFixed(1)}%</div>
      </div>
      <div className="flex items-center justify-between">
        <div className="text-zinc-400">24h Market Cap Change</div>
        <div className="flex items-center gap-1">
          {stats.market_cap_change_percentage_24h_usd > 0 ? (
            <ArrowUp className="h-4 w-4 text-emerald-500" />
          ) : (
            <ArrowDown className="h-4 w-4 text-red-500" />
          )}
          <span
            className={
              stats.market_cap_change_percentage_24h_usd > 0
                ? "font-medium text-emerald-500"
                : "font-medium text-red-500"
            }
          >
            {Math.abs(stats.market_cap_change_percentage_24h_usd).toFixed(2)}%
          </span>
        </div>
      </div>
    </div>
  )
}
