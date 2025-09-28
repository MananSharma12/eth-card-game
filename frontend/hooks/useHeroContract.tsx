"use client"

import { useState, useCallback } from "react"
import { usePublicClient } from "wagmi"
import { CONTRACT_ABI, CONTRACT_ADDRESS_BLOCKCHAIN } from "@/lib/constants/contract";

interface ContractHeroData {
  classType?: unknown;
  rarity?: unknown;
  stats?: unknown;
  strength?: unknown;
  health?: unknown;
  dexterity?: unknown;
  intellect?: unknown;
  magic?: unknown;
  [key: number]: unknown;
}

interface HeroStats {
  strength: number;
  health: number;
  dexterity: number;
  intellect: number;
  magic: number;
}

interface OwnedHero {
  id: number;
  classIndex: number;
  rarityIndex: number;
  stats: HeroStats;
  seed: bigint;
}

export function useHeroContract() {
  const publicClient = usePublicClient()
  const [ownedHeroes, setOwnedHeroes] = useState<OwnedHero[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadOwnedHeroes = useCallback(
    async (address: `0x${string}`) => {
      if (!publicClient) return
      setIsLoading(true)
      setError(null)

      try {
        const balance = await publicClient.readContract({
          address: CONTRACT_ADDRESS_BLOCKCHAIN,
          abi: CONTRACT_ABI,
          functionName: "balanceOf",
          args: [address],
        }) as bigint

        const heroes: OwnedHero[] = []

        for (let i = 0n; i < balance; i++) {
          const tokenId = await publicClient.readContract({
            address: CONTRACT_ADDRESS_BLOCKCHAIN,
            abi: CONTRACT_ABI,
            functionName: "tokenOfOwnerByIndex",
            args: [address, i],
          }) as bigint

          const heroData = await publicClient.readContract({
            address: CONTRACT_ADDRESS_BLOCKCHAIN,
            abi: CONTRACT_ABI,
            functionName: "heroes",
            args: [tokenId],
          }) as ContractHeroData

          let seedData: bigint | null = null
          try {
            const rawSeed = await publicClient.readContract({
              address: CONTRACT_ADDRESS_BLOCKCHAIN,
              abi: CONTRACT_ABI,
              functionName: "seeds",
              args: [tokenId],
            })
            seedData = BigInt((rawSeed as { toString(): string }).toString())
          } catch (err) {
            console.warn(`Could not fetch seed for token ${tokenId}:`, err)
            seedData = BigInt(Date.now()) // fallback seed
          }

          const classIndex = Number(heroData.classType ?? heroData[0] ?? 0)
          const rarityIndex = Number(heroData.rarity ?? heroData[1] ?? 0)

          let stats: HeroStats
          if (heroData.stats && typeof heroData.stats === 'object') {
            const statsObj = heroData.stats as HeroStats
            stats = {
              strength: Number(statsObj.strength ?? 0),
              health: Number(statsObj.health ?? 0),
              dexterity: Number(statsObj.dexterity ?? 0),
              intellect: Number(statsObj.intellect ?? 0),
              magic: Number(statsObj.magic ?? 0),
            }
          } else if (Array.isArray(heroData[2])) {
            const arr = heroData[2] as unknown[]
            stats = {
              strength: Number(arr[0] ?? 0),
              health: Number(arr[1] ?? 0),
              dexterity: Number(arr[2] ?? 0),
              intellect: Number(arr[3] ?? 0),
              magic: Number(arr[4] ?? 0),
            }
          } else {
            stats = {
              strength: Number(heroData.strength ?? 0),
              health: Number(heroData.health ?? 0),
              dexterity: Number(heroData.dexterity ?? 0),
              intellect: Number(heroData.intellect ?? 0),
              magic: Number(heroData.magic ?? 0),
            }
          }

          heroes.push({
            id: Number(tokenId),
            classIndex,
            rarityIndex,
            stats,
            seed: seedData,
          })
        }

        setOwnedHeroes(heroes)
      } catch (err: unknown) {
        const error = err as { message?: string }
        setError(error?.message || "An error occurred while loading heroes")
      } finally {
        setIsLoading(false)
      }
    },
    [publicClient]
  )

  return { ownedHeroes, loadOwnedHeroes, isLoading, error }
}