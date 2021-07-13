import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { useMutation, DocumentNode } from '@apollo/client';
import CircularProgress from '@material-ui/core/CircularProgress';
import CancelIcon from '@material-ui/icons/Cancel';
import APPLICATION_STATUS from '../../mutations/changeApplicationStatus.graphql';
import FILTER_APPLICATIONS from '../../queries/filter-applications.graphql';
import { FilterApplicationsType } from '../../types/filter-applications-query-types';

const useStyles = makeStyles((theme) => ({
  DialogContent: {
    width: theme.spacing(45),
    '@media only screen and (max-width: 600px)': {
      width: '100%',
    },
  },
  avatar: {
    margin: 'auto',
    width: theme.spacing(10),
    height: theme.spacing(10),
    backgroundColor: theme.palette.primary.main,
  },
  descriptionGrid: {
    height: '200px',
    padding: theme.spacing(4),
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
      width: 10,
    },
    '&::-webkit-scrollbar-track': {
      borderRadius: '8px',
      boxShadow: 'inset 0 0 6px rgba(0, 0, 0, 0.3)',
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: '8px',
      backgroundColor: 'darkgrey',

    },

  },
}));

interface NewRequestDialogProps {
  openRejectionDialog: boolean,
  handleCloseParentDialog: () => void,
  handleCloseRejectionDialog: ()=> void,
  dialogContentID: string,
  applicationInfo: FilterApplicationsType
}

export default function RejectionDialog(props:NewRequestDialogProps): JSX.Element {
  const {
    openRejectionDialog,
    handleCloseParentDialog,
    handleCloseRejectionDialog,
    dialogContentID,
    applicationInfo,
  } = props;
  const classes = useStyles();
  const [msg, setMsg] = React.useState<string>('Estimado postulante, usted no cumple con los requisitos de esta postulación.');
  const [nextStatus,
    { loading: nextStatusMutLoading, error: nextStatusMutError }] = useMutation(APPLICATION_STATUS);

  function handleRejection() {
    return nextStatus({
      variables: {
        changeApplicationStatusApplicationId: applicationInfo.id,
        changeApplicationStatusStatus: 'REJECTED',
      },
      refetchQueries: [{
        query: FILTER_APPLICATIONS as DocumentNode,
        variables: { jobOfferId: applicationInfo.jobOfferId },
      }],
    }).then(() => {
      handleCloseRejectionDialog();
      handleCloseParentDialog();
    }).catch((mutErr) => { throw (mutErr); });
  }
  return (
    <Dialog
      open={openRejectionDialog}
      onClose={handleCloseRejectionDialog}
      aria-labelledby="applicant-info-details"
    >
      <DialogTitle id="applicant-info-details" style={{ textAlign: 'center' }}>
        Mensaje rechazo postulación

      </DialogTitle>
      <DialogContent className={classes.DialogContent}>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
        >
          {dialogContentID}
          <TextField
            label="Escriba un mensaje..."
            style={{ width: '90%' }}
            margin="normal"
            multiline
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            rows={4}
            variant="outlined"
            inputProps={{ style: { fontSize: 'small' } }}
          />
        </Grid>

      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseRejectionDialog} color="primary">
          Cancelar
        </Button>
        <Button
          onClick={handleRejection}
          style={{ color: 'red' }}
          disabled={(nextStatusMutLoading)}

        >

          Enviar rechazo postulación
          {' '}
          {nextStatusMutLoading && <CircularProgress size={15} />}
          {nextStatusMutError && <CancelIcon color="error" />}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
