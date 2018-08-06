import React, { Component } from "react";
import PropTypes from "prop-types";
import { Consumer } from "../../context";
import axios from "axios";
import { Link } from "react-router-dom";

class Contact extends Component {
  state = {
    showContactInfo: false,
    setOpacityTo1: false
  };
  onDeleteClick = async (id, dispach) => {
    await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
    dispach({ type: "DELETE_CONTACT", payload: id });
  };
  render() {
    const { id, name, email, phone } = this.props.contact;
    const { showContactInfo, setOpacityTo1 } = this.state;

    return (
      <Consumer>
        {value => {
          const { dispach } = value;
          return (
            <div className="card card-body mb-3 ">
              <h4>
                {name}{" "}
                <i
                  onClick={() => {
                    this.setState({
                      showContactInfo: !this.state.showContactInfo
                    });
                    setTimeout(
                      () =>
                        this.setState(state => ({
                          setOpacityTo1: !state.setOpacityTo1
                        })),
                      500
                    );
                  }}
                  className="fas fa-sort-down"
                  style={{ cursor: "pointer" }}
                />
                <i
                  className="fas fa-times"
                  style={{ cursor: "pointer", float: "right", color: "red" }}
                  onClick={this.onDeleteClick.bind(this, id, dispach)}
                />
                <Link to={`contact/edit/${id}`}>
                  <i
                    className="fas fa-pencil-alt"
                    style={{
                      cursor: "pointer",
                      float: "right",
                      color: "black",
                      marginRight: "1rem"
                    }}
                  />
                </Link>
              </h4>
              <div
                style={{
                  height: !showContactInfo ? "0px" : "90px",
                  transition: "all ease 0.5s"
                }}
              >
                {showContactInfo && (
                  <ul
                    className="list-group"
                    style={{
                      opacity: !setOpacityTo1 ? "0" : "1",
                      transition: "all ease 0.5s"
                    }}
                  >
                    <li className="list-group-item">Email: {email}</li>
                    <li className="list-group-item">Tel: {phone}</li>
                  </ul>
                )}
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

Contact.propTypes = {
  contact: PropTypes.object.isRequired
};

export default Contact;
