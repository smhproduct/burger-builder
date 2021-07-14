import React from 'react';
import { Navbar, NavbarBrand, Nav, NavItem } from 'reactstrap';
import './Header.css';
import Logo from '../../assets/logo.png';
import { NavLink } from 'react-router-dom';//IMPORTANT:: NavLink kintu reactstrap thekeo ana jay, but oita amar code er shathe functional hobena as ami Main.js e Route ta react-router-dom theke korsilam, ekhaneo tai similar rakhte hobe

const Header = () => {
    return (
        <div className="Navigation">
            <Navbar style={{ backgroundColor: '#D70F64', height: '70px' }}>
                <NavbarBrand href='/' className="mr-auto ml-md-5 Brand"><img src={Logo} alt="Logo" width='80px' /></NavbarBrand>
                <Nav className='mr-md-5'>
                    <NavItem>
                        <NavLink exact to='/' className='NavLink'>Burger Builder</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink exact to='/orders' className='NavLink'>Orders</NavLink>
                    </NavItem>
                </Nav>
            </Navbar>
        </div>
    )
}
export default Header;