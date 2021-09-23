import React from "react";
import axios from "axios";

class AddGarage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      image: "",
      vName: "",
    };
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const data = {
      garage_image: this.state.image,
      vehicle_name: this.state.vName,
    };
    axios
      .post("/auth/login", data)
      .then((res) => {
        console.log(res.data);
        window.localStorage.setItem("user", JSON.stringify(res.data));
        this.props.history.push("/garage");
      })
      .catch((error) => {
        alert("Invalid Credentials, Try Again");
      });
  }

  render() {
    return (
      <div>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <div className="container">
            <label>
              <b>Username</b>
            </label>
            <input
              name="image"
              required
              value={this.state.image}
              onChange={(e) => this.handleChange(e)}
            />
            <label>
              <b>Name of Vehicle</b>
            </label>
            <input
              type="text"
              placeholder="Enter Name"
              name="vName"
              required
              value={this.state.vName}
              onChange={(e) => this.handleChange(e)}
            />

            <button type="addVehicle">Add Vehicle</button>
          </div>
        </form>
      </div>
    );
  }
}

export default AddGarage;
