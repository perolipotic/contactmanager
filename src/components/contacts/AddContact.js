import React, { Component } from "react";
import { Consumer } from "../../context";
import TextInputGroup from "../layout/TextInputGroup";
import axios from "axios";

class AddContact extends Component {
  state = {
    name: "",
    email: "",
    phone: "",
    errors: {}
  };
  onChange = e => this.setState({ [e.target.name]: e.target.value });
  onSubmit = (dispach, e) => {
    e.preventDefault();
    const { name, email, phone } = this.state;

    //Check for Errors
    if (name === "") {
      this.setState({ errors: { name: "Name is req" } });
      return;
    }
    if (email === "") {
      this.setState({ errors: { email: "Email is req" } });
      return;
    }
    if (phone === "") {
      this.setState({ errors: { phone: "Phone is req" } });
      return;
    }
    const newContact = {
      name,
      email,
      phone
    };
    axios
      .post(`https://jsonplaceholder.typicode.com/users`, newContact)
      .then(res => dispach({ type: "ADD_CONTACT", payload: res.data }));
    this.setState({
      name: "",
      email: "",
      phone: "",
      errors: {}
    });

    this.props.history.push("/");
  };
  render() {
    const { name, email, phone, errors } = this.state;
    return (
      <Consumer>
        {value => {
          const { dispach } = value;
          return (
            <div className="card mb-3">
              <div className="car-header">Add Contact</div>
              <div className="card-body">
                <form onSubmit={this.onSubmit.bind(this, dispach)}>
                  <TextInputGroup
                    label="Name"
                    name="name"
                    placeholder="enter name"
                    value={name}
                    onChange={this.onChange}
                    error={errors.name}
                  />
                  <TextInputGroup
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="enter email"
                    value={email}
                    onChange={this.onChange}
                    error={errors.email}
                  />
                  <TextInputGroup
                    label="Phone"
                    name="phone"
                    placeholder="enter phone"
                    value={phone}
                    onChange={this.onChange}
                    error={errors.phone}
                  />

                  <input
                    type="submit"
                    defaultValue="Add Contact"
                    className="btn btn-light btn-block"
                  />
                </form>
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}
export default AddContact;
