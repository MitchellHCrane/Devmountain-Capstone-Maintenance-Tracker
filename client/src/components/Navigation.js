import React, { Component } from "react";
import { withRouter } from "react-router-dom";
// import { Navbar } from 'react-bootstrap';

class Navigation extends Component {
  render() {
    return (
      <div className="navigation">
        <nav className="navbar navbar-expand text-white">
          <div className="container justify-content-center">
            <h1>Maintenance Tracker</h1>
          </div>
        </nav>
      </div>
    );
  }
}

export default withRouter(Navigation);
