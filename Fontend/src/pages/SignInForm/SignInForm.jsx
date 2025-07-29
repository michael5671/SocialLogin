import React from 'react';
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import GooglePeopleLogin from "../../components/GooglePeopleLogin/GooglePeopleLogin";

import { Container, Paper, Typography, Box, TextField, Button, Divider } from '@mui/material';
import { Link } from 'react-router-dom';

export default function SignInForm() {
    const handleGoogleLogin = async (response) => {
        const credential = response.credential;
        const accessToken = response.access_token; // lấy từ OAuth hoặc popup API

        axios.post('/api/auth/google-login', {
            token: credential,
            access_token: accessToken
        })
    }
    return (
        <Container fixed >
            <Box
                display="flex"
                justifyContent="center"
                alignItems="flex-start"
                pt={6}
            >
                <Paper
                    elevation={3}
                    sx={{
                        mt: 4,
                        p: { xs: 4, md: 6 },
                        width: '100%',

                        mx: "auto",
                        borderRadius: 4,
                    }}>
                    <Typography variant="h4" align="left" gutterBottom>
                        Đăng nhập
                    </Typography>
                    <Box display="flex" flexDirection="column" gap={2}  >
                        <TextField label="Email" variant="outlined" size="small" fullWidth />
                        <TextField label="Password" type="password" variant="outlined" size="small" fullWidth />
                        <Box textAlign="center">
                            <Link href="/forgot-password" variant="body2">
                                Quên mật khẩu?
                            </Link>
                        </Box>
                        <Button variant="contained" size="medium" fullWidth>
                            Đăng nhập
                        </Button>
                        <Divider>Hoặc</Divider>
                        {/* <GoogleLogin
                            onSuccess={handleGoogleLogin}

                            onError={() => console.log("Google Login Failed")}

                            scope="profile email https://www.googleapis.com/auth/user.birthday.read https://www.googleapis.com/auth/user.phonenumbers.read https://www.googleapis.com/auth/user.addresses.read https://www.googleapis.com/auth/user.gender.read"

                        /> */}
                        <GooglePeopleLogin />
                        <Typography align="center" variant="body2" sx={{ p: 0 }}>
                            Chưa có tài khoản?{' '}
                            <Link to="/signup" underline="hover">
                                Tạo tài khoản
                            </Link>
                        </Typography>
                    </Box>

                </Paper>
            </Box >
        </Container >
    )

}