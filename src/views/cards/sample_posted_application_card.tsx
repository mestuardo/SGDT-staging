import React from 'react';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,

} from '@material-ui/core';
import AssignmentIcon from '@material-ui/icons/Assignment';

import { postedApplicationCardStyles } from './styles';

import { JobOfferSummaryType } from '../../types/job-offer-query-types';

import statusColor from './helpers';

interface JobOfferCardProps{
  jobOffer: JobOfferSummaryType,
  SLA_2: Date|null,
}

export default function PostedApplicationCard(props:JobOfferCardProps) : JSX.Element {
  const { jobOffer, SLA_2 } = props;
  const classes = postedApplicationCardStyles();

  const getSLADaysLeft = () => {
    const MS_PER_DAY = 1000 * 60 * 60 * 24;

    // a and b are javascript Date objects
    function dateDiffInDays(a: Date, b: Date) {
      // Discard the time and time-zone information.
      const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
      const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

      return Math.floor((utc2 - utc1) / MS_PER_DAY);
    }
    if (SLA_2) {
      const SLAdaysLeft = dateDiffInDays(new Date(), SLA_2);
      if ((SLAdaysLeft <= 4) && (SLAdaysLeft > 2)) {
        return 'MID';
      }
      if (SLAdaysLeft > 4) {
        return 'FAR';
      }
    }
    return 'CLOSE';
  };

  return (

    <Card className={classes.root}>
      <CardHeader
        className={classes.cardHeader}
        avatar={(
          <Avatar aria-label="status" className={classes.avatar} style={{ backgroundColor: statusColor(getSLADaysLeft()) }}>
            <AssignmentIcon className={classes.icon} />
          </Avatar>

          )}
        title={(
          <Typography variant="body2" component="div">
            <Box fontWeight="fontWeightMedium" display="inline">{jobOffer.position}</Box>
          </Typography>
          )}
        disableTypography
      />
      <CardContent className={classes.cardContent}>
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
        <Typography variant="caption" component="div">
          <Box fontWeight="fontWeightMedium" display="inline">SLA Fin:</Box>
          {' '}
          {SLA_2 ? SLA_2.toLocaleDateString() : null}
        </Typography>
        <Typography variant="caption" component="div">
          <Box fontWeight="fontWeightMedium" display="inline">Vacantes:</Box>
          {' '}
          {jobOffer.vacancies}
        </Typography>
      </CardContent>
    </Card>
  );
}
