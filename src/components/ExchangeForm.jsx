import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Grid, Icon, SvgIcon } from "@mui/material";
import AvaxLogo from "../assets/images/avax_logo.svg";
import TzsLogo from "../assets/images/tzs_logo.svg";

const ExchangeForm = () => {
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
                type="submit"
                fullWidth
                variant="outlined"
                startIcon={
                  <Icon>
                    <img src={AvaxLogo} width={20} />
                  </Icon>
                }
              >
                Connect
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                type="submit"
                fullWidth
                variant="outlined"
                startIcon={
                  <Icon>
                    <img src={TzsLogo} width={15} />
                  </Icon>
                }
              >
                Connect
              </Button>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Swap
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ExchangeForm;
