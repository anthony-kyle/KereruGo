import React from "react";
import { connect } from "react-redux";
import BackLink from "./BackLink";
import ImgUploader from "./ImgUpload";

import {
  apiGetOneBird,
  apiGetUserScrapbook,
  apiGetUserBadges,
} from "../apis/index";
import { receiveScrapbook, saveProgress } from "../actions/scrapbook";
import { receiveBadges } from "../actions/badges";

export class Profile extends React.Component {
  state = {
    bird: {},
    found: 0,
    total: 0,
    // medalName: ''
  };

  componentDidMount() {
    apiGetUserScrapbook(this.props.auth.user.id).then((scrapbook) => {
      this.props.dispatch(receiveScrapbook(scrapbook));
      const total = scrapbook.length;
      const found = scrapbook.filter((entry) => entry.birdName !== "Unknown")
        .length;
      this.props.dispatch(saveProgress(found, total));
    });
    apiGetUserBadges(this.props.auth.user.id).then((badges) => {
      this.props.dispatch(receiveBadges(badges));
    });
  }

  // componentDidUpdate(prevProps){
  //   if(prevProps !== this.props){

  //   }
  // }

  getMedal = (badge) => {
    const foundCount = badge.currentCount;
    const bronzeReq = Number(badge.bronzeReq);
    const silverReq = Number(badge.silverReq);
    const goldReq = Number(badge.goldReq);

    if (foundCount < silverReq && foundCount >= bronzeReq) {
      return ["bronze", <i className="fas fa-medal fa-3x bronze-medal"></i>];
    } else if (foundCount >= silverReq && foundCount < goldReq) {
      return ["silver", <i className="fas fa-medal fa-3x silver-medal"></i>];
    } else if (foundCount >= goldReq) {
      return ["gold", <i className="fas fa-medal fa-3x gold-medal"></i>];
    } else {
      return false;
    }
  };

  render() {
    const userInfo = this.props.auth.user;

    console.log(this.props.auth.user.user_img);

    return (
      <>
        <div className="card is-centered mx-4 scrollable">
          {this.props.scrapbook && (
            <div className="user-profile-img">
              {/* <ImgUploader /> */}
              {/* <img
                src={
                  this.props.auth.user.user_img || "/images/mystery-bird.png"
                }
                alt="Image of user"
              ></img> */}
              <i className="fas fa-user fa-7x"></i>
            </div>
          )}
          <div>
            <h1 className="user-name birdName has-text-centered has-text-brown has-text-weight-medium">{userInfo.username}</h1>
            <h3 className="has-text-centered has-text-weight-light has-text-brown is-size-5">Unique Birds Encountered:</h3>
            <div className="progress">
              <progress
                max={this.props.progress.totalBirds}
                value={this.props.progress.foundCount}
              ></progress>
              <span className="value">
                {this.props.progress.foundCount} /{" "}
                {this.props.progress.totalBirds}
              </span>
            </div>
          </div>
          <br />
        

          <div className="badge has-text-centered">
        
            {this.props.badges.map((badge, i) => {
        
            const getTheMedal = this.getMedal(badge)
                return (
                  
                    <div className="badge-container" key={`${i} ${getTheMedal}`}>
                      <h5 className="has-text-weight-medium has-text-brown">
                        You have earned a {getTheMedal[0]} medal for encountering {badge.currentCount} {(badge.currentCount == 1) ? ' bird' : ' birds'}!
                      </h5>
                      {getTheMedal[1]}
                    </div>
                  
                )
              })}
          </div>

          <BackLink inline='inline' destination="/nav" />
        </div>
      </>
    );
  }
}

const mapStateToProps = (globalState) => {
  return {
    auth: globalState.auth,
    scrapbook: globalState.scrapbook,
    progress: globalState.progress,
    badges: globalState.badges,
  };
};
export default connect(mapStateToProps)(Profile);
