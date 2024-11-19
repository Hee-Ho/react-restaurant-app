import { Navbar, Container, Nav } from 'react-bootstrap';
import { Cart } from '../cartdrawer/cart.components'
import './navbar.styles.css'


// Navigation bar that is used on all pages in the client application.
export function NavBar({cid, cartItems, quantities, handleChange, removeFromCart, checkout}) {
  return (
    <Navbar expand="lg" className="bg-body-tertiary sticky">
      <Container>
        <Navbar.Brand href={`../../home/${cid}`}>Ordering App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                <Nav.Link href={`../../home/${cid}`}>Home</Nav.Link>
                <Nav.Link href={`../../orders/${cid}`}>Orders</Nav.Link>
            </Nav>
            <Nav className="ml-auto">
                <Cart cartItems={cartItems} quantities={quantities} handleChange={handleChange} removeFromCart={removeFromCart} checkout={checkout}/>
            </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
