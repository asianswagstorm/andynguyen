import React, { Component } from "react";

class Tracks extends Component {
  //extends Component because we use states.
  state = { playing: false, audio: null, playingPreviewUrl: null };

  playAudio = previewUrl => () => {
    const audio = new Audio(previewUrl);

    if (!this.state.playing) {
      audio.play();
      this.setState({ playing: true, audio, playingPreviewUrl: previewUrl });
    } else {
      this.state.audio.pause(); //pause part of javaScript Audio

      if (this.state.playingPreviewUrl === previewUrl) {
        this.setState({ playing: false });
      } else {
        audio.play();
        this.setState({ audio, playingPreviewUrl: previewUrl });
      }
    }
  };

  trackIcon = track => {
    if (!track.preview_url) {
      return <span> N / A </span>;
    }

    if (
      this.state.playing &&
      this.state.playingPreviewUrl === track.preview_url
    ) {
      return <span> | | </span>;
    }

    return <span> &#9654;</span>;
  };

  render() {
    const { tracks, artist } = this.props;

    return (
      <div className="container">
        {tracks.map(track => {
          const { id, name, album, preview_url, uri } = track;

          return (
            <div
              key={id}
              className="track" //track
            >
              <img
                src={album.images[0].url}
                alt="track-img"
                className="card-img-top" //track-image
              />
              <div className="card-body" id="track-text">
                <h5 className="card-title"> {name} </h5>
                <div className="external-links">
                  <a
                    className="track-youtube"
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`https://www.youtube.com/results?search_query=${name} by ${
                      artist.name
                    }`}
                  >
                    <i className="fab fa-youtube"> </i>
                  </a>
                  <a className="track-spotify" href={`${uri}?play=true`}>
                    <i className="fab fa-spotify"> </i>
                  </a>
                </div>
              </div>
              <p className="track-icon" onClick={this.playAudio(preview_url)}>
                {this.trackIcon(track)}
              </p>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Tracks;
