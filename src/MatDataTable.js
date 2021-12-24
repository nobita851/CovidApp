import React, { Component } from "react";
import axios from "axios";
import MaterialTable from "material-table";
import { forwardRef } from "react";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Search from "@material-ui/icons/Search";

const tableIcons = {
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
};

export default class MatDataTable extends Component {
  constructor(props) {
    super(props);
    this.state = { country: [] };
  }

  componentDidMount(prevProps) {
    // const maxResults = 20;
    const url = `https://api.covid19api.com/summary`;
    axios.get(url).then((Countries) => {
      console.log(Countries);
      console.log(Countries.data.Countries);
      this.setState({ country: Countries.data.Countries });

      var newArr = Countries.data.Countries.map(function (val) {
        return {
          Country: val.Country,
          Confirmed: val.TotalConfirmed,
          NewConfirmed: val.NewConfirmed,
          Death: val.TotalDeaths,
          CountryCode: val.CountryCode,
          Date: val.Date,
        };
      });
      console.log(Countries.data.Countries);
      this.setState(
        {
          tableArray: newArr, //set state of the weather5days
        },
        () => {
          console.log(this.state.tableArray);
          console.log("this.tableArray ", this.state.tableArray);
        }
      );
    });
  }

  render() {
    return (
      <div style={{ maxWidth: "70%", margin: "auto", marginTop: "20px" }}>
        <MaterialTable
          icons={tableIcons}
          columns={[
            { title: "Country Code", field: "CountryCode" },
            { title: "Country", field: "Country" },
            { title: "Total Confirmed", field: "Confirmed" },
            { title: "New Confirmed", field: "" },
            { title: "Deaths", field: "Death" },
            { title: "Last Updated", field: "Date", width: "30%" },
          ]}
          data={this.state.tableArray}
          options={{
            headerStyle: { backgroundColor: "#ffb3ff" },
            paging: true,
            pageSize: 10,
            pageSizeOptions: [10, 20, 50, 100],
          }}
          title="Country List"
        />
      </div>
    );
  }
}
