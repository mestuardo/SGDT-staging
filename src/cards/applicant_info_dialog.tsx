import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';

import { GetProfessionalType } from '../types/get-professional-types';
import { FilterApplicationsType } from '../types/filter-applications-query-types';

import RejectionDialog from './rejection_dialog';
import ApprovalDialog from './approval_dialog';

const useStyles = makeStyles((theme) => ({
  DialogContent: {
    width: theme.spacing(60),
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
  openDialog: boolean,
  handleCloseDialog: ()=> void,
  dialogTitle: string,
  dialogContentID: string,
  applicationInfo: FilterApplicationsType,
  professionalInfo: GetProfessionalType,
  step: string,
}

export default function NewRequestDialog(props:NewRequestDialogProps): JSX.Element {
  const {
    openDialog,
    handleCloseDialog,
    dialogTitle,
    dialogContentID,
    applicationInfo,
    professionalInfo,
    step,
  } = props;
  const classes = useStyles();
  const [openRejectionDialog, setOpenRejectionDialog] = React.useState(false);
  const handleOpenRejectDialog = () => setOpenRejectionDialog(true);
  const handleCloseRejectionDialog = () => setOpenRejectionDialog(false);

  const [openApprovalDialog, setOpenApprovalDialog] = React.useState(false);
  const handleOpenApprovalDialog = () => setOpenApprovalDialog(true);
  const handleCloseApprovalDialog = () => setOpenApprovalDialog(false);

  return (
    <Dialog
      open={openDialog}
      onClose={handleCloseDialog}
      aria-labelledby="applicant-info-details"
    >
      <DialogTitle id="applicant-info-details" style={{ textAlign: 'center' }}>
        {dialogTitle}
        <Typography variant="body1" component="div" style={{ textAlign: 'center' }}>
          <Box fontWeight="fontWeightMedium" display="inline">{`ETAPA: ${step}`}</Box>
        </Typography>
      </DialogTitle>
      <DialogContent className={classes.DialogContent}>
        <Grid
          container
          direction="row"
          justify="center"
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
          dialogContentID={dialogContentID}
          applicationInfo={applicationInfo}
        />
        <ApprovalDialog
          openApprovalDialog={openApprovalDialog}
          handleCloseParentDialog={handleCloseDialog}
          handleCloseApprovalDialog={handleCloseApprovalDialog}
          dialogContentID={dialogContentID}
          applicationInfo={applicationInfo}
        />

      </DialogContent>
      <DialogActions>
        <Button onClick={handleOpenRejectDialog} style={{ color: 'red' }}>
          Rechazar
        </Button>
        <Button onClick={handleCloseDialog} color="primary">
          Cerrar
        </Button>
        <Button onClick={handleOpenApprovalDialog} variant="contained" color="secondary">
          Pasar a siguiente fase
        </Button>
      </DialogActions>
    </Dialog>
  );
}
