/* eslint-disable */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MovieService from '../../services/movieService';
import ErrorIndicator from '../errorIndicator';
import MoviesView from '../MoviesView/MoviesView';

import './MoviesOutput.css';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

export default class SearchedMovies extends Component {
  movieService = new MovieService();

  state = {
    movies: [],
    loading: false,
    error: false,
    currentPage: 1,
    totalMoviesCount: 0,
  };

  componentDidUpdate(prevProps, prevState) {
    const { value } = this.props;
    const { currentPage } = this.state;
    if (value !== null && value !== prevProps.value) {
      this.updateMovie(value, currentPage);
      this.setState({
        loading: true,
      });
    }

    if (value === '' && value !== prevProps.value) {
      this.setState({
        movies: [],
        loading: false,
        error: false,
      });
    }

    if (currentPage !== prevState.currentPage) {
      this.updateMovie(value, currentPage);
    }
  }

  onChange = (page) => {
    this.setState((state) => ({
      currentPage: page,
    }));
  };

  onloadMovie = (arrayOfMovie) => {
    this.setState({
      movies: arrayOfMovie,
      loading: false,
    });
  };

  onError = () => {
    this.setState({
      error: true,
      loading: false,
    });
  };

  updateMovie = (value, currentPage) => {
    this.movieService
      .getAllMoviesByName(value, currentPage)
      .then((obj) => {
        const { results, total_results } = obj;
        this.onloadMovie(results);
        this.setState({
          totalMoviesCount: total_results,
        });
      })
      .catch(this.onError);
  };

  render() {
    const { movies, error, loading, currentPage, totalMoviesCount } = this.state;
    const itemsPerPage = 20;

    const totalPage = Math.ceil(totalMoviesCount / itemsPerPage);

    const hasData = !(loading || error) && movies.length !== 0;
    const content = hasData ? (
      <MoviesView
        movies={movies}
        currentPage={currentPage}
        onChange={this.onChange}
        totalMoviesCount={totalMoviesCount}
        addToListRatedMovies={this.props.addToListRatedMovies}
      />
    ) : null;
    const errorMessage = error ? <ErrorIndicator /> : null;
    const spinner = loading ? (
      <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} size="large" />
    ) : null;

    return (
      <div className="list-movie">
        {content}
        {errorMessage}
        {spinner}
      </div>
    );
  }
}

SearchedMovies.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  addToListRatedMovies: PropTypes.func,
};

SearchedMovies.defaultProps = {
  value: '',
  addToListRatedMovies: () => {},
};
