import React, { Component } from "react";

export default class Search extends Component {
  render() {
    return (
        <form>
          <input onChange = {this.props.onChange} placeholder="Search Pokemon"  type = 'text' name = 'pokename' className="form-control mx-auto" />
        </form>
    );
  }
}
