import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { withRouter } from "react-router-dom";

class GaragePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      garage: [],
      garage_image: "",
      vehicle_name: "",
    };
  }

  componentDidMount() {
    const user = JSON.parse(window.localStorage.getItem("user"));
    axios.get(`/garages/${user.id}`).then((res) => {
      this.setState({ garage: res.data });
    });
  }

  //add vehicle
  onClickAddVehicle = () => {
    const { garage_image, vehicle_name } = this.state;
    const user = JSON.parse(window.localStorage.getItem("user"));
    console.log(user);
    axios
      .post(`/garages/${user.id}`, {
        garage_image,
        vehicle_name,
      })
      .then((res) => {
        this.setState({ garage_image: "", vehicle_name: "" });
        axios.get(`/garages/${user.id}`).then((res) => {
          // console.log(res.data[0]);
          this.setState({ garage: res.data });
        });
      });
  };

  handleGarageImageInput = (e) => {
    this.setState({ garage_image: e.target.value });
  };

  handleVehicleNameInput = (e) => {
    this.setState({ vehicle_name: e.target.value });
  };

  render() {
    return (
      <div>
        <div className="signOutDiv">
          <Link id="navBtn" to="/">
            Sign Out
          </Link>
        </div>
        <h2 className="garageH2">Your Garage</h2>
        <div className="submitDiv">
          <input
            onChange={(e) => this.handleGarageImageInput(e)}
            placeholder="Image URL"
            value={this.state.garage_image}
          />
          <br />
          <input
            onChange={(e) => this.handleVehicleNameInput(e)}
            placeholder="Vehicl Name"
            value={this.state.vehicle_name}
          />
          <br />
          <div className="btn">
            <button onClick={this.onClickAddVehicle} className="button">
              Add Vehicle
            </button>
          </div>
        </div>
        <div className="cards">
          {this.state.garage.map((vehicle) => {
            return (
              <Link to={`/garage-records/${vehicle.id}`} key={vehicle.id}>
                <div className="garageCard">
                  <div className="garageImg">
                    <img
                      alt={vehicle.vehicle_name}
                      src={vehicle.garage_image}
                    />
                  </div>
                  <div className="vNameDiv">
                    <h3>{vehicle.vehicle_name}</h3>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    );
  }
}

export default withRouter(GaragePage);
