import React, { Component } from "react";

export default class Search extends Component {
  render() {
    return (
        <form onSubmit={this.props.searchResult}>
          <input placeholder="Search Pokemon"  type = 'text' name = 'pokename' className="form-control mx-auto" />
        </form>
    );
  }
}
