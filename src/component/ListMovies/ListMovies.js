import React from 'react';
import { Row, Col } from 'antd';

import './ListMovies.css';
import MoviesInfo from '../MoviesInfo';

function ListMovies() {
  return (
    <div className="list-movie">
      <Row wrap={false}>
        <Col span={12}>
          <MoviesInfo />
        </Col>
        <Col span={12}>
          <MoviesInfo />
        </Col>
      </Row>
      <Row wrap={false}>
        <Col span={12}>
          <MoviesInfo />
        </Col>
        <Col span={12}>
          <MoviesInfo />
        </Col>
      </Row>
      <Row wrap={false}>
        <Col span={12}>
          <MoviesInfo />
        </Col>
        <Col span={12}>
          <MoviesInfo />
        </Col>
      </Row>
    </div>
  );
}

export default ListMovies;
