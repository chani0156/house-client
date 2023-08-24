import { useState } from 'react';

type Severity = 'success' | 'error';

interface SnackbarInfo {
  open: boolean;
  message: string;
  severity: Severity;
}

const useSnackbar = () => {
  const [snackbarInfo, setSnackbarInfo] = useState<SnackbarInfo | null>(null);

  const openSnackbar = (message: string, severity: Severity) => {
    setSnackbarInfo({
      open: true,
      message,
      severity,
    });
  };

  const closeSnackbar = () => {
    setSnackbarInfo(null);
  };

  return {
    snackbarInfo,
    openSnackbar,
    closeSnackbar,
  };
};

export default useSnackbar;
