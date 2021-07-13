import React from 'react';
import {
  InputAdornment,
  Tab,
  Tabs,
  Grid,
  GridList,
  GridListTile,
  Paper,
  Hidden,
  Box,
  Typography,
  TextField,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
// import {
//   ToggleButton,
//   ToggleButtonGroup,
// } from '@material-ui/lab';
import withWidth from '@material-ui/core/withWidth';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';

import { useRouter, NextRouter } from 'next/router';

import recruiterViewStyles from './styles';
import { RecruitmentProcessData } from '../../types/recruitment-process-index-types';
import { RequestSummaryType } from '../../types/request-query-types';
import { JobOfferSummaryType } from '../../types/job-offer-query-types';
import getCols from '../../helpers/get_columns_helper';
import assignIdToTab from '../../helpers/assign_id_to_tab';

import TabPanel from '../tab_panel';
import PostedApplicationCard from '../cards/posted_application_card';
import ApplicationCard from '../cards/application_card';

interface RecruiterViewProps{
  width: Breakpoint,
  data: RecruitmentProcessData,
}

function RecruiterView(props:RecruiterViewProps) : JSX.Element {
  const { width, data } = props;
  const classes = recruiterViewStyles();
  const router: NextRouter = useRouter();

  const [tabValue, setValue] = React.useState(0);
  const handleTabChange = (event: React.ChangeEvent<unknown>, newTabValue: number) => {
    setValue(newTabValue);
  };
  const handleOpenReview = (RequestId:string) => router.push(`/review-request/${RequestId}`);
  const handleOpenDetails = (RequestId:string) => router.push(`/recruitment-process/${RequestId}`);

  const { cols } = getCols(width);

  const renderGridList = (className:string, listData:RequestSummaryType[]) => (
    <GridList className={className} cols={listData.length < cols ? listData.length : cols} cellHeight="auto" style={{ margin: 'auto' }}>
      {listData.length > 0 ? listData.map((new_request) => (
        <GridListTile key={new_request.id} className={classes.GridListTile}>
          <ApplicationCard
            key={new_request.id}
            request={new_request}
            handleOpenDetails={handleOpenReview}
          />
        </GridListTile>
      )) : <div>No hay resultados para esta búsqueda</div>}
    </GridList>
  );

  // TODO: we should merge renderGridList and renderJobOfferGrid into one function
  const renderJobOfferGrid = (className:string, listData:JobOfferSummaryType[]) => (
    <GridList className={className} cols={listData.length < cols ? listData.length : cols} cellHeight="auto" style={{ margin: 'auto' }}>
      {listData.length > 0 ? listData.map((jobOffer) => (
        <GridListTile key={jobOffer.id} className={classes.GridListTile}>
          <PostedApplicationCard
            key={jobOffer.id}
            jobOffer={jobOffer}
            handleOpenDetails={handleOpenDetails}
          />
        </GridListTile>
      )) : <div>No hay resultados para esta búsqueda</div>}
    </GridList>
  );

  // TODO: sort the requests by createdAt and updatedAt
  const SortedNewRequests = data.requests;
  const SLASortedPostedRequests = data.jobOffers;
  // const StatusSortedPostedRequests = data.jobOffers;

  const [ShownNewRequests, SetShownNewRequests] = React.useState(SortedNewRequests);
  const [ShownPostedRequests, SetShownPostedRequests] = React.useState(SLASortedPostedRequests);

  // Here we update the shown cards when the info is updated
  React.useEffect(() => {
    SetShownPostedRequests(data.jobOffers);
  },
  [data.jobOffers]);
  React.useEffect(() => {
    SetShownNewRequests(data.requests);
  },
  [data.requests]);

  const [filter, setFilter] = React.useState('');

  React.useEffect(() => {
    SetShownNewRequests(
      SortedNewRequests.filter(
        (element) => JSON.stringify(element).toLowerCase().includes(filter.toLowerCase()),
      ),
    );
    SetShownPostedRequests(
      SLASortedPostedRequests.filter(
        (element) => JSON.stringify(element).toLowerCase().includes(filter.toLowerCase()),
      ),
    );
  }, [filter]);

  const searchBarlgUp = (
    <Hidden mdDown>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
        <Typography variant="h6" component="div">Solicitudes pendientes</Typography>
        <TextField
          style={{ position: 'absolute', marginLeft: '570px', width: 180 }}
          label="Buscar..."
          size="small"
          variant="outlined"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          InputProps={{
            className: classes.inputText,
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </div>
    </Hidden>
  );

  const searchBarlgDown = (
    <Hidden lgUp>
      <Typography variant="body1" component="div"><Box fontWeight="fontWeightBold">Solicitudes pendientes</Box></Typography>
      <TextField
        label="Buscar..."
        size="small"
        variant="outlined"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        InputProps={{
          className: classes.inputText,
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </Hidden>

  );

  return (
    <Grid
      container
      component="main"
      justify="center"
      alignContent="center"
      alignItems="center"
      className={classes.gridContainer}
      spacing={0}
    >
      <Grid
        item
        xs={12}
        lg={8}
        component={Paper}
      >
        <Paper elevation={0} className={classes.horizontalTabs}>
          <Tabs
            orientation="horizontal"
            variant="scrollable"
            scrollButtons="on"
            value={tabValue}
            onChange={handleTabChange}
            aria-label="Horizontal tabs"
          >
            <Tab label="Inicio" id={assignIdToTab(0).id} aria-controls={assignIdToTab(0)['aria-controls']} />
            <Tab label="Solicitudes pendientes" id={assignIdToTab(1).id} aria-controls={assignIdToTab(1)['aria-controls']} />
            <Tab label="Solicitudes publicadas" id={assignIdToTab(2).id} aria-controls={assignIdToTab(2)['aria-controls']} />

          </Tabs>
        </Paper>
        <div className={classes.root}>
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
          </TabPanel>

          <TabPanel tabValue={tabValue} index={1}>
            {searchBarlgUp}
            {searchBarlgDown}
            {renderGridList(classes.YgridList, ShownNewRequests)}
          </TabPanel>

          <TabPanel tabValue={tabValue} index={2}>
            {searchBarlgUp}
            {searchBarlgDown}

            {renderJobOfferGrid(classes.YgridList, ShownPostedRequests)}
          </TabPanel>
        </div>
      </Grid>

      <Hidden mdDown>
        <Grid
          item
          md={3}
          component={Paper}
          className={classes.gridItem}
        >
          <div style={{
            marginTop: '48px',
            height: '550px',
            display: 'grid',
            justifyContent: 'center',
            textAlign: 'center',
            placeItems: 'center',
          }}
          >
            {/* <ToggleButtonGroup
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

            </ToggleButtonGroup> */}
          </div>

        </Grid>
      </Hidden>

    </Grid>
  );
}

// withWidth to recognize the screen width
export default withWidth()(RecruiterView);
