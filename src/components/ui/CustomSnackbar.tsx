import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

type CustomSnackbarProps = {
  message?: string;
  severity?: 'success' | 'warning' | 'error' | 'info';
  open: boolean;
};

export default function CustomSnackbar(props: CustomSnackbarProps) {
  return (
    <div>
      <Snackbar
        open={props.open}
        autoHideDuration={2000}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          severity={props.severity}
          variant='standard'
          sx={{ width: '100%' }}
        >
          {props.message}
        </Alert>
      </Snackbar>
    </div>
  );
}