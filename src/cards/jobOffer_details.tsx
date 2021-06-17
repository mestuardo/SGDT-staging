import React from 'react';
import Hidden from '@material-ui/core/Hidden';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import BusinessIcon from '@material-ui/icons/Business';
import Avatar from '@material-ui/core/Avatar';

import { ClientInformationType, JobOfferDetailType } from '../types/job-offer-query-types';

const useStyles = makeStyles((theme) => ({
  // Total component style
  root: {
    width: '1017px',
    '@media only screen and (max-width: 992px)': {
      width: '850px',

    },
    '@media only screen and (max-width: 768px)': {
      width: '500px',

    },
    '@media only screen and (max-width: 600px)': {
      width: '300px',

    },

  },
  avatar: {
    margin: 'auto',
    width: theme.spacing(20),
    height: theme.spacing(20),
    backgroundColor: theme.palette.primary.main,
    '@media only screen and (max-width: 600px)': {
      width: theme.spacing(15),
      height: theme.spacing(15),

    },
  },
  icon: {
    width: theme.spacing(15),
    height: theme.spacing(15),
    '@media only screen and (max-width: 600px)': {
      width: theme.spacing(10),
      height: theme.spacing(10),

    },

  },
  detailBody: {
    textAlign: 'left',
    padding: theme.spacing(4),
    height: '510px',
    '@media only screen and (max-width: 600px)': {
      padding: 0,
      height: '200px',

    },
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

}));

interface ProfilesProps{
  jobOfferData: JobOfferDetailType,
  clientInfo: ClientInformationType,
}

const ContractTypes: { [key:string]:string } = {
  FIXED: 'Fijo',
  INDEFINITE: 'Indefinido',
};

const LevelOfStudies: { [key: string]: string } = {
  LOWER_SCHOOL: 'Enseñanza básica',
  HIGH_SCHOOL: 'Enseñanza media',
  TECHNICAL: 'Técnico',
  COLLEGE: 'Universitario',
};

const FormationStatus: { [key: string]: string } = {
  COMPLETE: 'completo',
  INCOMPLETE: 'incompleto',
};

export default function JobOfferDetails(props: ProfilesProps): JSX.Element {
  const { jobOfferData, clientInfo } = props;
  const classes = useStyles();
  const question = jobOfferData.questions;
  return (

    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      className={classes.root}
    >
      <Grid item xs={12}>
        <Typography variant="h4" component="h1">
          {`${jobOfferData.position}`}
        </Typography>

      </Grid>
      <Grid item xs={12} sm={6}>

        <Avatar className={classes.avatar}>
          <BusinessIcon className={classes.icon} />
        </Avatar>
        <Typography variant="h5" component="h5">
          {` ${clientInfo.tradeName}`}
        </Typography>
        <Hidden smUp><hr /></Hidden>

      </Grid>
      <Grid item xs={10} sm={6} className={classes.detailBody}>

        <Typography variant="body1" component="div">
          <Box fontWeight="fontWeightMedium" display="inline">Vacantes:</Box>
          {' '}
          {jobOfferData.vacancies || '-'}
        </Typography>
        <Typography variant="body1" component="div">
          <Box fontWeight="fontWeightMedium" display="inline">Tipo de contrato:</Box>
          {' '}
          {ContractTypes[jobOfferData.contractType] || '-'}
        </Typography>
        <Typography variant="body1" component="div">
          <Box fontWeight="fontWeightMedium" display="inline">Salario máximo:</Box>
          {' '}
          {jobOfferData.maxSalary || '-'}
        </Typography>
        <Typography variant="body1" component="div">
          <Box fontWeight="fontWeightMedium" display="inline">Experiencia requerida:</Box>
          {' '}
          {jobOfferData.yearsExperience ? `${jobOfferData.yearsExperience} años` : '-'}
        </Typography>
        <Typography variant="body1" component="div">
          <Box fontWeight="fontWeightMedium" display="inline">Nivel de estudios:</Box>
          {' '}
          {jobOfferData.levelOfStudies ? `${LevelOfStudies[jobOfferData.levelOfStudies]}, ${FormationStatus[jobOfferData.formationStatus]}` : '-'}
        </Typography>
        <Typography variant="body1" component="div">
          <Box fontWeight="fontWeightMedium" display="inline">Tecnologías necesarias:</Box>
          {' '}
          {jobOfferData.languages.map((entry:{ language:string }) => entry.language).join(', ') || '-'}
        </Typography>
        <Typography variant="body1" component="div">
          <Box fontWeight="fontWeightMedium" display="inline">Habilidades blandas:</Box>
          {' '}
          {jobOfferData.softSkills.join(', ') || '-'}
        </Typography>
        <Typography variant="body1" component="div">
          <Box fontWeight="fontWeightMedium" display="inline">Requerimientos técnicos:</Box>
          {' '}
          {jobOfferData.technicalRequirements.join(', ') || '-'}
        </Typography>
        <Typography variant="body1" component="div">
          <Box fontWeight="fontWeightMedium" display="inline">Requerimientos especiales:</Box>
          {' '}
          {jobOfferData.specialRequirements.join(', ') || '-'}
        </Typography>
        <Typography variant="body1" component="div">
          <Box fontWeight="fontWeightMedium" display="inline">Idiomas:</Box>
          {' '}
          {jobOfferData.languages ? jobOfferData.languages.map((entry:{ language:string }) => `${entry.language}`).join(', ') : '-'}
        </Typography>
        <Typography variant="body1" component="div">
          <Box fontWeight="fontWeightMedium" display="inline">Tipo de servicio:</Box>
          {' '}
          {jobOfferData.serviceType || '-'}
        </Typography>
        <Typography variant="body1" component="div">
          <Box fontWeight="fontWeightMedium" display="inline">Fecha de inicio:</Box>
          {' '}
          {jobOfferData.approxStartDate || '-'}
        </Typography>
        <Typography variant="body1" component="div">
          <Box fontWeight="fontWeightMedium" display="inline">Duración aproximada:</Box>
          {' '}
          {jobOfferData.possibleDuration || '-'}
        </Typography>
        <Typography variant="body1" component="div">
          <Box fontWeight="fontWeightMedium" display="inline">Requiere computador propio:</Box>
          {' '}
          {jobOfferData.requiresComputer || '-'}
        </Typography>
        <Typography variant="body1" component="div">
          <Box fontWeight="fontWeightMedium" display="inline">Descripción:</Box>
          {' '}
          {jobOfferData.offerDescription || '-'}
        </Typography>
        <Typography variant="body1" component="div">
          <Box fontWeight="fontWeightMedium" display="inline">Pregunta 1:</Box>
          {' '}
          {question[0] || '-'}
        </Typography>
        <Typography variant="body1" component="div">
          <Box fontWeight="fontWeightMedium" display="inline">Pregunta 2:</Box>
          {' '}
          {question[1] || '-'}
        </Typography>
        <Typography variant="body1" component="div">
          <Box fontWeight="fontWeightMedium" display="inline">Pregunta 3:</Box>
          {' '}
          {question[2] || '-'}
        </Typography>
        <Typography variant="body1" component="div">
          <Box fontWeight="fontWeightMedium" display="inline">Pregunta 4:</Box>
          {' '}
          {question[3] || '-'}
        </Typography>
        <Typography variant="body1" component="div">
          <Box fontWeight="fontWeightMedium" display="inline">Pregunta 5:</Box>
          {' '}
          {question[4] || '-'}
        </Typography>

      </Grid>
    </Grid>

  );
}
