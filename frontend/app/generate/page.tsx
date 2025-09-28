"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Sparkles, TestTube, ExternalLink, Loader2 } from "lucide-react"
import Link from "next/link"
import { Header } from "@/components/header"
import { CONTRACT_ADDRESS_BLOCKCHAIN, CONTRACT_ADDRESS_ETHERSCAN } from "@/lib/constants/contract"
import { useMockHero } from "@/hooks/useMockHero";
import { HeroCard } from "@/components/hero-card";
import type { Hero, HeroClass, HeroRarity } from "@/types/Hero";
import {ethers} from "ethers";
import {getContract} from "@/lib/contractInstance";
import {CLASS_KEYS, generateNameFromSeed, RARITY_KEYS} from "@/lib/nameGenerator";

interface EthereumWindow extends Window {
  ethereum?: {
    request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
    [key: string]: unknown;
  };
}

interface HeroStats {
  strength: number;
  health: number;
  dexterity: number;
  intellect: number;
  magic: number;
}

interface ContractHeroRaw {
  classType?: unknown;
  rarity?: unknown;
  stats?: HeroStats;
  strength?: unknown;
  health?: unknown;
  dexterity?: unknown;
  intellect?: unknown;
  magic?: unknown;
  [index: number]: unknown;
}

export default function GeneratePage() {
  // DEMO STATES
  const [demoMode, setDemoMode] = useState(true)
  const { hero, generateHero } = useMockHero()

  // CONTRACT STATES
  const [transactionHash, setTransactionHash] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [generatedHero, setGeneratedHero] = useState<Hero | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // DEMO GENERATION
  const handleDemoGenerate = async () => {
    setError(null)
    setTransactionHash(null)

    setTimeout(() => {
      generateHero()
    }, 0)
  }

  const handleGenerateHero = async () => {
    if (demoMode) {
      handleDemoGenerate()
      return
    }

    setError(null)
    setTransactionHash(null)
    setGeneratedHero(null)
    setIsLoading(true)

    try {
      const windowWithEthereum = window as unknown as EthereumWindow
      if (!windowWithEthereum.ethereum) throw new Error("No wallet found. Please install MetaMask or use a supported wallet.")

      const provider = new ethers.BrowserProvider(windowWithEthereum.ethereum)
      const signer = await provider.getSigner()
      const userAddress = await signer.getAddress()

      const contract = getContract(signer)

      let mintPrice
      try {
        mintPrice = await contract.mintPrice()
      } catch {
        mintPrice = ethers.parseEther("0.001")
      }

      const tx = await contract.mint({ value: mintPrice })
      const receipt = await tx.wait()

      const txHash = receipt.transactionHash ?? receipt.hash ?? null
      if (txHash) setTransactionHash(txHash)

      // 5) try to parse tokenId from Transfer event in logs
      let tokenId: number | null = null
      for (const log of receipt.logs) {
        if (log.address.toLowerCase() !== CONTRACT_ADDRESS_BLOCKCHAIN.toLowerCase()) continue
        try {
          const parsed = contract.interface.parseLog(log)
          if (parsed && parsed.name === "Transfer") {
            const from = parsed.args[0]
            const to = parsed.args[1]
            const id = parsed.args[2]
            if ((from === ethers.ZeroAddress || from === "0x0000000000000000000000000000000000000000")
              && to.toLowerCase() === userAddress.toLowerCase()) {
              tokenId = Number(id.toString ? id.toString() : id)
              break
            }
          }
        } catch {}
      }

      if (tokenId === null) {
        const balanceBN = await contract.balanceOf(userAddress)
        const balance = Number(balanceBN.toString ? balanceBN.toString() : balanceBN)
        if (balance === 0) throw new Error("Mint succeeded but owner has zero balance — unable to find tokenId")
        const lastIndex = balance - 1
        const idBN = await contract.tokenOfOwnerByIndex(userAddress, lastIndex)
        tokenId = Number(idBN.toString ? idBN.toString() : idBN)
      }

      const heroRaw = await contract.heroes(tokenId) as ContractHeroRaw
      let seedRaw: unknown
      try { seedRaw = await contract.seeds(tokenId) } catch { seedRaw = null }

      const classIndex = Number(heroRaw.classType ?? heroRaw[0])
      const rarityIndex = Number(heroRaw.rarity ?? heroRaw[1])

      let statsObj: HeroStats
      if (heroRaw.stats) {
        statsObj = heroRaw.stats
      } else if (Array.isArray(heroRaw[2])) {
        const arr = heroRaw[2] as unknown[]
        statsObj = {
          strength: Number(arr[0]?.toString ? (arr[0] as { toString(): string }).toString() : arr[0]),
          health: Number(arr[1]?.toString ? (arr[1] as { toString(): string }).toString() : arr[1]),
          dexterity: Number(arr[2]?.toString ? (arr[2] as { toString(): string }).toString() : arr[2]),
          intellect: Number(arr[3]?.toString ? (arr[3] as { toString(): string }).toString() : arr[3]),
          magic: Number(arr[4]?.toString ? (arr[4] as { toString(): string }).toString() : arr[4]),
        }
      } else {
        statsObj = {
          strength: Number(heroRaw.strength ?? (heroRaw[2] as ContractHeroRaw | undefined)?.strength ?? 0),
          health: Number(heroRaw.health ?? (heroRaw[2] as ContractHeroRaw | undefined)?.health ?? 0),
          dexterity: Number(heroRaw.dexterity ?? (heroRaw[2] as ContractHeroRaw | undefined)?.dexterity ?? 0),
          intellect: Number(heroRaw.intellect ?? (heroRaw[2] as ContractHeroRaw | undefined)?.intellect ?? 0),
          magic: Number(heroRaw.magic ?? (heroRaw[2] as ContractHeroRaw | undefined)?.magic ?? 0),
        }
      }

      const seedBigInt = seedRaw ? BigInt((seedRaw as { toString(): string }).toString()) : BigInt(Date.now())

      const className = (CLASS_KEYS && CLASS_KEYS[classIndex]) ? CLASS_KEYS[classIndex] : `Class${classIndex}`
      const rarityName = (RARITY_KEYS && RARITY_KEYS[rarityIndex]) ? RARITY_KEYS[rarityIndex] : `Rarity${rarityIndex}`

      const name = generateNameFromSeed(seedBigInt, classIndex, rarityIndex)

      const heroForUI: Hero = {
        id: String(tokenId),
        name,
        class: className as HeroClass,
        rarity: rarityName as HeroRarity,
        strength: Number(statsObj.strength ?? 0),
        health: Number(statsObj.health ?? 0),
        dexterity: Number(statsObj.dexterity ?? 0),
        intellect: Number(statsObj.intellect ?? 0),
        magic: Number(statsObj.magic ?? 0),
      }

      setGeneratedHero(heroForUI)
    } catch (e: unknown) {
      console.error(e)
      const error = e as { code?: number; message?: string }
      if (error?.code === 4001) {
        setError("Transaction rejected by user")
      } else {
        setError(error?.message || String(e))
      }
    } finally {
      setIsLoading(false)
    }
  }

  const displayHero = demoMode ? hero : generatedHero

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/10">
      <Header />

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Title */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Forge Your Hero</h2>
            <p className="text-lg text-muted-foreground">
              {demoMode
                ? "Test the hero generation system with mock data"
                : "Pay 0.001 ETH to generate a unique hero card"}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Panel */}
            <div className="space-y-6">
              <Card className="p-6">
                <CardHeader className="px-0 pt-0">
                  <CardTitle className="flex items-center gap-2">
                    {demoMode ? (
                      <TestTube className="h-5 w-5 text-primary" />
                    ) : (
                      <Sparkles className="h-5 w-5 text-primary" />
                    )}
                    {demoMode ? "Demo Mode" : "Hero Generation"}
                  </CardTitle>
                  <CardDescription>
                    {demoMode
                      ? "Test hero generation with simulated data"
                      : "Generate your NFT hero via smart contract"}
                  </CardDescription>
                </CardHeader>

                <CardContent className="px-0 pb-0">
                  <div className="space-y-6">
                    {/* Demo Toggle */}
                    <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <TestTube className="h-4 w-4" />
                        <Label htmlFor="demo-mode" className="font-medium">
                          Demo Mode
                        </Label>
                      </div>
                      <Switch
                        id="demo-mode"
                        checked={demoMode}
                        onCheckedChange={setDemoMode}
                      />
                    </div>

                    {/* Contract Info */}
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">Contract:</span>
                        <Badge variant="outline" className="font-mono text-xs">
                          {demoMode ? (
                            "Demo Mode"
                          ) : (
                            <Link href={CONTRACT_ADDRESS_ETHERSCAN}>
                              HeroForge NFT
                            </Link>
                          )}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Cost:</span>
                        <span className="text-lg font-bold">
                          {demoMode ? "FREE" : "0.001 ETH"}
                        </span>
                      </div>
                    </div>

                    {/* Error */}
                    {error && (
                      <div className="p-3 bg-red-100 text-red-700 rounded-md text-sm">
                        {error}
                      </div>
                    )}

                    {/* Tx Hash */}
                    {transactionHash && (
                      <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
                        <p className="text-sm font-medium text-primary mb-1">
                          Transaction Confirmed!
                        </p>
                        <div className="flex items-center gap-2">
                          <p className="text-xs break-all font-mono">
                            {transactionHash}
                          </p>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0"
                            onClick={() =>
                              window.open(
                                `https://sepolia.etherscan.io/tx/${transactionHash}`,
                                "_blank"
                              )
                            }
                          >
                            <ExternalLink className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* Generate Button */}
                    <Button
                      onClick={handleGenerateHero}
                      size="lg"
                      className="w-full text-lg py-6"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Minting Hero...
                        </>
                      ) : demoMode ? (
                        <>
                          <TestTube className="mr-2 h-5 w-5" />
                          Generate Demo Hero (FREE)
                        </>
                      ) : (
                        <>
                          <Sparkles className="mr-2 h-5 w-5" />
                          Mint Hero NFT (0.001 ETH)
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                <Card className="p-4 text-center">
                  <CardContent className="p-0">
                    <div className="text-2xl font-bold text-primary">10</div>
                    <div className="text-sm text-muted-foreground">Classes</div>
                  </CardContent>
                </Card>
                <Card className="p-4 text-center">
                  <CardContent className="p-0">
                    <div className="text-2xl font-bold text-primary">5</div>
                    <div className="text-sm text-muted-foreground">Rarities</div>
                  </CardContent>
                </Card>
                <Card className="p-4 text-center">
                  <CardContent className="p-0">
                    <div className="text-2xl font-bold text-primary">∞</div>
                    <div className="text-sm text-muted-foreground">Combinations</div>
                  </CardContent>
                </Card>
                <Link
                  className="col-start-1 col-end-4 text-center font-semibold underline uppercase"
                  href="/rarity"
                >
                  Learn more about rarity
                </Link>
              </div>
            </div>

            {/* Right Panel: Hero Preview */}
            <div className="flex justify-center">
              <div className="w-80 h-96 bg-muted/30 rounded-xl border-2 border-dashed flex items-center justify-center">
                <div className="text-center">
                  <div className="flex justify-center">
                    {displayHero ? (
                      <HeroCard hero={displayHero} showCard />
                    ) : isLoading ? (
                      <div className="text-center">
                        <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-primary" />
                        <p className="text-muted-foreground">Minting your hero on-chain...</p>
                      </div>
                    ) : (
                      <div className="w-80 h-96 bg-muted/30 rounded-xl border-2 border-dashed border-muted-foreground/30 flex items-center justify-center">
                        <div className="text-center">
                          <Sparkles className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
                          <p className="text-muted-foreground">Your hero NFT will appear here</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
