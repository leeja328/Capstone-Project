import React from 'react';
import { styled } from '@mui/system';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import food_image from '../../assets/images/plantfood.jpeg';
import { getAuth } from 'firebase/auth';
import userEvent from '@testing-library/user-event';
import { GoogleButton } from '../SignIn/SignIn';
import logo_image from '../../assets/images/DECIDE2.jpg'
import { Nav } from "../Nav"
import { Uhome } from "../Uhome"

interface Props {
    title: string;
}

// Create Styled Components with styled-components -basically HTML elements
const Root = styled("div")({
    padding: 0,
    margin: 0
})

const NavbarContainer = styled("div")({
    backgroundColor: '#F6F6F6',
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
const Main = styled('main')({
    backgroundImage:`url(${food_image})`,
    backgroundColor: '#F6F6F6',
    width: '100%',
    height: '100%',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    position: 'absolute',
})

const MainText = styled('div')({
    textAlign: 'center',
    position: 'relative',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: 'white'
})

const Div = styled('div')({
    textAlign: 'center',
    position: 'relative',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: 'white'
})

export const Home = ( props:Props) => {
 
    return (
        <>
            <Nav />
            <Main>
                <MainText>   
                    <h1>Sign In To Start Finding Your Favorite Foods!</h1>
                </MainText>
            </Main>
            <Div>
                <Uhome/>
            </Div>  
            
        </>
    )
}