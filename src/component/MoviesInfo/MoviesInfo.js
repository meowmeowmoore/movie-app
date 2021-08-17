import React, { Component } from 'react';
import { Card, Row, Tag, Typography, Image } from 'antd';
import { format } from 'date-fns';
import MovieService from '../../services/movieService';

import './MoviesInfo.css';

export default class MoviesInfo extends Component {
  state = {
    // id: null,
    poster: null,
    name: null,
    date: null,
    // tag: null,
    description: null,
  };

  movieService = new MovieService();

  constructor(props) {
    super(props);

    this.updateMovie();
  }

  updateMovie = () => {
    this.movieService.getMovie(122).then((movie) => {
      this.setState({
        // id: movie.id,
        poster: movie.poster_path,
        name: movie.title,
        date: movie.release_date,
        // tag: null,
        description: this.symbolCount(movie.overview),
      });
    });
  };

  symbolCount = (text) => {
    const textSlice = text.slice(0, 203);
    const lastIndex = textSlice.lastIndexOf(' ');

    return `${textSlice.slice(0, lastIndex)} ...`;
  };

  render() {
    const { Title, Text } = Typography;

    const { name, description, poster, date } = this.state;

    return (
      <Card className="movie-info" style={{ width: 454 }} bordered={false}>
        <Row>
          <Image src={`https://image.tmdb.org/t/p/w200/${poster}`} width={183} preview={false} alt="The way back" />
          <div className="movie-description">
            <Title level={5} className="movie-description-element">
              {name}
            </Title>
            <Text type="secondary" className="movie-description-element">
              {format(new Date(date), 'PPP')}
            </Text>
            <Row>
              <Tag className="movie-description-element">Drama</Tag>
              <Tag className="movie-description-element">Action</Tag>
            </Row>
            <Text className="movie-description-element">{description}</Text>
          </div>
        </Row>
      </Card>
    );
  }
}
