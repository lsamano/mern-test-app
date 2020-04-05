import React, { Fragment, useContext } from 'react';
import { Store } from '../Store';
import ProjectCard from '../components/ProjectCard'
import {connect} from 'react-redux';

const ProjectContainer = ({ projects }) => {
  return (
    <Fragment>
      <h1>Browse Projects</h1>
      <div className='flex-box'>
        {projects.map(proj => <ProjectCard project={proj} key={proj._id} /> )}
      </div>
    </Fragment>
  )
}

const mapStateToProps = state => ({
  projects: state.projectReducer.projects
})

export default connect(mapStateToProps)(ProjectContainer)
