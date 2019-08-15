import React, { Component } from 'react';

export class Search extends Component {
  render() {
    return (
      <div className="container align-center py-5">
        <h2 className="pb-3">
          <em>Top</em>Tracks
        </h2>
        <input
          className="form-control w-50 p-3 d-inline"
          onKeyPress={this.props.handleKeyPress}
          onChange={this.props.updateArtistQuery}
          placeholder="Search for an Artist"
        />
        <button
          type="button"
          className="btn btn-success align-top"
          onClick={this.props.searchArtist}
        >
          Search
        </button>
      </div>
    );
  }
}

export default Search;
