import React, { Component } from "react";
import { popUpNotification } from "../constants/HelperFunction/Functions";
import {searchYoutube} from "./spotifyServices";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';

class Tracks extends Component {
  state = { playing: false, audio: null, playingPreviewUrl: null};

  playAudio = previewUrl => () => {
    const audio = new Audio(previewUrl);

    if (!this.state.playing) {
      audio.play();
      this.setState({ playing: true, audio, playingPreviewUrl: previewUrl });
      audio.onended = () =>  this.setState({ playing: false });
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
    else 
      return <i className="fas fa-play"> </i> ;
  };

  linkToYoutube = async(name,artist) => {
    const {dispatch} = this.props;
    const {setPreviousYoutube,setPreviousYoutubeLink} = this.props.action_props.music_master_action;
    let link = this.props.previousYoutubeLink;

    if(this.props.previousYoutubeSeach !== `${name} by ${ artist.name}`){
      dispatch(setPreviousYoutube(`${name} by ${ artist.name}`));
      link = await searchYoutube(`${name} by ${ artist.name}`);
      dispatch(setPreviousYoutubeLink(link));
    }

    if(link !== "limitReached"){
        const a  = document.createElement('a');
        a.href = link;
        a.setAttribute('target', '_blank');
        a.click();
    }
    else
      await popUpNotification("error", "YouTube API Limit reached try again tomorrow.");
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
              className="card album__track" 
            >
              <div className="track__image__icon" >
                <img
                  src={album.images[0].url}
                  alt="track-img"
                  className="card-img track__image" 
                />
                <div className="card-img-overlay track__icon" onClick={this.playAudio(preview_url)}>
                  {this.trackIcon(track)}
                </div>
              </div>
              <div className="card-body track__text">
                  <h5 className="card-title track__title"> {name} </h5>
                  <div className="card-text external__links">
                    <div className="track__youtube" >
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

const mapStateToProps = state => { 
  const musicProps  = state.MusicMasterReducer.defaultMusicStates; 
  const {artist,tracks,previousYoutubeSeach,previousYoutubeLink} = musicProps;

  return {artist,tracks,previousYoutubeSeach,previousYoutubeLink};
};

export default withRouter(connect(mapStateToProps)(Tracks));