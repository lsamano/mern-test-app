import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = (props) => (
  <>
  <h1>What is BeneFactory?</h1>
  <p>BeneFactory is a crowdfunding app for donating to video game developers making important games.</p>
  <h3>Examples...</h3>
  <ul>
  <li>The Dollhouse</li>
  <li>Into the After</li>
  </ul>
  <Link to="/projects">See All Projects</Link>
  </>
);

export default HomePage;
