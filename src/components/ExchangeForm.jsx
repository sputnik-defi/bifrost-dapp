import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {
  Divider,
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
  clients,
}) => {
  const [fromAvalanche, setFromAvalanche] = useState(true);

  const handlePairID = (e, id) => {
    setPairID(id[id.length - 1]);
  };

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <Box
        sx={{
          width: "60%",
          margin: "auto",
          marginTop: 6,
          py: 3,
          px: 5,
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#ffffff",
          borderRadius: "2%",
          boxShadow: "0px 3px 7px 2px rgba(34, 60, 80, 0.2)",
        }}
      >
        <Typography
          sx={{ fontFamily: "Roboto", fontWeight: "100" }}
          component="h1"
          variant="h5"
        >
          SWAP TOKENS
        </Typography>
        <Divider sx={{ my: 2 }} light />
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
            <Typography
              align="right"
              sx={{ opacity: 0.7, fontFamily: "Roboto", fontWeight: "300" }}
            >
              Balance: {fromAvalanche ? balances.avax : balances.tzs}
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
            <Typography
              align="right"
              sx={{ opacity: 0.7, fontFamily: "Roboto", fontWeight: "300" }}
            >
              Balance: {!fromAvalanche ? balances.avax : balances.tzs}
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
          <Button
            disabled={!(clients.avalanche && clients.tezos)}
            fullWidth
            variant="contained"
            sx={{ mt: 1, mb: 2 }}
          >
            Swap
          </Button>
          <Box
            sx={{
              p: 2,
              backgroundColor: "rgba(204, 204, 204, 0.2)",
              borderRadius: "7px",
            }}
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography
                sx={{ fontFamily: "Roboto", fontWeight: "300" }}
                variant="subtitle1"
              >
                Swap fee
              </Typography>
              <Typography
                sx={{ fontFamily: "Roboto", fontWeight: "300" }}
                variant="subtitle1"
              >
                0.00
              </Typography>
            </Stack>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography
                sx={{ fontFamily: "Roboto", fontWeight: "300" }}
                variant="subtitle1"
              >
                Gas fee
              </Typography>
              <Typography
                sx={{ fontFamily: "Roboto", fontWeight: "300" }}
                variant="subtitle1"
              >
                0.00
              </Typography>
            </Stack>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default ExchangeForm;
