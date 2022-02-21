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

  let exchangePairs = [
    {
      avalanche: "AVAX",
      tezos: "WAVAX",
    },
    {
      avalanche: "USDC",
      tezos: "WUSDC",
    },
  ];

  return (
    <div className="App">
      <ExchangeForm
        exchangePairs={exchangePairs}
        connectWallets={
          <ConnectWallets
            clients={clientsRef.current}
            setupAvax={setupAvaxWallet}
            setupTzs={setupTzsWallet}
          />
        }
      ></ExchangeForm>
    </div>
  );
};

export default App;
