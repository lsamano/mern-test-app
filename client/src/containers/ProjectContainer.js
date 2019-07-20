import React, { Fragment, useContext } from 'react';
import { Store } from '../Store';
import ProjectCard from '../components/ProjectCard'

const ProjectContainer = props => {
  const { state } = useContext(Store);
  return (
    <Fragment>
      <h1>Browse Projects</h1>
      {state.allProjects.map(proj => <ProjectCard project={proj} key={proj._id} /> )}
    </Fragment>
  )
}

export default ProjectContainer
