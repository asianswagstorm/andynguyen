import React, { Component } from "react";

export default class Stats extends Component {

  render = () => {
  const {stats_type,stats_size,themeColor} = this.props;
  return(
      <div className="pokemon_stats">
        <div className="col-12 col-md-3">{stats_type}</div>
        <div className="col-12 col-md-9">
          <div className="progress" id="stat__progress">
            <div
              className="progress-bar "
              role="progressbar"
              style={{
              width: `${(stats_size/252) * 100}%`,
              backgroundColor: `#${themeColor}`
              }}
              aria-valuenow="25"
              aria-valuemin="0"
              aria-valuemax="100"
            >
              <small id="stat_size">{stats_size}</small>
            </div>
          </div>
        </div>
      </div>
    );
  };
}