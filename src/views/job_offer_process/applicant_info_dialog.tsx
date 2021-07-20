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
// import UploadButton from '../posted_app_card_details/document-upload';

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
        <Typography variant="body2" component="div" style={{ textAlign: 'center' }}>{applicationInfo.rejectedMessage !== '' ? `Motivo: ${applicationInfo.rejectedMessage}` : ''}</Typography>
      </DialogTitle>
      <DialogContent className={classes.DialogContent}>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={12} sm={4} style={{ textAlign: 'center' }}>
            <Avatar className={classes.avatar} />
            <Typography variant="body1" component="div">
              <Box fontWeight="fontWeightMedium" display="inline">
                {`${professionalInfo.name} ${professionalInfo.firstSurname}`}
              </Box>
            </Typography>
          </Grid>

          <Grid item xs={10} sm={8} className={classes.descriptionGrid}>
            <Typography variant="caption" component="div">
              <Box fontWeight="fontWeightMedium" display="inline">Rut:</Box>
              {' '}
              {professionalInfo.rut}
            </Typography>
            <Typography variant="caption" component="div">
              <Box fontWeight="fontWeightMedium" display="inline">Fecha de nacimiento:</Box>
              {' '}
              {professionalInfo.birthDay !== null ? new Date(professionalInfo.birthDay).toLocaleDateString() : '-'}
            </Typography>
            <Typography variant="caption" component="div">
              <Box fontWeight="fontWeightMedium" display="inline">Especialidad:</Box>
              {' '}
              {professionalInfo.specialty || '-'}
            </Typography>
            <Typography variant="caption" component="div">
              <Box fontWeight="fontWeightMedium" display="inline">Institución:</Box>
              {' '}
              {professionalInfo.institutions || '-'}
            </Typography>
            <Typography variant="caption" component="div">
              <Box fontWeight="fontWeightMedium" display="inline">Conocimiento técnico:</Box>
              {' '}
              {professionalInfo.technicalKnowledge || '-'}
            </Typography>
            <Typography variant="caption" component="div">
              <Box fontWeight="fontWeightMedium" display="inline">Perfil:</Box>
              {' '}
              {professionalInfo.profile || '-'}
            </Typography>
            <Typography variant="caption" component="div">
              <Box fontWeight="fontWeightMedium" display="inline">Trabajo actual:</Box>
              {' '}
              {professionalInfo.currentJob || '-'}
            </Typography>
            <Typography variant="caption" component="div">
              <Box fontWeight="fontWeightMedium" display="inline">Educación:</Box>
              {' '}
              {professionalInfo.education.map((ed) => (
                <div key={ed.id}>
                  {`${ed.title}: ${ed.period} - ${ed.description}`}
                </div>
              ))}
            </Typography>
            <Typography variant="caption" component="div">
              <Box fontWeight="fontWeightMedium" display="inline">Skills:</Box>
              {' '}
              {professionalInfo.skills.map((skill) => (
                <div key={skill.id}>
                  {`${skill.title}: ${skill.body}`}
                </div>
              ))}
            </Typography>
            <Typography variant="caption" component="div">
              <Box fontWeight="fontWeightMedium" display="inline">Trabajos anteriores:</Box>
              {' '}
              {professionalInfo.pastJobs.map((job) => (
                <div key={job.id}>
                  {`${job.position} en ${job.companyName}; ${job.period}`}
                </div>
              ))}
            </Typography>
            <Typography variant="caption" component="div">
              <Box fontWeight="fontWeightMedium" display="inline">Datos de contacto:</Box>
              {' '}
              {/* eslint-disable-next-line no-nested-ternary */}
              {professionalInfo.contactInfo ? (professionalInfo.contactInfo.address ? `Teléfono: ${professionalInfo.contactInfo.phone}\nE-mail: ${professionalInfo.contactInfo.email} Dirección: ${professionalInfo.contactInfo.address.street} ${professionalInfo.contactInfo.address.number}` : `Teléfono: ${professionalInfo.contactInfo.phone}\nE-mail: ${professionalInfo.contactInfo.email}`) : ' - '}
            </Typography>
            <Typography variant="caption" component="div">
              <Box fontWeight="fontWeightMedium" display="inline">Archivos:</Box>
              {' '}
              {applicationInfo.files && applicationInfo.files.length > 0
                ? applicationInfo.files.map((fileInfo) => (
                  <div key={fileInfo.filename}>
                    <a
                      key={fileInfo.filename}
                      href={fileInfo.url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Typography noWrap style={{ maxWidth: '200px' }}>{fileInfo.filename}</Typography>
                    </a>
                  </div>
                )) : ' - '}
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
        <Button onClick={handleCloseDialog} color="primary">
          Cerrar
        </Button>
        {(applicationInfo.status === 'IN_PROCESS' && applicationInfo.stage === 'JOB_OFFER') || applicationInfo.status === 'REJECTED' ? null
          : (
            <Button onClick={handleOpenRejectDialog} style={{ color: 'red' }}>
              Rechazar
            </Button>
          )}
        {/* {applicationInfo.status === 'REJECTED' ? null : (
          <UploadButton
            applicationId={applicationInfo.id}
            jobOfferId={applicationInfo.jobOfferId}
          />
        )} */}
        {applicationInfo.status === 'REJECTED' || applicationInfo.status === 'ACCEPTED' ? null : (
          <Button onClick={handleOpenApprovalDialog} variant="contained" color="secondary">
            {(applicationInfo.status === 'IN_PROCESS' && applicationInfo.stage === 'JOB_OFFER') ? 'Convertir en candidato' : 'Pasar a siguiente fase'}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
