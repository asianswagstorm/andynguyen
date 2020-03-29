import React, { Component } from "react";

export default class Profile extends Component {

    render = () => {
        return(
          <div className="profile_input">
            <div className="profile_name">
              <h6 className="float-right">{this.props.profile_type}</h6>
            </div>

            <div className="profile_value">
              {this.props.genderRatioTrue === false ? 
              <h6 className="float-left">{this.props.profile_value}</h6> : 
              this.props.profile_value
              }
            </div>

          </div>
        );
    };
};