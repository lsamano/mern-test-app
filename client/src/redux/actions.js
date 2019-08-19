export const setProjects = dataJSON => ({
  type: 'SET_PROJECTS',
  payload: dataJSON.projects
})

export const loginUser = currentUser => ({
    type: 'LOGIN_USER',
    payload: currentUser
  })
