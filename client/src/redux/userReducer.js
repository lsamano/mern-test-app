const initialState = {
  currentUser: {}
}

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case 'LOGIN_USER':
      return { ...state, currentUser: payload}
    case 'LOGOUT_USER':
      return { ...state, currentUser: {} }
    default:
      return state;
  }
}
