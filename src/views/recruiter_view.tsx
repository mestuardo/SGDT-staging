import React from 'react';
import {
  Tab, Tabs, GridList, GridListTile, Paper, Hidden, Box, Typography,
} from '@material-ui/core';
import {
  ToggleButton, ToggleButtonGroup,
} from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';

import { useRouter, NextRouter } from 'next/router';

import PostedApplicationCard from '../cards/posted_application_card';
import ApplicationCard from '../cards/application_card';
import NewRequestDialog from '../cards/new_request_dialog';

import { RecruitmentProcessData } from '../types/recruitment-process-index-types';
import { RequestSummaryType } from '../types/request-query-types';
import { JobOfferSummaryType } from '../types/job-offer-query-types';

const useStyles = makeStyles((theme) => ({

  // Total component style
  root: {
    margin: theme.spacing(6, 0),
    marginBottom: theme.spacing(0),
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: theme.spacing(80),
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
  GridListTile: {
    display: 'grid',
    justifyContent: 'center',
  },

  // Horizontal grid style

  XgridList: {
    flexWrap: 'nowrap',
    maxWidth: 1100,

    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',

    // Here the scrollbar is stylized
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

  },
  // Vertical grid style
  YgridList: {
    maxWidth: 1100,
    maxHeight: theme.spacing(65),
    // Here the scrollbar is stylized
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

    // Responsive Ygrid List style
    '@media only screen and (max-width: 600px)': {
      height: theme.spacing(60),

    },
    '@media only screen and (max-width: 400px)': {
      height: theme.spacing(50),

    },

  },
}));

interface TabPanelProps {
  children: React.ReactNode,
  index: number,
  tabValue: number,
}

// This function handles the change of Tabs
function TabPanel(props: TabPanelProps) {
  const {
    children, tabValue, index,
  } = props;

  return (
    <div
      role="tabpanel"
      hidden={tabValue !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
    >
      {tabValue === index && (
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

interface RecruiterViewProps{
  width: Breakpoint,
  data: RecruitmentProcessData,
}
const RecruiterView = (props:RecruiterViewProps) => {
  const { width, data } = props;
  const classes = useStyles();
  const router: NextRouter = useRouter();

  // Set the initial value of the tab and handle the changes
  const [tabValue, setValue] = React.useState(0);
  const handleTabChange = (event: React.ChangeEvent<unknown>, newTabValue: number) => {
    setValue(newTabValue);
  };

  // Open an close the new personnel request dialog
  const [openDialog, setOpenDialog] = React.useState(false);
  const [dialogContentID, setDialogContentID] = React.useState('');
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleOpenDialog = (RequestId:string) => {
    setDialogContentID(RequestId);
    setOpenDialog(true);
  };
  const handleOpenDetails = (RequestId:string) => router.push(`/recruitment-process/${RequestId}`);

  /* function is used to determine the width of the screen and make the number
  of components displayed by the GridList according to the size of the screen. */
  function getCols(screenWidth:Breakpoint) {
    if (isWidthUp('lg', screenWidth)) {
      return { cols: 5, gridwidth: '1020px' };
    }
    if (isWidthUp('md', screenWidth)) {
      return { cols: 4, gridwidth: '850px' };
    }
    if (isWidthUp('sm', screenWidth)) {
      return { cols: 2, gridwidth: '500px' };
    }
    if (isWidthUp('xs', screenWidth)) {
      return { cols: 1, gridwidth: '433px' };
    }
    return { cols: 1, gridwidth: '433px' };
  }
  const { cols, gridwidth } = getCols(width);

  function renderGridList(className:string, listData:RequestSummaryType[]) {
    return (
      <GridList className={className} cols={cols} cellHeight="auto" style={{ width: gridwidth }}>
        {listData.map((new_request, index) => (
          <GridListTile key={new_request.id} className={classes.GridListTile}>
            <ApplicationCard
              key={new_request.id}
              id={index}
              request={new_request}
              handleOpenDialog={handleOpenDialog}
            />
          </GridListTile>
        ))}
      </GridList>
    );
  }

  // TODO: we should merge renderGridList and renderJobOfferGrid into one function
  function renderJobOfferGrid(className:string, listData:JobOfferSummaryType[]) {
    return (
      <GridList className={className} cols={cols} cellHeight="auto" style={{ width: gridwidth }}>
        {listData.map((jobOffer, index) => (
          <GridListTile key={jobOffer.id} className={classes.GridListTile}>
            <PostedApplicationCard
              key={jobOffer.id}
              id={index}
              jobOffer={jobOffer}
              handleOpenDetails={handleOpenDetails}
            />
          </GridListTile>
        ))}
      </GridList>
    );
  }

  // In the meantime we wont sort them. PS: .slice is to make a copy
  // const SortedNewRequests = data.requests.slice().sort((a:any, b:any) => b.date - a.date);
  const SortedNewRequests = data.requests;

  const SLASortedPostedRequests = data.jobOffers;
  const StatusSortedPostedRequests = data.jobOffers;

  const [ShownPostedRequests, SetShownPostedRequests] = React.useState(SLASortedPostedRequests);

  // Here we update the shown cards when the info is updated
  React.useEffect(() => {
    SetShownPostedRequests(data.jobOffers);
  },

  [data.jobOffers]);

  // We'll sort them in the future
  // const SLASortedPostedRequests = PostedRequests.slice().sort((a:any, b:any) => a.SLA - b.SLA);
  // const StatusOrderLH = ['start', 'on-going', 'ready'];
  // const StatusSortedPostedRequests = PostedRequests.slice().sort((a:any, b:any) =>
  // StatusOrderLH.indexOf(a.status) - StatusOrderLH.indexOf(b.status));

  /* State defined for the information shown by the card,
  modifiable by filterSLA and filterStatus */

  // Filter button functions in the third tab
  const [filter, setFilter] = React.useState<string | null>('SLA');
  const handleFilter = (event: React.MouseEvent<HTMLElement>, newFilter: string | null) => {
    setFilter(newFilter);
  };
  function filterSLA() {
    SetShownPostedRequests(SLASortedPostedRequests);
  }
  function filterStatus() {
    SetShownPostedRequests(StatusSortedPostedRequests);
  }

  return (
    <>

      {/* This table is only visible when the screen is wider than 'lg' */}
      <Hidden lgUp>
        <Paper className={classes.horizontalTabs}>
          <Tabs
            orientation="horizontal"
            scrollButtons="on"
            value={tabValue}
            onChange={handleTabChange}
            aria-label="Horizontal tabs"
          >
            <Tab label="Inicio" id={a11yProps(0).id} aria-controls={a11yProps(0)['aria-controls']} />
            <Tab label="Solicitudes pendientes" id={a11yProps(1).id} aria-controls={a11yProps(1)['aria-controls']} />
            <Tab label="Solicitudes publicadas" id={a11yProps(2).id} aria-controls={a11yProps(2)['aria-controls']} />

          </Tabs>
        </Paper>

      </Hidden>

      <div className={classes.root}>

        {/* This table is only seen when the screen is smaller than 'md' */}
        <Hidden mdDown>
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={tabValue}
            onChange={handleTabChange}
            aria-label="Vertical tabs"
            className={classes.verticalTabs}
          >
            <Tab label="Inicio" id={a11yProps(0).id} aria-controls={a11yProps(0)['aria-controls']} />
            <Tab label="Solicitudes pendientes" id={a11yProps(1).id} aria-controls={a11yProps(1)['aria-controls']} />
            <Tab label="Solicitudes publicadas" id={a11yProps(2).id} aria-controls={a11yProps(2)['aria-controls']} />

          </Tabs>
        </Hidden>

        {/* This is where the main tab component begins */}
        <TabPanel tabValue={tabValue} index={0}>
          <Hidden mdDown>
            <Typography variant="h6" component="div">Solicitudes pendientes recientes</Typography>
          </Hidden>
          <Hidden lgUp>
            <Typography variant="body1" component="div"><Box fontWeight="fontWeightBold">Solicitudes pendientes recientes</Box></Typography>
          </Hidden>
          {renderGridList(classes.XgridList, SortedNewRequests.slice(0, 5))}

          {/* Change the font according to the screen size with Hidden */}
          <Hidden mdDown>
            <Typography variant="h6" component="div">Solicitudes con menor SLA</Typography>
          </Hidden>
          <Hidden lgUp>
            <Typography variant="body1" component="div"><Box fontWeight="fontWeightBold">Solicitudes con menor SLA</Box></Typography>
          </Hidden>
          {renderJobOfferGrid(classes.XgridList, SLASortedPostedRequests.slice(0, 5))}
          <NewRequestDialog
            openDialog={openDialog}
            handleCloseDialog={handleCloseDialog}
            dialogTitle="Detalles solicitud pendiente"
            dialogContentID={dialogContentID}
          />
        </TabPanel>

        {/* This is where the component of tab "solicitudes pendientes" begins */}
        <TabPanel tabValue={tabValue} index={1}>

          {/* Change the font according to the screen size with Hidden */}
          <Hidden mdDown>
            <Typography variant="h6" component="div">Solicitudes pendientes</Typography>
          </Hidden>
          <Hidden lgUp>
            <Typography variant="body1" component="div"><Box fontWeight="fontWeightBold">Solicitudes pendientes</Box></Typography>
          </Hidden>
          {renderGridList(classes.YgridList, SortedNewRequests)}
          <NewRequestDialog
            openDialog={openDialog}
            handleCloseDialog={handleCloseDialog}
            dialogTitle="Detalles solicitud pendiente"
            dialogContentID={dialogContentID}
          />
        </TabPanel>

        {/* This is where the component of tab "Solicitudes publicadas" begins */}
        <TabPanel tabValue={tabValue} index={2}>
          <Hidden mdDown>
            <Typography variant="h6" component="div">Solicitudes publicadas</Typography>
          </Hidden>
          <Hidden lgUp>
            <Typography variant="body1" component="div"><Box fontWeight="fontWeightBold">Solicitudes publicadas</Box></Typography>
          </Hidden>

          {/* Group of buttons that change their style to "tight" when clicked */}
          <ToggleButtonGroup
            value={filter}
            exclusive
            size="small"
            onChange={handleFilter}
            aria-label="cards filter"
          >
            <ToggleButton onClick={filterSLA} value="SLA" aria-label="SLA filtered">
              Ordenar por SLA
            </ToggleButton>
            <ToggleButton onClick={filterStatus} value="STATUS" aria-label="Status filtered">
              Ordenar por estado
            </ToggleButton>

          </ToggleButtonGroup>
          {renderJobOfferGrid(classes.YgridList, ShownPostedRequests)}
        </TabPanel>
      </div>

    </>
  );
};

// withWidth to recognize the screen width
export default withWidth()(RecruiterView);
