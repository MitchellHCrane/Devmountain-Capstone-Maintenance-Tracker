import React, { Component } from "react";
import router from "./router";
import Navigation from "./components/Navigation";

class App extends Component {
  render() {
    return (
      <div>
        <Navigation />
      <div className="app">{router}</div>
      </div>
    );
  }
}
//routes
export default App;
