import { makeStyles, createStyles } from '@material-ui/core/styles';

export const OffersListViewStyles = makeStyles((theme) => ({
  gridContainer: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(0),
    marginLeft: theme.spacing(10),
    textAlign: 'center',
    '@media only screen and (max-width: 1250px)': {
      marginLeft: theme.spacing(0),
    },
  },
  gridItem: {
    margin: theme.spacing(0, 0),
    marginLeft: theme.spacing(1),
  },
  horizontalTabs: {
    display: 'flex',
    marginBottom: 0,
    justifyContent: 'center',
    padding: 0,
  },
}));

export const ApplyOfferDialogStyles = makeStyles((theme) => ({
  mainMetadataContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderRadius: 5,
    backgroundColor: '#ecf0f1',
    padding: 10,
  },
  content: {
    overflow: 'scroll',
  },
}));
