import React from 'react';
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from '@material-ui/core';

import { applicantInfoStyles } from './styles';
import { GetProfessionalType } from '../../types/get-professional-types';
import { FilterApplicationsType } from '../../types/filter-applications-query-types';

import RejectionDialog from './rejection_dialog';
import ApprovalDialog from './approval_dialog';

interface NewRequestDialogProps {
  openDialog: boolean,
  handleCloseDialog: ()=> void,
  dialogTitle: string,
  applicationInfo: FilterApplicationsType,
  professionalInfo: GetProfessionalType,
  step: string,
}

export default function NewRequestDialog(props:NewRequestDialogProps) : JSX.Element {
  const {
    openDialog,
    handleCloseDialog,
    dialogTitle,
    applicationInfo,
    professionalInfo,
    step,
  } = props;
  const classes = applicantInfoStyles();

  const [openRejectionDialog, setOpenRejectionDialog] = React.useState(false);
  const handleOpenRejectDialog = () => setOpenRejectionDialog(true);
  const handleCloseRejectionDialog = () => setOpenRejectionDialog(false);
  const [openApprovalDialog, setOpenApprovalDialog] = React.useState(false);
  const handleOpenApprovalDialog = () => setOpenApprovalDialog(true);
  const handleCloseApprovalDialog = () => setOpenApprovalDialog(false);

  return (
    <Dialog
      open={openDialog}
      aria-labelledby="applicant-info-details"
    >
      <DialogTitle id="applicant-info-details" style={{ textAlign: 'center' }}>
        {dialogTitle}
        <Typography variant="body1" component="div" style={{ textAlign: 'center' }}>
          <Box fontWeight="fontWeightMedium" display="inline">{`ETAPA: ${step}`}</Box>
        </Typography>
        <Typography variant="body1" component="div" style={{ textAlign: 'center' }}>{applicationInfo.rejectedMessage !== '' ? `Rechazado por: ${applicationInfo.rejectedMessage}` : ''}</Typography>
      </DialogTitle>
      <DialogContent className={classes.DialogContent}>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={12} sm={6} style={{ textAlign: 'center' }}>
            <Avatar className={classes.avatar} />
            <Typography variant="body1" component="div">
              <Box fontWeight="fontWeightMedium" display="inline">
                {`${professionalInfo.name} ${professionalInfo.firstSurname}`}
              </Box>
            </Typography>
          </Grid>

          <Grid item xs={10} sm={6} className={classes.descriptionGrid}>
            <Typography variant="caption" component="div">
              <Box fontWeight="fontWeightMedium" display="inline">Rut:</Box>
              {' '}
              {professionalInfo.rut}
            </Typography>
            <Typography variant="caption" component="div">
              <Box fontWeight="fontWeightMedium" display="inline">Especialidad:</Box>
              {' '}
              {professionalInfo.specialty || '-'}
            </Typography>
            <Typography variant="caption" component="div">
              <Box fontWeight="fontWeightMedium" display="inline">Trabajo actual:</Box>
              {' '}
              {professionalInfo.currentJob || '-'}
            </Typography>
          </Grid>
        </Grid>
        <RejectionDialog
          openRejectionDialog={openRejectionDialog}
          handleCloseParentDialog={handleCloseDialog}
          handleCloseRejectionDialog={handleCloseRejectionDialog}
          applicationInfo={applicationInfo}
        />
        <ApprovalDialog
          openApprovalDialog={openApprovalDialog}
          handleCloseParentDialog={handleCloseDialog}
          handleCloseApprovalDialog={handleCloseApprovalDialog}
          applicationInfo={applicationInfo}
        />

      </DialogContent>
      <DialogActions>
        {(applicationInfo.status === 'IN_PROCESS' && applicationInfo.stage === 'JOB_OFFER') || applicationInfo.status === 'REJECTED' ? null
          : (
            <Button onClick={handleOpenRejectDialog} style={{ color: 'red' }}>
              Rechazar
            </Button>
          )}
        <Button onClick={handleCloseDialog} color="primary">
          Cerrar
        </Button>
        {applicationInfo.status === 'REJECTED' || applicationInfo.status === 'ACCEPTED' ? null : (
          <Button onClick={handleOpenApprovalDialog} variant="contained" color="secondary">
            {(applicationInfo.status === 'IN_PROCESS' && applicationInfo.stage === 'JOB_OFFER') ? 'Convertir en candidato' : 'Pasar a siguiente fase'}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
