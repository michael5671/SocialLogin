import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import React, { useState } from "react";
import MissingFieldsDialog from "../MissingFieldDialog/MissingFieldDialog";

export default function GooglePeopleLogin() {
    const [missingFields, setMissingFields] = useState([]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [userPayload, setUserPayload] = useState(null); //  dữ liệu tạm
    const navigate = useNavigate();

    const login = useGoogleLogin({
        flow: 'implicit',
        prompt: 'consent',
        scope: `
            profile email 
            https://www.googleapis.com/auth/user.phonenumbers.read 
            https://www.googleapis.com/auth/user.birthday.read 
            https://www.googleapis.com/auth/user.addresses.read 
            https://www.googleapis.com/auth/user.gender.read
        `.trim().replace(/\s+/g, ' '),
        onSuccess: async (tokenResponse) => {
            const accessToken = tokenResponse.access_token;

            try {
                const res = await axios.get('https://people.googleapis.com/v1/people/me', {
                    params: {
                        personFields: 'names,emailAddresses,genders,birthdays,phoneNumbers,addresses,photos',
                    },
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                const data = res.data;

                const missing = [];
                if (!data.names?.length) missing.push("Tên");
                if (!data.emailAddresses?.length) missing.push("Email");
                if (!data.genders?.length) missing.push("Giới tính");
                if (!data.birthdays?.length) missing.push("Ngày sinh");
                if (!data.phoneNumbers?.length) missing.push("Số điện thoại");
                if (!data.addresses?.length) missing.push("Địa chỉ");

                const name = data.names?.[0]?.displayName || 'Unknown';
                const email = data.emailAddresses?.[0]?.value || null;
                const gender = data.genders?.[0]?.value || null;
                const phone = data.phoneNumbers?.[0]?.value || null;
                const address = data.addresses?.[0]?.formattedValue || null;
                const avatar = data.photos?.[0]?.url || null;
                const google_id = data.resourceName?.split('/')[1] || null;

                const bday = data.birthdays?.[0]?.date;
                const birthdate = bday
                    ? `${bday.year}-${String(bday.month).padStart(2, '0')}-${String(bday.day).padStart(2, '0')}`
                    : null;

                const payload = {
                    name,
                    email,
                    gender,
                    phone,
                    address,
                    avatar,
                    birthdate,
                    google_id
                };

                if (missing.length > 0) {
                    setMissingFields(missing);
                    setUserPayload(payload); // 
                    setDialogOpen(true);
                } else {
                    await proceedLogin(payload); // nếu không thiếu gì thì gửi luôn
                }

            } catch (error) {
                console.error('Google Login Error', error);
            }
        },
        onError: () => {
            console.error('Người dùng đã đóng popup hoặc từ chối xác thực.');
        }
    });

    const proceedLogin = async (payload) => {
        try {
            const response = await axios.post('http://localhost:8080/api/login/google', payload);
            const { token, user } = response.data;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            navigate('/profile', { state: { user } });
        } catch (error) {
            console.error("Login error", error);
        }
    };

    const handleDialogClose = async () => {
        setDialogOpen(false);
        if (userPayload) {
            await proceedLogin(userPayload);
        }
    };

    return (
        <>
            <button
                style={{
                    background: "#fff",
                    border: "1px solid #ddd",
                    padding: "10px 20px",
                    borderRadius: "4px"
                }}
                onClick={() => login()}
            >
                <img
                    src="https://developers.google.com/identity/images/g-logo.png"
                    width="20"
                    alt="google icon"
                    style={{ marginRight: 10 }}
                />
                Đăng nhập với Google
            </button>

            <MissingFieldsDialog
                open={dialogOpen}
                onClose={handleDialogClose}
                missingFields={missingFields}
            />
        </>
    );
}
