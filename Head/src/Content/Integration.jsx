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
        backgroundColor: "#c588c5",
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
    const [user, setuserData] = useState([])
    // const [deleted, setDeleted] = useState(false);
    const [mode, setMode] = useState('Add New User')
    const [formData, setFormData] = useState({
        id: '',
        price: '',
        category: '',
        title: '',
    });

    const [selectedUserId, setSelectedUserId] = useState(null);

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        // setMode("Add New data");
        setFormData({ price: "", category: "", title: "" });
        setOpen(true);
    };



    useEffect(() => {
        axios.get('https://fakestoreapi.com/products')
            .then(res => {
                setData(res.data)
            })
            .catch(err => console.log(err))
    }, []);

    console.log(data)


    const handleClose = () => {
        setOpen(false);
    };


    const handleChange = (e) => {

        setFormData({ ...formData, [e.target.id]: e.target.value });

        console.log("Onchange")

        const { id, value } = e.target;
        setuserData({ ...user, [id]: value });

    };


    const handlePutRequest = (id) => {

        setMode("Edit User Details");
        setSelectedUserId(id);
        console.log(id)
        const userToEdit = data.find((e) => e.id === id);
        console.log(userToEdit, "used")
        setFormData({
            price: userToEdit.price,
            category: userToEdit.category,
            title: userToEdit.title,
        });
        setOpen(true);
    };

    const handleDelete = (id) => {
        const apiurl = 'https://fakestoreapi.com/products';

        axios.delete(`${apiurl}/${id}`).then(() => {

            setData((prevEmployees) =>

                prevEmployees.filter((e) => e.id !== id)

            );

        })

            .catch((error) => {

                console.log(error);

            });
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        if (mode === "Add New User") {

            console.log(formData);

            axios.post('https://fakestoreapi.com/products', formData)
                .then((res) => {
                    console.log(res);
                    setData((prevProducts) => [...prevProducts, res.data]);
                    setFormData({ price: "", category: "", title: "" }); // Reset the form data
                    setOpen(false);
                })
                .catch((error) => {
                    console.log(error);
                });
        }

        else if (mode === "Edit User Details") {
            const apiurl = 'https://fakestoreapi.com/products';
            axios
                .put(`${apiurl}/${selectedUserId}`, formData)
                .then(() => {
                    setData((prevData) =>
                        prevData.map((e) =>
                            e.id === selectedUserId ? { ...formData, id: e.id } : e)
                    );
                    handleClose();
                })
                .catch((error) => {
                    console.log(error);
                });
        }

    }




    return (
        <>
            <div>
                <Button variant="contained" onClick={handleClickOpen}>
                    Add Details
                </Button>


                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>{mode}</DialogTitle>
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
                            <StyledTableCell align="right" >Edit</StyledTableCell>
                            <StyledTableCell align="right">Delete</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((user) => (
                            <StyledTableRow key={user.id
                            }>
                                <StyledTableCell component="th" scope="row">
                                    {user.id
                                    }
                                </StyledTableCell>
                                <StyledTableCell align="right">{user.price}</StyledTableCell>
                                <StyledTableCell align="right">{user.category}</StyledTableCell>
                                <StyledTableCell align="right">{user.title}</StyledTableCell>
                                <StyledTableCell align="right"><Button onClick={() => handlePutRequest(user.id)}>Edit</Button></StyledTableCell>

                                <StyledTableCell align="right" onClick={() => handleDelete(user.id)}><Button >Delete</Button></StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </>
    )
}



export default Integration;