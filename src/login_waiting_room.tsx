import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import FaceIcon from '@material-ui/icons/Face';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useKeycloak } from '@react-keycloak/ssr';
import type { KeycloakInstance } from 'keycloak-js';

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
}));

export default function SignIn():JSX.Element {
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

    <Card className={classes.card} raised>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <FaceIcon />
        </Avatar>
        <Typography gutterBottom component="h1" variant="h5">
          Bienvenido a SGDT
        </Typography>
        <CircularProgress color="primary" />
      </div>
    </Card>

  );
}
