import {useEffect, useState} from "react";
import {rarityData} from "@/app/rarity/rarityData";
import {Card} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {StatBar} from "@/app/rarity/components/stat-bar";

export const RarityCard = ({rarity, index}: { rarity: (typeof rarityData)[0]; index: number }) => {
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
      {rarity.name === "Legendary" && isHovered && <div className="legendary-particles"/>}

      {/* Shimmer effect on hover */}
      {isHovered && <div className="absolute inset-0 shimmer opacity-30"/>}

      <div className="p-6 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${rarity.bgColor} ${rarity.borderColor} border`}>
              <Icon className={`w-6 h-6 ${rarity.color}`}/>
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
                <div className={`w-1.5 h-1.5 rounded-full ${rarity.color.replace("text-", "bg-")}`}/>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Card>
  )
}
