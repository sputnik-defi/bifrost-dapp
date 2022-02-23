import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {
  IconButton,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import ArrowsIcon from "../assets/images/arrows.svg";
import AvaxLogo from "../assets/images/avax_logo.svg";
import TzsLogo from "../assets/images/tzs_logo.svg";

const ExchangeForm = ({
  pairID,
  setPairID,
  exchangePairs,
  balances,
  connectWallets,
}) => {
  const [fromAvalanche, setFromAvalanche] = useState(true);

  const handlePairID = (e, id) => {
    setPairID(id[id.length - 1]);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography component="h1" variant="h5">
          Swap Tokens
        </Typography>
        <Box component="form" noValidate sx={{ mt: 2 }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <ToggleButtonGroup
              size="small"
              color="primary"
              value={pairID}
              onChange={handlePairID}
            >
              {Object.keys(exchangePairs).map((key) => {
                return (
                  <ToggleButton value={key}>
                    {fromAvalanche
                      ? exchangePairs[key].avalanche.name
                      : exchangePairs[key].tezos.name}
                  </ToggleButton>
                );
              })}
            </ToggleButtonGroup>
            <Typography align="right" sx={{ opacity: 0.5 }}>
              balance: {fromAvalanche ? balances.avax : balances.tzs}
            </Typography>
          </Stack>
          <TextField
            margin="normal"
            fullWidth
            type="number"
            placeholder="0.00"
            autoFocus
            InputProps={{
              inputProps: {
                step: "0.01",
                min: 0,
                style: { textAlign: "right" },
              },
              startAdornment: fromAvalanche ? (
                <img src={AvaxLogo} width={25} />
              ) : (
                <img src={TzsLogo} width={20} />
              ),
            }}
          />
          <IconButton
            color="primary"
            onClick={() => {
              setFromAvalanche(!fromAvalanche);
            }}
          >
            <img src={ArrowsIcon} width={35} />
          </IconButton>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <ToggleButtonGroup
              size="small"
              color="primary"
              value={pairID}
              onChange={handlePairID}
            >
              {Object.keys(exchangePairs).map((key) => {
                return (
                  <ToggleButton value={key}>
                    {!fromAvalanche
                      ? exchangePairs[key].avalanche.name
                      : exchangePairs[key].tezos.name}
                  </ToggleButton>
                );
              })}
            </ToggleButtonGroup>
            <Typography align="right" sx={{ opacity: 0.5 }}>
              balance: {!fromAvalanche ? balances.avax : balances.tzs}
            </Typography>
          </Stack>
          <TextField
            margin="normal"
            fullWidth
            type="number"
            placeholder="0.00"
            disabled={true}
            InputProps={{
              inputProps: {
                style: { textAlign: "right" },
              },
              startAdornment: !fromAvalanche ? (
                <img src={AvaxLogo} width={25} />
              ) : (
                <img src={TzsLogo} width={20} />
              ),
            }}
          />
          {connectWallets}
          <Button fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Swap
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ExchangeForm;
