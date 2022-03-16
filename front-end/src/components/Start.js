import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { API_URL } from "../config";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Rdv from "./rdv";

import toastr from 'toastr'
import "toastr/build/toastr.css"


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    border: '3px'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function UserCreate() {
  const classes = useStyles();
  //POPUP RDV
  const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };

  
    const handleClose = () => {
      setOpen(false);
      localStorage.clear();

    };

  const handleSubmit = event => {
    event.preventDefault();
    var data = {
      "choice":"adult",
      'cin': CIN,
      'date_fin_cin': date
      ,
    }
    fetch(`${API_URL}SearchUser`, {
        method: 'POST',
        headers:{
          "Accept":"application/json",
          "Content-Type":"application/json"
      },
        body: JSON.stringify(data),
      })
      .then(res => res.json())
      .then(res => {
        if(res.status === false){
          window.location = '/newUser'
        }else{
          if(res.data.rdv === null ){
            if(res.msg ==="dose1"){
              window.location = '/newUser'
              toastr.info('New User','Please insert all info',{positionClass:"toastr-bottom-left"})
            }
            if(res.msg==="dose2"){
              localStorage.setItem('token-Dose',JSON.stringify(res.data.cin))
              window.location = '/dose2'
  
            }
            if(res.msg==="dose3"){
              localStorage.setItem('token-Dose',JSON.stringify(res.data.cin))
              window.location = '/dose3'
  
            }
          }else{
            console.log(res.data.rdv)
            localStorage.setItem('token-RDV',JSON.stringify(res.data.rdv))
              handleClickOpen(!open) 
          }
        }
       
           
    })
    }

  const [CIN, setCIN] = useState('');
  const [date, setdate] = useState('');


  return (
    <Container maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Take a RdV 
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="CIN"
                label="CIN"
                onChange={(e) => setCIN(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="date"
                type="date"
                onChange={(e) => setdate(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Take
          </Button>
        </form>
      </div>
      {<Rdv handleClose={handleClose} open={open} />}
    </Container>

  );
}