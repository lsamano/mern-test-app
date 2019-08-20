import React, { useEffect } from 'react';
// import { Store } from './Store';
import { Switch, Route } from 'react-router-dom'
import Container from '@material-ui/core/Container';
import ProjectContainer from './containers/ProjectContainer';
import ProjectPage from './components/ProjectPage'
import PrimarySearchAppBar from './components/PrimarySearchAppBar'
import { connect } from 'react-redux';
import { setProjects, loginUser } from './redux/actions';
import Button from '@material-ui/core/Button';

const App = ({ setProjects, loginUser, currentUser }) => {

  // Equivalent of componentDidMount
  useEffect(() => {
    const onSignIn = (googleUser) => {
      var profile = googleUser.getBasicProfile();
      console.log('Name: ' + profile.getName());
      console.log('Image URL: ' + profile.getImageUrl());
      console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

      // backend fetch for User Login
      fetch("http://localhost:3000/api/login/", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          token: googleUser.getAuthResponse().id_token
        })
      })
      .then(res => res.json())
      .then(data => {
        console.log("This can be set as currentUser:", data);
        loginUser(data)
        //
      })
    }

    function initGoogle(func) {
      window.gapi.signin2.render(
        'google-button',
        {
          width: 500,
          height: 50,
          onsuccess: onSignIn
        }
      )

      // window.gapi.load('auth2', function() {
      //   window.gapi.auth2
      //   .init({
      //     client_id: process.env.CLIENT_ID,
      //   })
      //   .then(func);
      // })
    }

    const checkIfGoogleIsLoaded = () => {
      if (window.gapi) {
        console.log("Hiyo");
        clearInterval(googleLoadTimer);
        return initGoogle()
      }
    }

    const googleLoadTimer = setInterval(checkIfGoogleIsLoaded, 100);

    const fetchProjects = async () => {
      const data = await fetch('http://localhost:3000/api/projects');
      const dataJSON = await data.json();
      return setProjects(dataJSON)
    };
    fetchProjects();
  }, [loginUser, setProjects]);


  // useEffect(() => {
  //   window.gapi.signin2.render(
  //     'hi',
  //     {
  //       width: 200,
  //       height: 50,
  //       onsuccess: onSignIn
  //     },
  //   );
  // }, [])

  const signOut = () => {
    var auth2 = window.gapi.auth2.getAuthInstance();
    auth2.signOut()
    .then(() => {
      console.log('User signed out.');
    });
  }

  return (
    <Container>
      <PrimarySearchAppBar />

      <div className="g-signin2" data-onsuccess="onSignIn" id='google-button'></div>
      <Button onClick={signOut}>Sign Out Now</Button>

      <Switch>
        <Route path="/projects/:id" component={ProjectPage} />
        <Route path="/" component={ProjectContainer} />
      </Switch>
    </Container>
  );
}

const mapStateToProps = state => ({
  currentUser: state.userReducer.currentUser
})

const mapDispatchToProps = {
  setProjects,
  loginUser
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
