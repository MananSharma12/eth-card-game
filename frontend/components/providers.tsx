'use client'

import {ReactNode, useState} from "react";
import {QueryClient} from "@tanstack/query-core";
import {WagmiProvider} from "wagmi";
import {config} from "@/app/config";
import {QueryClientProvider} from "@tanstack/react-query";

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60,
      }
    }
  }))

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  )
}
