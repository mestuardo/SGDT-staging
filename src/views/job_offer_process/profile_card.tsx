import React from 'react';
import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CircularProgress,
  Typography,
} from '@material-ui/core';
import { useQuery } from '@apollo/client';

import { profileCardStyles } from './styles';
import { ProfessionalData, GetProfessionalType } from '../../types/get-professional-types';
import { FilterApplicationsType } from '../../types/filter-applications-query-types';
import GET_PROFESSIONAL from '../../queries/get-professional.graphql';

interface ProfileCardProps {
  application: FilterApplicationsType;
  handleOpenDialog: (
    ProfileId:string,
    application: FilterApplicationsType,
    professionalData: GetProfessionalType
  ) => void
}

export default function ProfileCard(props: ProfileCardProps) : JSX.Element {
  const classes = profileCardStyles();
  const {
    application, handleOpenDialog,
  } = props;

  const { data: professionalsData, loading, error } = useQuery<ProfessionalData>(
    GET_PROFESSIONAL, {
      variables: { getProfessionalID: application.professionalId },
    },
  );

  if (loading) {
    return (
      <Card>
        <CardContent style={{ textAlign: 'center' }}>
          <CircularProgress />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent style={{ textAlign: 'center' }}>Ha ocurrido un error</CardContent>
      </Card>
    );
  }

  const { professional }: {
    professional: GetProfessionalType
  } = professionalsData as ProfessionalData;
  const setDialogContent = () => {
    handleOpenDialog(application.professionalId, application, professional);
  };

  return (
    <Card className={classes.root}>
      <CardActionArea onClick={setDialogContent}>
        <CardHeader
          className={classes.cardHeader}
          avatar={(
            <Avatar alt={application.professionalId} className={classes.avatar} variant="rounded" />
          )}
          title={(
            <Typography variant="body2" component="div">
              Postulante
            </Typography>
            )}
          subheader={(
            <Typography style={{ height: 53 }} variant="h6" component="h3">
              {`${professional.name} ${professional.firstSurname}`}
            </Typography>
            )}
          disableTypography
        />

        <CardContent className={classes.cardContent}>

          <Typography variant="caption" component="div">
            <Box fontWeight="fontWeightMedium" display="inline">Especialidad:</Box>
            {' '}
            {`${professional.specialty}`}
          </Typography>
          <Typography variant="caption" component="div">
            <Box fontWeight="fontWeightMedium" display="inline">F. postulación:</Box>
            {' '}
            {`${new Date(application.applicationCreationDate).toLocaleDateString()}`}
          </Typography>
          {(application.status === 'IN_PROCESS' && application.stage !== 'JOB_OFFER') ? (
            <Typography variant="caption" component="div">
              <Box fontWeight="fontWeightMedium" display="inline">F. Cambio fase:</Box>
              {`${new Date(application.lastStageDate).toLocaleDateString()}`}
            </Typography>
          ) : null}
          {application.status !== 'IN_PROCESS' ? (
            <Typography variant="caption" component="div">
              <Box fontWeight="fontWeightMedium" display="inline">
                F.
                {' '}
                {application.status === 'ACCEPTED' ? 'aceptación: ' : 'rechazo: ' }
              </Box>
              {`${new Date(application.decisionDate).toLocaleDateString()}`}
            </Typography>
          ) : null}

        </CardContent>
      </CardActionArea>
    </Card>
  );
}
