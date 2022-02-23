import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { BigNumber } from "bignumber.js";
import { Grid, Icon } from "@mui/material";
import AvaxLogo from "../assets/images/avax_logo.svg";
import TzsLogo from "../assets/images/tzs_logo.svg";

const ConnectWallets = ({
  pairID,
  exchangePairs,
  clients,
  setupAvax,
  setupTzs,
  setBalances,
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
    let avax = 0.0;
    let tzs = 0.0;

    if (clients.avalanche) {
      if (exchangePairs[pairID].avalanche.contract === "") {
        avax = await clients.avalanche.balance();
      } else {
        avax = await clients.avalanche.tokenBalance(
          exchangePairs[pairID].avalanche.abi,
          exchangePairs[pairID].avalanche.contract
        );
      }
    }

    setBalances({
      avax: bigIntToFloat(avax, 18, 6),
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
    <Grid container spacing={2} sx={{ mt: 1 }}>
      <Grid item xs={6}>
        <Button
          fullWidth
          variant="outlined"
          startIcon={
            <Icon>
              <img src={AvaxLogo} width={20} />
            </Icon>
          }
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
          startIcon={
            <Icon>
              <img src={TzsLogo} width={15} />
            </Icon>
          }
          onClick={!tzsAccount ? setupTzsAccount : null}
        >
          {(!tzsAccount || tzsAccount.length == 0) && "Connect"}
          {tzsAccount &&
            tzsAccount.length > 0 &&
            shortAccountString(5, 5, tzsAccount)}
        </Button>
      </Grid>
    </Grid>
  );
};

const shortAccountString = (first, last, str) => {
  return str.substring(0, first) + "..." + str.substring(str.length - last);
};

const bigIntToFloat = (number, decimals, precision) => {
  return new BigNumber(number)
    .div(new BigNumber(10).pow(decimals))
    .toFixed(precision);
};

export default ConnectWallets;
