import React from 'react';
import {Navbar, NavDropdown} from 'react-bootstrap';
export default AppNavbar => {

    return (
    <div>
    <Navbar bg = "light" expand = "lg">
    <NavDropdown.Item href="#action/3.1">Home</NavDropdown.Item>
    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
        <li>hello world</li>
    </Navbar>
    </div>
)
}