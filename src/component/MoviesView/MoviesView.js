/* eslint-disable */

import React from 'react';
import PropTypes from 'prop-types';
import Rater from '../Rater/Rater';

import './MoviesView.css';
import './MoviesView-media.css';
import { Pagination, Rate, Tag, Typography } from 'antd';
import { format } from 'date-fns';
import { FrownOutlined } from '@ant-design/icons';

const MoviesView = ({ movies, currentPage, onChange, totalMoviesCount, addToListRatedMovies }) => {
  const symbolCount = (text) => {
    const textSlice = text.slice(0, 170);
    const lastIndex = textSlice.lastIndexOf(' ');
    return `${textSlice.slice(0, lastIndex)} ...`;
  };

  const colorRating = (num) => {
    if (num >= 0 && num < 3) {
      return {
        borderColor: '#E90000',
      };
    }
    if (num >= 3 && num < 5) {
      return {
        borderColor: '#E97E00',
      };
    }
    if (num >= 5 && num < 7) {
      return {
        borderColor: '#E9D100',
      };
    }
    if (num >= 7) {
      return {
        borderColor: ' #66E900',
      };
    }
  };

  const { Title, Text } = Typography;

  const posterApi = 'https://image.tmdb.org/t/p/w200/';

  const toDisplayMovies = movies.map((movie) => {
    const { poster_path, title, overview, release_date, id, vote_average, rating } = movie;
    const RatedOutput = rating ? (
      <span className="movie-info-rating">
        <Rate disabled count={10} defaultValue={rating} allowHalf />
      </span>
    ) : (
      <Rater addToListRatedMovies={addToListRatedMovies} movie={movie} />
    );

    const dateFormat = release_date ? format(new Date(release_date), 'PPP') : null;
    const posterNull = !poster_path ? (
      <div className="movie-info-icon">
        <FrownOutlined className="icon-not-found" />
      </div>
    ) : (
      <img src={`${posterApi}${poster_path}`} alt={title} />
    );

    return (
      <div key={id} className="movie-info">
        <div className="movie-info-wrapper">
          {posterNull}
          <Title level={5} className="movie-info-title">
            {title}
          </Title>
          <p className="movie-info-date">{dateFormat}</p>
          <div className="movie-info-tags">
            <Tag className="tag">Drama</Tag>
            <Tag className="tag">Action</Tag>
          </div>
          <div className="movie-info-current-rating" style={colorRating(vote_average)}>
            <p>{vote_average}</p>
          </div>
          <Text className="movie-info-description">{symbolCount(overview)}</Text>
          {RatedOutput}
        </div>
      </div>
    );
  });
  return (
    <>
      <div className="wrapper-list-movie">
        <div className="movie-items">{toDisplayMovies}</div>
      </div>
      <div className="pagination-view">
        <Pagination defaultCurrent={1} total={totalMoviesCount} onChange={onChange} current={currentPage} />
      </div>
    </>
  );
};

export default MoviesView;

MoviesView.propTypes = {
  movies: PropTypes.array,
  currentPage: PropTypes.number,
  onChange: PropTypes.func,
  totalPage: PropTypes.number,
  addToListRatedMovies: PropTypes.func,
};

MoviesView.defaultProps = {
  movies: [],
  currentPage: 1,
  onChange: () => {},
  totalPage: 1,
  addToListRatedMovies: () => {},
};
