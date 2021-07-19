import React from 'react';
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from '@material-ui/core';

import CancelIcon from '@material-ui/icons/Cancel';
import { useMutation, DocumentNode } from '@apollo/client';

import { changeStageDialogStyles } from './styles';
import APPLICATION_STATUS from '../../mutations/changeApplicationStatus.graphql';
import APPLICATION_STAGE from '../../mutations/changeApplicationStage.graphql';
import FILTER_APPLICATIONS from '../../queries/filter-applications.graphql';
import { FilterApplicationsType } from '../../types/filter-applications-query-types';

interface NewRequestDialogProps {
  openApprovalDialog: boolean,
  handleCloseParentDialog: () => void,
  handleCloseApprovalDialog: ()=> void,
  applicationInfo: FilterApplicationsType
}

export default function RejectionDialog(props:NewRequestDialogProps) : JSX.Element {
  const {
    openApprovalDialog,
    handleCloseParentDialog,
    handleCloseApprovalDialog,
    applicationInfo,
  } = props;
  const classes = changeStageDialogStyles();

  const [nextStage,
    { loading: nextStageMutLoading, error: nextStageMutError }] = useMutation(APPLICATION_STAGE);
  const [nextStatus,
    { loading: nextStatusMutLoading, error: nextStatusMutError }] = useMutation(APPLICATION_STATUS);

  async function handleApproval() {
    if (applicationInfo.stage === 'PSYCHOLOGICAL') {
      return nextStatus({
        variables: {
          changeApplicationStatusApplicationId: applicationInfo.id,
          changeApplicationStatusStatus: 'ACCEPTED',
        },
        refetchQueries: [{
          query: FILTER_APPLICATIONS as DocumentNode,
          variables: { jobOfferId: applicationInfo.jobOfferId },
        }],
      }).then(() => {
        handleCloseApprovalDialog();
        handleCloseParentDialog();
      });
    }
    if (applicationInfo.stage === 'TECHNICAL') {
      return nextStage({
        variables: {
          changeApplicationStageApplicationId: applicationInfo.id,
          changeApplicationStageStage: 'PSYCHOLOGICAL',
          changeApplicationStageMessage: '',
        },
        refetchQueries: [{
          query: FILTER_APPLICATIONS as DocumentNode,
          variables: { jobOfferId: applicationInfo.jobOfferId },
        }],
      }).then(() => {
        handleCloseApprovalDialog();
        handleCloseParentDialog();
      }).catch((mutErr) => { throw (mutErr); });
    }
    if (applicationInfo.stage === 'PRE_INTERVIEW') {
      return nextStage({
        variables: {
          changeApplicationStageApplicationId: applicationInfo.id,
          changeApplicationStageStage: 'TECHNICAL',
        },
        refetchQueries: [{
          query: FILTER_APPLICATIONS as DocumentNode,
          variables: { jobOfferId: applicationInfo.jobOfferId },
        }],
      }).then(() => {
        handleCloseApprovalDialog();
        handleCloseParentDialog();
      }).catch((mutErr) => { throw (mutErr); });
    }
    return nextStage({
      variables: {
        changeApplicationStageApplicationId: applicationInfo.id,
        changeApplicationStageStage: 'PRE_INTERVIEW',
      },
      refetchQueries: [{
        query: FILTER_APPLICATIONS as DocumentNode,
        variables: { jobOfferId: applicationInfo.jobOfferId },
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
        Avance de etapa postulación

      </DialogTitle>
      <DialogContent className={classes.DialogContent}>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="body1" style={{ width: '90%' }}>¿Está seguro de avanzar al profesional de etapa?</Typography>
        </Grid>

      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleCloseApprovalDialog}
          color="primary"
        >
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
