import React, { Component } from "react";
import "./App.css";
import MatDataTable from "./MatDataTable";
import coronaImages from "./new.jpg";

class App extends Component {
  render() {
    const spacing = 5;
    return (
      <div className="App">
        <img src={coronaImages} alt="COVID-19" />
        <h2>Statistical Data</h2>
        <MatDataTable />
      </div>
    );
  }
}

export default App;
