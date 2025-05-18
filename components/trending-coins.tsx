"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowUpRight, Flame } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

interface TrendingCoin {
  id: string
  name: string
  symbol: string
  thumb: string
  market_cap_rank: number
  price_btc: number
}

export function TrendingCoins() {
  const [trending, setTrending] = useState<TrendingCoin[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const response = await fetch("https://api.coingecko.com/api/v3/search/trending")
        if (!response.ok) {
          throw new Error("Failed to fetch trending data")
        }
        const data = await response.json()
        setTrending(data.coins.map((item: any) => item.item))
        setLoading(false)
      } catch (error) {
        console.error("Error fetching trending data:", error)
        // Use mock data if API fails
        setTrending([
          {
            id: "pepe",
            name: "Pepe",
            symbol: "PEPE",
            thumb: "https://assets.coingecko.com/coins/images/29850/thumb/pepe-token.jpeg",
            market_cap_rank: 95,
            price_btc: 0.0000000342,
          },
          {
            id: "injective-protocol",
            name: "Injective",
            symbol: "INJ",
            thumb: "https://assets.coingecko.com/coins/images/12882/thumb/Secondary_Symbol.png",
            market_cap_rank: 32,
            price_btc: 0.0000456,
          },
          {
            id: "sei-network",
            name: "Sei",
            symbol: "SEI",
            thumb: "https://assets.coingecko.com/coins/images/28205/thumb/Sei_Logo_-_Transparent.png",
            market_cap_rank: 42,
            price_btc: 0.0000123,
          },
          {
            id: "render-token",
            name: "Render",
            symbol: "RNDR",
            thumb: "https://assets.coingecko.com/coins/images/11636/thumb/rndr.png",
            market_cap_rank: 65,
            price_btc: 0.0000234,
          },
          {
            id: "aptos",
            name: "Aptos",
            symbol: "APT",
            thumb: "https://assets.coingecko.com/coins/images/26455/thumb/aptos_round.png",
            market_cap_rank: 38,
            price_btc: 0.0000345,
          },
          {
            id: "arbitrum",
            name: "Arbitrum",
            symbol: "ARB",
            thumb: "https://assets.coingecko.com/coins/images/16547/thumb/photo_2023-03-29_21.47.00.jpeg",
            market_cap_rank: 45,
            price_btc: 0.0000234,
          },
        ])
        setLoading(false)
      }
    }

    fetchTrending()
  }, [])

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, index) => (
          <Card key={index} className="border-zinc-800 bg-zinc-900">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-12" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {trending.map((coin) => (
        <Card key={coin.id} className="overflow-hidden border-zinc-800 bg-zinc-900 transition-all hover:bg-zinc-800/50">
          <CardContent className="p-0">
            <Link href={`/cryptocurrencies/${coin.id}`} className="block p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={coin.thumb || "/placeholder.svg"}
                    alt={coin.name}
                    className="h-10 w-10 rounded-full"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = `/placeholder.svg?height=40&width=40`
                    }}
                  />
                  <div>
                    <h3 className="font-medium">{coin.name}</h3>
                    <p className="text-sm text-zinc-400">{coin.symbol}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 rounded-full bg-amber-500/10 px-2 py-1 text-amber-500">
                  <Flame className="h-3 w-3" />
                  <span className="text-xs font-medium">Trending</span>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between text-sm text-zinc-400">
                <div>Rank #{coin.market_cap_rank || "N/A"}</div>
                <div className="flex items-center gap-1">
                  <span>View</span>
                  <ArrowUpRight className="h-3 w-3" />
                </div>
              </div>
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
