const initialState = {
  projects: []
}

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case 'SET_PROJECTS':
      return { ...state, projects: payload }
    default:
      return state;
  }
}
