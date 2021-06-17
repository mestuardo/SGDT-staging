import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import CardHeader from '@material-ui/core/CardHeader';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import React from 'react';
import AssignmentIcon from '@material-ui/icons/Assignment';

import { RequestSummaryType } from '../types/request-query-types';

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
    backgroundColor: red[200],
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

interface RequestCardProps{
  id: number,
  request: RequestSummaryType,
  handleOpenDialog: (RequestId:string) => void,
}

// interface DateOptionsSchema{
//   weekday:'long',
//   year:'numeric',
//   month:'long',
//   day:'numeric',
// }

export default function ApplicantCard(props:RequestCardProps):JSX.Element {
  const { id, request, handleOpenDialog } = props;
  const classes = useStyles();
  // const options:DateOptionsSchema = {
  //   weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  // };

  const setDialogContent = () => {
    handleOpenDialog(request.id);
  };

  return (
    <Card className={classes.root}>
      <CardActionArea onClick={setDialogContent}>
        <CardHeader
          className={classes.cardHeader}
          avatar={(
            <Avatar aria-label="status" className={classes.avatar}>
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
            <Typography style={{ height: 53 }} variant="body1" component="h2">
              <Box fontWeight="fontWeightMedium" display="inline">{request.position}</Box>
            </Typography>
          )}
          disableTypography
        />

        <CardContent className={classes.cardContent}>
          <Typography variant="caption" component="div">
            <Box fontWeight="fontWeightMedium" display="inline">Vacantes:</Box>
            {' '}
            {request.vacancies}
          </Typography>
          <Typography variant="caption" component="div">
            <Box fontWeight="fontWeightMedium" display="inline">Duración del trabajo:</Box>
            {' '}
            {request.possibleDuration || '-'}
          </Typography>
          <Typography variant="caption" component="div">
            <Box fontWeight="fontWeightMedium" display="inline">Tecnologías necesarias:</Box>
            {' '}
            {request.languages ? request.languages.map((entry:{ language:string, level:string }) => `${entry.language}`).join(', ') : '-'}
          </Typography>
          {/* We'll show it later */}
          {/* <Typography variant="caption" component="p">
            <Box fontWeight="fontWeightMedium" display="inline">Fecha creación:</Box>
            {' '}
            {CreatedDate.toLocaleDateString('es-ES', options)}
          </Typography> */}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
