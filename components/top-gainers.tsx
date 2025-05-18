"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ChevronUp } from "lucide-react"

import { Skeleton } from "@/components/ui/skeleton"
import { CryptoPrice } from "@/components/crypto-price"

interface Cryptocurrency {
  id: string
  symbol: string
  name: string
  image: string
  current_price: number
  price_change_percentage_24h: number
}

export function TopGainers() {
  const [gainers, setGainers] = useState<Cryptocurrency[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchGainers = async () => {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en",
        )
        if (!response.ok) {
          throw new Error("Failed to fetch data")
        }
        const data = await response.json()
        // Filter and sort by highest price change
        const topGainers = data
          .filter((coin: Cryptocurrency) => coin.price_change_percentage_24h > 0)
          .sort((a: Cryptocurrency, b: Cryptocurrency) => b.price_change_percentage_24h - a.price_change_percentage_24h)
          .slice(0, 5)
        setGainers(topGainers)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching cryptocurrency data:", error)
        // Use mock data if API fails
        setGainers([
          {
            id: "solana",
            symbol: "sol",
            name: "Solana",
            image: "https://assets.coingecko.com/coins/images/4128/large/solana.png",
            current_price: 145,
            price_change_percentage_24h: 8.5,
          },
          {
            id: "injective-protocol",
            symbol: "inj",
            name: "Injective",
            image: "https://assets.coingecko.com/coins/images/12882/large/Secondary_Symbol.png",
            current_price: 32.5,
            price_change_percentage_24h: 7.2,
          },
          {
            id: "render-token",
            symbol: "rndr",
            name: "Render",
            image: "https://assets.coingecko.com/coins/images/11636/large/rndr.png",
            current_price: 7.8,
            price_change_percentage_24h: 6.9,
          },
          {
            id: "aptos",
            symbol: "apt",
            name: "Aptos",
            image: "https://assets.coingecko.com/coins/images/26455/large/aptos_round.png",
            current_price: 8.2,
            price_change_percentage_24h: 5.8,
          },
          {
            id: "arbitrum",
            symbol: "arb",
            name: "Arbitrum",
            image: "https://assets.coingecko.com/coins/images/16547/large/photo_2023-03-29_21.47.00.jpeg",
            current_price: 1.25,
            price_change_percentage_24h: 5.3,
          },
        ])
        setLoading(false)
      }
    }

    fetchGainers()
  }, [])

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-4 w-24" />
            </div>
            <Skeleton className="h-4 w-16" />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {gainers.map((coin) => (
        <Link
          key={coin.id}
          href={`/cryptocurrencies/${coin.id}`}
          className="flex items-center justify-between hover:bg-zinc-800/50 p-2 rounded-md transition-colors"
        >
          <div className="flex items-center gap-2">
            <img
              src={coin.image || "/placeholder.svg"}
              alt={coin.name}
              className="h-8 w-8 rounded-full"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.src = `/placeholder.svg?height=32&width=32`
              }}
            />
            <div>
              <div className="font-medium">{coin.name}</div>
              <div className="text-xs text-zinc-400">{coin.symbol.toUpperCase()}</div>
            </div>
          </div>
          <div className="text-right">
            <CryptoPrice price={coin.current_price} />
            <div className="flex items-center justify-end gap-1">
              <ChevronUp className="h-3 w-3 text-emerald-500" />
              <span className="text-xs text-emerald-500">{coin.price_change_percentage_24h.toFixed(2)}%</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
