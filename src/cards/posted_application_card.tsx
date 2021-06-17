import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import CardHeader from '@material-ui/core/CardHeader';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { red, green, yellow } from '@material-ui/core/colors';
import AssignmentIcon from '@material-ui/icons/Assignment';

import { JobOfferSummaryType } from '../types/job-offer-query-types';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    maxWidth: 230,
    margin: theme.spacing(0.5),
  },
  cardHeader: {
    marginBottom: 0,
    paddingBottom: 0,

  },
  avatar: {
    width: theme.spacing(4),
    height: theme.spacing(4),
    margin: 0,
  },
  icon: {
    color: '#fff',
  },
  cardContent: {
    textAlign: 'left',
  },
}));

function statusColor(status:string) {
  switch (status) {
    case 'JOB_OFFER':
      return red[500];
    case 'PSYCHOLOGICAL':
      return yellow[500];
    case 'TECHNICAL':
      return green[500];
    default:
      return 'white';
  }
}

// interface DateOptionsSchema{
//   weekday:'long',
//   year:'numeric',
//   month:'long',
//   day:'numeric',
// }

interface JobOfferCardProps{
  id: number,
  jobOffer: JobOfferSummaryType,
  handleOpenDetails: (RequestId:string) => void,
}

export default function PostedApplicationCard(props:JobOfferCardProps):JSX.Element {
  const { id, jobOffer, handleOpenDetails } = props;
  const classes = useStyles();
  // const options:DateOptionsSchema = {
  //   weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  // };
  const openDetails = () => {
    handleOpenDetails(jobOffer.id);
  };

  return (
    <Card className={classes.root}>
      <CardActionArea onClick={openDetails}>
        <CardHeader
          className={classes.cardHeader}
          avatar={(
            <Avatar aria-label="status" className={classes.avatar} style={{ backgroundColor: statusColor('JOB_OFFER') }}>
              <AssignmentIcon className={classes.icon} />
            </Avatar>
          )}
          title={(
            <Typography variant="body2" component="div">
              N°
              {' '}
              {id + 1}
            </Typography>
          )}
          subheader={(
            <Typography style={{ height: 55 }} variant="body1" component="h2">
              <Box fontWeight="fontWeightMedium" display="inline">{jobOffer.position}</Box>
            </Typography>
          )}
          disableTypography
        />

        <CardContent className={classes.cardContent}>
          <Typography variant="caption" component="div">
            <Box fontWeight="fontWeightMedium" display="inline">Vacantes:</Box>
            {' '}
            {jobOffer.vacancies}
          </Typography>
          <Typography variant="caption" component="div">
            <Box fontWeight="fontWeightMedium" display="inline">Tecnologías necesarias:</Box>
            {' '}
            {jobOffer.languages.map((entry:{ language:string }) => entry.language).join(', ') || '-'}
          </Typography>
          <Typography variant="caption" component="div">
            <Box fontWeight="fontWeightMedium" display="inline">Duración del trabajo:</Box>
            {' '}
            {jobOffer.possibleDuration ? `${jobOffer.possibleDuration} meses` : '-'}
          </Typography>
          <Typography noWrap variant="caption" component="div">
            <Box fontWeight="fontWeightMedium" display="inline">Descripción:</Box>
            {' '}
            {jobOffer.offerDescription || '-'}
          </Typography>
          {/* <Typography variant="caption" component="p">
            <Box fontWeight="fontWeightMedium" display="inline">Fecha postulación:</Box>
            {' '}
            {PostedDate.toLocaleDateString('es-ES', options)}
          </Typography>
          <Typography variant="caption" component="p">
            <Box fontWeight="fontWeightMedium" display="inline">SLA:</Box>
            {' '}
            {SLA.toLocaleDateString('es-ES', options)}
          </Typography> */}
        </CardContent>
      </CardActionArea>

    </Card>
  );
}
