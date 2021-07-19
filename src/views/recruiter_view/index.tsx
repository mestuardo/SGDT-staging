import React, { SetStateAction } from 'react';
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
import {
  ToggleButton,
  ToggleButtonGroup,
} from '@material-ui/lab';
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
            onSaveSuccess={() => { }}
            hideSaveButton
            isSaved={false}
            hideBadge={false}
          />
        </GridListTile>
      )) : <div>No hay resultados para esta búsqueda</div>}
    </GridList>
  );

  const RecentSortedNewRequests = data.requests.slice().sort(
    (a: RequestSummaryType,
      b: RequestSummaryType) => b.requestCreationDate - a.requestCreationDate,
  );
  const DateAscSortedNewRequests = data.requests.slice().sort(
    (a: RequestSummaryType,
      b: RequestSummaryType) => a.requestCreationDate - b.requestCreationDate,
  );
  const SLASortedPostedJobOffers = data.jobOffers.slice().sort(
    (a: JobOfferSummaryType,
      b: JobOfferSummaryType) => a.sla_start - b.sla_start,
  );
  const RecentSortedPostedJobOffers = (
    data.jobOffers.slice().sort(
      (a: JobOfferSummaryType,
        b: JobOfferSummaryType) => b.jobOfferCreationDate - a.jobOfferCreationDate,
    ));
  const SortedClosedJobOffers = data.getClosedJobOffers.slice().sort(
    (a: JobOfferSummaryType,
      b: JobOfferSummaryType) => b.closeJobOfferDate - a.closeJobOfferDate,
  );

  const [ShownNewRequests, SetShownNewRequests] = React.useState(RecentSortedNewRequests);
  const [ShownPostedRequests, SetShownPostedRequests] = React.useState(SLASortedPostedJobOffers);
  const [ShownClosedJobOffers, SetShownClosedJobOffers] = React.useState(SortedClosedJobOffers);

  // Here we update the shown cards when the info is updated
  React.useEffect(() => {
    SetShownPostedRequests(SLASortedPostedJobOffers);
  },
  [data.jobOffers]);
  React.useEffect(() => {
    SetShownNewRequests(RecentSortedNewRequests);
  },
  [data.requests]);
  React.useEffect(() => {
    SetShownNewRequests(RecentSortedNewRequests);
  },
  [data.getClosedJobOffers]);

  const [requestsSortBy, setRequestsSortBy] = React.useState('RECENT');
  const [jobOfferSortBy, setJobOfferSortBy] = React.useState('SLA');
  const handleRequestsSortBy = (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    newSort: SetStateAction<string>,
  ) => {
    setRequestsSortBy(newSort);
  };
  const handleJobOfferSortBy = (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    newSort: SetStateAction<string>,
  ) => {
    setJobOfferSortBy(newSort);
  };
  const filterRequestDateDesc = () => SetShownNewRequests(RecentSortedNewRequests);
  const filterRequestDateAsc = () => SetShownNewRequests(DateAscSortedNewRequests);

  const filterJobOfferSLA = () => SetShownPostedRequests(SLASortedPostedJobOffers);
  const filterJobOfferRecent = () => SetShownPostedRequests(RecentSortedPostedJobOffers);

  const [filter, setFilter] = React.useState('');

  React.useEffect(() => {
    if (requestsSortBy === 'RECENT') {
      SetShownNewRequests(
        RecentSortedNewRequests.filter(
          (element) => JSON.stringify(element).toLowerCase().includes(filter.toLowerCase()),
        ),
      );
    } else if (requestsSortBy === 'OLD') {
      SetShownNewRequests(
        DateAscSortedNewRequests.filter(
          (element) => JSON.stringify(element).toLowerCase().includes(filter.toLowerCase()),
        ),
      );
    }
    if (jobOfferSortBy === 'SLA') {
      SetShownPostedRequests(
        SLASortedPostedJobOffers.filter(
          (element) => JSON.stringify(element).toLowerCase().includes(filter.toLowerCase()),
        ),
      );
    } else if (jobOfferSortBy === 'DATE-DESC') {
      SetShownPostedRequests(
        RecentSortedPostedJobOffers.filter(
          (element) => JSON.stringify(element).toLowerCase().includes(filter.toLowerCase()),
        ),
      );
    }
    SetShownClosedJobOffers(
      SortedClosedJobOffers.filter(
        (element) => JSON.stringify(element).toLowerCase().includes(filter.toLowerCase()),
      ),
    );
  }, [filter]);

  const requestsHeader = (
    <div className={classes.responsiveHeader}>
      <Hidden smUp>
        <Typography
          variant="body1"
          component="div"
        >
          <Box fontWeight="fontWeightBold">
            Solicitudes pendientes
          </Box>
        </Typography>
      </Hidden>
      <div style={{ width: 180, margin: '5px 0px' }}>
        <ToggleButtonGroup
          value={requestsSortBy}
          exclusive
          size="small"
          onChange={handleRequestsSortBy}
          aria-label="cards filter"
        >
          <ToggleButton onClick={filterRequestDateDesc} value="RECENT" aria-label="Descendant date filtered">
            Recientes
          </ToggleButton>
          <ToggleButton onClick={filterRequestDateAsc} value="OLD" aria-label="Ascendant date filtered">
            Antiguas
          </ToggleButton>

        </ToggleButtonGroup>

      </div>
      <Hidden xsDown>
        <Typography
          style={{ margin: '5px 0px' }}
          variant="h6"
          component="div"
        >
          Solicitudes pendientes

        </Typography>
      </Hidden>
      <TextField
        style={{ width: 180, margin: '5px 0px' }}
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

  );
  const jobOffersHeader = (

    <div className={classes.responsiveHeader}>
      <Hidden smUp>
        <Typography
          variant="body1"
          component="div"
        >
          <Box fontWeight="fontWeightBold">
            {tabValue === 3 ? 'Ofertas laborales cerradas' : 'Ofertas laborales publicadas'}
          </Box>
        </Typography>
      </Hidden>
      {tabValue !== 3 ? (
        <div style={{ width: 180, margin: '5px 0px' }}>
          <ToggleButtonGroup
            value={jobOfferSortBy}
            exclusive
            size="small"
            onChange={handleJobOfferSortBy}
            aria-label="cards filter"
          >
            <ToggleButton onClick={filterJobOfferSLA} value="SLA" aria-label="SLA filtered">
              SEGÚN SLA
            </ToggleButton>
            <ToggleButton onClick={filterJobOfferRecent} value="DATE-DESC" aria-label="Descendant date filtered">
              Recientes
            </ToggleButton>

          </ToggleButtonGroup>

        </div>
      ) : <div style={{ width: 180, margin: '5px 0px' }} />}
      <Hidden xsDown>
        <Typography
          style={{ margin: '5px 0px' }}
          variant="h6"
          component="div"
        >
          {tabValue === 3 ? 'Ofertas laborales cerradas' : 'Ofertas laborales publicadas'}

        </Typography>
      </Hidden>
      <TextField
        style={{ width: 180, margin: '5px 0px' }}
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

  );

  return (
    <Grid
      container
      component="main"
      justifyContent="center"
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
            <Tab label="Ofertas laborales" id={assignIdToTab(2).id} aria-controls={assignIdToTab(2)['aria-controls']} />
            <Tab label="Ofertas cerradas" id={assignIdToTab(3).id} aria-controls={assignIdToTab(3)['aria-controls']} />

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
            {renderGridList(classes.XgridList, RecentSortedNewRequests.slice(0, 5))}

            {/* Change the font according to the screen size with Hidden */}
            <Hidden mdDown>
              <Typography variant="h6" component="div">Ofertas laborales publicadas recientes</Typography>
            </Hidden>
            <Hidden lgUp>
              <Typography variant="body1" component="div"><Box fontWeight="fontWeightBold">Solicitudes con menor SLA</Box></Typography>
            </Hidden>
            {renderJobOfferGrid(classes.XgridList, SLASortedPostedJobOffers.slice(0, 5))}
          </TabPanel>

          <TabPanel tabValue={tabValue} index={1}>
            {requestsHeader}

            {renderGridList(classes.YgridList, ShownNewRequests)}
          </TabPanel>

          <TabPanel tabValue={tabValue} index={2}>

            {jobOffersHeader}
            {renderJobOfferGrid(classes.YgridList, ShownPostedRequests)}
          </TabPanel>

          <TabPanel tabValue={tabValue} index={3}>

            {jobOffersHeader}
            {renderJobOfferGrid(classes.YgridList, ShownClosedJobOffers)}
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
          />

        </Grid>
      </Hidden>

    </Grid>
  );
}

// withWidth to recognize the screen width
export default withWidth()(RecruiterView);
