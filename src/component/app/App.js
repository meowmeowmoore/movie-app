/* eslint-disable */
import React, { Component } from 'react';

import './App.css';
import './App-media.css';

import 'antd/dist/antd.css';
import TabsView from '../TabsView';

export default class App extends Component {
  state = {
    value: null,
  };

  valueOfInput = (newValue) => {
    this.setState({
      value: newValue,
    });
  };

  render() {
    const { value } = this.state;
    return (
      <div className="App">
        <div className="view-wrapper">
          <TabsView valueOfInput={this.valueOfInput} value={value} />
        </div>
      </div>
    );
  }
}
