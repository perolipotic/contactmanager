import React, { Component } from "react";

class AddContact extends Component {
  constructor(props) {
    super(props);
    this.nameInput = React.createRef();
    this.phoneInput = React.createRef();
    this.emailInput = React.createRef();
  }
  onSubmit = e => {
    e.preventDefault();
    const contact = {
      name: this.nameInput.current.value,
      email: this.emailInput.current.value,
      phone: this.phoneInput.current.value
    };
    console.log(contact);
  };
  static defaultProps = { name: "red", email: "dadad@co.com", phone: "221" };
  render() {
    const { name, email, phone } = this.props;
    return (
      <div className="card mb-3">
        <div className="car-header">Add Contact</div>
        <div className="card-body">
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label htmlFor="name">name</label>
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="enter name"
                name="name"
                defaultValue={name}
                ref={this.nameInput}
              />
              <div className="form-group">
                <label htmlFor="email">email</label>
                <input
                  type="email"
                  className="form-control form-control-lg"
                  placeholder="enter email"
                  name="email"
                  defaultValue={email}
                  ref={this.emailInput}
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">phone</label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="enter phone"
                  name="phone"
                  defaultValue={phone}
                  ref={this.phoneInput}
                />
              </div>
              <input
                type="submit"
                defaultValue="Add Contact"
                className="btn btn-light btn-block"
              />
            </div>
          </form>
        </div>
      </div>
    );
  }
}
export default AddContact;
