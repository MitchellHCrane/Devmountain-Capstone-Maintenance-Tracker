import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { NoticeMessage } from "pg-protocol/dist/messages";

class RecordPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      record: [],
      vehicle: {},
      record_date: "",
      mileage: "",
      service_note: "",
    };
  }

  componentDidMount() {
    axios.get(`/records/${this.props.match.params.id}`).then((res) => {
      this.setState({ record: res.data });
    });
    axios.get(`/garage/${this.props.match.params.id}`).then((res) => {
      this.setState({ vehicle: res.data });
    });
  }
  //add record
  onClickAddRecord = () => {
    const { record_date, mileage, service_note } = this.state;
    axios
      .post(`/garage/${this.props.match.params.id}`, {
        record_date,
        mileage,
        service_note,
      })
      .then((res) => {
        this.setState({ record_date: "", mileage: "", service_note: "" });
        axios.get(`/records/${this.props.match.params.id}`).then((res) => {
          // console.log(res.data);
          this.setState({ record: res.data });
        });
      });
  };

  handleDateInput = (e) => {
    this.setState({ record_date: e.target.value });
  };

  handleMileageInput = (e) => {
    this.setState({ mileage: e.target.value });
  };

  handleServiceInput = (e) => {
    this.setState({ service_note: e.target.value });
  };

  render() {
    return (
      <div>
        <div className="signOutDiv">
          <Link to="/garages" className="back" id="navBtn">
            Back
          </Link>

          <Link to="/" id="navBtn">
            Sign Out
          </Link>
        </div>
        <h4 className="recordH2">
          {this.state.vehicle.vehicle_name} Maintenance History
        </h4>
        <div className="recordCard">
          <div className="recordImg">
            <img
              width="100%"
              alt={this.state.vehicle.vehicle_name}
              src={this.state.vehicle.garage_image}
            />
          </div>
        </div>
        <div className="submitDiv">
          <input
            onChange={(e) => this.handleDateInput(e)}
            placeholder="Date 'YYYY-MM-DD'"
            value={this.state.record_date}
          />
          <br />
          <input
            onChange={(e) => this.handleMileageInput(e)}
            placeholder="Mileage"
            value={this.state.mileage}
          />
          <br />
          <input
            onChange={(e) => this.handleServiceInput(e)}
            placeholder="Service Note"
            value={this.state.service_note}
          /><br/>
          <div className="btn">
            <button onClick={this.onClickAddRecord} className="addRecord">
              Add Record
            </button>
          </div>
        </div>
        {this.state.record.map((record) => {
          return (
            <div key={record.id} className="recordDiv">
              <div className="pRecord">
                <p>
                  <i>
                    <strong>Date:</strong>
                  </i>{" "}
                  {record.record_date}
                </p>
                <p>
                  <i>
                    <strong>Mileage:</strong>
                  </i>{" "}
                  {record.mileage}
                </p>
                <p>
                  <i>
                    <strong>Service:</strong>
                  </i>{" "}
                  {record.service_note}
                </p>
              </div>
            </div>
          );
        })}
        <br/>
      </div>
    );
  }
}

export default withRouter(RecordPage);
