/**
 * Author: Isamu
 */
import React, {useState} from 'react';
// import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux';
import {doLogout} from 'app/store/auth';
import PropTypes from 'prop-types';
import {
    Box,
    Flex,
    Text,
    Button,
    Stack,
} from '@chakra-ui/react';
import {
    HamburgerIcon,
    CloseIcon,
    SettingsIcon,
} from '@chakra-ui/icons';

import {
    Link
} from "react-router-dom";

import UserSearchBar from 'app/components/UserSearchBar';
 
function Logo(props) {
    return (
        <Box {...props}>
        <Text fontSize="lg" fontWeight="bold">
            Logo
        </Text>
        </Box>
    )
}

function MenuToggle({ toggle, isOpen }) {
    return (
    <Box display={{ base: "block", md: "none" }} onClick={toggle}>
        {isOpen ? <CloseIcon /> : <HamburgerIcon />}
    </Box>
    )
}

MenuToggle.propTypes = {
    toggle: PropTypes.func,
    isOpen: PropTypes.bool
}

function MenuTextItem({children, to='/', ...rest}) {
    return (
        <Link to={to}>
            <Text display="block" {...rest}>
                {children}
            </Text>
        </Link>
    )
}


MenuTextItem.propTypes = {
    children: PropTypes.any,
    to: PropTypes.string
}

function MenuItem({children, to='/', ...rest}) {
    return (
        <Link to={to}>
            {children}
        </Link>
    )
}
MenuItem.propTypes = {
    children: PropTypes.any,
    to: PropTypes.string
}

function MenuLinks({isOpen, ...props}) {
    return (
        <Box
        display={{ base: isOpen ? "block" : "none", md: "block" }}
        flexBasis={{ base: "100%", md: "auto" }}
        {...props}
        >
            <Stack
            spacing={8}
            align="center"
            justify={["center", "space-between", "flex-end", "flex-end"]}
            direction={["column", "row", "row", "row"]}
            pt={[4, 4, 0, 0]}
            >
                <MenuTextItem to="/">Home</MenuTextItem>
                <MenuTextItem to="/wishlist">Wishlist</MenuTextItem>
                <UserSearchBar />
            </Stack>
        </Box>
    )
}
MenuLinks.propTypes = {
    isOpen: PropTypes.bool,
    logOut: PropTypes.func
}
function NavBarContainer({ children, ...props }) {
    return (
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        wrap="wrap"
        w="100%"
        mb={8}
        p={8}
        {...props}
      >
        {children}
      </Flex>
    )
  }
  
NavBarContainer.propTypes = {
    children: PropTypes.any
}
function Navbar({doLogout, ...props}) {
    const [isOpen, setIsOpen] = useState(false)
 
    const toggle = () => setIsOpen(!isOpen)
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
        <NavBarContainer {...props}>
            <Logo
            w="100px"
            />
            <MenuToggle toggle={toggle} isOpen={isOpen} />
            <MenuLinks isOpen={isOpen} />
            <Flex>
                <MenuItem to="/settings"><Button variant='ghost'><SettingsIcon /></Button></MenuItem>
                <Button onClick={logOut} variant='ghost'>Logout</Button>
            </Flex>             
        </NavBarContainer>
    )
}
Navbar.propTypes = {
    doLogout: PropTypes.func
}

export default connect(
    null,
    {doLogout}
)(Navbar);