"use client"

import { useState, useCallback } from "react"
import { usePublicClient } from "wagmi"
import {CONTRACT_ABI, CONTRACT_ADDRESS_BLOCKCHAIN} from "@/lib/constants/contract";

export function useHeroContract() {
  const publicClient = usePublicClient()
  const [ownedHeroes, setOwnedHeroes] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadOwnedHeroes = useCallback(
    async (address: `0x${string}`) => {
      if (!publicClient) return
      setIsLoading(true)
      setError(null)

      try {
        const balance: bigint = await publicClient.readContract({
          address: CONTRACT_ADDRESS_BLOCKCHAIN,
          abi: CONTRACT_ABI,
          functionName: "balanceOf",
          args: [address],
        })

        const heroes: any[] = []

        for (let i = 0n; i < balance; i++) {
          const tokenId: bigint = await publicClient.readContract({
            address: CONTRACT_ADDRESS_BLOCKCHAIN,
            abi: CONTRACT_ABI,
            functionName: "tokenOfOwnerByIndex",
            args: [address, i],
          })

          const heroData: any = await publicClient.readContract({
            address: CONTRACT_ADDRESS_BLOCKCHAIN,
            abi: CONTRACT_ABI,
            functionName: "heroes",
            args: [tokenId],
          })

          console.log(heroData);

          heroes.push({ id: Number(tokenId), ...heroData })
        }

        setOwnedHeroes(heroes)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    },
    [publicClient]
  )

  return { ownedHeroes, loadOwnedHeroes, isLoading, error }
}
