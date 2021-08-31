/* eslint-disable */

import React, { Component } from 'react';
import { Input } from 'antd';
import debounce from 'lodash.debounce';
import './SearchPanel.css';

const SearchPanel = ({ valueOfInput }) => {
  const valueOfInputDebounced = debounce((event) => valueOfInput(event.target.value), 1000);
  return <Input placeholder="Type to search..." size="large" onChange={valueOfInputDebounced} />;
};

export default SearchPanel;
