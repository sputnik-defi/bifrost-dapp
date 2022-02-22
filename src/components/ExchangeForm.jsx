import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { IconButton, ToggleButton, ToggleButtonGroup } from "@mui/material";
import ArrowsIcon from "../assets/images/arrows.svg";

const ExchangeForm = ({ exchangePairs, connectWallets }) => {
  const [pairID, setPairID] = useState("0");
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
          <Box display="flex" justifyContent="flex-start">
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
                      ? exchangePairs[key].avalanche
                      : exchangePairs[key].tezos}
                  </ToggleButton>
                );
              })}
            </ToggleButtonGroup>
          </Box>
          <TextField
            margin="normal"
            fullWidth
            type="number"
            placeholder={
              fromAvalanche
                ? exchangePairs[pairID].avalanche
                : exchangePairs[pairID].tezos
            }
            autoFocus
            InputProps={{ inputProps: { min: 0 } }}
          />
          <IconButton
            color="primary"
            onClick={() => {
              setFromAvalanche(!fromAvalanche);
            }}
          >
            <img src={ArrowsIcon} width={35} />
          </IconButton>
          <Box display="flex" justifyContent="flex-start">
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
                      ? exchangePairs[key].avalanche
                      : exchangePairs[key].tezos}
                  </ToggleButton>
                );
              })}
            </ToggleButtonGroup>
          </Box>
          <TextField
            margin="normal"
            fullWidth
            type="number"
            placeholder={
              !fromAvalanche
                ? exchangePairs[pairID].avalanche
                : exchangePairs[pairID].tezos
            }
            disabled={true}
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
