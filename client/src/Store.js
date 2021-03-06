import React, { createContext, useReducer } from 'react'

export const Store = createContext();

const initialState = {
  currentUser: {},
  allProjects: []
}

function reducer( state, action ) {
  switch (action.type) {
    case "LOGIN_USER":
      return { ...state, currentUser: action.payload }
    case "SET_PROJECTS":
      return { ...state, allProjects: action.payload }
    default:
      return state;
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return (
    <Store.Provider value={value}>
      {props.children}
    </Store.Provider>
  )
}
