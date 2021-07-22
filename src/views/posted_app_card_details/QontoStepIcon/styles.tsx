import { makeStyles } from '@material-ui/core/styles';

const useQontoStepIconStyles = makeStyles({
  root: {
    color: '#eaeaf0',
    display: 'flex',
    height: 0,
    alignItems: 'center',
  },
  active: {
    color: '#784af4',
  },
  circle: {
    width: 10,
    height: 10,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
  completed: {
    color: '#784af4',
    zIndex: 1,
    fontSize: 22,
  },
});

export default useQontoStepIconStyles;
