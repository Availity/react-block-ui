import React, { Component } from 'react';
import { Link } from 'react-router';
import { Container, Navbar, NavbarBrand, Nav, NavItem, NavLink, NavbarToggler, Collapse } from 'reactstrap';

export default class UINav extends Component {
  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = { showNavbar: false };
  }
  toggleNavbar(e) {
    e.preventDefault();
    this.setState({ showNavbar: !this.state.showNavbar });
  }
  render() {
    return (
      <Navbar className="header" full color="faded" light toggleable>
        <Container>
          <NavbarToggler right onClick={this.toggleNavbar} />
          <NavbarBrand className="mr-auto" tag={Link} to="/">React Block UI</NavbarBrand>
          <Collapse navbar isOpen={this.state.showNavbar}>
            <Nav navbar className="ml-sm-auto">
              <NavItem>
                <NavLink tag={Link} className="nav-link" to="/components/" activeClassName="active">Components</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://github.com/availity/react-block-ui">Github</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    );
  }
}