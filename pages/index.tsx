import React from 'react';
import Container from '@material-ui/core/Container';
import Image from 'next/image';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { useRouter } from 'next/router';
import Appbar from '../src/appbar';

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
    <>
      <Appbar />
      <Container component="main" maxWidth="lg">

        <Card className={classes.card} raised>
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
        </Card>
      </Container>
    </>
  );
}
