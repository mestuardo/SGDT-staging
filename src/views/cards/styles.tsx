import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

export const sampleApplicationCardStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    width: 220,
    margin: theme.spacing(0.5),
    height: 170,
  },
  cardHeader: {
    marginBottom: 0,
    paddingBottom: 0,
    height: theme.spacing(8),
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

export const applicationCardStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    maxWidth: 230,
    margin: theme.spacing(1),
    height: 180,
  },
  cardHeader: {
    marginBottom: 0,
    paddingBottom: 0,
    height: theme.spacing(8),
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
    cursor: 'pointer',
    textAlign: 'left',
  },
}));

export const profileCardStyles = makeStyles((theme: Theme) => createStyles({
  rootDialog: {
    margin: theme.spacing(1.5),
    width: '100%',
  },
  root: {
    margin: theme.spacing(1.5),
    width: '30%',
    height: '100%',
  },
  cardHeader: {
    marginBottom: 0,
    paddingBottom: 0,
  },
  icon: {
    color: '#fff',
  },
  crossIcon: {
    color: '#fff',
    height: '1%',
    width: '5%',
    marginTop: '3%',
  },
  cardContent: {
    textAlign: 'left',
    display: 'flex',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%',
  },
  cardForm: {
    display: 'flex',
    flexDirection: 'column',
    width: '25%',
  },
}));

export const postedApplicationCardStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    maxWidth: 230,
    margin: theme.spacing(0.5),
    maxHeight: 250,
  },
  cardHeader: {
    marginBottom: 0,
    paddingBottom: 0,
    height: theme.spacing(8),
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
    cursor: 'pointer',
    height: 120,
  },
  badgeDefault: {
    color: 'white',
    backgroundColor: 'red',
  },
  badgeAccepted: {
    color: 'white',
    backgroundColor: 'green',
  },
  badgePsy: {
    color: 'black',
    backgroundColor: 'orange',
  },
  badgeTech: {
    color: 'white',
    backgroundColor: 'blue',
  },
}));

export const offerCardStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    maxWidth: 230,
    margin: theme.spacing(1),
  },
  content: {
    height: 70,
    overflow: 'hidden',
    cursor: 'pointer',
  },
}));
