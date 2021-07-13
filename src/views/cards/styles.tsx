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
    textAlign: 'left',
  },
}));

export const postedApplicationCardStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    maxWidth: 230,
    margin: theme.spacing(1),
    maxHeight: 210,
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
    height: 115,
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
      width: 2,
    },
    '&::-webkit-scrollbar-track': {
      borderRadius: '8px',
      boxShadow: 'inset 0 0 6px rgba(0, 0, 0, 0.3)',
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: '8px',
      backgroundColor: 'darkgrey',
    },
  },
  Badge: {
    color: 'red',
  },
}));
