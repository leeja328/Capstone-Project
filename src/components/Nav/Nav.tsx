import React from 'react';
import { styled } from '@mui/system';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import food_image from '../../assets/images/body2.png';
import { getAuth } from 'firebase/auth';
import userEvent from '@testing-library/user-event';
import { GoogleButton } from '../SignIn/SignIn';
import logo_image from '../../assets/images/DECIDE.jpg'

interface Props {
    title: string;
}

const Root = styled("div")({
    padding: 0,
    margin: 0
})

const NavbarContainer = styled("div")({
    backgroundColor: '#F6F6F6',
    fontFamily: "arial",
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
})

const Logo = styled("h1")({
    
    margin: '0 0 0 0.45em'
    
})


const LogoA = styled(Link)({
    
    
})

const LogoNavigation = styled('ul')({
    backgroundColor: '#F6F6F6',
    listStyle: 'none',
    textTransform: 'uppercase',
    textDecoration: 'none',
    display: 'flex',
    
})

const NavA = styled(Link)({
    backgroundColor: '#F6F6F6',
    font: 'arial',
    
    display: 'block',
    padding: '2em',
    
    color: '#5E553A',
    textDecoration: 'none'
    
    
})

export const Nav = () => {
 
    return (
        <Root>
            <NavbarContainer>
                <Logo>
                    <LogoA to="#"><img style={{ width: 90, height: 90 }} src={logo_image} className="photo"/></LogoA>
                </Logo>
                <LogoNavigation>
                    <li>
                        <NavA to="/">Home</NavA>
                    </li>
                    <li>
                        <NavA to="/dashboard">Favorites</NavA>
                    </li>
                    <li>
                        <NavA to="/search">Search</NavA>
                    </li>
                    <li>
                        <NavA to="/signin">Sign In</NavA>
                    </li>
                </LogoNavigation>
            </NavbarContainer>


        </Root>
    )
}