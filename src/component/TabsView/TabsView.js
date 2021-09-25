/* eslint-disable */

import React from 'react';
import PropTypes from 'prop-types';
import SearchedMovies from '../SearchedMovies';
import SearchPanel from '../SearchPanel';
import RatedMovies from '../RatedMovies';

import './TabsView.css';
import './TabsView-media.css';
import { Tabs } from 'antd';

const TabsView = ({ valueOfInput, value, addToListRatedMovies, ratedMovie, rate }) => {
  const { TabPane } = Tabs;

  return (
    <Tabs defaultActiveKey="1" centered className="tabs">
      <TabPane tab="Search" key="1">
        <div className="wrapper-panel-of-search">
          <SearchPanel valueOfInput={valueOfInput} />
        </div>

        <div className="wrapper-list-of-movie">
          <SearchedMovies value={value} addToListRatedMovies={addToListRatedMovies} />
        </div>
      </TabPane>

      <TabPane tab="Rated" key="2">
        <div className="wrapper-list-of-movie">
          <RatedMovies ratedMovie={ratedMovie} rate={rate} />
        </div>
      </TabPane>
    </Tabs>
  );
};

export default TabsView;

TabsView.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  valueOfInput: PropTypes.func,
  addToListRatedMovies: PropTypes.func,
  ratedMovie: PropTypes.object,
};

TabsView.defaultProps = {
  value: '',
  valueOfInput: () => {},
  addToListRatedMovies: () => {},
  ratedMovie: {},
};
