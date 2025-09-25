import { ethers } from "ethers";
import { CONTRACT_ABI, CONTRACT_ADDRESS_BLOCKCHAIN } from "@/lib/constants/contract";

export function getContract(signerOrProvider: ethers.Signer | ethers.Provider) {
  return new ethers.Contract(CONTRACT_ADDRESS_BLOCKCHAIN, CONTRACT_ABI, signerOrProvider);
}
