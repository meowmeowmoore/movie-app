/* eslint-disable */

import React from 'react';
import MovieService from '../../services/movieService';

import './MoviesOutput.css';
import './MoviesOutput-media.css';
import { Image, Pagination, Tag, Typography } from 'antd';
import { format } from 'date-fns';

const MovieView = ({ movies, currentPage, onChange, totalPage }) => {
  const { Title, Text } = Typography;
  const movieService = new MovieService();

  const posterApi = 'https://image.tmdb.org/t/p/w200/';

  const toDisplayMovies = movies.map((movie) => {
    const movieInfo = movieService.getInfoMovie(movie);
    const { poster, name, description, date, id } = movieInfo;

    const dateFormat = date ? format(new Date(date), 'PPP') : null;

    return (
      <div key={id} className="movie-info">
        <Image src={`${posterApi}${poster}`} width={183} preview={false} alt={name} />
        <div className="movie-description">
          <Title level={5} className="movie-description-element">
            {name}
          </Title>
          <p className="movie-description-element">{dateFormat}</p>
          <div className="movie-description-element tags">
            <Tag>Drama</Tag>
            <Tag>Action</Tag>
          </div>
          <Text className="movie-description-element">{description}</Text>
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
        <Pagination defaultCurrent={1} total={totalPage} onChange={onChange} current={currentPage} />
      </div>
    </>
  );
};

export default MovieView;
