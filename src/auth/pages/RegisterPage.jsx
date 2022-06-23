import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, TextField, Button, Link, Alert } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks/useForm";
import { startCreatingUserEmailPassword } from "../../store/auth/thunks";

const formData = {
  email: "",
  password: "",
  displayName: "",
};

// Todo - add regex for email and password

const formValidations = {
  email: [value => value.includes("@"), "El correo debe tener un @"],
  displayName: [value => value.length > 1, "El nombre es obligatorio"],
  password: [
    value => value.length >= 6,
    "La contraseña debe tener mas de 6 caracteres",
  ],
};

export const RegisterPage = () => {
  const { status, errorMessage } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const isCheckingAuth = useMemo(
    () => status === "checking-credentials"[status]
  );
  const {
    displayName,
    email,
    password,
    onInputChange,
    formState,
    isFormValid,
    displayNameValid,
    emailValid,
    passwordValid,
  } = useForm(formData, formValidations);

  const onSubmit = e => {
    e.preventDefault();
    setFormSubmitted(true);
    if (isCheckingAuth) return;
    if (!isFormValid) return;
    dispatch(startCreatingUserEmailPassword(formState));
  };

  return (
    <AuthLayout title="Crear Cuenta">
      <form onSubmit={onSubmit}>
        <Grid container>
          <Grid item xs={12} sx={{ mb: 2 }}>
            <TextField
              label="Nombre de usuario"
              type="text"
              placeholder="Fran skykru"
              fullWidth
              name="displayName"
              onChange={onInputChange}
              value={displayName}
              error={!!displayNameValid && formSubmitted}
              helperText={displayNameValid}
            />
          </Grid>
          <Grid item xs={12} sx={{ mb: 2 }}>
            <TextField
              label="Correo"
              type="email"
              placeholder="fran@gmail.com"
              fullWidth
              name="email"
              onChange={onInputChange}
              value={email}
              error={!!displayNameValid && formSubmitted}
              helperText={emailValid}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Contraseña"
              type="password"
              placeholder="password123"
              fullWidth
              name="password"
              onChange={onInputChange}
              value={password}
              error={!!displayNameValid && formSubmitted}
              helperText={passwordValid}
            />
          </Grid>
          <Grid container spacing={2} sx={{ mt: 1, mb: 2 }}>
            <Grid item xs={12} display={!!errorMessage ? "" : "none"}>
              <Alert severity="error">{errorMessage}</Alert>
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={isCheckingAuth}
              >
                Crear Cuenta
              </Button>
            </Grid>
          </Grid>
          <Grid container direction="row" justifyContent="end">
            <Link component={RouterLink} color="inherit" to="/auth/login">
              Ya tienes una cuenta?
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
