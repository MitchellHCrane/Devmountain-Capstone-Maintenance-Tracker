import React from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      user: {},
      // users_id: 0,
    };
  }

  // componentDidMount() {
  //   axios.get(`/user/:${this.state.users_id}`).then((res) => {
  //     console.log(res.data[0], "find me");
  //     this.setState({ user: res.data[0] });
  //   });
  // } 
  // make number equal what they signed in with id

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const data = {
      users_name: this.state.username,
      users_password: this.state.password,
    };
    axios
      .post("/auth/login", data)
      .then((res) => {
        // this.setState(res.data.id)
        window.localStorage.setItem("user", JSON.stringify(res.data));
        this.props.history.push("/garages");
      })
      .catch((error) => {
        alert(`Invalid Credentials, Try Again. Error`);
      });
  }

  render() {
    return (
      <div>
        <div className="loginBackground">
          <div>
            <h3 id="headerQuote">
              Stop sifting through paper records. Track your maintenance
              digitally!
            </h3>
          </div>
          <div className="formContainer">
            <form onSubmit={(e) => this.handleSubmit(e)}>
              <div className="fieldContainer">
                <label>
                  <b>Username</b>
                </label>
                <input
                  type="text"
                  placeholder="Enter Username"
                  name="username"
                  required
                  value={this.state.username}
                  onChange={(e) => this.handleChange(e)}
                />
                <br />
                <label>
                  <b>Password</b>
                </label>
                <input
                  type="password"
                  placeholder="Enter Password"
                  name="password"
                  required
                  value={this.state.password}
                  onChange={(e) => this.handleChange(e)}
                />

                <button type="submit">Login</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(LoginPage);
