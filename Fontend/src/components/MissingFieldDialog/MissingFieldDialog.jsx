import * as React from 'react';
import {
    Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions,
    Button
} from '@mui/material';

export default function MissingFieldsDialog({ open, onClose, missingFields }) {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="missing-fields-dialog-title"
            aria-describedby="missing-fields-dialog-description"
        >
            <DialogTitle id="missing-fields-dialog-title">
                Thiếu quyền truy cập thông tin
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="missing-fields-dialog-description">
                    Người dùng đã từ chối cấp quyền cho các thông tin sau:
                    <ul>
                        {missingFields.map((field, index) => (
                            <li key={index}>{field}</li>
                        ))}
                    </ul>
                    
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} autoFocus>
                    Đóng
                </Button>
            </DialogActions>
        </Dialog>
    );
}
