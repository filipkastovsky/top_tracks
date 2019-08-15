import React, { Component } from 'react';

class Artist extends Component {
  state = {
    fadeIn: false
  };

  componentDidMount() {
    this.fadeIn();
  }

  fadeIn = async () => {
    await this.setState({ fadeIn: false });
    this.setState({ fadeIn: true });
  };

  render() {
    return this.props.artist.id ? (
      <div className="bg-light">
        <hr />
        <div className={`bg ${this.state.fadeIn ? 'fade-in' : null}`}>
          <img src={this.props.artist.images[0].url} alt="artist" />
        </div>
        <h1 className="py-5">{this.props.artist.name}</h1>
        <div className="d-flex justify-content-around px-5 flex-wrap">
          <img
            className="rounded-circle mt-2 artist"
            src={this.props.artist.images[1].url}
            alt="artist"
          />
          <div className=" my-5 ">
            <ul className="my-2 list-unstyled">
              <strong>Genres:</strong>
              {this.props.artist.genres.map(genre => (
                <li className="" key={genre}>
                  {genre}
                </li>
              ))}
            </ul>
            <div className="my-2">
              <strong>Followers: </strong>
              {this.props.artist.followers.total}
            </div>
            <div className="my-2">
              <a
                href={this.props.artist.external_urls.spotify}
                target="_blank"
                rel="noopener noreferrer"
              >
                visit on Spotify
              </a>
            </div>
          </div>
        </div>
        <hr className="mt-5" />
      </div>
    ) : null;
  }
}

export default Artist;
