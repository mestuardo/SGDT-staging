import React from 'react';

import {
  Button,
  Box,
  Grid,
  TextField,
  Hidden,
  Typography,
  CircularProgress,
} from '@material-ui/core';
import {
  Cancel,
} from '@material-ui/icons';
import { useMutation } from '@apollo/client';
import { jobOfferDetailStyles } from './styles';
import { JobOfferDetailType } from '../../types/job-offer-query-types';
import { summaryLabels } from './helpers';
import CLOSE_JOB_OFFER from '../../mutations/closeJobOffer.graphql';

interface JobOfferDetailProps{
  jobOffer: JobOfferDetailType,
}

export default function JobOfferDetails(props: JobOfferDetailProps) : JSX.Element {
  const { jobOffer } = props;
  const classes = jobOfferDetailStyles();
  const { questions } = jobOffer;
  const redirectOnSubmit = () => { window.location.href = '/recruitment-process/'; };
  const [closeJobOffer,
    { loading: mutationLoading, error: mutationError }] = useMutation(CLOSE_JOB_OFFER);

  const [showCloseJobOffer, setShowCloseJobOffer] = React.useState(false);
  const [showCloseJobOfferMessage, setShowCloseJobOfferMessage] = React.useState(false);
  const [closeJobOfferMessage, setCloseJobOfferMessage] = React.useState('');
  const handleCloseJobOffer = () => {
    closeJobOffer({
      variables: {
        closeJobOfferJobOfferId: jobOffer.id,
        closeJobOfferCloseMessage: closeJobOfferMessage,
      },
    }).then(() => {
      if (mutationError) throw (mutationError);
      redirectOnSubmit();
    }).catch((otherError) => {
      throw (otherError);
    });
  };

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      className={classes.root}
    >
      <Grid item xs={12}>
        <Typography variant="body1" component="h6">
          <Box fontWeight="fontWeightMedium" display="inline">Cliente:</Box>
          {' '}
          {jobOffer.client}
        </Typography>
        <hr />
      </Grid>

      <Grid item xs={12} sm={7}>
        <div className={classes.detailBody}>
          {jobOffer.closeMessage ? (
            <Typography variant="body1" component="div">
              <Box fontWeight="fontWeightMedium" display="inline">Mensaje cierre proceso:</Box>
              {' '}
              {jobOffer.closeMessage}
            </Typography>
          ) : null}
          <Typography variant="body1" component="div">
            <Box fontWeight="fontWeightMedium" display="inline">SLA incio:</Box>
            {' '}
            {new Date(jobOffer.sla_start).toLocaleDateString() }
          </Typography>
          <Typography variant="body1" component="div">
            <Box fontWeight="fontWeightMedium" display="inline">SLA fin:</Box>
            {' '}
            {new Date(jobOffer.sla_end).toLocaleDateString() }
          </Typography>
          <Typography variant="body1" component="div">
            <Box fontWeight="fontWeightMedium" display="inline">Creación:</Box>
            {' '}
            {new Date(jobOffer.requestCreationDate).toLocaleString()}
          </Typography>
          <Typography variant="body1" component="div">
            <Box fontWeight="fontWeightMedium" display="inline">Publicación:</Box>
            {' '}
            {new Date(jobOffer.jobOfferCreationDate).toLocaleString()}
          </Typography>
          <Typography variant="body1" component="div">
            <Box fontWeight="fontWeightMedium" display="inline">Salario máximo:</Box>
            {' $'}
            {(+jobOffer.maxSalary).toLocaleString() || '-'}
          </Typography>
          <Typography variant="body1" component="div">
            <Box fontWeight="fontWeightMedium" display="inline">Años experiencia requeridos:</Box>
            {' '}
            {`${jobOffer.yearsExperience} años` || '-'}
          </Typography>

          <Typography variant="body1" component="div">
            <Box fontWeight="fontWeightMedium" display="inline">Nivel de estudios:</Box>
            {' '}
            {summaryLabels[jobOffer.levelOfStudies] || '-'}
          </Typography>
          <Typography variant="body1" component="div">
            <Box fontWeight="fontWeightMedium" display="inline">Idiomas:</Box>
            {' '}
            {jobOffer.languages ? jobOffer.languages.map((entry:{ language:string }) => `${entry.language}`).join('; ') : '-'}
          </Typography>
          <Typography variant="body1" component="div">
            <Box fontWeight="fontWeightMedium" display="inline">Requisitios técnicos:</Box>
            {' '}
            {jobOffer.technicalRequirements.map(
              (
                tec: { requirement: string, obligatoriness: string },
              ) => (
                `${tec.requirement}, ${summaryLabels[tec.obligatoriness] as string};`
              ),
            ) || '-'}
          </Typography>
          <Typography variant="body1" component="div">
            <Box fontWeight="fontWeightMedium" display="inline">Nivel formación:</Box>
            {' '}
            {summaryLabels[jobOffer.formationStatus] || '-'}
          </Typography>
          <Typography variant="body1" component="div">
            <Box fontWeight="fontWeightMedium" display="inline">Habilidades blandas:</Box>
            {' '}
            {jobOffer.softSkills.toString().replace(',', ', ') || '-'}
          </Typography>
          <Typography variant="body1" component="div">
            <Box fontWeight="fontWeightMedium" display="inline">Requerimientos especiales:</Box>
            {' '}
            {jobOffer.specialRequirements.toString().replace(',', ', ') || '-'}
          </Typography>
          <Typography variant="body1" component="div">
            <Box fontWeight="fontWeightMedium" display="inline">Fecha de ingreso:</Box>
            {' '}
            {new Date(jobOffer.approxStartDate).toLocaleDateString() || '-'}
          </Typography>
          <Typography variant="body1" component="div">
            <Box fontWeight="fontWeightMedium" display="inline">Tipo de servicio:</Box>
            {' '}
            {summaryLabels[jobOffer.serviceType] || '-'}
          </Typography>
          <Typography variant="body1" component="div">
            <Box fontWeight="fontWeightMedium" display="inline">Tipo de contrato:</Box>
            {' '}
            {jobOffer.contractType || '-'}
          </Typography>
          <Typography variant="body1" component="div">
            <Box fontWeight="fontWeightMedium" display="inline">Jornada laboral:</Box>
            {' '}
            {summaryLabels[jobOffer.shiftType] || '-'}
          </Typography>
          <Typography variant="body1" component="div">
            <Box fontWeight="fontWeightMedium" display="inline">Dirección laboral:</Box>
            {' '}
            {jobOffer.workAddress ? (
              `${`${jobOffer.workAddress.street}, 
              ${jobOffer.workAddress.number}`}, 
              ${jobOffer.workAddress.comuna}, 
              ${jobOffer.workAddress.city}`) : null || '-'}
          </Typography>

          <Typography variant="body1" component="div">
            <Box fontWeight="fontWeightMedium" display="inline">Requiere computador:</Box>
            {' '}
            {jobOffer.requiresComputer ? 'Sí' : 'No' || '-'}
          </Typography>
          <Typography variant="body1" component="div">
            <Box fontWeight="fontWeightMedium" display="inline">Descripción:</Box>
            {' '}
            {jobOffer.offerDescription || '-'}
          </Typography>
          {questions.map((question, index) => (
            <Typography key={question} variant="body1" component="div">

              <Box fontWeight="fontWeightMedium" display="inline">
                {`Pregunta ${index + 1}: `}
              </Box>
              {question}
            </Typography>
          ))}
        </div>

      </Grid>
      <Grid item xs={12} sm={5}>
        <Hidden smUp><hr /></Hidden>

        <div className={classes.detailBody} style={{ textAlign: 'center' }}>
          <Button
            color="primary"
            variant="outlined"
            disabled={mutationLoading || (!!jobOffer.closeMessage)}
            onClick={() => setShowCloseJobOffer((o) => !o)}
          >
            Cerrar proceso
            { mutationLoading && <CircularProgress color="primary" />}
            {mutationError && <Cancel color="error" />}

          </Button>
          {showCloseJobOffer ? (
            <div>
              <Typography component="div" gutterBottom variant="caption" style={{ fontWeight: 'bold' }}>¿Tiene seguridad de que desea cerrar el proceso?</Typography>
              <Typography component="div" variant="caption">Todos los candidatos se rechazarán automáticamente y esta acción es irreversible</Typography>
              <Button
                onClick={() => setShowCloseJobOffer(false)}
              >
                No

              </Button>
              <Button
                color="secondary"
                disabled={mutationLoading}
                onClick={() => setShowCloseJobOfferMessage((o) => !o)}
              >
                Sí

              </Button>
              {showCloseJobOfferMessage ? (
                <>
                  <div>
                    <TextField
                      multiline
                      rows={6}
                      variant="outlined"
                      label="Mensaje de cierre"
                      value={closeJobOfferMessage}
                      onChange={(e) => setCloseJobOfferMessage(e.target.value)}
                    />
                  </div>
                  <Button
                    onClick={handleCloseJobOffer}
                    disabled={closeJobOfferMessage.length < 5 || mutationLoading}
                  >
                    Enviar
                    { mutationLoading && <CircularProgress color="primary" size={15} />}
                    {mutationError && <Cancel color="error" />}
                  </Button>
                </>
              ) : null}

            </div>

          ) : null}
        </div>

      </Grid>
    </Grid>

  );
}
