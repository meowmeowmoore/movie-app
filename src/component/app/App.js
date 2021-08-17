import React from 'react';
// import { Button } from 'antd';
import ListMovies from '../ListMovies';
import 'antd/dist/antd.css';
import './App.css';

const App = () => (
  <div className="App">
    <div className="wrapper-view">
      <ListMovies />
    </div>
  </div>
);

export default App;
