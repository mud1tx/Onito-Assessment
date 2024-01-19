import React, { Component } from "react";
import { connect } from "react-redux";
import "datatables.net-responsive-dt";
import "../css/jquery.dataTables.css";
import $ from "jquery";

class DataTable extends Component {
  componentDidMount() {
    this.initializeDataTable();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.data !== this.props.data) {
      this.destroyDataTable();
      this.initializeDataTable();
    }
  }

  componentWillUnmount() {
    this.destroyDataTable();
  }

  initializeDataTable() {
    const { data } = this.props;
    if (data && data.length > 0) {
      const columns = Object.keys(data[0]);
      this.$el = $(this.el);

      this.dataTable = this.$el.DataTable({
        data,
        columns: columns.map((key) => ({ title: key, data: key })),
        responsive: true,
      });
    }
  }

  destroyDataTable() {
    if (this.dataTable) {
      this.dataTable.destroy();
    }
  }

  render() {
    return (
      <div className="mt-6">
        <table
          className="display"
          width="100%"
          ref={(el) => (this.el = el)}
        ></table>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log("state", state);
  return {
    data: state.user.users,
  };
};

export default connect(mapStateToProps)(DataTable);
