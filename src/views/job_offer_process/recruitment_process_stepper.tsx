import React from 'react';
import {
  GridList,
  GridListTile,
  Hidden,
  Step,
  StepLabel,
  Stepper,
  Typography,
  withWidth,
  Badge,
} from '@material-ui/core';

import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';

import { ColorlibConnector, recruitmentProcessStepperStyles } from './styles';
import { FilterApplicationDataType, FilterApplicationsType } from '../../types/filter-applications-query-types';
import { GetProfessionalType } from '../../types/get-professional-types';
import getCols from '../../helpers/get_columns_helper';
import { getSteps, ColorlibStepIcon } from './helpers';

import ProfileCard from './profile_card';

interface StepperProps{
  applicationsData: FilterApplicationDataType,
  width: Breakpoint,
  handleOpenDialog: (
    ProfileId:string,
    application: FilterApplicationsType,
    professionalData: GetProfessionalType
  ) => void
}
function CustomizedSteppers(props:StepperProps) : JSX.Element {
  const {
    applicationsData,
    width,
    handleOpenDialog,
  } = props;
  const classes = recruitmentProcessStepperStyles();

  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const { cols } = getCols(width);

  const { jobOfferApplications }: {
    jobOfferApplications: FilterApplicationsType[]
  } = applicationsData;

  const getStepContent = (step: number) => {
    const StageByStep: { [key: string]: number } = {
      PRE_INTERVIEW: 0,
      TECHNICAL: 1,
      PSYCHOLOGICAL: 2,
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
  };

  return (
    <div className={classes.root}>
      <Stepper
        className={classes.stepper}
        alternativeLabel
        activeStep={activeStep}
        connector={<ColorlibConnector />}
      >
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel
              style={{ cursor: 'pointer' }}
              onClick={() => setActiveStep(index)}
              StepIconComponent={(properties) => <Badge badgeContent={getStepContent(index).length} color="primary">{ColorlibStepIcon(properties)}</Badge>}
            >
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
          </div>
        ) : (
          <>
            <GridList cellHeight="auto" cols={cols} className={classes.YgridList} style={{ margin: 'auto' }}>
              {getStepContent(activeStep).length > 0
                ? getStepContent(activeStep).map((application) => (
                  <GridListTile key={application.id} className={classes.GridListTile}>

                    <ProfileCard
                      key={application.id}
                      application={application}
                      handleOpenDialog={handleOpenDialog}
                    />

                  </GridListTile>
                )) : <div style={{ textAlign: 'center', width: '100%', alignSelf: 'center' }}>Actualmente no hay candidatos en esta etapa</div>}

            </GridList>
          </>
        )}
      </div>
    </div>
  );
}

export default withWidth()(CustomizedSteppers);
