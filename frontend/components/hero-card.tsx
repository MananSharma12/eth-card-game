"use client"

import { useState, useEffect } from "react"
import { Sword, Shield, Zap, Heart, Brain, Eye, Sparkles, Star, Crown, Target, Flame, Skull, Ghost } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { Hero } from "@/types/Hero";

interface HeroCardProps {
  hero: Hero
  showCard?: boolean
}

export function HeroCard({ hero, showCard = true }: HeroCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)
  const [showParticles, setShowParticles] = useState(false)
  const [showStats, setShowStats] = useState(false)

  useEffect(() => {
    if (showCard) {
      setTimeout(() => setIsFlipped(true), 100)

      if (hero.rarity !== "Common") {
        setTimeout(() => setShowParticles(true), 800)
        const particleDuration = hero.rarity === "Legendary" ? 5000 : hero.rarity === "Epic" ? 4000 : 3000
        setTimeout(() => setShowParticles(false), particleDuration)
      }

      setTimeout(() => setShowStats(true), 1200)
    }
  }, [showCard, hero.rarity])

  const getClassIcon = (heroClass: string) => {
    switch (heroClass) {
      case "Warrior":
        return <Sword className="h-8 w-8" />
      case "Ranger":
        return <Target className="h-8 w-8" />
      case "Mage":
        return <Flame className="h-8 w-8" />
      case "Healer":
        return <Heart className="h-8 w-8" />
      case "Rogue":
        return <Eye className="h-8 w-8" />
      case "Berserker":
        return <Skull className="h-8 w-8" />
      case "Shaman":
        return <Ghost className="h-8 w-8" />
      case "Mindbender":
        return <Brain className="h-8 w-8" />
      case "Paladin":
        return <Crown className="h-8 w-8" />
      case "Warlock":
        return <Star className="h-8 w-8" />
      default:
        return <Shield className="h-8 w-8" />
    }
  }

  const getRarityGradient = (rarity: string) => {
    switch (rarity) {
      case "Common":
        return "from-gray-100 to-gray-200"
      case "Uncommon":
        return "from-green-100 to-green-200"
      case "Rare":
        return "from-blue-100 to-blue-200"
      case "Epic":
        return "from-purple-100 to-purple-200"
      case "Legendary":
        return "from-yellow-100 to-yellow-200"
      default:
        return "from-gray-100 to-gray-200"
    }
  }

  const getRarityBorderColor = (rarity: string) => {
    switch (rarity) {
      case "Common":
        return "border-gray-300"
      case "Uncommon":
        return "border-green-400"
      case "Rare":
        return "border-blue-400"
      case "Epic":
        return "border-purple-400"
      case "Legendary":
        return "border-yellow-400"
      default:
        return "border-gray-300"
    }
  }

  const getRarityTextColor = (rarity: string) => {
    switch (rarity) {
      case "Common":
        return "text-gray-600"
      case "Uncommon":
        return "text-green-600"
      case "Rare":
        return "text-blue-600"
      case "Epic":
        return "text-purple-600"
      case "Legendary":
        return "text-yellow-600"
      default:
        return "text-gray-600"
    }
  }

  const getRarityGlowClass = (rarity: string) => {
    switch (rarity) {
      case "Legendary":
        return "legendary-glow"
      case "Epic":
        return "epic-glow"
      case "Rare":
        return "rare-glow"
      default:
        return ""
    }
  }

  const getStatIcon = (stat: string) => {
    switch (stat) {
      case "strength":
        return <Sword className="h-4 w-4" />
      case "health":
        return <Heart className="h-4 w-4" />
      case "dexterity":
        return <Eye className="h-4 w-4" />
      case "intellect":
        return <Brain className="h-4 w-4" />
      case "magic":
        return <Zap className="h-4 w-4" />
      default:
        return <Shield className="h-4 w-4" />
    }
  }

  const getStatColor = (value: number) => {
    if (value >= 80) return "text-legendary"
    if (value >= 60) return "text-epic"
    if (value >= 40) return "text-rare"
    if (value >= 20) return "text-uncommon"
    return "text-muted-foreground"
  }

  const getStatBarColor = (value: number) => {
    if (value >= 80) return "bg-legendary"
    if (value >= 60) return "bg-epic"
    if (value >= 40) return "bg-rare"
    if (value >= 20) return "bg-uncommon"
    return "bg-muted"
  }

  return (
    <div className="relative">
      {/* Enhanced Particle Effects */}
      {showParticles && hero.rarity !== "Common" && (
        <div className="absolute inset-0 pointer-events-none z-10">
          {/* Sparkle particles */}
          {[...Array(hero.rarity === "Legendary" ? 30 : hero.rarity === "Epic" ? 20 : 15)].map((_, i) => (
            <div
              key={i}
              className={cn(
                "absolute sparkle",
                hero.rarity === "Legendary"
                  ? "text-legendary"
                  : hero.rarity === "Epic"
                    ? "text-epic"
                    : hero.rarity === "Rare"
                      ? "text-rare"
                      : "text-uncommon",
              )}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${1.5 + Math.random()}s`,
              }}
            >
              <Sparkles className="h-3 w-3" />
            </div>
          ))}

          {/* Floating particles for legendary */}
          {hero.rarity === "Legendary" && <div className="legendary-particles" />}
          {hero.rarity === "Epic" && <div className="epic-particles" />}
          {hero.rarity === "Rare" && <div className="rare-particles" />}
        </div>
      )}

      {/* Card Container with Enhanced Flip Animation */}
      <div className="relative w-80 h-96 perspective-1000">
        <div
          className={cn(
            "relative w-full h-full transition-transform duration-700 transform-style-preserve-3d",
            isFlipped ? "rotate-y-180" : "",
          )}
        >
          {/* Card Back */}
          <div className="absolute inset-0 w-full h-full backface-hidden">
            <Card className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 border-2 border-primary/30">
              <CardContent className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="relative">
                    <Sparkles className="h-16 w-16 text-primary mx-auto mb-4 animate-spin" />
                    {/* Shimmer effect on the back */}
                    <div className="absolute inset-0 shimmer rounded-full" />
                  </div>
                  <h3 className="text-xl font-bold text-primary">HeroForge NFT</h3>
                  <p className="text-muted-foreground">Generating...</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Card Front */}
          <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180">
            <Card
              className={cn(
                "w-full h-full border-2 transition-all duration-300 card-reveal",
                getRarityBorderColor(hero.rarity),
                getRarityGlowClass(hero.rarity),
                hero.rarity === "Legendary" && "shadow-2xl shadow-yellow-400/50",
                hero.rarity === "Epic" && "shadow-xl shadow-purple-400/30",
                hero.rarity === "Rare" && "shadow-lg shadow-blue-400/20",
              )}
            >
              <div className={cn("absolute inset-0 bg-gradient-to-br opacity-10", getRarityGradient(hero.rarity))} />

              <CardHeader className="relative pb-2">
                <div className="flex items-center justify-between mb-2">
                  <Badge
                    variant="secondary"
                    className={cn(
                      "font-semibold bounce-in",
                      hero.rarity === "Common" && "bg-gray-200 text-gray-700",
                      hero.rarity === "Uncommon" && "bg-green-200 text-green-700",
                      hero.rarity === "Rare" && "bg-blue-200 text-blue-700",
                      hero.rarity === "Epic" && "bg-purple-200 text-purple-700",
                      hero.rarity === "Legendary" && "bg-yellow-200 text-yellow-700",
                    )}
                    style={{ animationDelay: "0.2s" }}
                  >
                    {hero.rarity}
                    {hero.rarity === "Legendary" && <Crown className="ml-1 h-3 w-3" />}
                  </Badge>
                  <div className={cn("bounce-in", getRarityTextColor(hero.rarity))} style={{ animationDelay: "0.4s" }}>
                    {getClassIcon(hero.class)}
                  </div>
                </div>
                <CardTitle className={cn("text-lg text-center bounce-in")} style={{ animationDelay: "0.6s" }}>
                  {hero.name}
                </CardTitle>
                <p
                  className={cn("text-sm text-muted-foreground text-center bounce-in")}
                  style={{ animationDelay: "0.8s" }}
                >
                  {hero.class}
                </p>
              </CardHeader>

              <CardContent className="relative pt-0">
                {/* Hero Avatar with enhanced effects */}
                <div
                  className={cn(
                    "aspect-square bg-gradient-to-br rounded-lg mb-4 flex items-center justify-center border bounce-in relative overflow-hidden",
                    getRarityGradient(hero.rarity),
                    getRarityBorderColor(hero.rarity),
                  )}
                  style={{ animationDelay: "1s" }}
                >
                  {/* Avatar shimmer effect for legendary */}
                  {hero.rarity === "Legendary" && <div className="absolute inset-0 shimmer" />}
                  <div className={cn("text-6xl relative z-10", getRarityTextColor(hero.rarity))}>
                    {getClassIcon(hero.class)}
                  </div>
                </div>

                {/* Animated Stats */}
                <div className="space-y-3">
                  {Object.entries({
                    strength: hero.strength,
                    health: hero.health,
                    dexterity: hero.dexterity,
                    intellect: hero.intellect,
                    magic: hero.magic,
                  }).map(([stat, value], index) => (
                    <div
                      key={stat}
                      className={cn("space-y-1 bounce-in")}
                      style={{ animationDelay: `${1.2 + index * 0.1}s` }}
                    >
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          {getStatIcon(stat)}
                          <span className="capitalize font-medium">{stat}:</span>
                        </div>
                        <span className={cn("font-bold", getStatColor(value))}>{value}</span>
                      </div>
                      <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className={cn(
                            "h-full rounded-full transition-all duration-1000 ease-out",
                            getStatBarColor(value),
                            showStats ? "stat-bar-fill" : "w-0",
                          )}
                          style={{
                            width: showStats ? `${value}%` : "0%",
                            transitionDelay: `${1.4 + index * 0.1}s`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Animated Rarity Stars */}
                <div className={cn("flex justify-center mt-4 gap-1 bounce-in")} style={{ animationDelay: "1.8s" }}>
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "h-4 w-4 transition-all duration-300",
                        i <
                        (hero.rarity === "Legendary"
                          ? 5
                          : hero.rarity === "Epic"
                            ? 4
                            : hero.rarity === "Rare"
                              ? 3
                              : hero.rarity === "Uncommon"
                                ? 2
                                : 1)
                          ? getRarityTextColor(hero.rarity) + " fill-current sparkle"
                          : "text-muted-foreground",
                      )}
                      style={{ animationDelay: `${2 + i * 0.1}s` }}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
