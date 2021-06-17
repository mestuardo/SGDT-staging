import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';

import CancelIcon from '@material-ui/icons/Cancel';
import Avatar from '@material-ui/core/Avatar';
import BusinessIcon from '@material-ui/icons/Business';
import { useQuery, useMutation, DocumentNode } from '@apollo/client';
// import * as Yup from 'yup';
import REQUEST_DETAILS from '../queries/request-details.graphql';
import { RequestDialogData, NewRequestDialogProps } from '../types/cards/new-request-dialog-types';
import { RequestDetailType } from '../types/request-query-types';
import PUBLISH_JOB_OFFER from '../mutations/createJobOffer.graphql';
import RECRUITMENT_PROCESS_INDEX_QUERY from '../queries/recruitment-process-index.graphql';

const useStyles = makeStyles((theme) => ({
  root: {
    maxHeight: '700px',

  },
  DialogContent: {
    width: theme.spacing(60),
    '@media only screen and (max-width: 600px)': {
      width: '100%',
    },
    '&::-webkit-scrollbar': {
      width: 8,
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
  avatar: {
    margin: 'auto',
    width: theme.spacing(10),
    height: theme.spacing(10),
    backgroundColor: theme.palette.primary.main,
  },
  icon: {
    width: theme.spacing(6),
    height: theme.spacing(6),
  },
  descriptionGrid: {
    height: '200px',
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
      width: 6,
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
  questionField: {
    width: '80%',
    margin: theme.spacing(1),
  },

}));

// we're going to use this eventually if we need to make the description and questions
// mandatory

// const ValidationSchema = Yup.object().shape({
//   description: Yup.string()
//     .required('Ingrese una descripción para la oferta de trabajo'),
//   question1: Yup.string()
//     .required('Ingrese una pregunta abierta para el postulante'),
//   question2: Yup.string()
//     .required('Ingrese una pregunta abierta para el postulante'),
//   question3: Yup.string()
//     .required('Ingrese una pregunta abierta para el postulante'),
//   question4: Yup.string()
//     .required('Ingrese una pregunta abierta para el postulante'),
//   question5: Yup.string()
//     .required('Ingrese una pregunta abierta para el postulante'),

// });

export default function NewRequestDialog(props:NewRequestDialogProps): JSX.Element {
  const {
    openDialog, handleCloseDialog, dialogTitle, dialogContentID,
  } = props;
  const classes = useStyles();

  const { data, loading, error } = useQuery<RequestDialogData>(REQUEST_DETAILS, {
    variables: { getRequestId: dialogContentID },
  });
  const [publishJobOffer,
    { loading: mutationLoading, error: mutationError }] = useMutation(PUBLISH_JOB_OFFER);

  const [description, setDescription] = useState<string>('');
  const [pregunta1, setPregunta1] = useState<string>('');
  const [pregunta2, setPregunta2] = useState<string>('');
  const [pregunta3, setPregunta3] = useState<string>('');
  const [pregunta4, setPregunta4] = useState<string>('');
  const [pregunta5, setPregunta5] = useState<string>('');

  if (loading) {
    return (
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
      >
        <DialogTitle style={{ textAlign: 'center' }}>
          <CircularProgress />
        </DialogTitle>
      </Dialog>
    );
  }
  if (error) {
    return (
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
      >
        <DialogTitle style={{ textAlign: 'center' }}>Ha ocurrido un error</DialogTitle>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  const { request }: { request: RequestDetailType } = data as RequestDialogData;

  return (
    <Dialog
      className={classes.root}
      open={openDialog}
      onClose={handleCloseDialog}
      aria-labelledby="new-personnel-request-details"
    >
      <DialogTitle id="new-personnel-request-details" style={{ textAlign: 'center' }}>
        {dialogTitle}
        <Typography variant="body1" component="div" style={{ textAlign: 'center' }}>
          <Box fontWeight="fontWeightMedium" display="inline">{request.position}</Box>
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
            <Avatar className={classes.avatar}>
              <BusinessIcon className={classes.icon} />
            </Avatar>

            <Typography noWrap variant="caption" component="div">
              ID Cliente
              <br />
              <Box fontWeight="fontWeightMedium" textOverflow="ellipsis" display="inline">{` ${request.client}`}</Box>
            </Typography>
          </Grid>
          <Grid item xs={10} sm={6} className={classes.descriptionGrid}>

            <Typography variant="caption" component="div">
              <Box fontWeight="fontWeightMedium" display="inline">Salario:</Box>
              {' '}
              {request.maxSalary || '-'}
            </Typography>
            <Typography variant="caption" component="div">
              <Box fontWeight="fontWeightMedium" display="inline">Vacantes:</Box>
              {' '}
              {request.vacancies || '-'}
            </Typography>
            <Typography variant="caption" component="div">
              <Box fontWeight="fontWeightMedium" display="inline">Duración del trabajo:</Box>
              {' '}
              {request.possibleDuration || '-'}
            </Typography>
            <Typography variant="caption" component="div">
              <Box fontWeight="fontWeightMedium" display="inline">Idiomas:</Box>
              {' '}
              {request.languages ? request.languages.map((entry:{ language:string; level:string }) => `${entry.language}, ${entry.level}`).join('; ') : '-'}
            </Typography>
            <Typography variant="caption" component="div">
              <Box fontWeight="fontWeightMedium" display="inline">Descripción:</Box>
              {' '}
              {request.requestDescription || '-'}
            </Typography>
            <Typography variant="caption" component="div">
              <Box fontWeight="fontWeightMedium" display="inline">Nivel de estudios:</Box>
              {' '}
              {request.levelOfStudies || '-'}
            </Typography>
            <Typography variant="caption" component="div">
              <Box fontWeight="fontWeightMedium" display="inline">Nivel formación:</Box>
              {' '}
              {request.formationStatus || '-'}
            </Typography>
            <Typography variant="caption" component="div">
              <Box fontWeight="fontWeightMedium" display="inline">Habilidades blandas:</Box>
              {' '}
              {request.softSkills.map((softSkill:string) => softSkill).join(', ') || '-'}
            </Typography>
            <Typography variant="caption" component="div">
              <Box fontWeight="fontWeightMedium" display="inline">Tipo de servicio:</Box>
              {' '}
              {request.serviceType || '-'}
            </Typography>
            <Typography variant="caption" component="div">
              <Box fontWeight="fontWeightMedium" display="inline">Tipo de contrato:</Box>
              {' '}
              {request.contractType || '-'}
            </Typography>
            <Typography variant="caption" component="div">
              <Box fontWeight="fontWeightMedium" display="inline">Jornada laboral:</Box>
              {' '}
              {request.shiftType || '-'}
            </Typography>
            <Typography variant="caption" component="div">
              <Box fontWeight="fontWeightMedium" display="inline">Años experiencia requeridos:</Box>
              {' '}
              {request.yearsExperience || '-'}
            </Typography>
            <Typography variant="caption" component="div">
              <Box fontWeight="fontWeightMedium" display="inline">Requiere computador:</Box>
              {' '}
              {request.requiresComputer ? 'Sí' : 'No' || '-'}
            </Typography>
          </Grid>
        </Grid>
        <div style={{ textAlign: 'center' }}>
          <TextField
            style={{ width: '80%' }}
            label="Descripción"
            margin="normal"
            multiline
            rows={4}
            variant="outlined"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            inputProps={{ style: { fontSize: 'small' } }}
          />
        </div>
        <div style={{ textAlign: 'center' }}>
          <TextField
            className={classes.questionField}
            label="Pregunta 1"
            id="first-question"
            placeholder="Ingrese la primera pregunta para el postulante"
            variant="outlined"
            value={pregunta1}
            onChange={(e) => setPregunta1(e.target.value)}
            inputProps={{ style: { fontSize: 'small' } }}
          />
          <TextField
            className={classes.questionField}
            label="Pregunta 2"
            id="second-question"
            placeholder="Ingrese la segunda pregunta para el postulante"
            variant="outlined"
            value={pregunta2}
            onChange={(e) => setPregunta2(e.target.value)}
            inputProps={{ style: { fontSize: 'small' } }}
          />
          <TextField
            className={classes.questionField}
            label="Pregunta 3"
            id="third-question"
            placeholder="Ingrese la tercera pregunta para el postulante"
            variant="outlined"
            value={pregunta3}
            onChange={(e) => setPregunta3(e.target.value)}
            inputProps={{ style: { fontSize: 'small' } }}
          />
          <TextField
            className={classes.questionField}
            fullWidth
            label="Pregunta 4"
            id="fourth-question"
            placeholder="Ingrese la cuarta pregunta para el postulante"
            variant="outlined"
            value={pregunta4}
            onChange={(e) => setPregunta4(e.target.value)}
            inputProps={{ style: { fontSize: 'small' } }}
          />
          <TextField
            className={classes.questionField}
            fullWidth
            label="Pregunta 5"
            id="fifth-question"
            placeholder="Ingrese la quinta pregunta para el postulante"
            variant="outlined"
            value={pregunta5}
            onChange={(e) => setPregunta5(e.target.value)}
            inputProps={{ style: { fontSize: 'small' } }}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog} color="secondary">
          Cerrar
        </Button>
        <Button
          variant="contained"
          color="secondary"
          disabled={mutationLoading}
          onClick={() => {
            publishJobOffer({
              variables: {
                createJobOfferId: request.id,
                createJobOfferDescription: description,
                createJobOfferQuestions: [pregunta1, pregunta2, pregunta3, pregunta4, pregunta5],
              },
              // variables: { createJobOfferId: request.id },
              refetchQueries: [
                { query: RECRUITMENT_PROCESS_INDEX_QUERY as DocumentNode },
              ],
            }).then(() => {
              handleCloseDialog();
            }).catch((mutErr) => { throw (mutErr); });
          }}
        >
          Publicar oferta laboral
          {' '}
          {mutationLoading && <CircularProgress size={15} />}
          {mutationError && <CancelIcon color="error" />}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
