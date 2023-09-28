import React, {useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';

const RegistrationForm = () => {
    const [open, setOpen] = React.useState(false);

    const[data, setData] =useState([])
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    
    return (
        <div>
            <Button variant="contained" onClick={handleClickOpen}>
                Register Here
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Registration Form</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <div>
                            <Grid container spacing={1} >

                                <Grid item xs={5}>
                                    <label><b>First Name</b></label>

                                    <TextField
                                        required id="outlined-required" label="First Name" />
                                </Grid>

                                <Grid item xs={5}>
                                    <label><b>Last Name</b></label>
                                    <TextField
                                        required id="outlined-required" label="Last Name" />
                                </Grid>

                                <Grid item xs={5}>
                                    <label><b>Cultural</b></label>
                                    <TextField
                                        required id="outlined-required" label="Script,Dance,Singing...." />
                                </Grid>

                                <Grid item xs={5}>
                                    <label><b>Email id</b></label>
                                    <TextField
                                        required id="outlined-required" label="email" />
                                </Grid>

                                <Grid item xs={5}>
                                    <label><b>Mobile Number</b></label>
                                    <TextField
                                        required id="outlined-required" label="mobile no" />
                                </Grid>

                            </Grid>

                        </div>

                    </DialogContentText>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant='contained'>Submit</Button>

                </DialogActions>
            </Dialog>
        </div >
    );
}

export default RegistrationForm;