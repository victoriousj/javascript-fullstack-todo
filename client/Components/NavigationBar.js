import { Nav, Navbar, NavbarBrand, NavItem, NavLink } from 'reactstrap'

function NavigationBar() {
  return (
    <Navbar dark expand="lg">
      <NavbarBrand href="/">reactstrap</NavbarBrand>
      <Nav className="mr-auto" navbar>
        <NavItem>
          <NavLink href="/todo/">Todo</NavLink>
        </NavItem>
      </Nav>
      <NavLink href="/login">login</NavLink>
    </Navbar>
  );
}

export default NavigationBar;