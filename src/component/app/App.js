/* eslint-disable */
import React, { Component } from 'react';

import MovieService from '../../services/movieService';

import './App.css';
import './App-media.css';

import 'antd/dist/antd.css';
import TabsView from '../TabsView';

export default class App extends Component {
  state = {
    value: null,
    sessionId: null,
    ratedMovie: null,
  };

  movieService = new MovieService();

  componentDidMount() {
    this.movieService.getSessionId().then((id) => this.setSessionId(id));
    this.interval = setInterval(() => this.movieService.clearLocalStorage(), 3000 /*86.4e6*/);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  setSessionId(id) {
    this.setState({
      sessionId: id,
    });
  }

  valueOfInput = (newValue) => {
    this.setState({
      value: newValue,
    });
  };

  addToListRatedMovies = (movie) => {
    console.log(movie, 'movie, addToListRatedMovies()');
    this.setState({
      ratedMovie: movie,
    });
  };

  render() {
    const { value, ratedMovie, rate } = this.state;
    return (
      <div className="App">
        <div className="view-wrapper">
          <TabsView
            valueOfInput={this.valueOfInput}
            value={value}
            addToListRatedMovies={this.addToListRatedMovies}
            ratedMovie={ratedMovie}
            rate={rate}
          />
        </div>
      </div>
    );
  }
}
