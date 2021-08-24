/* eslint-disable */

import React, { Component } from 'react';
import MovieService from '../../services/movieService';
import ErrorIndicator from '../errorIndicator';

import './SearchMovie.css';
import { Image, Spin, Tag, Typography } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { format } from 'date-fns';

export default class MoviesOutput extends Component {
  movieService = new MovieService();

  state = {
    movies: [],
    loading: true,
    error: false,
  };

  componentDidUpdate(prevProps) {
    const { value } = this.props;
    if (value !== null && value !== prevProps.value) {
      this.updateMovie(value);
    }
  }

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

  updateMovie = (value) => {
    this.movieService
      .getAllMoviesByName(value)
      .then((arr) => this.onloadMovie(arr))
      .catch(this.onError);
  };

  render() {
    const { movies, error, loading } = this.state;
    const hasData = !(loading || error);
    const content = hasData ? <MovieView movies={movies} /> : null;
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

const MovieView = ({ movies }) => {
  const { Title, Text } = Typography;
  const movieService = new MovieService();

  const toDisplayMovies = movies.map((movie) => {
    const movieInfo = movieService.getInfoMovie(movie);
    const { poster, name, description, date, id } = movieInfo;
    return (
      <div key={id} className="movie-info">
        <Image src={`https://image.tmdb.org/t/p/w200/${poster}`} width={183} preview={false} alt="The way back" />
        <div className="movie-description">
          <Title level={5} className="movie-description-element">
            {name}
          </Title>
          <p className="movie-description-element">{format(new Date(date), 'PPP')}</p>
          <div className="movie-description-element tags">
            <Tag>Drama</Tag>
            <Tag>Action</Tag>
          </div>
          <Text className="movie-description-element">{description}</Text>
        </div>
      </div>
    );
  });

  return <div className="movie-item">{toDisplayMovies}</div>;
};
