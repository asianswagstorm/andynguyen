import React from "react";

const Profile = (props) => (
          <div className="profile_input row">
            <div className={`profile_name ${props.profileSide === "left" ? "col-5" : "col-6"}`}>
              <h6 className="float-left">{props.profileType}</h6>
            </div>

            <div className={`profile_value ${props.profileSide === "left" ? "col-7" : "col-6"} ${props.genderRatioTrue === true && "genderRatioBar"}`}>
              {props.genderRatioTrue === false ? 
              <h6 className="float-left">{props.profileValue}</h6> : 
                props.profileValue
              }
            </div>

          </div>
        );

export default Profile;