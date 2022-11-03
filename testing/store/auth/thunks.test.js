import {
  loginEmailPassword,
  logoutFirebase,
  singInWithGoogle,
} from '../../../src/firebase/providers';
import {
  checkingCredentials,
  login,
  logout,
} from '../../../src/store/auth/authSlice';
import {
  chekingAuthentication,
  startGoogleSingIn,
  startLoginEmailPassword,
  startLogout,
} from '../../../src/store/auth/thunks';
import { clearNotesLogout } from '../../../src/store/journal';
import { demoUser } from '../../fixtures/authFixtures';

jest.mock('../../../src/firebase/providers');

describe('test on AuthThukns', () => {
  const dispatch = jest.fn();
  beforeEach(() => jest.clearAllMocks());

  test('should invoke "checking credentials"', async () => {
    await chekingAuthentication()(dispatch);
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
  });

  test('should invoke "checking credentials" and "start google sign in"', async () => {
    const loginData = { ok: true, ...demoUser };
    await singInWithGoogle.mockResolvedValue(loginData);
    await startGoogleSingIn()(dispatch);
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(login(loginData));
  });

  test('should invoke "checking credentials" and "start google sign in" with error', async () => {
    const loginData = { ok: false, errorMessage: 'error on pop up' };
    await singInWithGoogle.mockResolvedValue(loginData);
    await startGoogleSingIn()(dispatch);
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(logout(loginData.errorMessage));
  });

  test('should invoke "checking credentials" and "start login email password"', async () => {
    const loginData = { ok: true, ...demoUser };
    await loginEmailPassword.mockResolvedValue(loginData);
    await startLoginEmailPassword(demoUser.email, '2142141221')(dispatch);
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(
      login({
        ok: true,
        uid: demoUser.uid,
        displayName: demoUser.displayName,
        photoURL: demoUser.photoURL,
      })
    );
  });

  test('should start logoutFirebase, clearNotes and logout', async () => {
    await startLogout()(dispatch);
    expect(logoutFirebase).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(clearNotesLogout());
    expect(dispatch).toHaveBeenCalledWith(logout());
  });

  test('should start logoutFirebase, clearNotes and logout with error', async () => {
    await logoutFirebase.mockRejectedValue('error');
    await startLogout()(dispatch);
    expect(logoutFirebase).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(clearNotesLogout());
    expect(dispatch).toHaveBeenCalledWith(logout({ errorMessage: 'error' }));
  })

  

});
