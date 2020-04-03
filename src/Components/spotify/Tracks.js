import React, { Component } from "react";
import {searchYoutube} from "./spotifyServices";
class Tracks extends Component {
  state = { playing: false, audio: null, playingPreviewUrl: null};

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

  linkToYoutube = async(name,artist) => {
    const link = await searchYoutube(`${name} by ${ artist.name}`);
    const a  = document.createElement('a');
    a.href = link;
    a.setAttribute('target', '_blank');
    a.click();
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
                  className="track__image" 
                />
                <div className="track__icon" onClick={this.playAudio(preview_url)}>
                  {this.trackIcon(track)}
                </div>
              </div>
              <div className="track__text">
                <h5 className="track__title"> {name} </h5>
                <div className="external__links">

                <div className="track__youtube">
                 <i className="fab fa-youtube" onClick = {() => this.linkToYoutube(name,artist) }> </i>
                </div>

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
// props.history.push()