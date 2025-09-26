import { useState } from "react"
import { Hero } from "@/types/Hero"

export function useMockHero() {
  const [hero, setHero] = useState<Hero | null>(null)

  const generateHero = () => {
    const classes = [
      "Warrior", "Ranger", "Mage", "Healer", "Rogue", "Berserker", "Shaman", "Mindbender", "Paladin", "Warlock",
    ]

    const rarities = [
      { rarity: "Common", chance: 70 },
      { rarity: "Uncommon", chance: 20 },
      { rarity: "Rare", chance: 7.5 },
      { rarity: "Epic", chance: 2 },
      { rarity: "Legendary", chance: 0.5 },
    ] as const

    const roll = Math.random() * 100
    let picked: Hero["rarity"] = "Common"
    let cumulative = 0
    for (const r of rarities) {
      cumulative += r.chance
      if (roll <= cumulative) {
        picked = r.rarity
        break
      }
    }

    const minStat =
      picked === "Common" ? 10 :
        picked === "Uncommon" ? 25 :
          picked === "Rare" ? 40 :
            picked === "Epic" ? 60 : 80
    const maxStat = Math.min(100, minStat + 20)

    const randStat = () => Math.floor(Math.random() * (maxStat - minStat + 1)) + minStat

    // Set hero (flattened)
    setHero({
      id: String(Math.floor(Math.random() * 10000)),
      name: `Hero #${Math.floor(Math.random() * 10000)}`,
      class: classes[Math.floor(Math.random() * classes.length)],
      rarity: picked,
      strength: randStat(),
      health: randStat(),
      dexterity: randStat(),
      intellect: randStat(),
      magic: randStat(),
    })
  }

  return { hero, generateHero }
}
