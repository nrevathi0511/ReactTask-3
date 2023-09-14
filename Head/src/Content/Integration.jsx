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
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));


function Integration() {

    const [data, setData] = useState([])

    const [formData, setFormData] = useState({
        id: '',
        price: '',
        category: '',
        title: '',
    });

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        // setMode("Add New data");
        setFormData({ price: "", category: "", title: "" });
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

    const handleChange = (e) => {

        setFormData({ ...formData, [e.target.id]: e.target.value });

        console.log("Onchage")
    };


    // const handleSubmit = e => {
    //     e.preventDefault()
    //     console.log(data)
    //     axios.post('https://fakestoreapi.com/products', useState)
    //         .then((res) => {
    //             setData((prevProducts) => [...prevProducts, res.data])
    //             console.log(res)
    //         })

    //         .catch(error => {
    //             console.log(error)
    //         })

    //     setOpen(false)
    // }


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData); // Log the form data
    
        axios.post('https://fakestoreapi.com/products', formData)
            .then((res) => {
                console.log(res);
                setData((prevProducts) => [...prevProducts, res.data]);
                setFormData({ price: "", category: "", title: "" }); // Reset the form data
                setOpen(false); // Close the dialog
            })
            .catch((error) => {
                console.log(error);
            });
    };



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
                                <Grid container spacing={0.5} >

                                    <form onSubmit={handleSubmit}>

                                        {/* <Grid item xs={5}>
                                   
                                        <label><b>ID</b></label>
                                    <input
                                        type="text"
                                        id="id"
                                        name="id"
                                        value={formData.id}
                                        onchange={handleChange}
                                    />
                                   
                                    </Grid> */}

                                        <Grid item xs={5}>
                                            <div>
                                                <label><b>Price</b></label>
                                                <input
                                                    type="text"
                                                    id="price"
                                                    name="price"
                                                    value={formData.price}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </Grid>

                                        <Grid item xs={5}>
                                            <div>
                                                <label><b>category</b></label>
                                                <input
                                                    type="text"
                                                    id="category"
                                                    name="category"
                                                    value={formData.category}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </Grid>

                                        <Grid item xs={5}>
                                            <div>
                                                <label><b>title</b></label>
                                                <input
                                                    type="text"
                                                    id="title"
                                                    name="title"
                                                    value={formData.title}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </Grid>

                                        <button type="submit" variant="contained">Submit</button>

                                    </form>
                                </Grid>
                            </div>
                        </DialogContentText>

                    </DialogContent>

                </Dialog>

            </div>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>ID</StyledTableCell>
                            <StyledTableCell align="right">Price</StyledTableCell>
                            <StyledTableCell align="right">category</StyledTableCell>
                            <StyledTableCell align="right">title</StyledTableCell>
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