import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import FaceIcon from '@material-ui/icons/Face';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { useRouter } from 'next/router';

import { useKeycloak } from '@react-keycloak/ssr';

import type { KeycloakInstance, KeycloakTokenParsed } from 'keycloak-js';

const useStyles = makeStyles((theme: Theme) => createStyles({
  card: {
    marginTop: theme.spacing(7),
  },
  paper: {
    margin: theme.spacing(4),
    height: '424px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  button: {
    margin: theme.spacing(3, 0, 2),
  },
}));

type ParsedToken = KeycloakTokenParsed & {
  email?: string

  preferred_username?: string

  given_name?: string

  family_name?: string
};

export default function LoginView(): JSX.Element {
  // Keycloak instance, recieves parameters from the provider
  const { keycloak } = useKeycloak<KeycloakInstance>();
  // The token received by keycloak with the data
  const parsedToken: ParsedToken | undefined = keycloak?.tokenParsed;
  const classes = useStyles();
  const router = useRouter();
  const handlePersonnelRequestRedirect = () => router.push('/personnel-request');
  const handleRecruitmentProcessRedirect = () => router.push('/recruitment-process');

  return (

    <Card className={classes.card} raised>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <FaceIcon />
        </Avatar>
        <Typography gutterBottom component="h1" variant="h5">
          ¡Hola
          {' '}
          {parsedToken?.given_name}
          !
        </Typography>
        <Button
          onClick={handlePersonnelRequestRedirect}
          variant="contained"
          color="secondary"
          className={classes.button}
        >
          Nueva solicitud
        </Button>
        <Button
          onClick={handleRecruitmentProcessRedirect}
          variant="contained"
          color="secondary"
          className={classes.button}
        >
          Procesos activos
        </Button>
      </div>
    </Card>

  );
}
