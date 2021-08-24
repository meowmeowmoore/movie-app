/* eslint-disable */
import React, { Component } from 'react';
import 'antd/dist/antd.css';
import './App.css';
import TabsView from '../TabsView';
import PaginationView from '../PaginationView';

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
          <PaginationView />
        </div>
      </div>
    );
  }
}
