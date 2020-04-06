import React, { useEffect } from 'react';
// import { Store } from './Store';
import { Switch, Route } from 'react-router-dom'
import Container from '@material-ui/core/Container';
import ProjectContainer from './containers/ProjectContainer';
import ProjectPage from './components/ProjectPage'
import PrimarySearchAppBar from './components/PrimarySearchAppBar'
import { connect } from 'react-redux';
import { setProjects, loginUser, logoutUser } from './redux/actions';
import Button from '@material-ui/core/Button';

const App = ({ setProjects, loginUser, currentUser, logoutUser }) => {

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
      })
    }

    function initGoogle() {
      window.gapi.load('auth2', () => {
        window.gapi.auth2.init({
          client_id: '585577409484-umhupk86o43pvo4ljup0949v08ja8ev8.apps.googleusercontent.com'
        })
        .then(() => {
          window.gapi.signin2.render(
            'google-button', {
              // 'scope': 'profile email',
              'width': 250,
              'height': 50,
              'longtitle': false,
              'onsuccess': onSignIn,
              // 'onfailure': this.onFailure
            })
          })
        })
      }

      initGoogle()
    }, [loginUser]);

    useEffect(() => {
      const fetchProjects = async () => {
        const data = await fetch('http://localhost:3000/api/projects');
        const dataJSON = await data.json();
        return setProjects(dataJSON)
      };
      fetchProjects();
    }, [setProjects])

    const signOut = () => {
      var auth2 = window.gapi.auth2.getAuthInstance();
      auth2.signOut()
      .then(() => {
        console.log('User signed out.');
        logoutUser()
      });
    }

    return (
      <>
      <PrimarySearchAppBar />
      <Container>
        <Button onClick={signOut}>Sign Out Now</Button>
        <div id='google-button'></div>

        <Switch>
          <Route path="/projects/:id" component={ProjectPage} />
          <Route path="/" component={ProjectContainer} />
        </Switch>
      </Container>
      </>
  );
}

const mapStateToProps = state => ({
  currentUser: state.userReducer.currentUser
})

const mapDispatchToProps = {
  setProjects,
  loginUser,
  logoutUser
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
