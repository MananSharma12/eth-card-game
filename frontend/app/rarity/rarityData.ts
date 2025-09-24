import {Crown, Gem, Sparkles, Star, Zap} from "lucide-react";

export const rarityData = [
  {
    name: "Common",
    color: "text-gray-400",
    bgColor: "bg-gray-100 dark:bg-gray-800",
    borderColor: "border-gray-300 dark:border-gray-600",
    glowColor: "shadow-gray-200/50 dark:shadow-gray-700/50",
    percentage: "60-75%",
    minStats: 10,
    maxStats: 30,
    icon: Star,
    description:
      "The foundation of every hero's journey. Common heroes may lack flashy abilities, but they possess the determination to grow stronger.",
    features: ["Basic stat ranges", "Standard abilities", "Reliable performance", "Great for beginners"],
  },
  {
    name: "Uncommon",
    color: "text-green-500",
    bgColor: "bg-green-50 dark:bg-green-900/20",
    borderColor: "border-green-300 dark:border-green-600",
    glowColor: "shadow-green-200/50 dark:shadow-green-700/50",
    percentage: "15-25%",
    minStats: 25,
    maxStats: 45,
    icon: Gem,
    description:
      "Heroes with a spark of potential. Uncommon heroes show promise beyond the ordinary, with enhanced abilities and better stat distributions.",
    features: ["Improved stat floors", "Enhanced abilities", "Better growth potential", "Solid mid-tier choice"],
  },
  {
    name: "Rare",
    color: "text-blue-500",
    bgColor: "bg-blue-50 dark:bg-blue-900/20",
    borderColor: "border-blue-300 dark:border-blue-600",
    glowColor: "shadow-blue-200/50 dark:shadow-blue-700/50",
    percentage: "5-10%",
    minStats: 40,
    maxStats: 60,
    icon: Zap,
    description:
      "Exceptional heroes with remarkable abilities. Rare heroes possess significant power and unique traits that set them apart from the masses.",
    features: ["High stat minimums", "Unique abilities", "Strong combat presence", "Valuable collection pieces"],
  },
  {
    name: "Epic",
    color: "text-purple-500",
    bgColor: "bg-purple-50 dark:bg-purple-900/20",
    borderColor: "border-purple-300 dark:border-purple-600",
    glowColor: "shadow-purple-200/50 dark:shadow-purple-700/50",
    percentage: "1-3%",
    minStats: 55,
    maxStats: 75,
    icon: Crown,
    description:
      "Legendary figures of immense power. Epic heroes command respect on any battlefield with their extraordinary abilities and commanding presence.",
    features: ["Very high stat floors", "Powerful special abilities", "Commanding presence", "Highly sought after"],
  },
  {
    name: "Legendary",
    color: "text-yellow-500",
    bgColor: "bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20",
    borderColor: "border-yellow-300 dark:border-yellow-600",
    glowColor: "shadow-yellow-200/50 dark:shadow-yellow-700/50",
    percentage: "0.1-1%",
    minStats: 70,
    maxStats: 100,
    icon: Sparkles,
    description:
      "The stuff of myths and legends. These heroes transcend mortal limitations, wielding godlike power and abilities that can change the course of history.",
    features: ["Maximum stat potential", "Godlike abilities", "Mythical status", "Ultimate collection goal"],
  },
]
