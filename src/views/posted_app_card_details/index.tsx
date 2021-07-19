import React, { SetStateAction } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Step,
  Stepper,
  StepLabel,
  Badge,
  Box,
  CircularProgress,
  Grid,
  GridList,
  GridListTile,
  Hidden,
  Paper,
  Tab,
  Tabs,
  Typography,
  withWidth,
} from '@material-ui/core';
import {
  ToggleButton,
  ToggleButtonGroup,
} from '@material-ui/lab';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useQuery } from '@apollo/client';
import { QontoStepIcon, QontoConnector } from './QontoStepIcon';
import postedAppCardStyles from './styles';
import { JobOfferDetailType } from '../../types/job-offer-query-types';
import {
  initProfessional, initApplication, getDialogLabels, getButtons,
} from './helpers';
import { GetProfessionalType } from '../../types/get-professional-types';
import {
  FilterApplicationDataType,
  FilterApplicationsType,
} from '../../types/filter-applications-query-types';
import assignIdToTab from '../../helpers/assign_id_to_tab';
import getCols from '../../helpers/get_columns_helper';
import RecruitmentProcessStepper from '../job_offer_process/recruitment_process_stepper';
import JobOfferDetails from '../job_offer_process/job_offer_details';
import TabPanel from '../tab_panel';
import FILTER_APPLICATIONS from '../../queries/filter-applications.graphql';
import ProfileCard from '../job_offer_process/profile_card';
import ApplicantInfoDialog from '../job_offer_process/applicant_info_dialog';
import RejectionDialog from '../job_offer_process/rejection_dialog';
import ApprovalDialog from '../job_offer_process/approval_dialog';
import MessageCard from '../messages/message_card';
import NewMessageCard from '../messages/new_message_card';

interface ProfilesProps{
  reqId: string,
  jobOfferData: JobOfferDetailType,
  width: Breakpoint,
}

function PostedAppDetail(props:ProfilesProps) : JSX.Element {
  const {
    reqId, jobOfferData, width,
  } = props;
  const classes = postedAppCardStyles();
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.ChangeEvent<unknown>, newValue: number) => {
    setValue(newValue);
  };
  const { data: applicationsData, loading, error } = useQuery<FilterApplicationDataType>(
    FILTER_APPLICATIONS, {
      variables: { jobOfferId: reqId },
      fetchPolicy: 'network-only',
    },
  );
  const { cols } = getCols(width);

  const [candidates, setCandidates] = React.useState<FilterApplicationsType[]>([]);
  const [newApplications, setNewApplications] = React.useState<FilterApplicationsType[]>([]);
  const [rejectedApplications,
    setRejectedApplications] = React.useState<FilterApplicationsType[]>([]);

  const [openDialog, setOpenDialog] = React.useState(false);
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const [openRejectionDialog, setOpenRejectionDialog] = React.useState(false);
  const handleOpenRejectDialog = () => setOpenRejectionDialog(true);
  const handleCloseRejectionDialog = () => setOpenRejectionDialog(false);

  const [openApprovalDialog, setOpenApprovalDialog] = React.useState(false);
  const handleOpenApprovalDialog = () => setOpenApprovalDialog(true);
  const handleCloseApprovalDialog = () => setOpenApprovalDialog(false);

  const [currentProfessional, setCurrentProfessional] = React.useState<GetProfessionalType>(
    initProfessional,
  );

  const [currentApplication, setCurrentApplication] = React.useState<FilterApplicationsType>(
    initApplication,
  );
  const handleOpenDialog = (
    ProfessionalId: string,
    application: FilterApplicationsType,
    professionalData: GetProfessionalType,
  ) => {
    setCurrentProfessional(professionalData);
    setCurrentApplication(application);
    setOpenDialog(true);
  };

  const [activeStep, setActiveStep] = React.useState(1);
  const steps = [
    {
      key: 'REQUEST',
      value: (
        <>
          <div>{new Date(jobOfferData.requestCreationDate).toLocaleDateString()}</div>
          {' '}
          <div>Creación de solicitud</div>
        </>),
    },
    {
      key: 'JOB_OFFER',
      value: (
        <>
          <div>{new Date(jobOfferData.jobOfferCreationDate).toLocaleDateString()}</div>
          {' '}
          <div>Publicación</div>
        </>),
    },
    {
      key: 'WAIT_CANDIDATES',
      value: 'Esperando candidatos',
    },
    {
      key: 'EVAL_CANDIDATES',
      value: 'Evaluando candidatos',
    },
    {
      key: 'CLOSED',
      value: (
        <>
          <div>
            {jobOfferData.closeMessage
              ? new Date(jobOfferData.closeJobOfferDate).toLocaleDateString() : null}

          </div>
          {' '}
          <div>Cierre del proceso</div>
        </>),
    }];
  const [descDateApps, setDescDateApps] = React.useState<FilterApplicationsType[]>([]);
  const [ascDateApps, setAscDateApps] = React.useState<FilterApplicationsType[]>([]);

  React.useEffect(() => {
    if (jobOfferData.closeMessage) {
      return setActiveStep(4);
    }
    if (candidates.length > 0) {
      return setActiveStep(3);
    }

    return setActiveStep(2);
  }, [candidates]);
  React.useEffect(() => setCurrentApplication(initApplication),

    [applicationsData]);

  const [applicationsSortBy, setApplicationsSortBy] = React.useState('DATE-DESC');
  const handleApplicationsSortBy = (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    newSort: SetStateAction<string>,
  ) => {
    setApplicationsSortBy(newSort);
  };
  const filterAppsDateDesc = () => setNewApplications(descDateApps);
  const filterAppsDateAsc = () => setNewApplications(ascDateApps);

  React.useEffect(() => {
    if (applicationsData !== undefined) {
      setCandidates(applicationsData.jobOfferApplications.filter(
        (application: FilterApplicationsType) => (
          application.stage !== 'JOB_OFFER' && application.status !== 'REJECTED'
        ),
      ));
      const newApps = applicationsData.jobOfferApplications.filter(
        (application: FilterApplicationsType) => (
          application.stage === 'JOB_OFFER' && application.status !== 'REJECTED'
        ),
      );
      setAscDateApps(newApps.slice().sort(
        (a: FilterApplicationsType,
          b: FilterApplicationsType) => b.applicationCreationDate - a.applicationCreationDate,
      ));
      setDescDateApps(newApps.slice().sort(
        (a: FilterApplicationsType,
          b: FilterApplicationsType) => a.applicationCreationDate - b.applicationCreationDate,
      ));
      setNewApplications(newApps);
      setRejectedApplications(applicationsData.jobOfferApplications.filter(
        (application: FilterApplicationsType) => (
          application.status === 'REJECTED'
        ),
      ));
    }
  }, [applicationsData]);

  return (
    <Grid
      container
      component="main"
      justifyContent="center"
      alignContent="center"
      className={classes.gridContainer}
      spacing={0}

    >
      <Grid
        item
        xs={12}
        lg={8}
        component={Paper}
      >
        <Paper className={classes.horizontalTabs}>
          <Tabs
            orientation="horizontal"
            variant="scrollable"
            scrollButtons="on"
            value={value}
            onChange={handleChange}
            aria-label="Horizontal tabs"
          >
            <Tab
              label={<Badge badgeContent={newApplications.length} color="primary">Postulantes</Badge>}
              id={assignIdToTab(0).id}
              aria-controls={assignIdToTab(0)['aria-controls']}
            />
            <Tab
              label={<Badge badgeContent={candidates.length} color="primary">Candidatos</Badge>}
              id={assignIdToTab(1).id}
              aria-controls={assignIdToTab(1)['aria-controls']}
            />

            <Tab
              label={<Badge badgeContent={rejectedApplications.length} color="error">Candidatos rechazados</Badge>}
              id={assignIdToTab(2).id}
              aria-controls={assignIdToTab(2)['aria-controls']}
            />
            <Tab
              label="Mensajes"
              id={assignIdToTab(3).id}
              aria-controls={assignIdToTab(3)['aria-controls']}
            />
          </Tabs>

        </Paper>
        <Paper className={classes.accordionPaper}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <div style={{ margin: 'auto' }}>
                <Typography className={classes.accordionHeading} variant="h6" component="div">
                  <Box fontWeight="fontWeightBold">
                    {`Oferta ${jobOfferData.position}`}
                  </Box>
                </Typography>
                <Stepper
                  style={{ paddingBottom: 0, paddingTop: 10 }}
                  alternativeLabel
                  activeStep={activeStep}
                  connector={<QontoConnector />}
                >
                  {steps.map((label) => (
                    <Step key={label.key}>

                      <StepLabel
                        classes={{ label: classes.stepperLabel }}
                        StepIconComponent={QontoStepIcon}
                      >
                        <Hidden smDown>{label.value}</Hidden>
                      </StepLabel>

                    </Step>
                  ))}
                </Stepper>
                <Hidden mdUp>
                  <Typography
                    variant="body2"
                  >
                    {steps[activeStep].value}

                  </Typography>
                </Hidden>
              </div>
            </AccordionSummary>
            <AccordionDetails style={{ margin: 'auto' }}>
              <JobOfferDetails jobOffer={jobOfferData} />
            </AccordionDetails>
          </Accordion>
        </Paper>
        <TabPanel tabValue={value} index={0}>
          <ToggleButtonGroup
            style={{ width: 180, height: 30 }}
            value={applicationsSortBy}
            exclusive
            size="small"
            onChange={handleApplicationsSortBy}
            aria-label="cards filter"
          >
            <ToggleButton
              onClick={filterAppsDateDesc}
              value="DATE-DESC"
              aria-label="Descendant date filtered"
            >
              Recientes
            </ToggleButton>
            <ToggleButton
              onClick={filterAppsDateAsc}
              value="DATE-ASC"
              aria-label="Ascendant date filtered"
            >
              Antiguos

            </ToggleButton>

          </ToggleButtonGroup>
          <GridList cellHeight="auto" cols={cols} className={classes.YgridList} style={{ margin: 'auto' }}>
            {newApplications.length > 0 ? (
              newApplications.map((newApp) => (
                <GridListTile key={newApp.id} className={classes.GridListTile}>

                  <ProfileCard
                    key={newApp.id}
                    application={newApp}
                    handleOpenDialog={handleOpenDialog}
                  />

                </GridListTile>
              ))) : (
                <div style={{ textAlign: 'center', width: '100%', alignSelf: 'center' }}>
                  No hay postulantes en esta Oferta Laboral
                </div>
            )}

          </GridList>
        </TabPanel>

        <TabPanel tabValue={value} index={1}>

          {error && (
          <div style={{ margin: 'auto' }}>
            Ha ocurrido un error, por favor inténtelo nuevamente
          </div>
          )}
          {(!loading && !error && applicationsData)
            ? (
              <RecruitmentProcessStepper
                applicationsData={applicationsData}
                handleOpenDialog={handleOpenDialog}
              />
            ) : <div style={{ margin: 'auto' }}><CircularProgress /></div>}

        </TabPanel>

        <TabPanel tabValue={value} index={2}>
          <GridList cellHeight="auto" cols={cols} className={classes.YgridList} style={{ margin: 'auto' }}>
            {rejectedApplications.length > 0 ? (
              rejectedApplications.map((newApp) => (
                <GridListTile key={newApp.id} className={classes.GridListTile}>

                  <ProfileCard
                    key={newApp.id}
                    application={newApp}
                    handleOpenDialog={handleOpenDialog}
                  />

                </GridListTile>
              ))) : (
                <div style={{ textAlign: 'center', width: '100%', alignSelf: 'center' }}>
                  No hay postulantes rechazados en esta Oferta Laboral
                </div>
            )}

          </GridList>
        </TabPanel>

        <TabPanel tabValue={value} index={3}>
          <GridList cellHeight="auto" cols={1} className={classes.YgridList} style={{ margin: 'auto' }}>
            {jobOfferData.messages.map((currentMessage) => (
              <GridListTile key={currentMessage.senderName} className={classes.GridListTile}>
                <MessageCard
                  key={currentMessage.senderName}
                  message={currentMessage}
                />
              </GridListTile>
            ))}
            <NewMessageCard
              jobOfferId={jobOfferData.id}
            />

          </GridList>
        </TabPanel>

      </Grid>
      <Hidden mdDown>
        <Grid
          item
          md={3}
          component={Paper}
          className={classes.gridItem}
        >
          <div style={{
            height: '480px',
            display: 'grid',
            justifyContent: 'center',
            textAlign: 'center',
            placeItems: 'center',
          }}
          >
            <Typography variant="h6">
              {currentApplication !== undefined ? getDialogLabels(currentApplication)[0] : ''}
            </Typography>
            <Typography variant="body1">
              {currentApplication !== undefined ? getDialogLabels(currentApplication)[1] : ''}
            </Typography>
            {getButtons(
              classes.avatar,
              currentProfessional,
              currentApplication,
              jobOfferData.id,
              handleOpenRejectDialog,
              handleOpenApprovalDialog,
            )}

          </div>

        </Grid>
      </Hidden>
      <Hidden lgUp>
        <ApplicantInfoDialog
          openDialog={openDialog}
          handleCloseDialog={handleCloseDialog}
          dialogTitle={currentApplication !== undefined ? getDialogLabels(currentApplication)[0] : ''}
          applicationInfo={currentApplication}
          professionalInfo={currentProfessional}
          step={currentApplication !== undefined ? getDialogLabels(currentApplication)[1] : ''}
        />
      </Hidden>
      <RejectionDialog
        openRejectionDialog={openRejectionDialog}
        handleCloseParentDialog={handleCloseDialog}
        handleCloseRejectionDialog={handleCloseRejectionDialog}
        applicationInfo={currentApplication}
      />
      <ApprovalDialog
        openApprovalDialog={openApprovalDialog}
        handleCloseParentDialog={handleCloseDialog}
        handleCloseApprovalDialog={handleCloseApprovalDialog}
        applicationInfo={currentApplication}
      />

    </Grid>

  );
}

export default withWidth()(PostedAppDetail);
