import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

export const clientInfoStyles = makeStyles((theme: Theme) => createStyles({
  formControl: {
    margin: theme.spacing(1),
    width: 150,
  },

  labelText: {
    fontSize: 'small',
  },
  inputText: {
    fontSize: 'small',
  },
  helperText: {
    fontSize: 'x-small',
    margin: 0,
    marginBottom: theme.spacing(1),
    padding: 0,
    height: 0,
  },
}));

export const requiredProfileInfoStyles = makeStyles((theme: Theme) => createStyles({
  formControl: {
    margin: theme.spacing(1),
    width: 150,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  labelText: {
    fontSize: 'small',
  },
  inputText: {
    fontSize: 'small',
  },
  textAreaText: {
    fontSize: 'small',

  },
  helperText: {
    fontSize: 'x-small',
    margin: 0,
    padding: 0,
    height: 0,
  },
}));

export const collabInfoStyles = makeStyles((theme: Theme) => createStyles({
  formControl: {
    margin: theme.spacing(1),
    width: 150,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  labelText: {
    fontSize: 'small',
  },
  inputText: {
    fontSize: 'small',
    height: theme.spacing(2.5),
  },
  helperText: {
    fontSize: 'x-small',
    margin: 0,
    padding: 0,
    height: 0,
  },
}));

export const hiringInfoStyles = makeStyles((theme: Theme) => createStyles({
  formControl: {
    margin: theme.spacing(1),
    width: 150,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  labelText: {
    fontSize: 'small',
  },
  inputText: {
    fontSize: 'small',
    height: theme.spacing(2.5),
  },
  helperText: {
    fontSize: 'x-small',
    margin: 0,
    padding: 0,
    height: 0,
  },
}));

export const summaryStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

export const requestFormStyles = makeStyles((theme: Theme) => ({
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  root: {
    marginBottom: theme.spacing(0),
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: theme.spacing(63),
    textAlign: 'center',
    justifyContent: 'center',
    '@media only screen and (max-width: 1279px)': {
      margin: theme.spacing(0),
    },
    '@media only screen and (max-width: 600px)': {
      height: theme.spacing(73),
    },
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    height: theme.spacing(45),
  },
  stepper: {
    maxWidth: '400px',
    margin: 'auto',
    '@media only screen and (max-width: 380px)': {
      paddingLeft: theme.spacing(0),
      paddingRight: theme.spacing(0),
    },
  },
  YgridList: {
    maxHeight: theme.spacing(42),
    justifyContent: 'center',
    '&::-webkit-scrollbar': {
      width: 10,
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
}));
