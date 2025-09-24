"use client"

import { useState, useEffect } from "react"
import Link from "next/link";
import { Sparkles } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { rarityData } from "@/app/rarity/rarityData";

const StatBar = ({ label, value, max, delay }: { label: string; value: number; max: number; delay: number }) => {
  const [animatedValue, setAnimatedValue] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedValue(value)
    }, delay)
    return () => clearTimeout(timer)
  }, [value, delay])

  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span className="font-medium">{label}</span>
        <span className="text-muted-foreground">
          {value}/{max}
        </span>
      </div>
      <Progress value={(animatedValue / max) * 100} className="h-2" />
    </div>
  )
}

const RarityCard = ({ rarity, index }: { rarity: (typeof rarityData)[0]; index: number }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const Icon = rarity.icon

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, index * 200)
    return () => clearTimeout(timer)
  }, [index])

  return (
    <Card
      className={`
        relative overflow-hidden transition-all duration-500 hover-lift cursor-pointer
        ${rarity.bgColor} ${rarity.borderColor} ${isHovered ? rarity.glowColor : ""}
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
        ${rarity.name === "Legendary" ? "legendary-glow" : ""}
        ${rarity.name === "Epic" ? "epic-glow" : ""}
        ${rarity.name === "Rare" ? "rare-glow" : ""}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated background particles for legendary */}
      {rarity.name === "Legendary" && isHovered && <div className="legendary-particles" />}

      {/* Shimmer effect on hover */}
      {isHovered && <div className="absolute inset-0 shimmer opacity-30" />}

      <div className="p-6 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${rarity.bgColor} ${rarity.borderColor} border`}>
              <Icon className={`w-6 h-6 ${rarity.color}`} />
            </div>
            <div>
              <h3 className={`text-xl font-bold ${rarity.color}`}>{rarity.name}</h3>
              <Badge variant="outline" className={`${rarity.color} ${rarity.borderColor}`}>
                {rarity.percentage}
              </Badge>
            </div>
          </div>
          <div className={`text-2xl font-bold ${rarity.color}`}>
            {rarity.minStats}-{rarity.maxStats}
          </div>
        </div>

        {/* Description */}
        <p className="text-muted-foreground leading-relaxed">{rarity.description}</p>

        {/* Sample stats */}
        <div className="space-y-3">
          <h4 className="font-semibold text-sm uppercase tracking-wide">Sample Stats</h4>
          <div className="grid grid-cols-2 gap-3">
            <StatBar
              label="Strength"
              value={rarity.minStats + Math.floor(Math.random() * (rarity.maxStats - rarity.minStats))}
              max={100}
              delay={index * 200 + 500}
            />
            <StatBar
              label="Health"
              value={rarity.minStats + Math.floor(Math.random() * (rarity.maxStats - rarity.minStats))}
              max={100}
              delay={index * 200 + 600}
            />
            <StatBar
              label="Dexterity"
              value={rarity.minStats + Math.floor(Math.random() * (rarity.maxStats - rarity.minStats))}
              max={100}
              delay={index * 200 + 700}
            />
            <StatBar
              label="Magic"
              value={rarity.minStats + Math.floor(Math.random() * (rarity.maxStats - rarity.minStats))}
              max={100}
              delay={index * 200 + 800}
            />
          </div>
        </div>

        {/* Features */}
        <div className="space-y-2">
          <h4 className="font-semibold text-sm uppercase tracking-wide">Key Features</h4>
          <ul className="space-y-1">
            {rarity.features.map((feature, i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className={`w-1.5 h-1.5 rounded-full ${rarity.color.replace("text-", "bg-")}`} />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Card>
  )
}

export default function RarityPage() {
  const [headerVisible, setHeaderVisible] = useState(false)

  useEffect(() => {
    setHeaderVisible(true)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 w-48 h-48 bg-accent/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="container mx-auto px-4 py-16">
          <div
            className={`text-center space-y-6 transition-all duration-1000 ${headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Rarity System</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent gradient-shift">
              Hero Rarity Guide
            </h1>

            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Discover the five tiers of hero rarity, each with unique characteristics, stat distributions, and drop
              rates. From humble Common heroes to mythical Legendary champions, every rarity tells a story.
            </p>
          </div>
        </div>

        {/* Rarity breakdown stats */}
        <div className="container mx-auto px-4 pb-16">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-16">
            {rarityData.map((rarity, index) => (
              <div
                key={rarity.name}
                className={`
                  text-center p-4 rounded-lg border transition-all duration-500 hover-lift
                  ${rarity.bgColor} ${rarity.borderColor}
                  ${index === 0 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
                `}
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: "bounce-in 0.6s ease-out forwards",
                }}
              >
                <div className={`text-2xl font-bold ${rarity.color}`}>{rarity.percentage}</div>
                <div className="text-sm text-muted-foreground">{rarity.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Rarity cards */}
        <div className="container mx-auto px-4 pb-16">
          <div className="grid gap-8 md:gap-12">
            {rarityData.map((rarity, index) => (
              <div key={rarity.name} className={index % 2 === 1 ? "md:ml-16" : "md:mr-16"}>
                <RarityCard rarity={rarity} index={index} />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="container mx-auto px-4 py-16">
          <div className="text-center space-y-6 p-8 rounded-2xl bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border border-primary/20 backdrop-blur-sm">
            <h2 className="text-3xl font-bold">Ready to Discover Your Hero?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Each generation is a roll of the dice. Will you uncover a Common warrior or a Legendary champion? The only
              way to find out is to mint your hero card.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/generate"
                className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors shimmer-enhanced"
              >
                Generate Hero Card
              </a>
              <Link
                href="/"
                className="px-8 py-3 border border-border rounded-lg font-semibold hover:bg-muted/50 transition-colors"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
