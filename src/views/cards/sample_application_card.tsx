import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import CardHeader from '@material-ui/core/CardHeader';
import React from 'react';
import AssignmentIcon from '@material-ui/icons/Assignment';

import { sampleApplicationCardStyles } from './styles';
import { CreateRequestTypeString } from '../../types/create-request-string-types';

interface RequestCardProps{
  formSchema: CreateRequestTypeString,
}

export default function ApplicantCard(props:RequestCardProps) : JSX.Element {
  const { formSchema } = props;
  const classes = sampleApplicationCardStyles();

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
            <Box fontWeight="fontWeightMedium" display="inline">{formSchema.position}</Box>
          </Typography>
          )}
        disableTypography
      />

      <CardContent className={classes.cardContent}>
        <Typography variant="caption" component="div">
          <Box fontWeight="fontWeightMedium" display="inline">Cliente:</Box>
          {' '}
          {formSchema.client}
        </Typography>
        <Typography variant="caption" component="div">
          <Box fontWeight="fontWeightMedium" display="inline">Reclutador:</Box>
          {' '}
          {formSchema.recruiter}
        </Typography>
        <Typography variant="caption" component="div">
          <Box fontWeight="fontWeightMedium" display="inline">Vacantes:</Box>
          {' '}
          {formSchema.vacancies}
        </Typography>
      </CardContent>
    </Card>
  );
}
