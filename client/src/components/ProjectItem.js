import React from 'react';
import { Link } from 'react-router-dom';

const ProjectItem = ({project}) => {
  console.log(project);
  return (
    <p>
    <Link to={`/projects/${project._id}`}>{ project.name }</Link> by { project.owner.username }
    </p>
  );
}

export default ProjectItem;
