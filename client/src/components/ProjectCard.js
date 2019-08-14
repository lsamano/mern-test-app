import React from 'react';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Link } from 'react-router-dom';
// import { red } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: '#'+Math.random().toString(16).substr(-6),
  },
}));

const ProjectCard = ({project}) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar aria-label="Recipe" style={{backgroundColor: '#'+Math.random().toString(16).substr(-6)}}>
            {project.owner.username.charAt(0)}
          </Avatar>
        }
        action={
          <IconButton aria-label="Settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={project.name}
        subheader={moment(project.createdAt).format("MMMM Do YY")}
      />
      <Link to={`/projects/${project._id}`}>
      <CardMedia
        className={classes.media}
        image="https://cdn.lynda.com/course/506926/506926-636238695730179167-16x9.jpg"
        title="Project Image"
      />
      </Link>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {project.description}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default ProjectCard
