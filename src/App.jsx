import "./App.css";
import { useState, useRef } from "react";
import ExchangeForm from "./components/ExchangeForm";
import { setupAvaxClient } from "./utils/avalanche";
import { setupTzsClient } from "./utils/tezos";
import ConnectWallets from "./components/ConnectWallets";

const App = () => {
  const [clients, setClients] = useState({
    avalanche: null,
    tezos: null,
  });
  const [balances, setBalances] = useState({
    avax: 0.0,
    tzs: 0.0,
  });

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

  let exchangePairs = {
    0: {
      avalanche: {
        name: "AVAX",
      },
      tezos: {
        name: "WAVAX",
      },
    },
    1: {
      avalanche: {
        name: "USDC",
      },
      tezos: {
        name: "WUSDC",
      },
    },
  };

  return (
    <div className="App">
      <ExchangeForm
        exchangePairs={exchangePairs}
        balances={balances}
        connectWallets={
          <ConnectWallets
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
