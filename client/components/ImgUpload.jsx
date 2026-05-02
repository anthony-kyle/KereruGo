import React from "react";
import { apiPostProfileImage } from "../apis/index";
import { connect } from "react-redux";

class ImgUploader extends React.Component {
  state = {
    formVisible: false,
  };
  fileSelectedHandler = (e) => {
    console.log(e.target.files[0]);
    console.log(this.props.auth.user);
    let file = e.target.files[0];
    let id = this.props.auth.user.id;
    console.log(id, file);
    apiPostProfileImage(id, file);
  };

  render() {
    const formClass = this.state.formVisible ? "" : "hidden";
    return (
      <>
        <div className="imageToggle">
          <i
            className="fas fa-pencil-alt"
            onClick={() => {
              this.setState({ formVisible: !this.state.formVisible });
            }}
          ></i>
          <label className={formClass}>
            Uploaded image will appear next time you log in.
          </label>
          <input
            className={formClass}
            id="file"
            type="file"
            accept="image/*"
            name="profile-pic"
            encType="multipart/form-data"
            onChange={this.fileSelectedHandler}
          />
        </div>
      </>
    );
  }
}

const mapStateToProps = (globalState) => {
  return {
    auth: globalState.auth,
  };
};

export default connect(mapStateToProps)(ImgUploader);
