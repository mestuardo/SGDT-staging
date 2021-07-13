import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
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
    <CardActionArea onClick={redirectToReview}>
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
            Juan Perez
          </Typography>
          <Typography variant="caption" component="div">
            <Box fontWeight="fontWeightMedium" display="inline">Vacantes:</Box>
            {' '}
            {request.vacancies}
          </Typography>
        </CardContent>
      </Card>
    </CardActionArea>
  );
}
