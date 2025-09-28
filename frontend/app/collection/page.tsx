"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useAccount } from "wagmi";
import { Sparkles, Loader2, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/header";
import WalletButton from "@/components/wallet-button";
import { useHeroContract } from "@/hooks/useHeroContract";
import { CollectionHeroCard } from "@/app/collection/components/collection-hero-card";

export default function CollectionPage() {
  const { isConnected, address } = useAccount()
  const { ownedHeroes, loadOwnedHeroes, isLoading, error } = useHeroContract()
  const [, setShowCards] = useState<boolean[]>([])

  useEffect(() => {
    if (isConnected && address) {
      loadOwnedHeroes(address)
    }
  }, [isConnected, address, loadOwnedHeroes])

  useEffect(() => {
    if (ownedHeroes.length > 0) {
      const timers = ownedHeroes.map((_, index) =>
        setTimeout(() => {
          setShowCards((prev) => {
            const updated = [...prev]
            updated[index] = true
            return updated
          })
        }, index * 200)
      )
      return () => timers.forEach(clearTimeout)
    }
  }, [ownedHeroes])

  const handleRefresh = () => {
    if (address) {
      setShowCards([])
      loadOwnedHeroes(address)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/10">
      {/* Header */}
      <Header/>

      {/* Main */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Title */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">Your Hero Collection</h2>
            <p className="text-lg text-muted-foreground">
              View all your minted hero NFTs from the blockchain
            </p>
          </div>

          {/* Cases */}
          {!isConnected ? (
            <Card className="max-w-md mx-auto">
              <CardHeader className="text-center">
                <CardTitle>Connect Your Wallet</CardTitle>
                <CardDescription>
                  Connect your wallet to view your hero collection
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <WalletButton />
              </CardContent>
            </Card>
          ) : isLoading ? (
            <div className="text-center">
              <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-primary" />
              <p className="text-muted-foreground">Loading your heroes from the blockchain...</p>
            </div>
          ) : error ? (
            <Card className="max-w-md mx-auto">
              <CardHeader className="text-center">
                <CardTitle className="text-destructive">Error Loading Collection</CardTitle>
                <CardDescription>{error}</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Button onClick={handleRefresh} variant="outline">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Try Again
                </Button>
              </CardContent>
            </Card>
          ) : ownedHeroes.length === 0 ? (
            <Card className="max-w-md mx-auto">
              <CardHeader className="text-center">
                <CardTitle>No Heroes Yet</CardTitle>
                <CardDescription>
                  You haven&#39;t minted any heroes yet. Start your collection!
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Link href="/generate">
                  <Button>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Mint Your First Hero
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <>
              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <Card className="text-center p-4">
                  <CardContent className="p-0">
                    <div className="text-2xl font-bold text-primary">{ownedHeroes.length}</div>
                    <div className="text-sm text-muted-foreground">Total Heroes</div>
                  </CardContent>
                </Card>
                <Card className="text-center p-4">
                  <CardContent className="p-0">
                    <div className="text-2xl font-bold text-legendary">
                      {ownedHeroes.filter((h) => h.rarityIndex === 4).length}
                    </div>
                    <div className="text-sm text-muted-foreground">Legendary</div>
                  </CardContent>
                </Card>
                <Card className="text-center p-4">
                  <CardContent className="p-0">
                    <div className="text-2xl font-bold text-epic">
                      {ownedHeroes.filter((h) => h.rarityIndex === 3).length}
                    </div>
                    <div className="text-sm text-muted-foreground">Epic</div>
                  </CardContent>
                </Card>
                <Card className="text-center p-4">
                  <CardContent className="p-0">
                    <div className="text-2xl font-bold text-rare">
                      {ownedHeroes.filter((h) => h.rarityIndex === 2).length}
                    </div>
                    <div className="text-sm text-muted-foreground">Rare</div>
                  </CardContent>
                </Card>
              </div>

              {/* Refresh */}
              <div className="text-center mb-8">
                <Button onClick={handleRefresh} variant="outline" disabled={isLoading}>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Refresh Collection
                </Button>
              </div>

              {/* Cards */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-20 justify-items-center">
                {ownedHeroes
                  .sort((a, b) => b.rarityIndex - a.rarityIndex)
                  .map((hero) => (
                    <CollectionHeroCard
                      key={hero.id}
                      heroId={hero.id}
                      classIndex={hero.classIndex}
                      rarityIndex={hero.rarityIndex}
                      stats={hero.stats}
                      seed={hero.seed}
                    />
                  ))}
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  )
}