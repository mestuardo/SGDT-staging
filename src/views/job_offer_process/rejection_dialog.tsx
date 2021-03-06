import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Typography } from '@material-ui/core';
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
  applicationInfo: FilterApplicationsType
}

export default function RejectionDialog(props:NewRequestDialogProps): JSX.Element {
  const {
    openRejectionDialog,
    handleCloseParentDialog,
    handleCloseRejectionDialog,
    applicationInfo,
  } = props;
  const classes = useStyles();
  const [msg, setMsg] = React.useState<string>('No se cumple con los requisitos de postulaci??n');
  const [nextStatus,
    { loading: nextStatusMutLoading, error: nextStatusMutError }] = useMutation(APPLICATION_STATUS);

  function handleRejection() {
    return nextStatus({
      variables: {
        changeApplicationStatusApplicationId: applicationInfo.id,
        changeApplicationStatusStatus: 'REJECTED',
        changeApplicationStatusMessage: msg,
        // TODO: mostrar mensaje en tarjeta de applicant_info
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
        Mensaje rechazo postulaci??n

      </DialogTitle>
      <DialogContent className={classes.DialogContent}>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="body1">??Est?? seguro de rechazar al profesional?</Typography>
          <TextField
            label="Escriba una raz??n de rechazo..."
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

          Rechazar postulaci??n
          {' '}
          {nextStatusMutLoading && <CircularProgress size={15} />}
          {nextStatusMutError && <CancelIcon color="error" />}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
