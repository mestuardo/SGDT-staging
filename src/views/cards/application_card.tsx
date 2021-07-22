import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import CardHeader from '@material-ui/core/CardHeader';
import React from 'react';
import AssignmentIcon from '@material-ui/icons/Assignment';

import { applicationCardStyles } from './styles';
import { RequestSummaryType } from '../../types/request-query-types';

interface RequestCardProps{
  request: RequestSummaryType,
  handleOpenDetails: (RequestId:string) => void,
}

export default function ApplicantCard(props:RequestCardProps) : JSX.Element {
  const { request, handleOpenDetails } = props;
  const classes = applicationCardStyles();

  const redirectToReview = () => {
    handleOpenDetails(request.id);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        className={classes.cardHeader}
        avatar={(
          <Avatar aria-label="status" className={classes.avatar}>
            <AssignmentIcon className={classes.icon} />
          </Avatar>
          )}
        title={(
          <Typography variant="body2" component="div">
            <Box fontWeight="fontWeightMedium" display="inline">{request.position}</Box>
          </Typography>
          )}
        disableTypography
      />

      <CardContent data-testid="request-card-area" className={classes.cardContent} onClick={redirectToReview}>
        <Typography variant="caption" component="div">
          <Box fontWeight="fontWeightMedium" display="inline">Cliente:</Box>
          {' '}
          {request.client}
        </Typography>
        <Typography variant="caption" component="div">
          <Box fontWeight="fontWeightMedium" display="inline">Reclutador:</Box>
          {' '}
          {request.recruiter}
        </Typography>
        <Typography variant="caption" component="div">
          <Box fontWeight="fontWeightMedium" display="inline">Vacantes:</Box>
          {' '}
          {request.vacancies}
        </Typography>
        <Typography variant="caption" component="div">
          <Box fontWeight="fontWeightMedium" display="inline">Creación:</Box>
          {' '}
          {new Date(request.requestCreationDate).toLocaleDateString()}
        </Typography>
      </CardContent>
    </Card>
  );
}
