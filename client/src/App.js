import React, { useEffect, useContext } from 'react';
import { Store } from './Store';
import { Switch, Route } from 'react-router-dom'
import Container from '@material-ui/core/Container';
import ProjectContainer from './containers/ProjectContainer';
import ProjectPage from './components/ProjectPage'
import PrimarySearchAppBar from './components/PrimarySearchAppBar'

function App() {
  // Get state and dispatch from the Store
  const { state, dispatch } = useContext(Store);

  const setProjects = dataJSON => ({
    type: 'SET_PROJECTS',
    payload: dataJSON.projects
  })

  const fetchProjects = async () => {
    const data = await fetch('http://localhost:3000/api/projects');
    const dataJSON = await data.json();
    return dispatch(setProjects(dataJSON));
};

// Equivalent of componentDidMount & componentDidUpdate
useEffect(() => {
  state.allProjects.length === 0 && fetchProjects();
});

  return (
    <Container>
      <PrimarySearchAppBar />
      <Switch>
        <Route path="/projects/:id" component={ProjectPage} />
        <Route path="/" component={ProjectContainer} />
      </Switch>
    </Container>
  );
}

export default App;
