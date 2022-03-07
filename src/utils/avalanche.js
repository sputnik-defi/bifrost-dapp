import Web3 from "web3";
import { Avalanche } from "../lib/avalanche";
import config from "../config.json";
import LockManager from "../assets/abi/LockManager.json";

const AVALANCHE_MAINNET_PARAMS = {
  chainId: "0xA86A",
  chainName: "Avalanche Mainnet C-Chain",
  nativeCurrency: {
    name: "Avalanche",
    symbol: "AVAX",
    decimals: 18,
  },
  rpcUrls: ["https://api.avax.network/ext/bc/C/rpc"],
  blockExplorerUrls: ["https://snowtrace.io/"],
};

const AVALANCHE_TESTNET_PARAMS = {
  chainId: "0xA869",
  chainName: "Avalanche FUJI C-Chain",
  nativeCurrency: {
    name: "Avalanche",
    symbol: "AVAX",
    decimals: 18,
  },
  rpcUrls: ["https://api.avax-test.network/ext/bc/C/rpc"],
  blockExplorerUrls: ["https://testnet.snowtrace.io/"],
};

export const setupAvaxClient = async () => {
  const { web3, account: ethAccount } = await connectEthWallet();

  return new Avalanche(
    web3,
    ethAccount,
    LockManager,
    config.avalanche.lock_manager
  );
};

export const connectEthWallet = async () => {
  if (!window.ethereum) {
    alert(
      "Please install an Ethereum-compatible browser or extension like MetaMask to use this dApp!"
    );

    return undefined;
  }

  let params = [];
  switch (config.network) {
    case "mainnet":
      params = [AVALANCHE_MAINNET_PARAMS];
      break;
    case "testnet":
      params = [AVALANCHE_TESTNET_PARAMS];
  }

  window.ethereum
    .request({
      method: "wallet_addEthereumChain",
      params: params,
    })
    .catch((error) => {
      console.log(error);
    });

  const web3 = new Web3(window.ethereum);

  await window.ethereum.enable();
  const account = await web3.eth.getAccounts();

  return { web3, account: account[0] };
};
