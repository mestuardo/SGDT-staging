import React, { SetStateAction } from 'react';
import {
  Avatar,
  Badge,
  InputAdornment,
  Tab,
  Tabs,
  Snackbar,
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
import AssignmentIcon from '@material-ui/icons/Assignment';
import {
  ToggleButton,
  ToggleButtonGroup,
} from '@material-ui/lab';
import withWidth from '@material-ui/core/withWidth';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { useRouter, NextRouter } from 'next/router';
import { useKeycloak } from '@react-keycloak/ssr';
import type { KeycloakInstance } from 'keycloak-js';
import ParsedTokenType from '../../types/keycloak-token-type';
import { checkIfAllowed } from '../../helpers/roles';

import recruiterViewStyles from './styles';
import { RecruitmentProcessData } from '../../types/recruitment-process-index-types';
import { RequestSummaryType } from '../../types/request-query-types';
import { JobOfferSummaryType } from '../../types/job-offer-query-types';
import getCols from '../../helpers/get_columns_helper';
import assignIdToTab from '../../helpers/assign_id_to_tab';

import TabPanel from '../tab_panel';
import PostedApplicationCard from '../cards/posted_application_card';
import ApplicationCard from '../cards/application_card';
import statusColor from '../cards/helpers';

interface RecruiterViewProps{
  width: Breakpoint,
  data: RecruitmentProcessData,
  newRequests: string,
  postedRequests: string,
  closedRequests: string
}
function Alert(props: AlertProps) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function RecruiterView(props:RecruiterViewProps) : JSX.Element {
  const {
    width, data, newRequests, postedRequests, closedRequests,
  } = props;
  const classes = recruiterViewStyles();
  const router: NextRouter = useRouter();
  // Keycloak instance, recieves parameters from the provider
  const { keycloak } = useKeycloak<KeycloakInstance>();
  // The token received by keycloak with the data
  const parsedToken = keycloak?.tokenParsed as ParsedTokenType;
  const isRecruiter = parsedToken && checkIfAllowed(parsedToken, ['recruiter']);

  const [tabValue, setValue] = React.useState(0);
  const handleTabChange = (event: React.ChangeEvent<unknown>, newTabValue: number) => {
    setValue(newTabValue);
  };
  const handleOpenReview = (RequestId:string) => router.push(`/review-request/${RequestId}`);
  const handleOpenDetails = (RequestId:string) => router.push(`/recruitment-process/${RequestId}`);

  const { cols } = getCols(width);

  const [openAlert, setAlertOpen] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState('');

  const handleCloseAlert = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setAlertOpen(false);
  };

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
      b: JobOfferSummaryType) => a.sla_end - b.sla_end,
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
    } else if (jobOfferSortBy === 'RECENT') {
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

  // Here we update the shown cards when the info is updated
  React.useEffect(() => {
    SetShownPostedRequests(SLASortedPostedJobOffers);
    if (postedRequests === 'true') {
      setValue(2);
      setJobOfferSortBy('RECENT');
      filterJobOfferRecent();
      setAlertMessage('Se ha creado una solicitud satisfactoriamente');
      setAlertOpen(true);
    } else if (postedRequests === 'false') {
      setValue(2);
      setAlertMessage('Se ha archivado una oferta laboral satisfactoriamente');
      setAlertOpen(true);
    }
  },
  [data.jobOffers]);
  React.useEffect(() => {
    SetShownNewRequests(RecentSortedNewRequests);
    if (newRequests === 'true') {
      setValue(1);
      setAlertMessage('Se ha publicado una solicitud satisfactoriamente');
      setAlertOpen(true);
    } else if (newRequests === 'false') {
      setValue(1);
      setAlertMessage('Se ha archivado una solicitud satisfactoriamente');
      setAlertOpen(true);
    }
  },
  [data.requests]);
  React.useEffect(() => {
    SetShownNewRequests(RecentSortedNewRequests);
    if (closedRequests === 'true') {
      setValue(3);
      setAlertMessage('Se ha cerrado una solicitud satisfactoriamente');
      setAlertOpen(true);
    }
  },
  [data.getClosedJobOffers]);

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
            <ToggleButton onClick={filterJobOfferRecent} value="RECENT" aria-label="Descendant date filtered">
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
            {isRecruiter ? <Tab label="Resumen" id={assignIdToTab(0).id} aria-controls={assignIdToTab(0)['aria-controls']} /> : null}
            {isRecruiter ? <Tab label="Solicitudes pendientes" id={assignIdToTab(1).id} aria-controls={assignIdToTab(1)['aria-controls']} /> : null}
            <Tab label="Solicitudes publicadas" id={assignIdToTab(2).id} aria-controls={assignIdToTab(2)['aria-controls']} />
            {isRecruiter ? <Tab label="Solicitudes cerradas" id={assignIdToTab(3).id} aria-controls={assignIdToTab(3)['aria-controls']} /> : null}

          </Tabs>
        </Paper>
        <div className={classes.root}>
          {/* This is where the main tab component begins */}
          {isRecruiter ? (
            <TabPanel tabValue={tabValue} index={0}>
              {/* Change the font according to the screen size with Hidden */}
              <Hidden mdDown>
                <Typography variant="h6" component="div">Solicitudes con SLA más próximo</Typography>
              </Hidden>
              <Hidden lgUp>
                <Typography variant="body1" component="div"><Box fontWeight="fontWeightBold">Solicitudes con SLA más próximo</Box></Typography>
              </Hidden>
              {renderJobOfferGrid(classes.XgridList, SLASortedPostedJobOffers.slice(0, 5))}
              <Hidden mdDown>
                <Typography variant="h6" component="div">Solicitudes pendientes recientes</Typography>
              </Hidden>
              <Hidden lgUp>
                <Typography variant="body1" component="div"><Box fontWeight="fontWeightBold">Solicitudes pendientes recientes</Box></Typography>
              </Hidden>
              {renderGridList(classes.XgridList, RecentSortedNewRequests.slice(0, 5))}

            </TabPanel>
          ) : null}
          {isRecruiter ? (
            <TabPanel tabValue={tabValue} index={1}>
              {requestsHeader}

              {renderGridList(classes.YgridList, ShownNewRequests)}
            </TabPanel>
          ) : null}
          <TabPanel tabValue={tabValue} index={isRecruiter ? 2 : 0}>

            {jobOffersHeader}
            {renderJobOfferGrid(classes.YgridList, ShownPostedRequests)}
          </TabPanel>

          {!isRecruiter ? null
            : (
              <TabPanel tabValue={tabValue} index={3}>

                {jobOffersHeader}
                {renderJobOfferGrid(classes.YgridList, ShownClosedJobOffers)}
              </TabPanel>
            ) }
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
            marginTop: '30px',
            height: '570px',
            paddingBottom: '150px',
            paddingLeft: '50px',
            paddingRight: '50px',
            display: 'grid',
            justifyContent: 'center',
            textAlign: 'left',
            placeItems: 'center',
          }}
          >
            <Typography variant="h6">Glosario</Typography>
            {!isRecruiter ? null
              : (
                <div style={{ display: 'flex', alignItems: 'center', justifySelf: 'left' }}>
                  <Avatar aria-label="status" className={classes.avatar}>
                    <AssignmentIcon className={classes.icon} />
                  </Avatar>
                  <h4>Solicitud de Oferta Laboral</h4>
                </div>
              ) }
            <div style={{ display: 'flex', alignItems: 'center', justifySelf: 'left' }}>
              <Avatar aria-label="status" className={classes.avatar} style={{ backgroundColor: statusColor('CLOSE') }}>
                <AssignmentIcon className={classes.icon} />
              </Avatar>
              <h4>SLA de 2 días o menos</h4>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifySelf: 'left' }}>
              <Avatar aria-label="status" className={classes.avatar} style={{ backgroundColor: statusColor('MID') }}>
                <AssignmentIcon className={classes.icon} />
              </Avatar>
              <h4>SLA entre 2 y 4 días</h4>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifySelf: 'left' }}>
              <Avatar aria-label="status" className={classes.avatar} style={{ backgroundColor: statusColor('FAR') }}>
                <AssignmentIcon className={classes.icon} />
              </Avatar>
              <h4>SLA mayor a 4 días</h4>
            </div>
            {!isRecruiter ? null
              : (
                <div style={{ display: 'flex', alignItems: 'center', justifySelf: 'left' }}>
                  <Avatar aria-label="status" className={classes.avatar} style={{ backgroundColor: statusColor('CLOSED') }}>
                    <AssignmentIcon className={classes.icon} />
                  </Avatar>
                  <h4>Proceso cerrado</h4>
                </div>
              ) }
            <br />
            <div style={{ display: 'flex', alignItems: 'center', justifySelf: 'left' }}>
              <Badge
                classes={{
                  badge: classes.badgeDefault,
                  colorPrimary: classes.badgeAccepted,
                  colorSecondary: classes.badgePsy,
                  colorError: classes.badgeTech,
                }}
                color="primary"
                badgeContent={1}
              />
              <Typography variant="caption">Hay 1 candidato seleccionado</Typography>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifySelf: 'left' }}>
              <Badge
                classes={{
                  badge: classes.badgeDefault,
                  colorPrimary: classes.badgeAccepted,
                  colorSecondary: classes.badgePsy,
                  colorError: classes.badgeTech,
                }}
                color="secondary"
                badgeContent={2}
              />
              <Typography variant="caption">Hay 2 candidatos en entrevista psicolaboral</Typography>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifySelf: 'left' }}>
              <Badge
                classes={{
                  badge: classes.badgeDefault,
                  colorPrimary: classes.badgeAccepted,
                  colorSecondary: classes.badgePsy,
                  colorError: classes.badgeTech,
                }}
                color="error"
                badgeContent={3}
              />
              <Typography variant="caption">Hay 3 candidatos en entrevista técnica</Typography>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifySelf: 'left' }}>
              <Badge
                classes={{
                  badge: classes.badgeDefault,
                  colorPrimary: classes.badgeAccepted,
                  colorSecondary: classes.badgePsy,
                  colorError: classes.badgeTech,
                }}
                color="default"
                badgeContent={4}
              />
              <Typography variant="caption">Hay 4 candidatos en fase inicial</Typography>
            </div>
          </div>

        </Grid>
      </Hidden>
      <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleCloseAlert}>
        <Alert onClose={handleCloseAlert} severity="success">
          {alertMessage}
        </Alert>
      </Snackbar>
    </Grid>
  );
}

// withWidth to recognize the screen width
export default withWidth()(RecruiterView);
