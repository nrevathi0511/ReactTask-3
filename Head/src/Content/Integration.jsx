import React, { useEffect, useState } from "react";
import axios from 'axios';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from "@mui/material";

import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));


function Integration() {

    const [data, setData] = useState([])

    const [formData, setFormData] = useState({
        Firstname: "",
        Lastname: "",
        Cultural: "",
        Emailid: "",
        Mobilenumnber: "",
    });

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = (index) => {
        const newData = data.filter((item, i) => i !== index);
        setData(newData);
    }

    const handleEdit = (index) => {
        const itemToEdit = data[index];
        setFormData(itemToEdit);
        handleDelete(index);
    }


    useEffect(() => {
        axios.get('https://fakestoreapi.com/products')
            .then(res => {
                setData(res.data)
            })
            .catch(err => console.log(err))
    }, []);

    console.log(data)

    return (
        <>
            <div>
                <Button variant="contained" onClick={handleClickOpen}>
                    Add Details
                </Button>


                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Registration Form</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            <div>
                                <Grid container spacing={1} >

                                    <Grid item xs={5}>
                                        <label><b>ID</b></label>

                                        <TextField
                                            required id="outlined-required"  />
                                    </Grid>

                                    <Grid item xs={5}>
                                        <label><b>Price</b></label>
                                        <TextField
                                            required id="outlined-required"  />
                                    </Grid>

                                    <Grid item xs={5}>
                                        <label><b>Category</b></label>
                                        <TextField
                                            required id="outlined-required"  />
                                    </Grid>

                                    <Grid item xs={5}>
                                        <label><b>Title</b></label>
                                        <TextField
                                            required id="outlined-required" />
                                    </Grid>

                                </Grid>

                            </div>

                        </DialogContentText>

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} variant='contained'>Submit</Button>

                    </DialogActions>
                </Dialog>

            </div>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>ID</StyledTableCell>
                            <StyledTableCell align="right">Price</StyledTableCell>
                            <StyledTableCell align="right">Category</StyledTableCell>
                            <StyledTableCell align="right">Title</StyledTableCell>
                            <StyledTableCell align="right">Edit</StyledTableCell>
                            <StyledTableCell align="right">Delete</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row) => (
                            <StyledTableRow key={row.id
                            }>
                                <StyledTableCell component="th" scope="row">
                                    {row.id
                                    }
                                </StyledTableCell>
                                <StyledTableCell align="right">{row.price}</StyledTableCell>
                                <StyledTableCell align="right">{row.category}</StyledTableCell>
                                <StyledTableCell align="right">{row.title}</StyledTableCell>
                                <StyledTableCell align="right"><Button>Edit</Button></StyledTableCell>

                                <StyledTableCell align="right"><Button>Delete</Button></StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </>
    )
}

export default Integration;