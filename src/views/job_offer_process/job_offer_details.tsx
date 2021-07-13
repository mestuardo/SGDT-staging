import React from 'react';
import {
  Avatar,
  Box,
  Grid,
  Hidden,
  Typography,
} from '@material-ui/core';
import BusinessIcon from '@material-ui/icons/Business';

import { useQuery } from '@apollo/client';
import { jobOfferDetailStyles } from './styles';
import { ClientInformationType, JobOfferDetailType } from '../../types/job-offer-query-types';
import { ContractTypes, LevelOfStudies, FormationStatus } from './helpers';
import CLIENT_INFO from '../../queries/client-information.graphql';

interface JobOfferDetailProps{
  jobOffer: JobOfferDetailType,
}
interface ClientQueryData {
  getClient: ClientInformationType,
}

export default function JobOfferDetails(props: JobOfferDetailProps) : JSX.Element {
  const { jobOffer } = props;
  const classes = jobOfferDetailStyles();
  const question = jobOffer.questions;
  const {
    data: clientData,
    loading: clientDataLoading,
    error: clientDataError,
  } = useQuery<ClientQueryData>(CLIENT_INFO, {
    variables: { getClientId: jobOffer.client },
  });

  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      className={classes.root}
    >
      <Grid item xs={12}>
        <Typography variant="body1" component="h6">
          {(!clientDataLoading && !clientDataError && clientData)
            && ` ${clientData?.getClient.tradeName}`}
        </Typography>
        <hr />
      </Grid>

      <Grid item xs={11} sm={6} className={classes.detailBody}>

        <Typography variant="body1" component="div">
          <Box fontWeight="fontWeightMedium" display="inline">Vacantes:</Box>
          {' '}
          {jobOffer.vacancies || '-'}
        </Typography>
        <Typography variant="body1" component="div">
          <Box fontWeight="fontWeightMedium" display="inline">Tipo de contrato:</Box>
          {' '}
          {ContractTypes[jobOffer.contractType] || '-'}
        </Typography>
        <Typography variant="body1" component="div">
          <Box fontWeight="fontWeightMedium" display="inline">Salario máximo:</Box>
          {' '}
          {jobOffer.maxSalary || '-'}
        </Typography>
        <Typography variant="body1" component="div">
          <Box fontWeight="fontWeightMedium" display="inline">Experiencia requerida:</Box>
          {' '}
          {jobOffer.yearsExperience ? `${jobOffer.yearsExperience} años` : '-'}
        </Typography>
        <Typography variant="body1" component="div">
          <Box fontWeight="fontWeightMedium" display="inline">Nivel de estudios:</Box>
          {' '}
          {jobOffer.levelOfStudies ? `${LevelOfStudies[jobOffer.levelOfStudies]}, ${FormationStatus[jobOffer.formationStatus]}` : '-'}
        </Typography>
        <Typography variant="body1" component="div">
          <Box fontWeight="fontWeightMedium" display="inline">Tecnologías necesarias:</Box>
          {' '}
          {jobOffer.languages.map((entry:{ language:string }) => entry.language).join(', ') || '-'}
        </Typography>
        <Typography variant="body1" component="div">
          <Box fontWeight="fontWeightMedium" display="inline">Habilidades blandas:</Box>
          {' '}
          {jobOffer.softSkills.join(', ') || '-'}
        </Typography>
        {/* <Typography variant="body1" component="div">
          <Box fontWeight="fontWeightMedium" display="inline">Requerimientos técnicos:</Box>
          {' '}
          {jobOfferData.technicalRequirements.join(', ') || '-'}
        </Typography> */}
        <Typography variant="body1" component="div">
          <Box fontWeight="fontWeightMedium" display="inline">Requerimientos especiales:</Box>
          {' '}
          {jobOffer.specialRequirements.join(', ') || '-'}
        </Typography>
        <Typography variant="body1" component="div">
          <Box fontWeight="fontWeightMedium" display="inline">Idiomas:</Box>
          {' '}
          {jobOffer.languages ? jobOffer.languages.map((entry:{ language:string }) => `${entry.language}`).join(', ') : '-'}
        </Typography>
        <Typography variant="body1" component="div">
          <Box fontWeight="fontWeightMedium" display="inline">Tipo de servicio:</Box>
          {' '}
          {jobOffer.serviceType || '-'}
        </Typography>
        <Typography variant="body1" component="div">
          <Box fontWeight="fontWeightMedium" display="inline">Fecha de inicio:</Box>
          {' '}
          {jobOffer.approxStartDate || '-'}
        </Typography>
        <Typography variant="body1" component="div">
          <Box fontWeight="fontWeightMedium" display="inline">Duración aproximada:</Box>
          {' '}
          {jobOffer.possibleDuration || '-'}
        </Typography>
        <Typography variant="body1" component="div">
          <Box fontWeight="fontWeightMedium" display="inline">Requiere computador propio:</Box>
          {' '}
          {jobOffer.requiresComputer || '-'}
        </Typography>
        <Typography variant="body1" component="div">
          <Box fontWeight="fontWeightMedium" display="inline">Descripción:</Box>
          {' '}
          {jobOffer.offerDescription || '-'}
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
      <Grid item xs={12} sm={6}>

        <Avatar className={classes.avatar}>
          <BusinessIcon className={classes.icon} />
        </Avatar>
        <Typography variant="h5" component="h5">
          {(!clientDataLoading && !clientDataError && clientData)
            && ` ${clientData?.getClient.tradeName}`}
        </Typography>
        <Hidden smUp><hr /></Hidden>

      </Grid>
    </Grid>

  );
}
