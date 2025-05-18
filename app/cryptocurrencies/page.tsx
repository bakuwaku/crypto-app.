import Link from "next/link"
import { Search, TrendingUp } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CryptoTable } from "@/components/crypto-table"

export default function CryptocurrenciesPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-zinc-950 text-zinc-50">
      <header className="sticky top-0 z-40 w-full border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-sm">
        <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
          <div className="flex gap-6 md:gap-10">
            <Link href="/" className="flex items-center space-x-2">
              <TrendingUp className="h-6 w-6 text-emerald-500" />
              <span className="inline-block font-bold">CryptoTracker</span>
            </Link>
            <nav className="hidden gap-6 md:flex">
              <Link href="/" className="flex items-center text-sm font-medium text-zinc-400 hover:text-white">
                Dashboard
              </Link>
              <Link
                href="/cryptocurrencies"
                className="flex items-center text-sm font-medium text-zinc-200 hover:text-white"
              >
                Cryptocurrencies
              </Link>
              <Link href="/market" className="flex items-center text-sm font-medium text-zinc-400 hover:text-white">
                Market
              </Link>
            </nav>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <Button variant="outline" className="border-zinc-700 text-zinc-200 hover:bg-zinc-800">
              Connect Wallet
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="container space-y-6 py-8 md:py-12">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tighter">Cryptocurrencies</h1>
              <p className="text-zinc-400">Explore and track all cryptocurrencies in the market</p>
            </div>
            <div className="relative w-full md:w-auto">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500" />
              <Input
                type="search"
                placeholder="Search cryptocurrencies..."
                className="w-full bg-zinc-900 pl-8 md:w-[260px]"
              />
            </div>
          </div>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-zinc-800/50">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="defi">DeFi</TabsTrigger>
              <TabsTrigger value="nft">NFT</TabsTrigger>
              <TabsTrigger value="metaverse">Metaverse</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="border-none p-0 pt-6">
              <CryptoTable />
            </TabsContent>
            <TabsContent value="defi" className="border-none p-0 pt-6">
              <Card className="border-zinc-800 bg-zinc-900">
                <CardHeader>
                  <CardTitle>DeFi Cryptocurrencies</CardTitle>
                  <CardDescription>Decentralized Finance tokens and protocols</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-zinc-400">Loading DeFi cryptocurrencies...</p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="nft" className="border-none p-0 pt-6">
              <Card className="border-zinc-800 bg-zinc-900">
                <CardHeader>
                  <CardTitle>NFT Cryptocurrencies</CardTitle>
                  <CardDescription>Non-Fungible Token related cryptocurrencies</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-zinc-400">Loading NFT cryptocurrencies...</p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="metaverse" className="border-none p-0 pt-6">
              <Card className="border-zinc-800 bg-zinc-900">
                <CardHeader>
                  <CardTitle>Metaverse Cryptocurrencies</CardTitle>
                  <CardDescription>Virtual world and metaverse related cryptocurrencies</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-zinc-400">Loading Metaverse cryptocurrencies...</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </section>
      </main>
      <footer className="border-t border-zinc-800 bg-zinc-950 py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-center text-sm text-zinc-400 md:text-left">
            &copy; {new Date().getFullYear()} CryptoTracker. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="/terms" className="text-sm text-zinc-400 hover:underline">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm text-zinc-400 hover:underline">
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
