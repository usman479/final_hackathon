import * as React from "react";
import { useState } from "react";
import { auth } from "../../firebase";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AlertTitle from "@mui/material/AlertTitle";
import Alert from "@mui/material/Alert";
import { useAuth } from "../../contexts/authContext";
import {linkUnderlineColor, themeFont} from "../../styles/stylesObj"
import { Link as RouteLink , useNavigate} from "react-router-dom";



const theme = createTheme();

const   StudentSignup =  () => {
  const { signUp } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    setError((prev) => "");
    event.preventDefault();
    const form = new FormData(event.currentTarget);

    const data = {
      firstName: form.get("firstName"),
      lastName: form.get("lastName"),
      email: form.get("email"),
      password: form.get("password"),
      confirmPassword: form.get("confirm-password"),
    };
    if(!(data.password.length > 5)){
        console.log(data.password.length)
        return setError(prev => "Password length should be atleast 6")
    } else if (data.password !== data.confirmPassword) {
      return setError(prev => "Passwords do not match");
    }

    try {
      setLoading(true);
      await signUp(auth, data.email, data.password);
      navigate("/");
    } catch {
      setError("Failed to create an Account");
    }
    setLoading(false);
  };

  return (
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
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
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
                    {/* This is an error alert — <strong>check it out!</strong> */}
                  </Alert>
                </Grid>
              )}
            </Grid>
            <Button
              disabled={loading}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <ThemeProvider theme={themeFont}>
                    <RouteLink to="/signin" style={linkUnderlineColor}>
                      <Typography variant="poster">
                        {"Already have an account? Sign in"}
                      </Typography>
                    </RouteLink>
                  </ThemeProvider>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default StudentSignup;