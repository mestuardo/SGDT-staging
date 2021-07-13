import React from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Badge,
  Box,
  Button,
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
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useQuery } from '@apollo/client';
import postedAppCardStyles from './styles';
import { JobOfferDetailType } from '../../types/job-offer-query-types';
import { GetProfessionalType } from '../../types/get-professional-types';
import { FilterApplicationDataType, FilterApplicationsType } from '../../types/filter-applications-query-types';
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

interface ProfilesProps{
  reqId: string,
  jobOfferData: JobOfferDetailType,
  width: Breakpoint,
}

function ProfilesView(props:ProfilesProps) : JSX.Element {
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
  React.useEffect(() => {
    if (applicationsData !== undefined) {
      setCandidates(applicationsData.jobOfferApplications.filter(
        (application: FilterApplicationsType) => (
          application.stage !== 'JOB_OFFER' && application.status !== 'REJECTED'
        ),
      ));
      setNewApplications(applicationsData.jobOfferApplications.filter(
        (application: FilterApplicationsType) => (
          application.stage === 'JOB_OFFER'
        ),
      ));
      setRejectedApplications(applicationsData.jobOfferApplications.filter(
        (application: FilterApplicationsType) => (
          application.status === 'REJECTED'
        ),
      ));
    }
  }, [applicationsData]);

  const [openDialog, setOpenDialog] = React.useState(false);
  const [dialogContentID, setDialogContentID] = React.useState('');
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const [openRejectionDialog, setOpenRejectionDialog] = React.useState(false);
  const handleOpenRejectDialog = () => setOpenRejectionDialog(true);
  const handleCloseRejectionDialog = () => setOpenRejectionDialog(false);
  const [openApprovalDialog, setOpenApprovalDialog] = React.useState(false);
  const handleOpenApprovalDialog = () => setOpenApprovalDialog(true);
  const handleCloseApprovalDialog = () => setOpenApprovalDialog(false);
  const initProfessional: GetProfessionalType = {
    id: '',
    name: '',
    firstSurname: '',
    secondSurname: '',
    rut: '',
    specialty: '',
    currentJob: '',
    savedJobOffers: [''],
  };
  const [currentProfessional, setCurrentProfessional] = React.useState<GetProfessionalType>(
    initProfessional,
  );
  const initApplication: FilterApplicationsType = {
    id: '',
    jobOfferId: '',
    professionalId: '',
    status: '',
    recruiterId: '',
    questions: [''],
    answers: [''],
    assessment: '',
    stage: '',
  };
  const [currentApplication, setCurrentApplication] = React.useState<FilterApplicationsType>(
    initApplication,
  );
  const handleOpenDialog = (
    ProfessionalId:string,
    application: FilterApplicationsType,
    professionalData: GetProfessionalType,
  ) => {
    setCurrentProfessional(professionalData);
    setCurrentApplication(application);
    setDialogContentID(ProfessionalId);
    setOpenDialog(true);
  };

  const getButtons = (status: string) => {
    switch (status) {
      case 'REJECTED':
        return (
          <>
            <Avatar className={classes.avatar} variant="rounded" />
            <h2>
              {currentProfessional.name }
              {' '}
              {currentProfessional.firstSurname}
            </h2>
            <div>{currentProfessional.specialty}</div>
            <div>{currentProfessional.rut}</div>
            <div>{currentProfessional.currentJob}</div>
          </>
        );
      case 'IN_PROCESS':
        return (
          <>
            <Avatar className={classes.avatar} variant="rounded" />
            <h2>
              {currentProfessional.name}
              {' '}
              {currentProfessional.firstSurname}
            </h2>
            <div>{currentProfessional.specialty}</div>
            <div>{currentProfessional.rut}</div>
            <div>{currentProfessional.currentJob}</div>
            <Button onClick={handleOpenApprovalDialog} variant="contained" color="secondary">
              {currentApplication.stage === 'JOB_OFFER'
                ? 'CONVERTIR EN CANDIDATO'
                : 'PASAR A SIGUIENTE FASE'}
            </Button>
            <Button onClick={handleOpenRejectDialog} style={{ color: 'red' }}>
              Rechazar
            </Button>
          </>
        );
      case 'ACCEPTED':
        return (
          <>
            <Avatar className={classes.avatar} variant="rounded" />
            <h2>
              {currentProfessional.name}
              {' '}
              {currentProfessional.firstSurname}
            </h2>
            <div>{currentProfessional.specialty}</div>
            <div>{currentProfessional.rut}</div>
            <div>{currentProfessional.currentJob}</div>
            <Button> Enviar archivos</Button>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Grid
      container
      component="main"
      justify="center"
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
              label={<Badge badgeContent={rejectedApplications.length} color="error">Postulaciones rechazadas</Badge>}
              id={assignIdToTab(2).id}
              aria-controls={assignIdToTab(2)['aria-controls']}
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
              <Typography className={classes.accordionHeading} variant="h6" component="div">
                <Box fontWeight="fontWeightBold">
                  {`Oferta ${jobOfferData.position}`}
                </Box>
              </Typography>
            </AccordionSummary>
            <AccordionDetails style={{ margin: 'auto' }}>
              <JobOfferDetails jobOffer={jobOfferData} />
            </AccordionDetails>
          </Accordion>
        </Paper>
        <TabPanel tabValue={value} index={0}>
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
              ))) : <div style={{ textAlign: 'center', width: '100%', alignSelf: 'center' }}>No hay postulantes en esta Oferta Laboral</div>}

          </GridList>
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
              ))) : <div style={{ textAlign: 'center', width: '100%', alignSelf: 'center' }}>No hay postulantes rechazados en esta Oferta Laboral</div>}

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
            height: '480px',
            display: 'grid',
            justifyContent: 'center',
            textAlign: 'center',
            placeItems: 'center',
          }}
          >

            {getButtons(currentApplication.status)}

          </div>

        </Grid>
      </Hidden>
      <Hidden lgUp>
        <ApplicantInfoDialog
          openDialog={openDialog}
          handleCloseDialog={handleCloseDialog}
          dialogTitle="Detalles postulante"
          dialogContentID={dialogContentID}
          applicationInfo={currentApplication}
          professionalInfo={currentProfessional}
          step="Postulación"
        />
      </Hidden>
      <RejectionDialog
        openRejectionDialog={openRejectionDialog}
        handleCloseParentDialog={handleCloseDialog}
        handleCloseRejectionDialog={handleCloseRejectionDialog}
        dialogContentID={dialogContentID}
        applicationInfo={currentApplication}
      />
      <ApprovalDialog
        openApprovalDialog={openApprovalDialog}
        handleCloseParentDialog={handleCloseDialog}
        handleCloseApprovalDialog={handleCloseApprovalDialog}
        dialogContentID={dialogContentID}
        applicationInfo={currentApplication}
      />

    </Grid>

  );
}

export default withWidth()(ProfilesView);
