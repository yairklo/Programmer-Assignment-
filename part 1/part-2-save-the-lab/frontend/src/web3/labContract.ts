import { BrowserProvider, Contract, Eip1193Provider } from "ethers";
import { decodeLabRegistryAbi } from "./encodedAbi";

export type Experiment = {
  id: bigint;
  title: string;
  owner: string;
  active: boolean;
};

export const LAB_REGISTRY_ADDRESS = "0x0000000000000000000000000000000000000000";

export const LAB_REGISTRY_ABI = decodeLabRegistryAbi();

type EthereumWindow = Window & {
  ethereum?: Eip1193Provider;
};

function getEthereum():Eip1193Provider {
  const ethereum = (window as EthereumWindow).ethereum;

  if (!ethereum) {
    throw new Error("No wallet provider found");
  }

  return ethereum;
}

export async function getReadLabContract(): Promise<Contract> {
  const provider = new BrowserProvider(ethereum);
  return new Contract(LAB_REGISTRY_ADDRESS, LAB_REGISTRY_ABI, provider.signer);
}

export async function getWriteLabContract(): Promise<Contract> {
  const provider = new BrowserProvider(ethereum);
  const signer = await provider.getSigner();
  return new Contract(LAB_REGISTRY_ADDRESS, LAB_REGISTRY_ABI, provider.signer);
}

export async function loadExperiments(contract: Contract): Promise<Experiment[]> {
  const tx = await contract.getAllExperiments();
  return tx as Experiment[];
}

export async function submitResultOnChain(
  contract: Contract,
  experimentId: bigint,
  metadataUri: string,
): Promise<void> {
  const tx = await contract.submitResult(experimentId, metadataUri);
  await tx.wait();
}
