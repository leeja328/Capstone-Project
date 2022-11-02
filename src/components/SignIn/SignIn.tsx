import React, {useState} from 'react';
import firebase from 'firebase/app';
import { useSigninCheck } from 'reactfire';
import { useForm } from 'react-hook-form';
import { useAuthState, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signOut,createUserWithEmailAndPassword,signInWithEmailAndPassword } from 'firebase/auth'
import { 
    Container,
    Button,
    Typography,
    Snackbar,
    Alert as MUIAlert,
    AlertProps,
    AlertTitle,
    CircularProgress
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Input, Input2 } from '../sharedComponents';
import { Link } from 'react-router-dom'; //Added link so we can navigate to SignUp
import { styled } from '@mui/system';


const signinStyles = {
    googleButton:{
        backgroundColor: 'rgb(66,133,244)',
        margin: '2em',
        padding: '0',
        color: 'white',
        height: '50px',
        width: '240px',
        border: 'none',
        textAlign: 'center',
        boxShadow: 'rgb(0 0 0 / 25%) 0px 2px 4px 0px',
        fontSize: '16px',
        lineHeight: '48px',
        display: 'block',
        borderRadius: '1px',
        fontFamily: 'Roboto, arial, sans-serif',
        cursor: 'pointer'
    },
    googleLogo:{
        width: '48px',
        height: '48px',
        display: 'block'
    },
    typographyStyle: {
        fontFamily: 'Roboto, arial, sans-serif;',
        textAlign: 'center',
        fontSize: '2em'
    },
    containerStyle: {
        marginTop: '2em'
    },
    snackBar: {
        color: 'white',
        backgroundColor: '#4caf50'
    }
}


// Functional components to be used inside of SignIn Component
// Added styled link 
const NavA = styled(Link) ({
    display: 'block',
    color: 'black',
    fontFamily: 'sans-serif',
    marginBottom: '20px'
})



const Alert = (props:AlertProps) =>{
    return <MUIAlert elevation={6} variant='filled' />
}

interface buttonProps{
    open?: boolean,
    onClick?: () => void
}

// Functional component to conditionally render Google SignIn Button
export const GoogleButton = (props:buttonProps) =>{
    const navigate = useNavigate();
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
    onAuthStateChanged( auth, (user)=>{
        if (user){
            
            console.log(user.email)
        }
    })
    const signIn = async ( ) =>{
        await signInWithGoogle()
        localStorage.setItem('myAuth', 'true');
		navigate('/dashboard')
    }

    const signUsOut = async () =>{
        await signOut(auth)
        localStorage.setItem('myAuth', 'false');
        navigate('/')
    }

    if (loading){
        return <CircularProgress color='success'/>
    }

    if (auth.currentUser){
        return (
            <Button variant='contained' color='secondary' onClick={signUsOut}>Sign Out</Button>
        )
    } else {
        return (
            <Button sx={signinStyles.googleButton} onClick={signIn}>Sign In With Google</Button>
        )
    }

}
interface userProps { // added this 
    email?: any,
    password?: any,

}


export const SignIn = (props:userProps)=> {
    const [ open, setOpen ] = useState(false);
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm({})
    const auth = getAuth();
    
    const handleSnackOpen =() =>{
        setOpen(true)
    }
    const handleSnackClose =() =>{
        setOpen(false)
        navigate('/dashboard')
    }

    // Added onSubmit for userSignIn
    const onSubmit = async (data:any, event:any) => { 
        console.log(data.email, data.password)

       
        signInWithEmailAndPassword(auth, data.email, data.password)
        .then((userCredential) => {
            // Signed in 
            //This is how we are storing our local variable if a user is signed in
            localStorage.setItem('myAuth', 'true'); 

            const user = userCredential.user;
            //Once signed in we navigate to dashboard
            navigate('/dashboard')
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage)
        });
    }

    return (
        <Container maxWidth='sm' sx={signinStyles.containerStyle}>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
         <Typography sx={signinStyles.typographyStyle}>
             Sign In Below    
         </Typography>    
         <form onSubmit = {handleSubmit(onSubmit)}>
             <div>
                 <label htmlFor='email'>Email</label>
                 <Input {...register('email')} name='email' placeholder='place email here' />
             </div>
             <div>
                 <label htmlFor='password'>Password</label>
                 <Input2 {...register('password')} name='password' placeholder='place password here' />
             </div>
             <Button type='submit'> Submit </Button>
         </form>
         <NavA to="/signup">Don't have an account? Register now!</NavA>
 
         <GoogleButton open={open} onClick={handleSnackClose} />
         <Snackbar message='Success' open={open} autoHideDuration={3000}>
             <Alert severity='success'>
                 <AlertTitle>Successful Sign In --- Redirect in 3 seconds</AlertTitle>
             </Alert>    
         </Snackbar>
 
        </Container>
     )
 }



 export const SignUp = (props:userProps)=> {
    const [ open, setOpen ] = useState(false);
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm({})
    const auth = getAuth();
    
    const handleSnackOpen =() =>{
        setOpen(true)
    }
    const handleSnackClose =() =>{
        setOpen(false)
        navigate('/dashboard')
    }

    // Added onSubmit for userSignIn
    const onSubmit = async (data:any, event:any) => { 
        console.log(data.email, data.password)

       
        createUserWithEmailAndPassword(auth, data.email, data.password)
        .then((userCredential) => {
            // Signed in 
            //This is how we are storing our local variable if a user is signed in

            const user = userCredential.user;
            //Once signed in we navigate to dashboard
            navigate('/signin')
            console.log(user)
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage)
        });
    }

    return (
        <Container maxWidth='sm' sx={signinStyles.containerStyle}>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
         <Typography sx={signinStyles.typographyStyle}>
             Sign Up & Create Your Account!  
         </Typography>    
         <form onSubmit = {handleSubmit(onSubmit)}>
             <div>
                 <label htmlFor='email'>Email</label>
                 <Input {...register('email')} name='email' placeholder='place email here' />
             </div>
             <div>
                 <label htmlFor='password'>Password</label>
                 <Input2 {...register('password')} name='password' placeholder='place password here' />
             </div>
             <Button type='submit'> Submit </Button>
         </form>
         <Snackbar message='Success' open={open} autoHideDuration={3000}>
             <Alert severity='success'>
                 <AlertTitle>Successful Sign Up --- Redirect in 3 seconds</AlertTitle>
             </Alert>    
         </Snackbar>
 
        </Container>
     )
 }