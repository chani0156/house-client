import React, { useState, useEffect } from 'react';
import { Snackbar, SnackbarContent } from '@mui/material';

interface DynamicSnackbarProps {
  open: boolean;
  message: string;
  severity: 'success' | 'error';
  onClose: () => void;
}

const DynamicSnackbar: React.FC<DynamicSnackbarProps> = React.memo(
  ({ open, message, severity, onClose }) => {
    const [snackbarOpen, setSnackbarOpen] = useState(open);

  useEffect(() => {
    setSnackbarOpen(open);
  }, [open]);

  const handleClose = () => {
    setSnackbarOpen(false);
    onClose();
  };

  return (
    <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleClose}  anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}>
      <SnackbarContent
        message={message}
        sx={{
          backgroundColor: severity === 'success' ? 'green' : 'red',
        }}
      />
    </Snackbar>
    );
  }
);
export default DynamicSnackbar;
