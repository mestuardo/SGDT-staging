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
        saveJobOfferProfessionalId: '60ec604347a1c50003285e75',
        saveJobOfferJobOfferId: jobOffer.id.toString(),
      },
    }).then(() => {
      if (mutationError) throw (mutationError);
      onSaveSuccess();
    }).catch((otherError) => {
      throw (otherError);
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
  const getSLADaysLeft = () => {
    const MS_PER_DAY = 1000 * 60 * 60 * 24;

    // a and b are javascript Date objects
    function dateDiffInDays(a: Date, b: Date) {
      // Discard the time and time-zone information.
      const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
      const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

      return Math.floor((utc2 - utc1) / MS_PER_DAY);
    }
    if (jobOffer.closeMessage) {
      return 'CLOSED';
    }

    const SLAdaysLeft = dateDiffInDays(new Date(), new Date(jobOffer.sla_start));
    if ((SLAdaysLeft <= 15) && (SLAdaysLeft > 5)) {
      return 'MID';
    }
    if (SLAdaysLeft > 15) {
      return 'FAR';
    }
    return 'CLOSE';
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        className={classes.cardHeader}
        avatar={(
          <Badge
            classes={{
              badge: classes.badgeDefault,
              colorPrimary: classes.badgeAccepted,
              colorSecondary: classes.badgePsy,
              colorError: classes.badgeTech,
            }}
            color={(applicationsData && setBadgeColor(applicationsData.jobOfferApplications)) || 'default'}
            badgeContent={(!hideBadge && applicationsData)
              ? applicationsData.jobOfferApplications.filter((application) => application.status !== 'REJECTED'
                && application.stage !== 'JOB_OFFER').length : 0}
          >
            <Avatar aria-label="status" className={classes.avatar} style={{ backgroundColor: statusColor(getSLADaysLeft()) }}>
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
          {jobOffer.client}
        </Typography>
        <Typography variant="caption" component="div">
          <Box fontWeight="fontWeightMedium" display="inline">Reclutador:</Box>
          {' '}
          {jobOffer.recruiter}
        </Typography>
        {jobOffer.closeMessage ? null : (
          <Typography variant="caption" component="div">
            <Box fontWeight="fontWeightMedium" display="inline">SLA Inicio:</Box>
            {' '}
            {new Date(jobOffer.sla_start).toLocaleDateString()}
          </Typography>
        ) }
        <Typography variant="caption" component="div">
          <Box fontWeight="fontWeightMedium" display="inline">Vacantes:</Box>
          {' '}
          {jobOffer.vacancies}
        </Typography>
        {jobOffer.closeMessage ? (
          <Typography variant="caption" component="div">
            <Box fontWeight="fontWeightMedium" display="inline">Fecha cierre:</Box>
            {' '}
            {new Date(jobOffer.closeJobOfferDate).toLocaleDateString()}
          </Typography>
        ) : null }
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
