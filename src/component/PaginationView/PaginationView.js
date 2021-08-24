import React, { Component } from 'react';
import { Pagination } from 'antd';

import './PaginationView.css';

export default class PaginationView extends Component {
  state = {
    current: 1,
  };

  onChange = (page) => {
    this.setState({
      current: page,
    });
  };

  render() {
    const { current } = this.state;
    return (
      <div className="pagination-view">
        <Pagination current={current} onChange={this.onChange} total={50} size="small" defaultPageSize={6} />
      </div>
    );
  }
}
