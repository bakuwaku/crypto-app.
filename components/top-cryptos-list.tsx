"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowUpRight, ChevronDown, ChevronUp } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { CryptoPrice } from "@/components/crypto-price"

interface Cryptocurrency {
  id: string
  symbol: string
  name: string
  image: string
  current_price: number
  market_cap: number
  market_cap_rank: number
  price_change_percentage_24h: number
  total_volume: number
}

export function TopCryptosList() {
  const [cryptos, setCryptos] = useState<Cryptocurrency[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCryptos = async () => {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false&locale=en",
        )
        if (!response.ok) {
          throw new Error("Failed to fetch data")
        }
        const data = await response.json()
        setCryptos(data)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching cryptocurrency data:", error)
        // Use mock data if API fails
        setCryptos([
          {
            id: "bitcoin",
            symbol: "btc",
            name: "Bitcoin",
            image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
            current_price: 43521,
            market_cap: 852975942335,
            market_cap_rank: 1,
            price_change_percentage_24h: 2.5,
            total_volume: 28975942335,
          },
          {
            id: "ethereum",
            symbol: "eth",
            name: "Ethereum",
            image: "https://assets.coingecko.com/coins/images/279/large/ethereum.png",
            current_price: 2350,
            market_cap: 282975942335,
            market_cap_rank: 2,
            price_change_percentage_24h: 3.2,
            total_volume: 18975942335,
          },
          {
            id: "tether",
            symbol: "usdt",
            name: "Tether",
            image: "https://assets.coingecko.com/coins/images/325/large/Tether.png",
            current_price: 1.0,
            market_cap: 92975942335,
            market_cap_rank: 3,
            price_change_percentage_24h: 0.1,
            total_volume: 58975942335,
          },
          {
            id: "binancecoin",
            symbol: "bnb",
            name: "BNB",
            image: "https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png",
            current_price: 570,
            market_cap: 87975942335,
            market_cap_rank: 4,
            price_change_percentage_24h: 1.8,
            total_volume: 2975942335,
          },
          {
            id: "solana",
            symbol: "sol",
            name: "Solana",
            image: "https://assets.coingecko.com/coins/images/4128/large/solana.png",
            current_price: 145,
            market_cap: 62975942335,
            market_cap_rank: 5,
            price_change_percentage_24h: 4.5,
            total_volume: 3975942335,
          },
        ])
        setLoading(false)
      }
    }

    fetchCryptos()
  }, [])

  const formatMarketCap = (marketCap: number) => {
    if (marketCap >= 1e12) {
      return `$${(marketCap / 1e12).toFixed(2)}T`
    }
    if (marketCap >= 1e9) {
      return `$${(marketCap / 1e9).toFixed(2)}B`
    }
    if (marketCap >= 1e6) {
      return `$${(marketCap / 1e6).toFixed(2)}M`
    }
    return `$${marketCap.toLocaleString()}`
  }

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, index) => (
          <Card key={index} className="border-zinc-800 bg-zinc-900">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-3 w-12" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-3 w-16" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {cryptos.map((crypto) => (
        <Card
          key={crypto.id}
          className="overflow-hidden border-zinc-800 bg-zinc-900 transition-all hover:bg-zinc-800/50"
        >
          <CardContent className="p-0">
            <Link href={`/cryptocurrencies/${crypto.id}`} className="block p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={crypto.image || "/placeholder.svg"}
                    alt={crypto.name}
                    className="h-10 w-10 rounded-full"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = `/placeholder.svg?height=40&width=40`
                    }}
                  />
                  <div>
                    <h3 className="font-medium">{crypto.name}</h3>
                    <p className="text-sm text-zinc-400">{crypto.symbol.toUpperCase()}</p>
                  </div>
                </div>
                <div className="text-right">
                  <CryptoPrice price={crypto.current_price} />
                  <div className="flex items-center justify-end gap-1">
                    {crypto.price_change_percentage_24h > 0 ? (
                      <ChevronUp className="h-3 w-3 text-emerald-500" />
                    ) : (
                      <ChevronDown className="h-3 w-3 text-red-500" />
                    )}
                    <span
                      className={
                        crypto.price_change_percentage_24h > 0 ? "text-xs text-emerald-500" : "text-xs text-red-500"
                      }
                    >
                      {Math.abs(crypto.price_change_percentage_24h).toFixed(2)}%
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between text-sm text-zinc-400">
                <div>Market Cap: {formatMarketCap(crypto.market_cap)}</div>
                <div className="flex items-center gap-1">
                  <span>View</span>
                  <ArrowUpRight className="h-3 w-3" />
                </div>
              </div>
            </Link>
          </CardContent>
        </Card>
      ))}
      <div className="flex justify-center pt-4">
        <Button variant="outline" className="border-zinc-700 text-zinc-200 hover:bg-zinc-800">
          View All Cryptocurrencies
        </Button>
      </div>
    </div>
  )
}
