import { TezosToolkit } from "@taquito/taquito";
import { TempleWallet } from "@temple-wallet/dapp";
import config from "../config.json";
import { Tezos } from "../lib/tezos";

export const setupTzsClient = async () => {
  const tzs = new TezosToolkit("https://testnet-tezos.giganode.io");

  try {
    const available = await TempleWallet.isAvailable();
    if (!available) {
      throw new Error("Temple Wallet not installed");
    }
  } catch (err) {
    console.log(err);
  }

  const wallet = new TempleWallet("AVAX Bridge");

  await wallet.connect(
    config.network === "mainnet" ? "mainnet" : "hangzhounet"
  );

  tzs.setWalletProvider(wallet);

  let address = wallet.pkh || (await wallet.getPKH());

  return new Tezos(tzs, address);
};
