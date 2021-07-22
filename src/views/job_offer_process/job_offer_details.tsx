import React from 'react';

import {
  Button,
  Box,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Hidden,
  Typography,
  CircularProgress,
} from '@material-ui/core';
import {
  Cancel,
} from '@material-ui/icons';
import { useKeycloak } from '@react-keycloak/ssr';
import type { KeycloakInstance } from 'keycloak-js';
import { DocumentNode, useMutation } from '@apollo/client';
import { jobOfferDetailStyles } from './styles';
import { JobOfferDetailType } from '../../types/job-offer-query-types';
import { summaryLabels } from './helpers';
import ParsedTokenType from '../../types/keycloak-token-type';
import { checkIfAllowed } from '../../helpers/roles';
import CLOSE_JOB_OFFER from '../../mutations/closeJobOffer.graphql';
import ARCHIVE_JOB_OFFER from '../../mutations/archiveJobOffer.graphql';
import RECRUITMENT_PROCESS_INDEX_QUERY from '../../queries/recruitment-process-index.graphql';

interface JobOfferDetailProps{
  jobOffer: JobOfferDetailType,
}

export default function JobOfferDetails(props: JobOfferDetailProps): JSX.Element {
  // Keycloak instance, recieves parameters from the provider
  const { keycloak } = useKeycloak<KeycloakInstance>();
  // The token received by keycloak with the data
  const parsedToken = keycloak?.tokenParsed as ParsedTokenType;
  const { jobOffer } = props;
  const classes = jobOfferDetailStyles();
  const { questions } = jobOffer;
  const redirectOnSubmit = (link: string) => { window.location.href = link; };
  const [closeJobOffer,
    { loading: mutationLoading, error: mutationError }] = useMutation(CLOSE_JOB_OFFER);
  const [archiveJobOffer,
    { loading: archiveLoading, error: archiveError }] = useMutation(ARCHIVE_JOB_OFFER);

  const isRecruiterChief = parsedToken && checkIfAllowed(parsedToken, ['recruiterChief']);
  const [showCloseJobOffer, setShowCloseJobOffer] = React.useState(false);
  const [showCloseJobOfferMessage, setShowCloseJobOfferMessage] = React.useState(false);
  const [closeJobOfferMessage, setCloseJobOfferMessage] = React.useState('');
  const [openArchiveDialog, setOpenArchiveDialog] = React.useState(false);
  const handleCloseJobOffer = () => {
    closeJobOffer({
      variables: {
        closeJobOfferJobOfferId: jobOffer.id,
        closeJobOfferCloseMessage: closeJobOfferMessage,
      },
    }).then(() => {
      if (mutationError) throw (mutationError);
      redirectOnSubmit('/recruitment-process?closedRequests=true');
    }).catch((otherError) => {
      throw (otherError);
    });
  };
  const languageType = (type: string) => {
    if (type === 'WRITING') {
      return 'Escrito';
    }
    if (type === 'READING') { return 'Lectura'; }

    return 'Hablado';
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
        <hr />
        <Typography variant="body1" component="h6">
          <Box fontWeight="fontWeightMedium" display="inline">Cliente:</Box>
          {' '}
          {jobOffer.client}
        </Typography>
        <Typography variant="body1" component="h6">
          <Box fontWeight="fontWeightMedium" display="inline">Reclutador:</Box>
          {' '}
          {jobOffer.recruiter}
        </Typography>
        <hr />
      </Grid>

      <Grid item xs={12} sm={isRecruiterChief ? 7 : 12}>
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
            {jobOffer.languages ? jobOffer.languages.map(
              (entry:
              { language: string, level: string, type: string }) => `${entry.language} - ${entry.level} - ${languageType(entry.type)}`,
            ).join('; ') : '-'}
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
            {jobOffer.approxStartDate ? new Date(jobOffer.approxStartDate).toLocaleDateString() : '-'}
          </Typography>
          <Typography variant="body1" component="div">
            <Box fontWeight="fontWeightMedium" display="inline">Tipo de servicio:</Box>
            {' '}
            {summaryLabels[jobOffer.serviceType] || '-'}
          </Typography>
          <Typography variant="body1" component="div">
            <Box fontWeight="fontWeightMedium" display="inline">Tipo de contrato:</Box>
            {' '}
            {jobOffer.contractType.map((contract) => (contract === -1 ? 'Indefinido' : `Fijo ${contract} meses`)).join(', ') || '-'}
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
      {isRecruiterChief ? (
        <Grid item xs={12} sm={5}>
          <Hidden smUp><hr /></Hidden>

          <div className={classes.detailBody} style={{ textAlign: 'center', display: 'grid' }}>
            <Button
              style={{ color: 'red' }}
              disabled={archiveLoading}
              onClick={() => setOpenArchiveDialog(true)}
              color="secondary"
            >
              Archivar

            </Button>
            <Button
              color="primary"
              variant="outlined"
            // deshabilitar si user no es recruiterChief
              disabled={(mutationLoading || (!!jobOffer.closeMessage)) || !isRecruiterChief}
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
      ) : null}
      <Dialog
        open={openArchiveDialog}
      >
        <DialogTitle style={{ textAlign: 'center' }}>
          ¿Está seguro?
        </DialogTitle>
        <DialogContent>
          Esta acción es irreversible y esta solicitud desaparecerá para siempre
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenArchiveDialog(false)}
            color="secondary"
          >
            Cancelar
          </Button>

          <Button
            style={{ color: 'red' }}
            onClick={() => archiveJobOffer({
              variables: {
                archiveJobOfferJobOfferId: jobOffer.id,
              },
              refetchQueries: [
                { query: RECRUITMENT_PROCESS_INDEX_QUERY as DocumentNode },
              ],
            })
              .then(() => {
                // eslint-disable-next-line @typescript-eslint/no-floating-promises
                redirectOnSubmit('/recruitment-process?postedRequests=false');
              })
              .catch((mutErr) => { throw (mutErr); })}
          >
            Archivar
            {archiveLoading && <CircularProgress size={15} />}
            {archiveError && <Cancel color="error" />}
          </Button>

        </DialogActions>

      </Dialog>
    </Grid>

  );
}
