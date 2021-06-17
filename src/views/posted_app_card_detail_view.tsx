import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Hidden from '@material-ui/core/Hidden';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import RecruitmentProcessStepper from '../cards/recruitment_process_stepper';
import JobOfferDetails from '../cards/jobOffer_details';
import { ClientInformationType, JobOfferDetailType } from '../types/job-offer-query-types';

const useStyles = makeStyles((theme) => ({

  // Total component style
  root: {
    margin: theme.spacing(6, 0),
    marginBottom: theme.spacing(0),
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: theme.spacing(78),
    textAlign: 'center',
    justifyContent: 'center',
    // Responsive style of the total component
    '@media only screen and (max-width: 1279px)': {
      margin: theme.spacing(0),

    },
    '@media only screen and (max-width: 600px)': {
      height: theme.spacing(73),

    },

  },
  // Vertical clickable tabs style
  verticalTabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    width: theme.spacing(20),
  },

  // Horizontal clickable tabs style
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
  children: React.ReactNode,
  index: number,
  value: number,
}

// This function handles the change of Tabs
function TabPanel(props: TabPanelProps) {
  const {
    children, value, index,
  } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
    >
      {value === index && (
      <Box p={3}>
        {children}
      </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

interface ProfilesProps{
  reqId: string,
  jobOfferData: JobOfferDetailType,
  clientInfo: ClientInformationType,
}
const ProfilesView = (props:ProfilesProps) : JSX.Element => {
  const { reqId, jobOfferData, clientInfo } = props;
  const classes = useStyles();

  // The value of the current tab being viewed
  const [value, setValue] = React.useState(0);

  // Change handle of the tab that is being viewed
  const handleChange = (event: React.ChangeEvent<unknown>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>

      {/* This table is only visible when the screen is wider than 'lg' */}
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
            <Tab label="Etapas postulación" id={a11yProps(0).id} aria-controls={a11yProps(0)['aria-controls']} />
            <Tab label="Información proceso" id={a11yProps(0).id} aria-controls={a11yProps(0)['aria-controls']} />

          </Tabs>
        </Paper>

      </Hidden>
      <div className={classes.root}>
        {/* This table is only seen when the screen is smaller than 'md' */}
        <Hidden mdDown>
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs"
            className={classes.verticalTabs}
          >
            <Tab label="Etapas postulación" id={a11yProps(0).id} aria-controls={a11yProps(0)['aria-controls']} />
            <Tab label="Información proceso" id={a11yProps(0).id} aria-controls={a11yProps(0)['aria-controls']} />

          </Tabs>
        </Hidden>

        <TabPanel value={value} index={0}>

          {/* Change the font according to the screen size with Hidden */}
          <Hidden mdDown>
            <Typography variant="h6" component="div">
              {`Solicitud ${jobOfferData.position}`}
            </Typography>
          </Hidden>
          <Hidden lgUp>
            <Typography variant="body1" component="div">
              <Box fontWeight="fontWeightBold">
                {`Solicitud ${jobOfferData.position}`}
              </Box>
            </Typography>
          </Hidden>
          <RecruitmentProcessStepper reqId={reqId} />

        </TabPanel>
        <TabPanel value={value} index={1}>
          <JobOfferDetails jobOfferData={jobOfferData} clientInfo={clientInfo} />
        </TabPanel>
      </div>

    </>
  );
};

export default ProfilesView;
