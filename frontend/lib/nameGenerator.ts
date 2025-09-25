const ADJS: Record<string, string[]> = {
  Common: ["Plain", "Sturdy", "Feral", "Quiet", "Grey"],
  Uncommon: ["Hardened", "Brave", "Sable", "Sharp", "Fleet"],
  Rare: ["Brutish", "Vigilant", "Radiant", "Stalwart", "Stealthy"],
  Epic: ["Thunderous", "Crimson", "Mythic", "Aegis", "Shadow"],
  Legendary: ["Celestial", "Primordial", "Eternal", "Archon", "Void"],
};

const NOUNS: Record<string, string[]> = {
  Warrior: ["Warrior", "Sentry", "Champion", "Guardian", "Brawler"],
  Ranger: ["Ranger", "Tracker", "Scout", "Marksman", "Warden"],
  Mage: ["Mage", "Sorcerer", "Arcanist", "Invoker", "Seer"],
  Healer: ["Healer", "Cleric", "Medic", "Almoner", "Druid"],
  Rogue: ["Rogue", "Assassin", "Thief", "Stalker", "Blade"],
  Berserker: ["Berserker", "Brawler", "Ravager", "Mauler", "Frenzied"],
  Shaman: ["Shaman", "Witch", "Totemist", "Mystic", "Spirit"],
  Mindbender: ["Mindbender", "Psyker", "Illusionist", "Manipulator", "Dreamer"],
  Paladin: ["Paladin", "Crusader", "Templar", "Knight", "Sentinel"],
  Warlock: ["Warlock", "Hexer", "Binder", "Occultist", "Warbringer"],
};

const CLASS_KEYS = [
  "Warrior",
  "Ranger",
  "Mage",
  "Healer",
  "Rogue",
  "Berserker",
  "Shaman",
  "Mindbender",
  "Paladin",
  "Warlock",
] as const;

const RARITY_KEYS = [
  "Common",
  "Uncommon",
  "Rare",
  "Epic",
  "Legendary",
] as const;

export type ClassKey = typeof CLASS_KEYS[number];
export type RarityKey = typeof RARITY_KEYS[number];

/**
 * Deterministically generate a card name from seed + attributes
 * @param seed BigInt | string | number - the on-chain seed (uint256)
 * @param classIndex number (0..9)
 * @param rarityIndex number (0..4)
 */
export function generateNameFromSeed(
  seed: bigint | string | number,
  classIndex: number,
  rarityIndex: number
): string {
  const s = BigInt(seed);

  const rarityKey: RarityKey = RARITY_KEYS[rarityIndex];
  const classKey: ClassKey = CLASS_KEYS[classIndex];

  const adjIdx = Number((s >> 8n) % BigInt(ADJS[rarityKey].length));
  const nounIdx = Number((s >> 16n) % BigInt(NOUNS[classKey].length));
  const suffix = Number(s % 1000n);

  return `${ADJS[rarityKey][adjIdx]} ${NOUNS[classKey][nounIdx]} #${suffix}`;
}
