import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const hiringInfoStyles = makeStyles((theme: Theme) => createStyles({
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

export default hiringInfoStyles;
