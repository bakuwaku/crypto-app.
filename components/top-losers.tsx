"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ChevronDown } from "lucide-react"

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

export function TopLosers() {
  const [losers, setLosers] = useState<Cryptocurrency[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchLosers = async () => {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en",
        )
        if (!response.ok) {
          throw new Error("Failed to fetch data")
        }
        const data = await response.json()
        // Filter and sort by lowest price change
        const topLosers = data
          .filter((coin: Cryptocurrency) => coin.price_change_percentage_24h < 0)
          .sort((a: Cryptocurrency, b: Cryptocurrency) => a.price_change_percentage_24h - b.price_change_percentage_24h)
          .slice(0, 5)
        setLosers(topLosers)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching cryptocurrency data:", error)
        // Use mock data if API fails
        setLosers([
          {
            id: "dogecoin",
            symbol: "doge",
            name: "Dogecoin",
            image: "https://assets.coingecko.com/coins/images/5/large/dogecoin.png",
            current_price: 0.12,
            price_change_percentage_24h: -4.5,
          },
          {
            id: "shiba-inu",
            symbol: "shib",
            name: "Shiba Inu",
            image: "https://assets.coingecko.com/coins/images/11939/large/shiba.png",
            current_price: 0.000018,
            price_change_percentage_24h: -3.8,
          },
          {
            id: "cardano",
            symbol: "ada",
            name: "Cardano",
            image: "https://assets.coingecko.com/coins/images/975/large/cardano.png",
            current_price: 0.45,
            price_change_percentage_24h: -3.2,
          },
          {
            id: "polkadot",
            symbol: "dot",
            name: "Polkadot",
            image: "https://assets.coingecko.com/coins/images/12171/large/polkadot.png",
            current_price: 6.8,
            price_change_percentage_24h: -2.9,
          },
          {
            id: "litecoin",
            symbol: "ltc",
            name: "Litecoin",
            image: "https://assets.coingecko.com/coins/images/2/large/litecoin.png",
            current_price: 72.5,
            price_change_percentage_24h: -2.5,
          },
        ])
        setLoading(false)
      }
    }

    fetchLosers()
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
      {losers.map((coin) => (
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
              <ChevronDown className="h-3 w-3 text-red-500" />
              <span className="text-xs text-red-500">{Math.abs(coin.price_change_percentage_24h).toFixed(2)}%</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
