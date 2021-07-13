import React from 'react';
import {
  Avatar,
  Box,
  Card,
  CardActionArea,
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
}

export default function PostedApplicationCard(props:JobOfferCardProps) : JSX.Element {
  const { jobOffer } = props;
  const classes = postedApplicationCardStyles();

  return (
    <CardActionArea>
      <Card className={classes.root}>
        <CardHeader
          className={classes.cardHeader}
          avatar={(
            <Avatar aria-label="status" className={classes.avatar} style={{ backgroundColor: statusColor('JOB_OFFER') }}>
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
            {/* {request.client} */}
            {/* TODO: agregar el cliente cuando pase de ser ID a texto */}
            Cliente de ejemplo
          </Typography>
          <Typography variant="caption" component="div">
            <Box fontWeight="fontWeightMedium" display="inline">Reclutador:</Box>
            {' '}
            {/* {request.recruiter} */}
            {/* TODO: agregar el reclutador cuando pase de ser ID a texto */}
            {jobOffer.recruiter}
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
      </Card>
    </CardActionArea>
  );
}
