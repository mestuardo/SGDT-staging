import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const clientInfoStyles = makeStyles((theme: Theme) => createStyles({
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

export default clientInfoStyles;
