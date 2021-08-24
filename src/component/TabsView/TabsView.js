/* eslint-disable */

import React from 'react';
import MoviesOutput from '../SearchMovies';
import SearchPanel from '../SearchPanel';
import RatedMovies from '../RatedMovies';

import './TabsView.css';
import { Tabs } from 'antd';

const TabsView = ({ valueOfInput, value }) => {
  const { TabPane } = Tabs;

  return (
    <Tabs defaultActiveKey="1" centered className="tabs">
      <TabPane tab="Search" key="1">
        <div className="wrapper-panel-of-search">
          <SearchPanel valueOfInput={valueOfInput} />
        </div>

        <div className="wrapper-list-of-movie">
          <MoviesOutput value={value} />
        </div>
      </TabPane>

      <TabPane tab="Rated" key="2">
        <RatedMovies />
      </TabPane>
    </Tabs>
  );
};

export default TabsView;
