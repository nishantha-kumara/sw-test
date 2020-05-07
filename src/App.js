import React, { Component } from "react";
import "./App.css";
import { users } from "./data/Data";

class App extends Component {
  state = {
    search: null,
  };

  searchSpace = (event) => {
    let keyword = event.target.value;
    this.setState({ search: keyword });
  };

  searchText = (text) => {
    let status = false;
    if (text.name.toLowerCase().includes(this.state.search.toLowerCase())) {
      status = true;
    } else if (text.organizations.length > 0) {
      status = text.organizations.map((org) =>
        org.name.toLowerCase().includes(this.state.search.toLowerCase())
      )[0];
    }

    if (!status) {
      status = text.organizations.map((org) => {
        const out = org.tickets.map((ticket) =>
          ticket._id.toLowerCase().includes(this.state.search.toLowerCase())
        )[0];
        return out;
      })[0];
    }

    return status;
  };

  render() {
    const items = users.filter((data) => {
      if (this.state.search == null) {
        return data;
      } else if (this.searchText(data)) {
        return data;
      }
    });

    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <br />
            <div className="form-group">
              <label htmlFor="name">Query</label>
              <input
                type="text"
                className="form-control"
                id="name"
                onChange={(e) => this.searchSpace(e)}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Company</th>
                  <th scope="col">Ticket IDs</th>
                </tr>
              </thead>
              <tbody>
                {items.map((data) => (
                  <tr key={data._id}>
                    <th scope="row">1</th>
                    <td>{data.name}</td>
                    <td>
                      {data.organizations.map((org) => (
                        <p key={org._id}>{org.name}</p>
                      ))}
                    </td>
                    <td>
                      {data.organizations.map((org) =>
                        org.tickets.map((tick) => (
                          <p key={tick._id}>{tick._id}</p>
                        ))
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
