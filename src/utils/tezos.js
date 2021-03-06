import { TezosToolkit } from "@taquito/taquito";
import { TempleWallet } from "@temple-wallet/dapp";
import config from "../config.json";
import { Tezos } from "../lib/tezos";
import { ReadOnlySigner } from "./signer";

export const setupTzsClient = async () => {
  try {
    const available = await TempleWallet.isAvailable();
    if (!available) {
      throw new Error("Temple Wallet not installed");
    }
  } catch (err) {
    console.log(err);
  }

  const wallet = new TempleWallet("AVAX Bridge");

  if (!wallet.connected) {
    await wallet.connect(
      config.network === "mainnet" ? "mainnet" : "hangzhounet",
      { forcePermission: true }
    );
  }

  let address = wallet.pkh || (await wallet.getPKH());
  const { pkh, publicKey } = wallet.permission;

  let url =
    config.network === "mainnet"
      ? "https://rpc.tzbeta.net"
      : "https://rpc.hangzhou.tzstats.com";

  const tzs = new TezosToolkit(url);
  tzs.setWalletProvider(wallet);
  tzs.setSignerProvider(new ReadOnlySigner(pkh, publicKey));

  let network =
    config.network === "mainnet"
      ? config.networks.mainnet
      : config.networks.testnet;

  return new Tezos(tzs, address, network.tezos.wavax, network.tezos.wusdc);
};
