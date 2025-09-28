"use client"

import {useState} from "react"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Badge} from "@/components/ui/badge"
import {
  Sword,
  Target,
  Flame,
  Heart,
  Eye,
  Skull,
  Ghost,
  Brain,
  Crown,
  Star,
  Shield,
  Zap,
  Sparkles,
} from "lucide-react"
import {cn} from "@/lib/utils"
import {generateNameFromSeed, CLASS_KEYS, RARITY_KEYS} from "@/lib/nameGenerator"

interface CollectionHeroCardProps {
  heroId: number,
  classIndex: number,
  rarityIndex: number,
  stats: {
    strength: number
    health: number
    dexterity: number
    intellect: number
    magic: number
  },
  seed: bigint,
}

export function CollectionHeroCard({
 heroId,
 classIndex,
 rarityIndex,
 stats,
 seed
}: CollectionHeroCardProps) {
  const [showStats, setShowStats] = useState(true)
  const [showParticles] = useState(true)

  const rarity = RARITY_KEYS[rarityIndex]
  const className = CLASS_KEYS[classIndex]
  const displayName = generateNameFromSeed(seed, classIndex, rarityIndex)

  const getClassIcon = (heroClass: string) => {
    switch (heroClass) {
      case "Warrior":
        return <Sword className="h-8 w-8"/>
      case "Ranger":
        return <Target className="h-8 w-8"/>
      case "Mage":
        return <Flame className="h-8 w-8"/>
      case "Healer":
        return <Heart className="h-8 w-8"/>
      case "Rogue":
        return <Eye className="h-8 w-8"/>
      case "Berserker":
        return <Skull className="h-8 w-8"/>
      case "Shaman":
        return <Ghost className="h-8 w-8"/>
      case "Mindbender":
        return <Brain className="h-8 w-8"/>
      case "Paladin":
        return <Crown className="h-8 w-8"/>
      case "Warlock":
        return <Star className="h-8 w-8"/>
      default:
        return <Shield className="h-8 w-8"/>
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

  const getStatIcon = (stat: string) => {
    switch (stat) {
      case "strength":
        return <Sword className="h-4 w-4"/>
      case "health":
        return <Heart className="h-4 w-4"/>
      case "dexterity":
        return <Eye className="h-4 w-4"/>
      case "intellect":
        return <Brain className="h-4 w-4"/>
      case "magic":
        return <Zap className="h-4 w-4"/>
      default:
        return <Shield className="h-4 w-4"/>
    }
  }

  const getStatColor = (value: number) => {
    if (value >= 80) return "text-yellow-600"
    if (value >= 60) return "text-purple-600"
    if (value >= 40) return "text-blue-600"
    if (value >= 20) return "text-green-600"
    return "text-gray-400"
  }

  const getStatBarColor = (value: number) => {
    if (value >= 80) return "bg-yellow-400"
    if (value >= 60) return "bg-purple-400"
    if (value >= 40) return "bg-blue-400"
    if (value >= 20) return "bg-green-400"
    return "bg-gray-300"
  }

  return (
    <div className="relative w-80 h-100">
      {/* Particles */}
      {showParticles && rarity !== "Common" && (
        <div className="absolute inset-0 pointer-events-none z-10">
          {[...Array(rarity === "Legendary" ? 30 : rarity === "Epic" ? 20 : 15)].map((_, i) => (
            <div
              key={i}
              className={cn(
                "absolute sparkle",
                rarity === "Legendary"
                  ? "text-yellow-400"
                  : rarity === "Epic"
                    ? "text-purple-400"
                    : rarity === "Rare"
                      ? "text-blue-400"
                      : "text-green-400"
              )}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${1.5 + Math.random()}s`,
              }}
            >
              <Sparkles className="h-3 w-3"/>
            </div>
          ))}
        </div>
      )}

      {/* Card */}
      <Card
        className={cn(
          "w-full h-full border-2 transition-all duration-300",
          getRarityBorderColor(rarity)
        )}
      >
        <div className={cn("absolute inset-0 bg-gradient-to-br opacity-10", getRarityGradient(rarity))}/>

        <CardHeader className="relative pb-2">
          <div className="flex items-center justify-between mb-2">
            <Badge
              variant="secondary"
              className={cn("font-semibold", getRarityTextColor(rarity))}
            >
              {rarity}
            </Badge>
            <div className={getRarityTextColor(rarity)}>{getClassIcon(className)}</div>
          </div>
          <CardTitle className="text-lg text-center">{displayName}</CardTitle>
          <p className="text-sm text-muted-foreground text-center">{className}</p>
        </CardHeader>

        <CardContent className="relative pt-0">
          {/* Stats */}
          <div className="space-y-3">
            {Object.entries(stats).map(([stat, value], index) => (
              <div key={stat} className="space-y-1">
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
                      showStats ? "w-full" : "w-0"
                    )}
                    style={{width: `${value}%`}}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        {/* Stars */}
        <div className="flex justify-center mt-8 gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={cn(
                "h-6 w-6 transition-all duration-300",
                i <
                (rarity === "Legendary"
                  ? 5
                  : rarity === "Epic"
                    ? 4
                    : rarity === "Rare"
                      ? 3
                      : rarity === "Uncommon"
                        ? 2
                        : 1)
                  ? getRarityTextColor(rarity) + " fill-current sparkle"
                  : "text-muted-foreground"
              )}
            />
          ))}
        </div>
      </Card>
    </div>
  )
}
