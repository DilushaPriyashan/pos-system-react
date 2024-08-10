import { Outlet } from "react-router-dom";         //link tika common karala ewagen enda oni ewa outlet eken gannawa
import { Link } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import '../css/layout.css';

const Layout = () => {
    return (
        <div>
            <div>
                <Navbar bg="dark" data-bs-theme="dark" fixed="top" > 
                    <Container>
                        <Navbar.Brand className="pos-system" href="/">POS System</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto " style={{ flexGrow: 1 }} >
                                <Nav.Link href="/">Home</Nav.Link>
                                {/* <Nav.Link href="/user">Users</Nav.Link>*/}
                                
                                <Nav.Link href="/customer">Customers</Nav.Link>
                                <Nav.Link href="/item">Items</Nav.Link>
                                <Nav.Link href="/order">Order</Nav.Link>
                                <Nav.Link href="/help">Help</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>

            <Container className="py-4">
                <Outlet/>
            </Container>
            

            <footer class="p-3 bg-dark text-white fixed-bottom">
               <Container style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div>Email : chnpossystem@gmail.com</div>
                        <div>Hotline : 1-800-123-4567</div>

                    </Container> 
            </footer>
        </div>


    )
}
export default Layout;
//className="bg-body-tertiary py-3"