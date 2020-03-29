import React, { Component } from "react";

class Search extends Component {
  state = { artistQuery: "" };

  updateArtistQuery = event => {
    this.setState({ artistQuery: event.target.value });
  };

  handleKeyPress = event => {
    if (event.key === "Enter") {
      this.searchArtist();
    }
  };

  searchArtist = () => {
    this.props.searchArtist(this.state.artistQuery);
  };

  render() {
    return (
      <div>
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-lg-8">
            <div className="card-body row no-gutters align-items-center">
              <div className="col">
                <input
                  className={`form-control form-control-lg form-control-borderless h3 ${this.props.noResultsFound !== "" && "noSearch"}`}
                  type="search"
                  onChange={this.updateArtistQuery}
                  onKeyPress={this.handleKeyPress}
                  placeholder={" Search for an Artist"}
                  required
                />
              </div>

              <div className="col-auto">
                <button
                  className={`btn btn-lg ${(this.props.noResultsFound === "") ? "btn-success" : "btn-danger" } h3 `}
                  type="submit"
                  onClick={this.searchArtist}
                >
                  <div className="col-auto">
                    <i className="fa fa-search"> </i>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* add a lively error*/}
        <div className="row justify-content-center">
        {this.props.noResultsFound !== "" && (
          <div className="invalid-search"><strong>{this.props.noResultsFound}</strong></div>
        ) }
        </div>
      </div>
    );
  }
}

export default Search;
