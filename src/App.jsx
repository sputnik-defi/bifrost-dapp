import "./App.css";
import { useState, useRef } from "react";
import ExchangeForm from "./components/ExchangeForm";
import { setupAvaxClient } from "./utils/avalanche";
import { setupTzsClient } from "./utils/tezos";

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

  return (
    <div className="App">
      <ExchangeForm
        clients={clientsRef.current}
        setupAvax={setupAvaxWallet}
        setupTzs={setupTzsWallet}
      ></ExchangeForm>
    </div>
  );
};

export default App;
