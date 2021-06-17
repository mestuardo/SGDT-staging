import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box, Paper, Hidden, Tabs, Tab,
} from '@material-ui/core';
import RequestForm from '../personnel-request/request_form';

const useStyles = makeStyles((theme) => ({
  // Main component styles
  root: {
    margin: theme.spacing(6, 0),
    marginBottom: theme.spacing(0),
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: theme.spacing(72),
    textAlign: 'center',
    justifyContent: 'center',
    // Responsive main component styles
    '@media only screen and (max-width: 1279px)': {
      margin: theme.spacing(0),

    },
    '@media only screen and (max-width: 600px)': {
      height: theme.spacing(73),

    },
  },
  // Vertical tabs styles
  verticalTabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    width: theme.spacing(30),
  },
  // Horizontal tabs styles
  horizontalTabs: {
    display: 'flex',
    margin: theme.spacing(6, 0),
    marginBottom: 0,
    justifyContent: 'center',
    padding: 0,
    borderRadius: 0,
  },
}));

interface TabPanelProps {
  children: React.ReactNode;
  index: number;
  value: number;
}

// Tab change handler
function TabPanel(props: TabPanelProps) {
  const {
    children, value, index,
  } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
    >
      {value === index && (
      <Box p={3}>
        {children}
      </Box>
      )}
    </div>
  );
}
// This function assigns props to tabs
function a11yProps(index: number) {
  return {
    id: `tab-${index}`,
    'aria-controls': `tabpanel-${index}`,
  };
}

const RecruitingHeadView = (): JSX.Element => {
  const classes = useStyles();

  // Current showing tab handler
  const [value, setValue] = React.useState(0);

  // Showing tab handler
  const handleChange = (event: React.ChangeEvent<unknown>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      {/*
      These tabs hide when the screen width is higher than 'lg' (See Material-UI Hidden docs)
      */}
      <Hidden lgUp>
        <Paper className={classes.horizontalTabs}>
          <Tabs
            orientation="horizontal"
            variant="scrollable"
            scrollButtons="on"
            value={value}
            onChange={handleChange}
            aria-label="Horizontal tabs"
          >
            <Tab label="Crear solicitud" id={a11yProps(0).id} aria-controls={a11yProps(0)['aria-controls']} />

          </Tabs>
        </Paper>

      </Hidden>

      <div className={classes.root}>

        {/*
        These tabs hide when the screen width is lower than 'md' (See Material-UI Hidden docs)
        */}
        <Hidden mdDown>
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs"
            className={classes.verticalTabs}
          >
            <Tab label="Crear solicitud" id={a11yProps(0).id} aria-controls={a11yProps(0)['aria-controls']} />

          </Tabs>
        </Hidden>
        {/*
         Here the first (and only) component view starts
         */}
        <TabPanel value={value} index={0}>

          <RequestForm />

        </TabPanel>
      </div>

    </>
  );
};

export default RecruitingHeadView;
