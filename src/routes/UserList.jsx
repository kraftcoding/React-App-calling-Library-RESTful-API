import React, { Component } from "react";
import DataService from "../Services/DataService"
import { Link } from "react-router-dom";

export default class UsersList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchName = this.onChangeSearchName.bind(this);
    this.retrieveUsers = this.retrieveUsers.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveUsers = this.setActiveUsers.bind(this);
    this.removeAllUsers = this.removeAllUsers.bind(this);
    this.searchName = this.searchName.bind(this);

    this.state = {
      Users: [],
      currentUsers: null,
      currentIndex: -1,
      searchName: ""
    };
  }

  componentDidMount() {
    this.retrieveUsers();
  }

  onChangeSearchName(e) {
    const searchName = e.target.value;

    this.setState({
      searchName: searchName
    });
  }

  retrieveUsers() {
    DataService.getAll()
      .then(response => {
        this.setState({
          Users: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveUsers();
    this.setState({
      currentUsers: null,
      currentIndex: -1
    });
  }

  setActiveUsers(Users, index) {
    this.setState({
      currentUsers: Users,
      currentIndex: index
    });
  }

  removeAllUsers() {
    DataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchName() {
    this.setState({
      currentUsers: null,
      currentIndex: -1
    });

    DataService.findByName(this.state.searchName)
      .then(response => {
        this.setState({
          Users: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchName, Users, currentUsers, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by name"
              value={searchName}
              onChange={this.onChangeSearchName}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchName}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Users List</h4>

          <ul className="list-group">
            {Users &&
              Users.map((Users, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveUsers(Users, index)}
                  key={index}
                >
                  {Users.name}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllUsers}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentUsers ? (
            <div>
              <h4>Users</h4>
              <div>
                <label>
                  <strong>Name:</strong>
                </label>{" "}
                {currentUsers.name}
              </div>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentUsers.email}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentUsers.published ? "Published" : "Pending"}
              </div>

              <Link
                to={"/user/" + currentUsers.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Users...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
