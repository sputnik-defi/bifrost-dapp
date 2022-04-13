import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { Container, Grid, Typography } from "@mui/material";
import AvaxLogo from "../assets/images/avax_logo.svg";
import TzsLogo from "../assets/images/tzs_logo.svg";
import { bigIntToFloat, shortAccountString } from "../utils/utils";

const ConnectWallets = ({
  pairID,
  exchangePairs,
  setupAvax,
  setupTzs,
  setBalances,
  clients,
}) => {
  const [avaxAccount, setAvaxAccount] = useState("");
  const [tzsAccount, setTzsAccount] = useState("");

  const setupAvaxAccount = async () => {
    try {
      setupAvax();
    } catch (err) {}
  };

  const setupTzsAccount = async () => {
    try {
      setupTzs();
    } catch (err) {}
  };

  const updateBalances = async () => {
    let ava = 0.0;
    let tzs = 0.0;

    if (clients.avalanche) {
      if (exchangePairs[pairID].avalanche.contract === "") {
        ava = await clients.avalanche.balance();
      } else {
        ava = await clients.avalanche.tokenBalance(
          exchangePairs[pairID].avalanche.abi,
          exchangePairs[pairID].avalanche.contract
        );
      }
    }

    if (clients.tezos) {
      tzs = await clients.tezos.tokenBalance(
        exchangePairs[pairID].tezos.contract
      );
    }

    setBalances({
      ava: bigIntToFloat(ava, 18, 6),
      tzs: bigIntToFloat(tzs, 18, 6),
    });
  };

  useEffect(() => {
    if (clients.avalanche) {
      setAvaxAccount(clients.avalanche.address);
    }
    if (clients.tezos) {
      setTzsAccount(clients.tezos.address);
    }
  }, [setupAvaxAccount, setupTzsAccount]);

  useEffect(() => {
    updateBalances();
  }, [pairID, avaxAccount, tzsAccount]);

  return (
    <Container disableGutters sx={{ my: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<img src={AvaxLogo} width={20} />}
            onClick={!avaxAccount ? setupAvaxAccount : null}
          >
            {(!avaxAccount || avaxAccount.length == 0) && "Connect"}
            {avaxAccount &&
              avaxAccount.length > 0 &&
              shortAccountString(5, 5, avaxAccount)}
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<img src={TzsLogo} width={15} />}
            onClick={!tzsAccount ? setupTzsAccount : null}
          >
            {(!tzsAccount || tzsAccount.length == 0) && "Connect"}
            {tzsAccount &&
              tzsAccount.length > 0 &&
              shortAccountString(5, 5, tzsAccount)}
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ConnectWallets;
