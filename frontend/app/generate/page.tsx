"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Sparkles, TestTube, ExternalLink } from "lucide-react"
import Link from "next/link"
import { Header } from "@/components/header"
import { CONTRACT_ADDRESS_ETHERSCAN } from "@/lib/constants/contract"
import { useMockHero } from "@/hooks/useMockHero";
import { HeroCard } from "@/components/hero-card";

export default function GeneratePage() {
  // DEMO STATES
  const [demoMode, setDemoMode] = useState(true)
  const [demoLoading, setDemoLoading] = useState(false)
  const { hero, generateHero } = useMockHero()

  // CONTRACT STATES
  const [transactionHash, setTransactionHash] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  // const [isLoading, setIsLoading] = useState(false)

  // DEMO GENERATION
  const handleDemoGenerate = async () => {
    setDemoLoading(true)
    setError(null)
    setTransactionHash(null)

    setTimeout(() => {
      generateHero()
      setDemoLoading(false)
    }, 0)
  }

  // REAL CONTRACT GENERATION
  const handleGenerateHero = async () => {
    if (demoMode) {
      handleDemoGenerate()
      return
    }

    try {
      // setIsLoading(true)
      setError(null)
      setTransactionHash(null)

      // 🔹 Contract call placeholder
      // const provider = new ethers.BrowserProvider((window as any).ethereum)
      // const signer = await provider.getSigner()
      // const contract = getContract(signer)
      // const tx = await contract.mintHero({ value: ethers.parseEther("0.001") })
      // const receipt = await tx.wait()

      // setTransactionHash(receipt.hash)
      // setGeneratedHero(heroFromEvent) // parse from contract event
    } catch (err: any) {
      setError(err.message || "Failed to generate hero")
    } finally {
      // setIsLoading(false)
    }
  }

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
                                `https://etherscan.io/tx/${transactionHash}`,
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
                    >
                      {demoMode ? (
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
                    {hero ? (
                      <HeroCard hero={hero} showCard />
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
