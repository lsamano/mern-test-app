import React from 'react';
import { Store } from './Store';
import ProjectItem from './components/ProjectItem'
import { Switch, Route } from 'react-router-dom'

function App() {
  // Get state and dispatch from the Store
  const { state, dispatch } = React.useContext(Store);

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
React.useEffect(() => {
  state.allProjects.length === 0 && fetchProjects();
});

  return (
    <>
    All Projects:
      <Switch>
        <Route path="/home" render={renderProps => {
          return state.allProjects.map(proj => <ProjectItem project={proj} key={proj._id} /> )
        }} />
      </Switch>
    </>
  );
}

export default App;
