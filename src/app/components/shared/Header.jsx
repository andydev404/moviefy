import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavItem, NavLink, Container } from 'reactstrap';

export default class Header extends Component {
  state = {
    isOpen: false
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  render() {
    return (
      <Navbar expand="md">
        <Container>
          <Link to="/" className="navbar-brand">
            Moviefy
          </Link>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink href="https://twitter.com/andydev404" target="_blank">
                <i className="fab fa-twitter" />
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                href="https://github.com/andydev404/moviefy"
                target="_blank"
              >
                <i className="fab fa-github" />
              </NavLink>
            </NavItem>
          </Nav>
        </Container>
      </Navbar>
    );
  }
}
