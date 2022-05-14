import * as React from "react";
import { useState } from "react";
import { auth } from "../../firebase";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import {Link} from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AlertTitle from "@mui/material/AlertTitle";
import Alert from "@mui/material/Alert";
import { useAuth } from "../../contexts/authContext";
import { linkUnderlineColor, themeFont } from "../../styles/stylesObj";
import { Link as RouteLink, useNavigate } from "react-router-dom";
import UpgradeOutlinedIcon from "@mui/icons-material/UpgradeOutlined";
import { purple, grey } from "@mui/material/colors";

const theme = createTheme();
const secondary = purple["600"];
const dullColor = grey["500"];

const PasswordReset = () => {
  const { updateUserEmail, updateUserPassword, currentUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit =  (event) => {
      event.preventDefault();
      const form = new FormData(event.currentTarget);

    const data = {
      password: form.get("password"),
      confirmPassword: form.get("confirm-password"),
    };
    setLoading(true);
    setError((prev) => "");
    if (data.password !== data.confirmPassword) {
        setError(prev => "Passwords do not match");
      return setLoading(false);
    }

    const promises = [];
    
    if (data.password) {
        if(!(data.password.length > 5)){
            setError(prev => "Password length should be atleast 6");
            return setLoading(false);
        }
        promises.push(updateUserPassword(currentUser, data.password));
    }
    

    Promise.all(promises)
      .then(() => {
        navigate("/");
      })
      .catch(() => {
        setError(prev => "Failed to update account");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
      <>
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <UpgradeOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h4">
            Update Password
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
                <Typography component="p" sx={{ mx: "5px" }} color={secondary}>
                  Leave blank to keep the same
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirm-password"
                  label="Confirm Password"
                  type="password"
                  id="confirm-password"
                  autoComplete="new-password"
                />
              </Grid>
              {error && (
                <Grid item xs={12}>
                  <Alert severity="error">
                    <AlertTitle>{error}</AlertTitle>
                  </Alert>
                </Grid>
              )}
            </Grid>
            <Grid
              container
              direction="column"
              alignItems="center"
              justifyContent="center"
            >
              <Button
                disabled={loading}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Update
              </Button>
              <Link to="/" style={{textDecoration: "none"}}>
              <Button size="medium" variant="contained" sx={{ mt: 1, mb: 3 }}>
                Cancel
              </Button>
              </Link>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
    </>
  );
};

export default PasswordReset;
