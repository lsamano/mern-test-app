import React, { useState, useEffect } from 'react';
// import { Store } from './Store';
import { Switch, Route } from 'react-router-dom'
import Container from '@material-ui/core/Container';
import ProjectContainer from './containers/ProjectContainer';
import ProjectPage from './components/ProjectPage'
import PrimarySearchAppBar from './components/PrimarySearchAppBar'
import { connect } from 'react-redux';
import { setProjects, loginUser } from './redux/actions';

const App = ({ setProjects, loginUser, currentUser }) => {
  // Get state and dispatch from the Store
  // const { state, dispatch } = useContext(Store);
  // const [ user, setUser ] = useState({})
  // const [ googleReady, setGoogleReady ] = useEffect(false)

  // Equivalent of componentDidMount & componentDidUpdate
  useEffect(() => {
    const fetchProjects = async () => {
      const data = await fetch('http://localhost:3000/api/projects');
      const dataJSON = await data.json();
      return setProjects(dataJSON)
    };

    fetchProjects();
  }, [setProjects]);

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

  const onSignIn = (googleUser) => {
    var profile = googleUser.getBasicProfile();
    // debugger
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
      // return dispatch(loginUser(data))
      loginUser(data)
      //
    })
  }

  const signOut = () => {
    var auth2 = window.gapi.auth2.getAuthInstance();
    auth2.signOut()
    .then(() => {
      console.log('User signed out.');
    });
  }

  function initGoogle(func) {
    console.log("Hi!");
    window.gapi.signin2.render(
      'google-button',
      {
        width: 200,
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

  const googleLoadTimer = setInterval(() => {
    // authStore.setAuthLoadingStatus(LOADING_STATUS.INITIAL);
    // console.log("google-button");
    if (window.gapi && !currentUser.username) {
      clearInterval(googleLoadTimer);
      return initGoogle()

      // authStore.setAuthLoadingStatus(LOADING_STATUS.LOADING);
      // initGoogle(() => {
      //   set state to be ready
      // })
    }
  }, 1000);

  // if (googleReady) {
  //
  // }

  return (
    <Container>
      <PrimarySearchAppBar />

      <div className="g-signin2" data-onsuccess="onSignIn" id='google-button'></div>
      <button onClick={signOut}>Sign Out Now</button>

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
