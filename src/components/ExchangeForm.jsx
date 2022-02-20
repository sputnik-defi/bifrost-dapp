import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Grid, Icon } from "@mui/material";
import AvaxLogo from "../assets/images/avax_logo.svg";
import TzsLogo from "../assets/images/tzs_logo.svg";

const ExchangeForm = ({ clients, setupAvax, setupTzs }) => {
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

  useEffect(() => {
    if (clients.avalanche) {
      setAvaxAccount(clients.avalanche.address);
    }
    if (clients.tezos) {
      setTzsAccount(clients.tezos.address);
    }
  }, [setupAvaxAccount, setupTzsAccount]);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Swap Tokens
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            type="number"
            id="usdc-value"
            label="USDC"
            name="usdc-value"
            autoFocus
            InputProps={{ inputProps: { min: 0 } }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            type="number"
            id="usdc-value"
            label="USDC"
            name="usdc-value"
            disabled={true}
          />
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
          <Button fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Swap
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

const shortAccountString = (first, last, str) => {
  return str.substring(0, first) + "..." + str.substring(str.length - last);
};

export default ExchangeForm;
