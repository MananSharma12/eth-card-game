"use client";

import {useAccount, useBalance, useConnect, useDisconnect} from "wagmi";
import { Wallet, LogOut } from "lucide-react"
import {Button} from "@/components/ui/button";
import {Badge} from "@/components/ui/badge";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {toast} from "sonner";

export default function WalletButton() {
  const { connect, connectors } = useConnect()
  const { address, isConnected } = useAccount()
  const { disconnect } = useDisconnect()
  const { data: balance } = useBalance({
    address: address,
  })

  if (isConnected) {
    return (
      <>
        <div className="flex items-center gap-2">
          <div className="flex flex-col items-end">
            <Badge variant="secondary">
              Balance: {balance && <span className="text-m">{(Number(balance.value) / 1e18)} ETH</span>}
            </Badge>
          </div>
          <Button
            onClick={() => {
              toast("Wallet disconnected!")
              disconnect()
            }}
            variant="outline"
            size="sm"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="outline">
          <Wallet />
          Connect Wallet
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {connectors.map(connector =>
          <DropdownMenuItem
            key={connector.uid}
            onClick={() => connect({ connector })}
          >
            Connect via {connector.name}
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
