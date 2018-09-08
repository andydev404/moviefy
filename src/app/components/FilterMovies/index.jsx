import React, { Component } from 'react';
import classnames from 'classnames';

export default class Filter extends Component {
  state = {
    filters: ['Trending', 'Popular', 'Upcoming']
  };
  componentDidMount() {}
  handleFilter = e => {
    e.target.parentElement.parentElement.childNodes.forEach(el => {
      el.childNodes[0].classList.remove('filter-active');
    });
    e.target.parentElement.parentElement.childNodes.forEach(el => {
      if (el.childNodes[0].textContent === e.target.name) {
        el.childNodes[0].classList.add('filter-active');
      }
    });
    this.props.handleFilter(e.target.name);
  };
  render() {
    return (
      <ul className="filters">
        {this.state.filters.map((filter, i) => (
          <li key={i}>
            <button
              onClick={this.handleFilter}
              name={filter}
              className={classnames('filter-item', {
                'filter-active': i === 0
              })}
            >
              {filter}
            </button>
          </li>
        ))}
      </ul>
    );
  }
}
