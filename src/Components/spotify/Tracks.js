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
      return <span> N/A </span>;
    }

    if (
      this.state.playing &&
      this.state.playingPreviewUrl === track.preview_url
    ) {
      return <span> | | </span>;
    }

    return <i className="fas fa-play"> </i> ;
  };

  render() {
    const { tracks, artist } = this.props;

    return (
      <div className="artist__tracks">
        {tracks.map(track => {
          const { id, name, album, preview_url, uri } = track;

          return (
            <div
              key={id}
              className="album__track" 
            >
              <div className="track__image__icon" >
                <img
                  src={album.images[0].url}
                  alt="track-img"
                  className="track__image" //track-image
                />
                <div className="track__icon" onClick={this.playAudio(preview_url)}>
                  {this.trackIcon(track)}
                </div>
              </div>
              <div className="track__text">
                <h5 className="track__title"> {name} </h5>
                <div className="external__links">
                  <a
                    className="track__youtube"
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`https://www.youtube.com/results?search_query=${name} by ${
                      artist.name
                    }`}
                  >
                    <i className="fab fa-youtube"> </i> {/* youtube opens modal and plays the video in modal. */}
                  </a>
                  <a className="track__spotify" href={`${uri}?play=true`}>
                    <i className="fab fa-spotify"> </i>
                  </a>
                </div>
              </div>
             
            </div>
          );
        })}
      </div>
    );
  }
}

export default Tracks;
