/* eslint-disable */

import React, { Component } from 'react';
import MovieService from '../../services/movieService';
import ErrorIndicator from '../errorIndicator';
import MovieView from './MovieView';

import './MoviesOutput.css';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

export default class MoviesOutput extends Component {
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
      console.log('g');
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

    console.log(this.props.value);
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
    const itemsPerPage = 6;

    const totalPage = Math.ceil(totalMoviesCount / itemsPerPage);

    const hasData = !(loading || error) && movies.length !== 0;
    const content = hasData ? (
      <MovieView movies={movies} currentPage={currentPage} onChange={this.onChange} totalPage={totalPage} />
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
