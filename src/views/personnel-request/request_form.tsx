import React from 'react';
import { FormikProps } from 'formik';
import { useMutation, DocumentNode } from '@apollo/client';
import {
  Button,
  CircularProgress,
  Grid,
  GridList,
  GridListTile,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from '@material-ui/core';

import { requestFormStyles } from './personnel-request-form-styles';
import { CreateRequestType } from '../../types/create-request-types';
import { CreateRequestTypeString } from '../../types/create-request-string-types';
import REQUEST_FORM_MUTATION from '../../mutations/request-form.graphql';
import RECRUITMENT_PROCESS_INDEX_QUERY from '../../queries/recruitment-process-index.graphql';

import ClientInfo from './1_client_info';
import RequiredProfileInfo from './2_required_profile_info';
import CollabInfo from './3_collab_info';
import HiringInfo from './4_hiring_info';
import Summary from './5_Summary';

const summaryLabels: { [key:string]:string | boolean } = {
  BASICA: 'LOWER_SCHOOL',
  MEDIA: 'HIGH_SCHOOL',
  TECNICO: 'TECHNICAL',
  UNIVERSITARIA: 'COLLEGE',
  COMPLETO: 'COMPLETE',
  INCOMPLETO: 'INCOMPLETE',
  FIJO: 'FIXED',
  INDEFINIDO: 'INDEFINITE',
  PART_TIME: 'PART_TIME',
  FULL_TIME: 'FULL_TIME',
  FREELANCER: 'FREELANCE',
  SI: true,
  NO: false,
  INTERNO: 'INTERNAL',
  OUTSOURCING: 'OUTSOURCING',
  TRANSITORIOS: 'OUTSOURCING_TRANSITORY',
  SELECCION: 'OUTSOURCING_SELECTION',
};

const steps = ['Información del cliente',
  'Informacion del perfil requerido',
  'Información de contratación del colaborador',
  'Información de contratación del servicio',
  'Resumen'];

interface FormProps {
  formSchema: CreateRequestTypeString,
  updatePreviewCardContent: (formSchema: CreateRequestTypeString) => void;
}

export default function SignIn(props: FormProps): JSX.Element {
  const { formSchema, updatePreviewCardContent } = props;
  const [onSubmitHandler,
    { loading: mutationLoading, error: mutationError }] = useMutation<
  { createRequest: CreateRequestType }>(REQUEST_FORM_MUTATION);

  const classes = requestFormStyles();
  const [activeStep, setActiveStep] = React.useState(0);

  const Form1 = React.useRef<FormikProps<CreateRequestTypeString>>(null);
  const Form2 = React.useRef<FormikProps<CreateRequestTypeString>>(null);
  const Form3 = React.useRef<FormikProps<CreateRequestTypeString>>(null);
  const Form4 = React.useRef<FormikProps<CreateRequestTypeString>>(null);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const mutationResult = () => {
    if (mutationLoading) {
      return <CircularProgress color="primary" />;
    }
    if (mutationError) {
      return <p>Error. Por favor intente de nuevo</p>;
    }
    return (
      <>
        <p>Solicitud enviada</p>
        <Button variant="contained" href="/recruitment-process" className={classes.button}> Volver a solicitudes</Button>
        <Button variant="contained" href="/personnel-request" className={classes.button}> Crear nueva solicitud</Button>
      </>
    );
  };

  const handleSubmit = () => {
    if (activeStep === steps.length - 1) {
      handleNext();

      onSubmitHandler({
        variables: {
          createRequestInput: {
            approxStartDate: formSchema.approxStartDate,
            client: formSchema.client,
            contractType: summaryLabels[formSchema.contractType],
            externalRep: formSchema.externalRep,
            formationStatus: summaryLabels[formSchema.formationStatus],
            internalRep: '609b4b9c4cfb419054fe7955', // TODO: change for real internal rep
            levelOfStudies: summaryLabels[formSchema.levelOfStudies],
            languages: formSchema.languages.map(
              (lang:{ id: string; label: string; language: string; level: string; }) => (
                { language: lang.language, level: lang.level }
              ),
            ),
            maxSalary: +formSchema.maxSalary,
            position: formSchema.position,
            possibleDuration: parseFloat(formSchema.possibleDuration),
            recruiter: formSchema.recruiter, // TODO: change for real recruiter
            requestDescription: formSchema.requestDescription,
            requiresComputer: summaryLabels[formSchema.requiresComputer],
            serviceType: summaryLabels[formSchema.serviceType],
            shiftType: summaryLabels[formSchema.shiftType],
            softSkills: formSchema.softSkills.split(','),
            specialRequirements: formSchema.specialRequirements.split(','),
            technicalRequirements: formSchema.technicalRequirements.split(','),
            vacancies: +formSchema.vacancies,
            // workAdress: '', // TODO: should have format city,commune,street,number
            yearsExperience: +formSchema.vacancies,
          },
        },
        refetchQueries: [
          { query: RECRUITMENT_PROCESS_INDEX_QUERY as DocumentNode },
        ],
      }).catch((error) => { throw (error); });
    }

    if (Form1.current) {
      Form1.current.handleSubmit();
    }

    if (Form2.current) {
      Form2.current.handleSubmit();
    }

    if (Form3.current) {
      Form3.current.handleSubmit();
    }

    if (Form4.current) {
      Form4.current.handleSubmit();
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const getStepContent = (step:number) => {
    switch (step) {
      case 0:
        return (
          <ClientInfo
            formRef={Form1}
            formSchema={formSchema}
            handleNext={handleNext}
            updatePreviewCardContent={updatePreviewCardContent}
          />
        );
      case 1:
        return (
          <RequiredProfileInfo
            formRef={Form2}
            formSchema={formSchema}
            handleNext={handleNext}
            updatePreviewCardContent={updatePreviewCardContent}
          />
        );
      case 2:
        return (
          <CollabInfo
            formRef={Form3}
            formSchema={formSchema}
            handleNext={handleNext}
            updatePreviewCardContent={updatePreviewCardContent}
          />
        );
      case 3:
        return (
          <HiringInfo
            formRef={Form4}
            formSchema={formSchema}
            handleNext={handleNext}
            updatePreviewCardContent={updatePreviewCardContent}
          />
        );
      case 4:
        return (
          <Summary
            formSchema={formSchema}
          />
        );
      default:
        throw new Error('Unknown step');
    }
  };

  return (
    <Grid
      className={classes.root}
      container
      direction="column"
      justify="center"
      alignItems="center"
      spacing={0}
    >
      <Grid
        item
        xs={12}
      >

        <Typography variant="h5">Formulario solicitud</Typography>

        <Stepper activeStep={activeStep} className={classes.stepper}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel />
            </Step>
          ))}
        </Stepper>
        <Typography>{steps[activeStep]}</Typography>

        <div className={classes.form}>
          <GridList
            cellHeight="auto"
            className={classes.YgridList}
          >
            <GridListTile style={{ width: '100%' }}>
              {activeStep === steps.length
                ? mutationResult() : getStepContent(activeStep) }
            </GridListTile>
          </GridList>
        </div>
        <div className={classes.actionsContainer}>
          <Button
            disabled={(activeStep === 0) || (activeStep === steps.length)}
            onClick={handleBack}
            className={classes.button}
          >
            Atrás
          </Button>
          <Button
            disabled={activeStep === steps.length}
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            className={classes.button}
          >
            {activeStep >= steps.length - 1 ? 'Enviar' : 'Siguiente'}
          </Button>
        </div>
      </Grid>

    </Grid>

  );
}
