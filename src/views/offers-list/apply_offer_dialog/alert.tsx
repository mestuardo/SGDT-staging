import React from 'react';
import { Snackbar } from '@material-ui/core';
import MuiAlert, { AlertProps as MuiAlertProps } from '@material-ui/lab/Alert';

function AlertWrapper(props: MuiAlertProps) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

interface AlertProps {
  openSnackbar: boolean,
  setOpenSnackbar: (open: boolean) => void,
  snackbarType: 'error' | 'success',
  snackbarMessage: string,
}

export default function Alert(props: AlertProps) : JSX.Element {
  const {
    openSnackbar, setOpenSnackbar, snackbarType, snackbarMessage,
  } = props;

  return (
    <Snackbar open={openSnackbar} autoHideDuration={5000} onClose={() => setOpenSnackbar(false)}>
      <AlertWrapper onClose={() => setOpenSnackbar(false)} severity={snackbarType}>
        {snackbarMessage}
      </AlertWrapper>
    </Snackbar>
  );
}
