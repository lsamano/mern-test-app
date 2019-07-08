import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

class ProjectPage extends Component {
  state = {
    project: null
  }

  componentDidMount() {
    fetch(`http://localhost:3000/api/projects/${this.props.match.params.id}`)
    .then(res => res.json())
    .then(data => this.setState({
      project: data.project,
      owner: data.project.owner
    }))
  }

  render() {
    const { project, owner } = this.state

    if (!project) {
      return <CircularProgress />
    }

    return (
      <div>
        <Link to="/projects">See All Projects</Link>
        <h1>{project.name}</h1>
        <h3>by {owner.username}</h3>
        <h2>GOAL: {project.goal}</h2>
        <p>{project.description}</p>
      </div>
    );
  }

}

export default ProjectPage;
