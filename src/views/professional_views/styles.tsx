import { makeStyles } from '@material-ui/core/styles';

const profileStyle = makeStyles((theme) => ({
  card: {
    marginTop: theme.spacing(7),
  },
  profileContainer: {
    width: '80%',
    marginLeft: '20%',
    paddingBottom: '5%',
  },
  upperContainer: {
    width: '80%',
    borderRadius: '10px',
    backgroundColor: 'white',
  },
  titleContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    paddingRight: '2%',
    paddingTop: '2%',
  },
  bodyLayout: {
    display: 'flex',
    justifyContent: 'row',
    marginTop: '1%',
    width: '100%',
  },
  bodyContainer: {
    paddingLeft: '2%',
    paddingTop: '10px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '3%',
    width: '100%',
  },
  leftBody: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    paddingLeft: '3%',
  },
  leftBodyTitle: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '80%',
    marginTop: '3%',
  },
  leftEditingContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  rightContainer: {
    width: '30%',
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
    width: '100%',
    marginTop: theme.spacing(3),
  },
  button: {
    margin: theme.spacing(10, 0, 2),
    width: theme.spacing(30),
    fontSize: '30px',
  },
  icon: {
    margin: 0,
  },
  XgridList: {
    minHeight: '100%',
    transform: 'translateZ(0)',
    '&::-webkit-scrollbar': {
      height: 10,
    },
    '&::-webkit-scrollbar-track': {
      borderRadius: '8px',
      boxShadow: 'inset 0 0 6px rgba(0, 0, 0, 0.3)',
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: '8px',
      backgroundColor: 'darkgrey',
    },
    overflowX: 'hidden',
    overflowY: 'hidden',
  },
  YgridList: {
    maxWidth: 1100,
    maxHeight: theme.spacing(65),
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
    '@media only screen and (max-width: 600px)': {
      height: theme.spacing(60),
    },
    '@media only screen and (max-width: 400px)': {
      height: theme.spacing(50),
    },
  },
  GridListTile: {
    display: 'grid',
    justifyContent: 'center',
  },
  bottomBars: {
    backgroundColor: '#cecece',
    borderRadius: '10px',
    width: '80%',
  },
  title: {
    marginTop: '8%',
    marginBottom: '1%',
    backgroundColor: 'grey',
    width: '80%',
    borderRadius: '5px',
    paddingLeft: '1%',
    color: 'white',
    height: '5vh',
    display: 'flex',
    alignItems: 'center',
  },
  imageContainer: {
    marginLeft: '5%',
    width: '12%',
    borderRadius: '40px',
    overflow: 'hidden',
    marginTop: '3%',
    height: '20%',
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: '1.5vw',
  },
}));

export default profileStyle;
