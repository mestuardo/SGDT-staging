import React from 'react';
import {
  makeStyles, Theme, createStyles, withStyles,
} from '@material-ui/core/styles';
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import PolicyIcon from '@material-ui/icons/Policy';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import StepConnector from '@material-ui/core/StepConnector';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { StepIconProps } from '@material-ui/core/StepIcon';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Hidden from '@material-ui/core/Hidden';
import CircularProgress from '@material-ui/core/CircularProgress';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';
import { useQuery } from '@apollo/client';
import FILTER_APPLICATIONS from '../queries/filter-applications.graphql';
import { FilterApplicationDataType, FilterApplicationsType } from '../types/filter-applications-query-types';
import { GetProfessionalType } from '../types/get-professional-types';

import ProfileCard from './profile_card';
import ApplicantInfoDialog from './applicant_info_dialog';

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 15,
  },
  active: {
    '& $line': {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  completed: {
    '& $line': {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: '#eaeaf0',
    borderRadius: 1,
  },
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 35,
    height: 35,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  },
  completed: {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
  },
});

function ColorlibStepIcon(props: StepIconProps) {
  const classes = useColorlibStepIconStyles();
  const { active, completed, icon } = props;

  const icons: { [index: string]: React.ReactElement } = {
    1: <AccountCircleIcon />,
    2: <GroupAddIcon />,
    3: <PolicyIcon />,
    4: <AssignmentTurnedInIcon />,
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {icons[String(icon)]}
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    width: '100%',
  },
  stepper: {
    width: 'fit-content',
    margin: 'auto',
    paddingBottom: 0,
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  GridListTile: {
    display: 'grid',
    justifyContent: 'center',
  },
  // Vertical grid style
  YgridList: {
    height: theme.spacing(40),
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

  },
}));

function getSteps() {
  return ['Selección inicial', 'Entrevista psicolaboral', 'Entrevista técnica', 'Decisión final'];
}

interface StepperProps{
  reqId: string,
  width: Breakpoint,
}
function CustomizedSteppers(props:StepperProps): JSX.Element {
  const { reqId, width } = props;
  const classes = useStyles();

  const { data: applicationsData, loading, error } = useQuery<FilterApplicationDataType>(
    FILTER_APPLICATIONS, {
      variables: { filterApplicationsJobOfferId: reqId },
    },
  );

  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  // These functions are used in order to handle the steps
  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  // Open an close the applicant info dialog
  const [openDialog, setOpenDialog] = React.useState(false);
  const [dialogContentID, setDialogContentID] = React.useState('');
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

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

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
  // With this constant we define the columns to display according to screen width
  const { cols, gridwidth } = getCols(width);

  // Handle loading, error and data from Graphql query
  if (loading) {
    return (
      <div style={{ width: gridwidth }}>
        <CircularProgress />
      </div>

    );
  }

  if (error) {
    return (
      <div style={{ width: gridwidth }}>
        Ha ocurrido un error, por favor inténtelo nuevamente
      </div>
    );
  }

  const { jobOfferApplications }: {
    jobOfferApplications: FilterApplicationsType[]
  } = applicationsData as FilterApplicationDataType;

  function getStepContent(step: number) {
    const StageByStep: { [key: string]: number } = {
      JOB_OFFER: 0,
      PSYCHOLOGICAL: 1,
      TECHNICAL: 2,
    };
    const currentJobApplications = jobOfferApplications.filter(
      (application: FilterApplicationsType) => (
        application.status !== 'REJECTED'
      ),
    );
    if (step < 3) {
      const inProgressApplications = currentJobApplications.filter(
        (application: FilterApplicationsType) => (
          application.status !== 'ACCEPTED'
        ),
      );
      return inProgressApplications.filter((application: FilterApplicationsType) => (
        StageByStep[application.stage] === step
      ));
    }
    return currentJobApplications.filter((application: FilterApplicationsType) => (
      application.status === 'ACCEPTED'
    ));
  }

  return (
    <div className={classes.root}>
      <Stepper
        className={classes.stepper}
        alternativeLabel
        activeStep={activeStep}
        connector={<ColorlibConnector />}
      >
        {steps.map((label) => (
          <Step key={label}>

            <StepLabel StepIconComponent={ColorlibStepIcon}>
              <Hidden mdDown>
                {label}
              </Hidden>
            </StepLabel>

          </Step>
        ))}
      </Stepper>
      <Hidden lgUp>
        <Typography variant="body1">{steps[activeStep]}</Typography>
      </Hidden>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography component="div" className={classes.instructions}>
              All steps completed - you&apos;re finished
            </Typography>
            <Button onClick={handleReset} className={classes.button}>
              Reset
            </Button>
          </div>
        ) : (
          <>
            <GridList cellHeight="auto" cols={cols} className={classes.YgridList} style={{ width: gridwidth }}>
              {getStepContent(activeStep).length > 0
                ? getStepContent(activeStep).map((application) => (
                  <GridListTile key={application.id} className={classes.GridListTile}>

                    {/* Each new application card is presented.
                Slice is used to not show all the data in the main view */}

                    <ProfileCard
                      key={application.id}
                      application={application}
                      handleOpenDialog={handleOpenDialog}
                    />

                  </GridListTile>
                )) : <div style={{ textAlign: 'center', width: '100%', alignSelf: 'center' }}>Actualmente no hay postulantes en esta etapa</div>}

            </GridList>
            <ApplicantInfoDialog
              openDialog={openDialog}
              handleCloseDialog={handleCloseDialog}
              dialogTitle="Detalles postulante"
              dialogContentID={dialogContentID}
              applicationInfo={currentApplication}
              professionalInfo={currentProfessional}
              step={steps[activeStep]}
            />
            <div>
              <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                Atrás
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={classes.button}
              >
                {activeStep === steps.length - 1 ? 'Finalizar' : 'Siguiente'}
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default withWidth()(CustomizedSteppers);
