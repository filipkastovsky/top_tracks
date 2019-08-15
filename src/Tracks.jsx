import React, { Component } from 'react';

class Tracks extends Component {
  state = {
    audio: null,
    previewUrl: '',
    isPlaying: false
  };

  playAudio = previewUrl => async () => {
    // Do this else infinite loop!
    const audio = new Audio(previewUrl);

    if (this.state.previewUrl === previewUrl) {
      if (!this.state.isPlaying) {
        await this.setState({ audio, isPlaying: true });
        this.state.audio.play();
      } else {
        this.state.audio.pause();
        this.setState({ isPlaying: false });
      }
    } else {
      try {
        this.state.audio.pause();
      } catch {}
      await this.setState({ audio, isPlaying: true });
      this.state.audio.play();
      await this.setState({ previewUrl });
    }
  };

  trackIcon = track => {
    if (!track.preview_url) {
      return <div>N/A</div>;
    }
    if (this.state.isPlaying && this.state.previewUrl === track.preview_url) {
      return <div>| |</div>;
    }
    return <div>&#9654;</div>;
  };

  render() {
    return (
      <div className="d-flex justify-content-center flex-wrap">
        {this.props.tracks.map(track => (
          <div
            className="p-5"
            key={track.id}
            onClick={this.playAudio(track.preview_url)}
            style={{ cursor: 'pointer' }}
          >
            <img
              className="rounded"
              src={track.album.images[1].url}
              alt="album"
            />
            <p className="btn-success p-3">{track.name}</p>
            <div className="track-icon">{this.trackIcon(track)}</div>
          </div>
        ))}
      </div>
    );
  }
}

export default Tracks;
