import React from 'react';
import {
  Avatar,
  Grid,
  Paper,
  Hidden,
  CircularProgress,
  Typography,
} from '@material-ui/core';
import FaceIcon from '@material-ui/icons/Face';
import { useKeycloak } from '@react-keycloak/ssr';
import type { KeycloakInstance } from 'keycloak-js';
import useStyles from './styles';

export default function SignIn() : JSX.Element {
  const { keycloak } = useKeycloak<KeycloakInstance>();
  const classes = useStyles();
  React.useEffect(() => {
    setTimeout(() => {
      if (keycloak && !keycloak?.authenticated) {
        window.location.href = keycloak.createLoginUrl();
      }
    }, 5000);
  }, []);
  return (

    <Grid
      container
      className={classes.gridContainer}
      justify="center"
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
            Bienvenido a SGDT
          </Typography>
          <CircularProgress color="primary" />
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
