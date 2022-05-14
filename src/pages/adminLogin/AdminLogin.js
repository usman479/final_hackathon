import * as React from "react";
import {useState} from "react";
import {useAuth} from "../../contexts/authContext";
import {auth} from "../../firebase";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import { Link as RouteLink , useNavigate} from "react-router-dom";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {linkUnderlineColor, themeFont} from "../../styles/stylesObj"
import AlertTitle from "@mui/material/AlertTitle";
import Alert from "@mui/material/Alert";
import AdminNavbar from "../../components/adminNavbar/AdminNavbar";
// import Copyright from "../../components/Copyright"



const theme = createTheme();


 const  AdminLogin =() => {

  const { signIn } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    setError((prev) => "");
    event.preventDefault();
    const form = new FormData(event.currentTarget);

    const data = {
      email: form.get("email"),
      password: form.get("password"),
    };
    

    try {
      setLoading(true);
      await signIn(auth, data.email, data.password);
      navigate("/admin-home");
    } catch {
      setError("Failed to Sign In");
    }
    setLoading(false);
  };

  

  return (<>
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              ADMIN
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              {error && (
                <Grid item xs={12}>
                  <Alert severity="error">
                    <AlertTitle>{error}</AlertTitle>
                    {/* This is an error alert — <strong>check it out!</strong> */}
                  </Alert>
                </Grid>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={loading}
              >
                Sign In
              </Button>
              <Grid container>
                
              </Grid>
              {/* <Copyright sx={{ mt: 5 }} /> */}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
    </>
  );
}

export default AdminLogin;