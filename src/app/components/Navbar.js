/**
 * Author: Isamu
 */
import React from 'react';
import { NavLink } from 'react-router-dom'
import { Nav, Navbar, Button, NavDropdown } from 'react-bootstrap';
import 'firebase/auth';
import { connect } from 'react-redux';
import {doLogout} from 'app/store/auth';

/**
 * Returns NavBar
 */
function KiaraNavbar({doLogout}) {

    /**
     * Logs out from firebase
     */
    async function logOut() {
        try {
            await doLogout();
            window.location = '/';
        } catch (e) {
            console.error(e);
        }
    }
    return (
        <Navbar  bg="dark" variant="dark" >
            <Navbar.Brand as={NavLink} exact to="/">Kiara</Navbar.Brand>
            <Nav
            activeKey="/"
            className="mr-auto"
            >
                <Nav.Item>
                    <Nav.Link as={NavLink} to="/" className="nav-link">Dashboard</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link as={NavLink} to="/notification" className="nav-link">Notification</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link as={NavLink} exact to="/mail" className="nav-link">Mail</Nav.Link>
                </Nav.Item>
                {/*<Nav.Item>
                    <Nav.Link as={NavLink} to="/setting" className="nav-link">Setting</Nav.Link>
                </Nav.Item>*/}
                <Nav.Item>
                    <NavDropdown title="Setting">
                        <NavDropdown.Item as={NavLink} to="/setting-1/email-settings" style={{color: 'black', backgroundColor: 'white'}}>
                            Email Settings
                        </NavDropdown.Item>
                        <NavDropdown.Item as={NavLink} to="/setting-1/translation-settings" style={{color: 'black', backgroundColor: 'white'}}>
                            Translation Settings
                        </NavDropdown.Item>
                        <NavDropdown.Item as={NavLink} to="/setting-1/client-email-settings" style={{color: 'black', backgroundColor: 'white'}}>
                            Per Client Email Settings
                        </NavDropdown.Item>
                    </NavDropdown>
                </Nav.Item>
            </Nav>
            <Button variant="outline-danger" onClick={logOut}>
            Log Out
          </Button>
        </Navbar>
    )
}


export default connect(
    null,
    {doLogout}
)(KiaraNavbar);