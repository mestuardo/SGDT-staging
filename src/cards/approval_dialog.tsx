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
import APPLICATION_STATUS from '../mutations/changeApplicationStatus.graphql';
import APPLICATION_STAGE from '../mutations/changeApplicationStage.graphql';
import FILTER_APPLICATIONS from '../queries/filter-applications.graphql';
import { FilterApplicationsType } from '../types/filter-applications-query-types';
// import { useQuery, useMutation, DocumentNode } from '@apollo/client';

const useStyles = makeStyles((theme) => ({
  DialogContent: {
    width: theme.spacing(45),
    '@media only screen and (max-width: 600px)': {
      width: '100%',
    },
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
  openApprovalDialog: boolean,
  handleCloseParentDialog: () => void,
  handleCloseApprovalDialog: ()=> void,
  dialogContentID: string,
  applicationInfo: FilterApplicationsType
}

export default function RejectionDialog(props:NewRequestDialogProps): JSX.Element {
  const {
    openApprovalDialog,
    handleCloseParentDialog,
    handleCloseApprovalDialog,
    dialogContentID,
    applicationInfo,
  } = props;
  const classes = useStyles();
  const [msg, setMsg] = React.useState<string>('Estimado postulante, usted pasará a la siguiente etapa de esta postulación.');
  const [nextStage,
    { loading: nextStageMutLoading, error: nextStageMutError }] = useMutation(APPLICATION_STAGE);
  const [nextStatus,
    { loading: nextStatusMutLoading, error: nextStatusMutError }] = useMutation(APPLICATION_STATUS);

  async function handleApproval() {
    if (applicationInfo.stage === 'TECHNICAL') {
      return nextStatus({
        variables: {
          changeApplicationStatusApplicationId: applicationInfo.id,
          changeApplicationStatusStatus: 'ACCEPTED',
        },
        refetchQueries: [{
          query: FILTER_APPLICATIONS as DocumentNode,
          variables: { filterApplicationsJobOfferId: applicationInfo.jobOfferId },
        }],
      }).then(() => {
        handleCloseApprovalDialog();
        handleCloseParentDialog();
      });
    }
    if (applicationInfo.stage === 'PSYCHOLOGICAL') {
      return nextStage({
        variables: {
          changeApplicationStageApplicationId: applicationInfo.id,
          changeApplicationStageStage: 'TECHNICAL',
        },
        refetchQueries: [{
          query: FILTER_APPLICATIONS as DocumentNode,
          variables: { filterApplicationsJobOfferId: applicationInfo.jobOfferId },
        }],
      }).then(() => {
        handleCloseApprovalDialog();
        handleCloseParentDialog();
      }).catch((mutErr) => { throw (mutErr); });
    }
    return nextStage({
      variables: {
        changeApplicationStageApplicationId: applicationInfo.id,
        changeApplicationStageStage: 'PSYCHOLOGICAL',
      },
      refetchQueries: [{
        query: FILTER_APPLICATIONS as DocumentNode,
        variables: { filterApplicationsJobOfferId: applicationInfo.jobOfferId },
      }],
    }).then(() => {
      handleCloseApprovalDialog();
      handleCloseParentDialog();
    }).catch((mutErr) => { throw (mutErr); });
  }

  return (
    <Dialog
      open={openApprovalDialog}
      onClose={handleCloseApprovalDialog}
      aria-labelledby="applicant-info-details"
    >
      <DialogTitle id="applicant-info-details" style={{ textAlign: 'center' }}>
        Mensaje avance de etapa postulación

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
        <Button onClick={handleCloseApprovalDialog} color="primary">
          Cancelar
        </Button>
        <Button
          color="secondary"
          disabled={(nextStatusMutLoading || nextStageMutLoading)}
          onClick={handleApproval}

        >
          Pasar a siguiente fase
          {' '}
          {(nextStatusMutLoading || nextStageMutLoading) && <CircularProgress size={15} />}
          {(nextStatusMutError || nextStageMutError) && <CancelIcon color="error" />}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
