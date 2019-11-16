import React from "react";
import Axios from "axios";

export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  login = async () => {
    await Axios.post()
      .then(res =>{
          console.log(res.data);
      })
      .catch(err => {
        console.log("Error while Login " + err);
      });
  };

  render() {
    return (
      <div>
        <div className="p-lg-6 p-md-4 p-sm-3 login-box">
          <p className="heading">LOGIN</p>

          <form className="form">
            <input
              className="textInput"
              type="text"
              name="email"
              autocomplete="off"
              required
            ></input>
            <br />
            <input
              className="textInput"
              type="password"
              name="text"
              autocomplete="off"
              required
            ></input>

            <p className="forgot">
              <a href="/" className="forgotText">
                Forgot Password?
              </a>
            </p>

            <input className="button" type="submit" value="Login" onClick={this.login}></input>
          </form>
        </div>
      </div>
    );
  }
}
