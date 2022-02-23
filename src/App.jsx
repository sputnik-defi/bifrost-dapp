import "./App.css";
import { useState, useRef } from "react";
import ExchangeForm from "./components/ExchangeForm";
import { setupAvaxClient } from "./utils/avalanche";
import { setupTzsClient } from "./utils/tezos";
import ConnectWallets from "./components/ConnectWallets";
import config from "./config.json";
import usdcABI from "./assets/abi/avax_usdc.json";

let EXCHANGE_PAIRS = {
  0: {
    avalanche: {
      name: "AVAX",
      contract: "", // empty contract value means that token is native
    },
    tezos: {
      name: "WAVAX",
      contract: config.tezos.wavax,
    },
  },
  1: {
    avalanche: {
      name: "USDC",
      contract: config.avalanche.usdc,
      abi: usdcABI,
    },
    tezos: {
      name: "WUSDC",
      contract: config.tezos.wusdc,
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

  return (
    <div className="App">
      <ExchangeForm
        pairID={pairID}
        setPairID={setPairID}
        exchangePairs={EXCHANGE_PAIRS}
        balances={balances}
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
    </div>
  );
};

export default App;
