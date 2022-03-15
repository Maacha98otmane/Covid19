import React, { useEffect, useState } from 'react'
import { API_URL } from "../../config";
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Avatar from '@material-ui/core/Avatar';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    container: {
      marginTop: theme.spacing(2),
    },
    paper: {
      padding: theme.spacing(2),
      color: theme.palette.text.secondary,
    },
  }));


  export default function Citoyen() {
  const classes = useStyles();
    const [users, setUsers] = useState([]);
    useEffect(() => {
        UsersGet()
      }, [])

      const jwt = localStorage.getItem('token-info')
  const region = JSON.parse(jwt).region
  const UsersGet = () => {
    fetch(`${API_URL}getAll/`+region)
      .then(res => res.json())
      .then(
        (result) => {
            console.log(result.users)
          setUsers(result.users)
        }
      )
  }
  return (
    <div className={classes.root}>
      <Container className={classes.container} maxWidth="lg">    
        <Paper className={classes.paper}>
          <Box display="flex">
            <Box flexGrow={1}>
              <Typography component="h2" variant="h6" color="primary" gutterBottom>
                USERS
              </Typography>
            </Box>
          </Box>
          <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Avatar</TableCell>
                <TableCell align="left">Full Name</TableCell>
                <TableCell align="left">Cin</TableCell>
                <TableCell align="left">Dernier Dose</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user._id}>
                  <TableCell align="center">
                    <Box display="flex" justifyContent="center">
                      <Avatar src={user.avatar} />
                    </Box>
                  </TableCell>
                  <TableCell align="left">{user.nom} {user.prenom}</TableCell>
                  { <TableCell align="left">{user.cin}</TableCell>}
                  {user.dose3 === true ? <TableCell align="left">Dose3</TableCell> : 
                  user.dose2 === true ? <TableCell align="left">Dose2</TableCell> : 
                  user.dose1 === true ? <TableCell align="left">Dose1</TableCell> : <TableCell align="left">Pas encore</TableCell>} 
                  <TableCell align="center">
                    <ButtonGroup color="primary" aria-label="outlined primary button group">
                    </ButtonGroup>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        </Paper>
      </Container>
        </div>
  )
}