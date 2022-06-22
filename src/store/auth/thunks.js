import {
  registerUserEmailPassword,
  singInWithGoogle,
} from "../../firebase/providers";
import { checkingCredentials, login, loguot } from "./authSlice";

export const chekingAuthentication = (email, password) => async dispatch => {
  dispatch(checkingCredentials());
};

export const startGoogleSingIn = () => async dispatch => {
  dispatch(checkingCredentials());
  const result = await singInWithGoogle();
  if (!result.ok) return dispatch(loguot(result.errorMessage));
  dispatch(login(result));
};

export const startCreatingUserEmailPassword =
  ({ email, password, displayName }) =>
  async dispatch => {
    dispatch(checkingCredentials());
    const { ok, uid, errorMessage, photoURL } = await registerUserEmailPassword(
      { email, password, displayName }
    );

    if (!ok) return dispatch(loguot({ errorMessage }));

    dispatch(login({ uid, email, displayName, photoURL }));
  };
