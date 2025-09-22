"use client";

import {useAccount, useConnect, useDisconnect} from "wagmi";

export default function WalletButton() {
  const { connect, connectors } = useConnect()
  const { address, isConnected } = useAccount()
  const { disconnect } = useDisconnect()

  if (isConnected) {
    return (
      <>
        <div>Connected: {address}</div>
        <button onClick={() => disconnect()}>Disconnect</button>
      </>
    )
  }

  return (
    connectors.map(
      connector =>
        <button
          key={connector.uid}
          onClick={() => connect({ connector })}
        >
          Connect via {connector.name}
        </button>
    )
  );
}
