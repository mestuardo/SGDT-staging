import React from 'react';
import Image from 'next/image';
import {
  Button,
  Grid,
  Paper,
  Typography,
} from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { useRouter } from 'next/router';

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
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  button: {
    margin: theme.spacing(10, 0, 2),
    width: theme.spacing(30),
    fontSize: '30px',
  },
}));

export default function Index(): JSX.Element {
  const classes = useStyles();
  const router = useRouter();
  const handleLoginRedirect = () => router.push('/login');
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
        xs={11}
        component={Paper}
      >
        <div className={classes.paper}>
          <Image src="/Logo-Trebol-2020_RGB.png" alt="me" width="407" height="102" />
          <Typography gutterBottom component="h1" variant="h5">
            Sistema de gestión de talentos
          </Typography>
          <Button
            onClick={handleLoginRedirect}
              // variant="contained"
            size="large"
            color="secondary"
            className={classes.button}
          >
            Entrar
          </Button>
        </div>
      </Grid>
    </Grid>
  );
}
