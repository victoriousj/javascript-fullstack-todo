import { useState, useEffect } from 'react';
import { Nav, Navbar, NavbarBrand, NavItem, NavLink, NavbarText } from 'reactstrap'

function NavigationBar() {
  const [authToken, setAuthToken] = useState();
  const [name, setName] = useState();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setAuthToken(localStorage.getItem("auth-token"));
      setName(localStorage.getItem("user-name"))
    }
  })

  return (
    <Navbar dark expand="lg">
      <NavbarBrand href="/">reactstrap</NavbarBrand>
      <Nav className="mr-auto" navbar>
        <NavItem>
          <NavLink href="/todo/">Todo</NavLink>
        </NavItem>
      </Nav>
      {
        authToken
          ? (<NavbarText>
            <span className="font-weight-bold">{name}</span>
            <span
              className="pointer font-weight-light"
              onClick={() => {
                localStorage.removeItem("auth-token");
                setAuthToken(null);
              }}> (logout)</span>
          </NavbarText>)
          : <NavLink href="/login">Login</NavLink>
      }
    </Navbar>
  );
}

export default NavigationBar;