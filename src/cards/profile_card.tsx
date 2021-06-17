import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import CardHeader from '@material-ui/core/CardHeader';
import { green } from '@material-ui/core/colors';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';

import { useQuery } from '@apollo/client';
import GET_PROFESSIONAL from '../queries/get-professional.graphql';
import { ProfessionalData, GetProfessionalType } from '../types/get-professional-types';

import { FilterApplicationsType } from '../types/filter-applications-query-types';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    maxWidth: 200,
    margin: theme.spacing(0.5),
  },
  cardHeader: {
    marginBottom: 0,
    paddingBottom: 0,

  },
  avatar: {
    backgroundColor: green[600],
    sizes: 'large',
    alignItems: 'center',
  },
  cardContent: {
    textAlign: 'left',
  },
}));

interface ProfileCardProps {
  application: FilterApplicationsType;
  handleOpenDialog: (
    ProfileId:string,
    application: FilterApplicationsType,
    professionalData: GetProfessionalType
  ) => void
}

const ProfileCard = (props: ProfileCardProps): JSX.Element => {
  const classes = useStyles();
  const {
    application, handleOpenDialog,
  } = props;

  const { data: professionalsData, loading, error } = useQuery<ProfessionalData>(
    GET_PROFESSIONAL, {
      variables: { getProfessionalProfessionalId: application.professionalId },
    },
  );

  // Handle loading, error and data from Graphql query
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
            {`${professional.specialty}`}
          </Typography>

        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ProfileCard;
