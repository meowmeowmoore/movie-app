/* eslint-disable */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MovieService from '../../services/movieService';
import MoviesView from '../MoviesView/MoviesView';

import '../SearchedMovies/MoviesOutput.css';

export default class RatedMovies extends Component {
  movieService = new MovieService();

  state = {
    movies: [],
    currentPage: 1,
    totalMoviesCount: 0,
  };

  onChange = (page) => {
    console.log(page);
    this.setState({
      currentPage: page,
    });
  };

  componentDidMount() {
    console.log('componenDidMount()');
    this.movieService.getListOfRatedMovies().then((res) => this.ratedMovieToList(res.results, res.total_results));
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.ratedMovie !== this.props.ratedMovie) {
      console.log(prevProps.ratedMovie !== this.props.ratedMovie, 'componenDidUpdate()');
      this.movieService.getListOfRatedMovies().then((res) => {
        console.log(res, 'resss');
        this.ratedMovieToList(res.results, res.total_results);
      });
    }

    if (this.state.currentPage !== prevState.currentPage) {
      this.updateMovie(this.state.currentPage);
    }
  }

  updateMovie = (currentPage) => {
    this.movieService
      .getAllMoviesByName(currentPage)
      .then((obj) => {
        const { results, total_results } = obj;
        this.onloadMovie(results);
        this.setState({
          totalMoviesCount: total_results,
        });
      })
      .catch(this.onError);
  };

  onloadMovie = (arrayOfMovie) => {
    this.setState({
      movies: arrayOfMovie,
    });
  };

  ratedMovieToList = (results, totalResults) => {
    this.setState({
      movies: results,
      totalMoviesCount: totalResults,
    });
  };

  render() {
    const { movies, currentPage, totalMoviesCount } = this.state;
    console.log(currentPage);
    const itemsPerPage = 20;

    const totalPage = Math.ceil(totalMoviesCount / itemsPerPage);
    return (
      <div className="list-movie">
        <MoviesView
          movies={movies}
          currentPage={currentPage}
          onChange={this.onChange}
          totalMoviesCount={totalMoviesCount}
        />
      </div>
    );
  }
}

RatedMovies.propTypes = {
  ratedMovie: PropTypes.object,
};

RatedMovies.defaultProps = {
  ratedMovie: {},
};
