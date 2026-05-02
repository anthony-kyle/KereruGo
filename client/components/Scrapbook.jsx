import React from "react";
import { connect } from "react-redux";
import { HashRouter as Router, Link} from "react-router-dom";
import { apiGetUserScrapbook } from "../apis/index";
import { receiveScrapbook } from "../actions/scrapbook";
import BackLink from './BackLink'

export class Scrapbook extends React.Component {
  componentDidMount() {
    apiGetUserScrapbook(this.props.auth.user.id).then((scrapbook) =>
      this.props.dispatch(receiveScrapbook(scrapbook))
    );
  }
  render() {
   
    return (
      <div className='card is-centered mx-4 scrollable scrapbook'>
        <h2 className="has-text-centered is-uppercase pt-4 has-text-weight-light is-size-4">{this.props.auth.user.username}'s scrapbook</h2>
        <div className="birds">
          {this.props.scrapbook.map((item) => {
            return (
              <Link key={item.birdId} to={`/bird/${item.birdId}`}>
                <div className="scrapbook-entry">
                  <div className="image-container">
                    <img
                      className="img"
                      src={`${item.birdImg}`}
                      alt={`${item.birdName}`}
                    />
                  </div>
                  <h5 className="bird-name has-text-brown has-text-centered has-text-weight-bold">{item.birdName}</h5>
                </div>
              </Link>
            );
          })}
        </div>
        <BackLink
          inline='inline'
          destination='/nav'
        />
      </div>
    );
  }
}

function mapStateToProps(globalState) {
  return { auth: globalState.auth, scrapbook: globalState.scrapbook };
}

export default connect(mapStateToProps)(Scrapbook);
