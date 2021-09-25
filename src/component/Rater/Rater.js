/* eslint-disable */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Rate } from 'antd';
import MovieService from '../../services/movieService';

export default class Rater extends Component {
  state = {
    rating: 0,
  };

  movieService = new MovieService();

  handleChange = (rating) => {
    const { movie } = this.props;
    this.setState({ rating });
    this.movieService.RateMovie(movie.id, rating).then((res) => {
      if (res.success) {
        this.props.addToListRatedMovies(this.props.movie);
      }
    });
  };

  render() {
    const { rating } = this.state;
    return (
      <span className="movie-info-rating">
        <Rate count={10} onChange={this.handleChange} rating={rating} allowHalf />
      </span>
    );
  }
}

Rater.propTypes = {
  movie: PropTypes.object,
  addToListRatedMovies: PropTypes.func,
};

Rater.defaultProps = {
  movie: {},
  addToListRatedMovies: () => {},
};
