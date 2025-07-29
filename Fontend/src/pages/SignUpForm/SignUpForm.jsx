import { Container, Paper, Typography, Box, TextField, Button, Divider } from '@mui/material';
import { Link } from 'react-router-dom';


export default function SignUpForm() {
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
                        Đăng Ký
                    </Typography>
                    <Box display="flex" flexDirection="column" gap={2}  >
                        <TextField label="Họ và tên" variant="outlined" size="small" fullWidth />
                        <TextField label="Email" variant="outlined" size="small" fullWidth />
                        <TextField label="Password" type="password" variant="outlined" size="small" fullWidth />
                        <Box textAlign="center">

                        </Box>
                        <Button variant="contained" size="medium" fullWidth>
                            Đăng ký
                        </Button>

                        <Typography align="center" variant="body2" sx={{ p: 0 }}>
                            Đã có tài khoản?{' '}
                            <Link to="/" underline="hover">
                                Đăng nhập
                            </Link>
                        </Typography>
                    </Box>

                </Paper>
            </Box >
        </Container >
    )
}