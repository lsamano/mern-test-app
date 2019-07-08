import React, { useContext } from 'react';
import { Store } from '../Store';
import ProjectItem from '../components/ProjectItem'

const ProjectContainer = props => {
  const { state } = useContext(Store);
  return (
    <>
      <h1>Browse Projects</h1>
      {state.allProjects.map(proj => <ProjectItem project={proj} key={proj._id} /> )}
    </>
  )
}

export default ProjectContainer
