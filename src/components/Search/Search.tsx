import React,{ useState,useEffect } from 'react';
import { serverCalls } from '../../api';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { styled } from '@mui/system';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Nav } from "../Nav"
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';


interface SearchProps {
  query?:string;
}

interface Props {
  title: string;
}

const main = {
  marginBlock: "2rem",
  display: "grid",
  gridTemplateColumns: "repeat(2)",
  alignItems: "center",
  justifyContent: "center",
  gap: "4 rem",
  
    
}

const top = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "60px",
  paddingBottom: "60px"
}

const Div = styled('div')({
})



export const Search = (props:SearchProps) => {

    
    const [query, setQuery] = useState('')

    const [container, setContainer] = useState<any[]>([])
  
    const [endPoint,setEndPoint] = useState('')
  
    useEffect(() => {
  
    fetch(`https://edamam-food-and-grocery-database.p.rapidapi.com/parser?ingr=+${query}`, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '4a9ffe65b7mshf589ad9bba8271bp161ed5jsnb5fe9f58258c',
        'X-RapidAPI-Host': 'edamam-food-and-grocery-database.p.rapidapi.com'
    }
    })
    .then(response => {
      return response.json();
    })
    .then(data => {
      setContainer(data.hints)
    })
    .catch(err =>{
      console.error(err);
    })
  
  },[endPoint])
  
    const onChangeHandler = (e: { target: { value: React.SetStateAction<string>; }; }) => {
      setQuery(e.target.value)
    }
  
    const onSubmitHandler = (e: { preventDefault: () => void; }) => {
      e.preventDefault()
      setEndPoint(query)
    }

    
    

    
    
    return (
        <><Nav /><><form style={top} onSubmit={onSubmitHandler} id='add'>

        <Div>
          <Div sx={{
            fontColor: '#5E553A',
            fontFamily: "arial",
            fontSize: "30px",
            
          }}>
            Find Your Favorite Foods
          </Div>
          <br></br>
          <Box
            sx={{
              width: 500,
              maxWidth: '100%',
              color: "#F6F6F6",
            }}
          >
            <TextField fullWidth label="Type Food Here" id="fullWidth" value={query} onChange={onChangeHandler}/>
            <br></br>
            <Stack spacing={2} direction="row">
              <Button variant="contained" type="submit">Submit</Button>
            </Stack>
          </Box>

        </Div>
      </form>
        <Div sx={{
          display: 'flex',
          flexDirection: "row",
          flexWrap: "wrap",
          gap: '20px 10px',
          justifyContent: "space-evenly"
        }}>
          {container.map((item) => {
            return (
              <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image={item.food.image}
                    alt=""/>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {item.food.label}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>);
          })}
        </Div></></>
        
      )};


    