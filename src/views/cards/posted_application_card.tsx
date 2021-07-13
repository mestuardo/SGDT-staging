import React from 'react';
import {
  Avatar,
  Box,
  Button,
  Card,
  CircularProgress,
  CardContent,
  CardHeader,
  CardActions,
  Typography,
  Badge,
} from '@material-ui/core';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { useQuery, useMutation } from '@apollo/client';
import SAVE_JOB_OFFER from '../../mutations/saveJobOffer.graphql';

import { postedApplicationCardStyles } from './styles';
import { FilterApplicationDataType, FilterApplicationsType } from '../../types/filter-applications-query-types';
import { JobOfferSummaryType } from '../../types/job-offer-query-types';
import FILTER_APPLICATIONS from '../../queries/filter-applications.graphql';
import statusColor from './helpers';

interface JobOfferCardProps{
  jobOffer: JobOfferSummaryType,
  handleOpenDetails: (RequestId:string) => void,
  hideBadge: boolean,
  hideSaveButton: boolean,
  onSaveSuccess: () => void,
  isSaved: boolean,
}

export default function PostedApplicationCard(props:JobOfferCardProps) : JSX.Element {
  const {
    jobOffer,
    handleOpenDetails,
    onSaveSuccess,
    hideBadge = false,
    hideSaveButton = false,
    isSaved = false,
  } = props;
  const classes = postedApplicationCardStyles();

  const { data: applicationsData } = useQuery<FilterApplicationDataType>(
    FILTER_APPLICATIONS, {
      variables: { jobOfferId: jobOffer.id },
      fetchPolicy: 'network-only',
    },
  );

  const [saveOffer,
    { loading: mutationLoading, error: mutationError }] = useMutation(SAVE_JOB_OFFER);

  const handleSave = () => {
    saveOffer({
      variables: {
        saveJobOfferProfessionalId: '60e7cb10b2879c001142d330',
        saveJobOfferJobOfferId: jobOffer.id.toString(),
      },
    }).then(() => {
      if (mutationError) throw (mutationError);
      onSaveSuccess();
    }).catch((otherError) => {
      console.log(otherError);
    });
  };

  const openDetails = () => {
    handleOpenDetails(jobOffer.id);
  };

  const setBadgeColor = (appData: FilterApplicationsType[]) => {
    if (appData.filter((app: FilterApplicationsType) => app.status === 'ACCEPTED').length > 0) {
      return 'primary';
    }
    if (appData.filter((app: FilterApplicationsType) => app.stage === 'PSYCHOLOGICAL').length > 0) {
      return 'secondary';
    }
    if (appData.filter((app: FilterApplicationsType) => app.stage === 'TECHNICAL').length > 0) {
      return 'error';
    }
    return 'default';
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        className={classes.cardHeader}
        avatar={(
          <Badge
            color={(applicationsData && setBadgeColor(applicationsData.jobOfferApplications)) || 'default'}
            badgeContent={(!hideBadge && applicationsData) ? applicationsData.jobOfferApplications.filter((application) => application.status !== 'REJECTED').length : 0}
          >
            <Avatar aria-label="status" className={classes.avatar} style={{ backgroundColor: statusColor('JOB_OFFER') }}>
              <AssignmentIcon className={classes.icon} />
            </Avatar>
          </Badge>
        )}
        title={(
          <Typography variant="body2" component="div">
            <Box fontWeight="fontWeightMedium" display="inline">{jobOffer.position}</Box>
          </Typography>
        )}
        disableTypography
      />
      <CardContent onClick={openDetails} className={classes.cardContent}>
        <Typography variant="caption" component="div">
          <Box fontWeight="fontWeightMedium" display="inline">Cliente:</Box>
          {' '}
          {/* {request.client} */}
          {/* TODO: agregar el cliente cuando pase de ser ID a texto */}
          Cliente de ejemplo
        </Typography>
        <Typography variant="caption" component="div">
          <Box fontWeight="fontWeightMedium" display="inline">Reclutador:</Box>
          {' '}
          {/* {request.recruiter} */}
          {/* TODO: agregar el reclutador cuando pase de ser ID a texto */}
          Juan Perez
        </Typography>
        <Typography variant="caption" component="div">
          <Box fontWeight="fontWeightMedium" display="inline">SLA:</Box>
          {' '}
          3 a 5 días
          {/* TODO: add SLAs */}
        </Typography>
        <Typography variant="caption" component="div">
          <Box fontWeight="fontWeightMedium" display="inline">Vacantes:</Box>
          {' '}
          {jobOffer.vacancies}
        </Typography>
      </CardContent>
      {!hideSaveButton && (
        <CardActions>
          <Button size="small" color="primary" onClick={handleSave} disabled={isSaved}>
            {mutationLoading ? <CircularProgress size={15} /> : 'Guardar'}
          </Button>
        </CardActions>
      )}
    </Card>
  );
}
