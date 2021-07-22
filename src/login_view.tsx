import React from 'react';
import {
  Avatar,
  Button,
  Grid,
  Hidden,
  Paper,
  Typography,
} from '@material-ui/core';
import FaceIcon from '@material-ui/icons/Face';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { useRouter } from 'next/router';
import { useKeycloak } from '@react-keycloak/ssr';
import type { KeycloakInstance } from 'keycloak-js';
import { checkIfAllowed, userIsProfessional } from './helpers/roles';

import ParsedTokenType from './types/keycloak-token-type';

const useStyles = makeStyles((theme: Theme) => createStyles({
  gridContainer: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(0),
    marginLeft: theme.spacing(10),
    textAlign: 'center',
    '@media only screen and (max-width: 1250px)': {
      marginLeft: theme.spacing(0),
    },
  },
  gridItem: {
    margin: theme.spacing(0, 0),
    marginLeft: theme.spacing(1),
  },
  paper: {
    margin: theme.spacing(4),
    height: theme.spacing(68),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  button: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function LoginView() : JSX.Element {
  // Keycloak instance, recieves parameters from the provider
  const { keycloak } = useKeycloak<KeycloakInstance>();
  // The token received by keycloak with the data
  const parsedToken = keycloak?.tokenParsed as ParsedTokenType;
  const classes = useStyles();
  const router = useRouter();
  const handlePersonnelRequestRedirect = () => router.push('/personnel-request');
  const handleRecruitmentProcessRedirect = () => router.push('/recruitment-process');
  const isRecruiterChief = parsedToken && checkIfAllowed(parsedToken, ['recruiterChief']);
  const isProfessional = parsedToken && userIsProfessional(parsedToken);

  if (isProfessional) {
    return (
      <Grid
        container
        className={classes.gridContainer}
        justifyContent="center"
        alignContent="center"
        alignItems="center"
        spacing={0}
      >
        <Grid
          item
          xs={12}
          lg={8}
          component={Paper}
        >
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <FaceIcon />
            </Avatar>
            <Typography gutterBottom component="h1" variant="h5">
              {`¡Hola ${parsedToken?.given_name}!`}
            </Typography>
          </div>
        </Grid>
        <Hidden mdDown>
          <Grid
            item
            md={3}
            component={Paper}
            className={classes.gridItem}
          >

            <div style={{
              marginTop: '30px',
              height: '575px',
              display: 'grid',
              justifyContent: 'center',
              textAlign: 'center',
              placeItems: 'center',
            }}
            />
          </Grid>
        </Hidden>
      </Grid>
    );
  }

  return (
    <Grid
      container
      className={classes.gridContainer}
      justifyContent="center"
      alignContent="center"
      alignItems="center"
      spacing={0}
    >
      <Grid
        item
        xs={12}
        lg={8}
        component={Paper}
      >
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <FaceIcon />
          </Avatar>
          <Typography gutterBottom component="h1" variant="h5">
            {`¡Hola ${parsedToken?.given_name}!`}
          </Typography>
          {/* mostrar botón solo si es jefe reclutador */}
          {isRecruiterChief
            ? (
              <Button
                onClick={handlePersonnelRequestRedirect}
                variant="contained"
                color="secondary"
                className={classes.button}
              >
                Nueva solicitud
              </Button>
            )
            : null }
          <Button
            onClick={handleRecruitmentProcessRedirect}
            variant="contained"
            color="secondary"
            className={classes.button}
          >
            Procesos activos
          </Button>
        </div>
      </Grid>
      <Hidden mdDown>
        <Grid
          item
          md={3}
          component={Paper}
          className={classes.gridItem}
        >

          <div style={{
            marginTop: '30px',
            height: '575px',
            display: 'grid',
            justifyContent: 'center',
            textAlign: 'center',
            placeItems: 'center',
          }}
          />
        </Grid>
      </Hidden>
    </Grid>

  );
}
