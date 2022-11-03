import {
  authSlice,
  logout,
  login,
  checkingCredentials,
} from '../../../src/store/auth/authSlice';
import {
  authenticatedState,
  demoUser,
  initialState,
  notAuthenticatedState,
} from '../../fixtures/authFixtures';

describe('Test on authSlice', () => {
  test('should return initial state and call "auth', () => {
    const state = authSlice.reducer(initialState, {});
    expect(authSlice.name).toBe('auth');
    expect(state).toEqual(initialState);
  });
  test('should return initial state and call "auth" with "login" action', () => {
    const state = authSlice.reducer(initialState, login(demoUser));
    expect(state).toEqual(authenticatedState);
  });
  test('should return initial state and call "auth" with "logout" action', () => {
    const state = authSlice.reducer(authenticatedState, logout());
    expect(state).toEqual(notAuthenticatedState);
  });
  test('should return erromessage and call "auth" with "logout" action', () => {
    const errorMessage = 'Error message code 400';
    const state = authSlice.reducer(authenticatedState, logout({ errorMessage }));

    expect(state).toEqual({
      ...notAuthenticatedState,
      errorMessage,
    });
  });

  test('should return initial state and call "auth" with "checkingCredentials" action', () => {
    const state = authSlice.reducer(notAuthenticatedState, checkingCredentials());
    expect(state).toEqual({ ...state, status: 'checking' });
  });
});
