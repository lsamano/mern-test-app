import React from 'react';

const ProjectItem = ({project}) => {
  console.log(project);
  return (
    <div>
      { project.name } by { project.owner.username }
    </div>
  );
}

export default ProjectItem;
