export const initialState = {
  status: 'checking',
  uid: null,
  email: null,
  displayName: null,
  photoURL: null,
  errorMessage: null,
};

export const authenticatedState = {
    status: 'authenticated',
    uid: '12421421421',
    email: 'demo@gmail.com',
    displayName:'DEMO USER',
    photoURL:'https://demo.png',
    errorMessage: null,
}

export const notAuthenticatedState = {
  status: 'not-authenticated',
  uid: null,
  email: null,
  displayName: null,
  photoURL: null,
  errorMessage: null,
}


export const demoUser={
  uid: '12421421421',
  email: 'demo@gmail.com',
  displayName:'DEMO USER',
  photoURL:'https://demo.png',
}