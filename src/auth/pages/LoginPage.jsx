import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { Google } from "@mui/icons-material";
import { AuthLayout } from "../layout/AuthLayout";
import { useMemo } from "react";
import { useForm } from "../../hooks/useForm";
import { startGoogleSingIn, startLoginEmailPassword } from "../../store/auth";
import {
  Grid,
  Typography,
  TextField,
  Button,
  Link,
  Alert,
} from "@mui/material";

export const LoginPage = () => {
  const { status, errorMessage } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const { email, password, onInputChange } = useForm({
    email: "",
    password: "",
  });
  const isCheckingAuth = useMemo(
    () => status === "checking-credentials"[status]
  );
  const onSubmit = e => {
    e.preventDefault();

    if (isCheckingAuth) return;
    dispatch(startLoginEmailPassword(email, password));
  };
  const onGoogleSingIn = () => dispatch(startGoogleSingIn());

  const isAutenticated = useMemo(
    () => status === "checking-credentials",
    [status]
  );
  return (
    <AuthLayout title="Login">
      <form onSubmit={onSubmit}>
        <Grid sx={{ mt: 2 }} container>
          <Grid item xs={12} sx={{ mb: 2 }}>
            <TextField
              label="Correo"
              type="email"
              placeholder="correo@gmail.com"
              fullWidth
              name="email"
              onChange={onInputChange}
              value={email}
            />
          </Grid>
          <Grid sx={{ mb: 2 }} item xs={12}>
            <TextField
              label="Contraseña"
              type="password"
              placeholder="password123"
              fullWidth
              name="password"
              onChange={onInputChange}
              value={password}
            />
          </Grid>
          <Grid item xs={12} display={!!errorMessage ? "" : "none"}>
            <Alert severity="error">{errorMessage}</Alert>
          </Grid>
          <Grid container spacing={2} sx={{ mt: 1, mb: 2 }}>
            <Grid item xs={12} sm={6}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={isAutenticated || isCheckingAuth}
              >
                Login
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                onClick={onGoogleSingIn}
                variant="contained"
                fullWidth
                disabled={isAutenticated || isCheckingAuth}
              >
                <Google />
                <Typography sx={{ ml: 1 }}>Google</Typography>
              </Button>
            </Grid>
          </Grid>
          <Grid container direction="row" justifyContent="end">
            <Link component={RouterLink} color="inherit" to="/auth/register">
              Crear una cuenta
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
