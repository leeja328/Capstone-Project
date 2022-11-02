import React, { useState } from 'react';
import { DataGrid, GridColDef, GridSelectionModel } from '@mui/x-data-grid';
import { serverCalls } from '../../api';
import { useGetData } from '../../custom-hooks';
import { Button,Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle } from '@mui/material';
import { FoodForm } from '../FoodForm';
import { getAuth } from 'firebase/auth'


const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', flex: 1, minWidth: 130 },
  {
      field: 'rank',
      headerName: 'Rank',
      width: 150,
      editable: true,
  },
  {
      field: 'food',
      headerName: 'Food',
      type: 'number',
      width: 110,
      editable: true,
  },
  {
      field: 'pic',
      headerName: 'Pic',
      description: 'This column has a value getter and is not sortable.',
      width: 90
  },

]
  
  interface gridData{
    data:{
      id?:string;
    }
  }



  
export const DataTable = () => {
  const auth = getAuth()
  let { foodData, getData } = useGetData()
  let [open, setOpen] = useState(false);
  let [gridData, setData] = useState<GridSelectionModel>([])

  let handleOpen = () => {
    setOpen(true)
  }

  let handleClose = () => {
    setOpen(false)
  }

  let deleteData = () => {
    serverCalls.delete(`${gridData[0]}`)
    getData()
  }

  console.log(gridData) // a list of id's from checked rows
  if (auth.currentUser) {
    return (
        <div style={{ height: 600, width: '100%' }}>
            <h2>Favorite Food</h2>
            <DataGrid
                rows={foodData}
                columns={columns}
                pageSize={9}
                rowsPerPageOptions={[9]}
                checkboxSelection
                onSelectionModelChange = {(newSelectionModel) => {setData(newSelectionModel);}}
                {...foodData}
            />
            <Button onClick={handleOpen}>Update</Button>
            <Button variant="contained" color="secondary" onClick={deleteData}>Delete</Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">Update List</DialogTitle>
              <DialogContent>
                <DialogContentText>Food id: {gridData[0]}</DialogContentText>
                <FoodForm id={`${gridData[0]}`}/>
              </DialogContent>
              <DialogActions>
                <Button onClick = {handleClose} color="primary">Cancel</Button>
                <Button onClick={handleClose} color = "primary">Done</Button> 
              </DialogActions>
            </Dialog>
        </div>
      )
    } else {
        return(
        <div>
            <h3>Please Sign In to View Your Food Favorites</h3>
        </div>
    )};

}