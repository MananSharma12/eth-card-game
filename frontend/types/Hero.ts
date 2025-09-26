export type HeroClass = "Warrior" | "Ranger" | "Mage" | "Healer" | "Rogue" | "Berserker" | "Shaman" | "Mindbender" | "Paladin" | "Warlock"
export type HeroRarity = "Common" | "Uncommon" | "Rare" | "Epic" | "Legendary"

export interface Hero {
  id: string
  name: string
  class: HeroClass
  rarity: HeroRarity
  strength: number
  health: number
  dexterity: number
  intellect: number
  magic: number
}
