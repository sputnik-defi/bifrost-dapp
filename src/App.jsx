import "./App.css";
import React, { useState, useRef } from "react";
import Particles from "react-tsparticles";
import ExchangeForm from "./components/ExchangeForm";
import { setupAvaxClient } from "./utils/avalanche";
import { setupTzsClient } from "./utils/tezos";
import ConnectWallets from "./components/ConnectWallets";
import config from "./config.json";
import usdcABI from "./assets/abi/avax_usdc.json";
import particlesOptions from "./particles.json";
import { Typography } from "@mui/material";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

let NETWORK_CONFIG =
  config.network === "mainnet"
    ? config.networks.mainnet
    : config.networks.testnet;

let EXCHANGE_PAIRS = {
  0: {
    avalanche: {
      name: "AVAX",
      contract: "", // empty contract value means that token is native
    },
    tezos: {
      name: "WAVAX",
      contract: NETWORK_CONFIG.tezos.wavax,
    },
  },
  1: {
    avalanche: {
      name: "USDC",
      contract: NETWORK_CONFIG.avalanche.usdc,
      abi: usdcABI,
    },
    tezos: {
      name: "WUSDC",
      contract: NETWORK_CONFIG.tezos.wusdc,
    },
  },
};

const App = () => {
  const [clients, setClients] = useState({
    avalanche: null,
    tezos: null,
  });
  const [balances, setBalances] = useState({
    avax: 0.0,
    tzs: 0.0,
  });
  const [pairID, setPairID] = useState("0");

  const clientsRef = useRef();
  clientsRef.current = clients;

  const setupTzsWallet = async () => {
    try {
      const tezos = await setupTzsClient();
      setClients((prevState) => ({ ...prevState, tezos }));
    } catch (err) {
      console.log(err);
    }
  };

  const setupAvaxWallet = async () => {
    try {
      const avalanche = await setupAvaxClient();
      setClients((prevState) => ({ ...prevState, avalanche }));
    } catch (err) {
      console.log(err);
    }
  };

  const swapAvalanche = async (amount) => {
    let destination = String(clients.tezos.address);

    try {
      switch (pairID) {
        case "0":
          await clients.avalanche.lockAVAX(amount, destination);
          break;
        case "1":
          await clients.avalanche.lockUSDC(amount, destination);
          break;
      }
    } catch (err) {
      console.log(err);
    }
  };

  const swapTezos = async (amount) => {
    let destination = String(clients.avalanche.address);

    try {
      switch (pairID) {
        case "0":
          await clients.tezos.burnWAVAX(amount, destination);
          break;
        case "1":
          await clients.tezos.burnWUSDC(amount, destination);
          break;
      }
    } catch (err) {
      console.log(err);
    }
  };

  const estimateAvalanche = async (amount) => {
    let destination = String(clients.tezos.address);

    try {
      switch (pairID) {
        case "0":
          return await clients.avalanche.estimateLockAVAX(amount, destination);
        case "1":
          return await clients.avalanche.estimateLockUSDC(amount, destination);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const estimateTezos = async (amount) => {
    let destination = String(clients.avalanche.address);

    try {
      switch (pairID) {
        case "0":
          return await clients.tezos.estimateBurnWAVAX(amount, destination);
        case "1":
          return await clients.tezos.estimateBurnWUSDC(amount, destination);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <MemoParticles />
      <div className="App">
        <ExchangeForm
          pairID={pairID}
          setPairID={setPairID}
          exchangePairs={EXCHANGE_PAIRS}
          balances={balances}
          clients={clientsRef.current}
          swapAvalanche={swapAvalanche}
          swapTezos={swapTezos}
          estimateAvalanche={estimateAvalanche}
          estimateTezos={estimateTezos}
          connectWallets={
            <ConnectWallets
              pairID={pairID}
              exchangePairs={EXCHANGE_PAIRS}
              clients={clientsRef.current}
              setupAvax={setupAvaxWallet}
              setupTzs={setupTzsWallet}
              setBalances={setBalances}
            />
          }
        ></ExchangeForm>
        <Typography sx={{ opacity: 0.6, mt: 2 }}>
          &#169; {new Date().getFullYear()} Sputnik
        </Typography>
      </div>
    </div>
  );
};

const MemoParticles = React.memo(() => (
  <Particles id="tsparticles" options={particlesOptions} />
));

export default App;
