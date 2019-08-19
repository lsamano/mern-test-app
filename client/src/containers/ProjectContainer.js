import React from 'react'
import ProjectCard from '../components/ProjectCard'
import {connect} from 'react-redux';

const ProjectContainer = ({ projects }) => {
  return (
    <>
      <h1>Browse Projects</h1>
      {projects.map(proj => <ProjectCard project={proj} key={proj._id} /> )}
    </>
  )
}

const mapStateToProps = state => ({
  projects: state.projectReducer.projects
})

export default connect(mapStateToProps)(ProjectContainer)
