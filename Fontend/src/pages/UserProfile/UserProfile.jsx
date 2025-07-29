import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';

import {
    Container,
    Typography,
    Paper,
    Grid,
    TextField,
    Avatar,
    Button,
    Box,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Divider,
} from "@mui/material";
import axios from "axios"

export default function UserProfile() {
    const [user, setUser] = useState(null);
    const location = useLocation();
    useEffect(() => {
        const token = localStorage.getItem("token");
        const localUser = JSON.parse(localStorage.getItem("user"));

        if (location.state?.user) {
            setUser(location.state.user); 
        } else if (localUser) {
            setUser(localUser); 
        }

        if (token) {
            axios.get("http://localhost:8080/api/user", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then(res => {
                    setUser(res.data);
                    localStorage.setItem("user", JSON.stringify(res.data));
                })
                .catch(err => {
                    console.error("Failed to fetch user from API", err);
                });
        }
    }, []);

    if (!user) return <Typography>Loading...</Typography>;

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h5" align="left" gutterBottom>
                User Profile
            </Typography>

            <Paper sx={{ p: 4, mb: 4 }} elevation={3}>
                <Typography variant="h6" gutterBottom align="left" >
                    Basic Info
                </Typography>
                <Grid container spacing={3} alignItems="center">
                    <Grid item xs={12} md={3}>
                        <Box display="flex" flexDirection="column" alignItems="center">
                            <Avatar
                                src={user.avatar}
                                sx={{ width: 100, height: 100, mb: 2 }}
                            />
                            <Typography variant="subtitle1">{user.name}</Typography>
                            <Typography variant="body2">User ID: {user.id}</Typography>

                        </Box>
                    </Grid>

                    <Grid item xs={12} md={9}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField fullWidth label="Tên" value={user.name} />
                            </Grid>
                            {/* <Grid item xs={12} sm={6}>
                            <TextField fullWidth label="Ngày sinh" value={user.birth_date}/>
                            </Grid> */}
                            {/* <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <InputLabel>Department</InputLabel>
                                    <Select value="UI/UX" label="Department">
                                        <MenuItem value="UI/UX">UI/UX</MenuItem>
                                        <MenuItem value="Marketing">Marketing</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <InputLabel>Position</InputLabel>
                                    <Select value="Designer" label="Position">
                                        <MenuItem value="Designer">Designer</MenuItem>
                                        <MenuItem value="Manager">Manager</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField fullWidth label="Hired Date" type="date" value="2023-03-01" InputLabelProps={{ shrink: true }} />
                            </Grid> */}
                            <Grid item xs={12} sm={6}>
                                <TextField fullWidth label="Ngày sinh" type="date" value={user.birth_date} InputLabelProps={{ shrink: true }} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField fullWidth label="Giới tính" value={
                                    user?.gender?.toLowerCase() === "male" ? "Nam" :
                                        user?.gender?.toLowerCase() === "female" ? "Nữ" :
                                            ""
                                } />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 4 }} elevation={3}>
                        <Typography variant="h6" gutterBottom>
                            Contacts
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField fullWidth label="Phone" value={user.phone} />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField fullWidth label="Email" value={user.email} />
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 4 }} elevation={3} >
                        <Typography variant="h6" gutterBottom>
                            Address
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12} >
                                <TextField fullWidth label="Address" value={user.address} />
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
            <Button variant="contained" color="success" size="Large" sx={{ mt: 3 }}>
                Save
            </Button>
        </Container>
    );
}
