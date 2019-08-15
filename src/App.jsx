import React, { Component } from 'react';
import Artist from './Artist';
import Tracks from './Tracks';
import Search from './Search';

class App extends Component {
  state = {
    artistQuery: '',
    artist: {},
    tracks: [],
    err: false,
    emptyResponse: false
  };

  updateArtistQuery = e => {
    this.setState({ artistQuery: e.target.value });
  };

  handleKeyPress = e => {
    if (e.key === 'Enter') {
      this.searchArtist();
    }
  };

  checkResponse = json => json.artists.total !== 0;

  searchArtist = async () => {
    await this.setState({
      artist: {},
      tracks: [],
      err: false,
      emptyResponse: false
    });
    fetch(
      `https://spotify-api-wrapper.appspot.com/artist/${this.state.artistQuery}`
    )
      .then(res => {
        return res.json();
      })
      .then(json => {
        if (this.checkResponse(json)) {
          return json.artists.items;
        } else {
          this.setState({ emptyResponse: true });
          throw new Error('Empty response');
        }
      })
      .then(arr => {
        this.setState({ artist: arr[0], err: false });
      })
      .then(() => {
        fetch(
          `https://spotify-api-wrapper.appspot.com/artist/${
            this.state.artist.id
          }/top-tracks`
        )
          .then(res => res.json())
          .then(json => {
            return this.setState({ tracks: json.tracks });
          })
          .catch(console.log('Track unavailable'));
      })
      .catch(() => this.setState({ err: true }));
  };
  render() {
    return (
      <div className="text-center w-75 min-vh-100 mx-auto bg-white">
        <Search
          handleKeyPress={this.handleKeyPress}
          updateArtistQuery={this.updateArtistQuery}
          searchArtist={this.searchArtist}
        />

        {!this.state.err ? (
          <div>
            <Artist artist={this.state.artist} />
            <Tracks tracks={this.state.tracks} />
          </div>
        ) : !this.state.emptyResponse ? (
          <h1 className="my-5">
            <em>Is this a network error? </em>
            <span role="img" aria-label="crying emoji">
              &#x1F622;
            </span>
          </h1>
        ) : (
          <h1 className="my-5">
            <em>Did you make that name up? </em>
            <span role="img" aria-label="surprised emoji">
              &#x1F62E;
            </span>
          </h1>
        )}
      </div>
    );
  }
}
export default App;
