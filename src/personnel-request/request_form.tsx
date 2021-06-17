import React from 'react';
import {
  CssBaseline, CircularProgress, Stepper, Step, StepLabel,
  Button, Grid, GridList, GridListTile, Hidden, Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { FormikProps } from 'formik';
import { useMutation, DocumentNode } from '@apollo/client';
import { CreateRequestType } from '../types/create-request-types';
import { CreateRequestTypeString } from '../types/create-request-string-types';
import REQUEST_FORM_MUTATION from '../mutations/request-form.graphql';
import RECRUITMENT_PROCESS_INDEX_QUERY from '../queries/recruitment-process-index.graphql';
// import schema from '../types/create-request-types';

import ClientInfo from './1_client_info';
import RequiredProfileInfo from './2_required_profile_info';
import CollabInfo from './3_collab_info';
import HiringInfo from './4_hiring_info';
import Summary from './5_Summary';

const useStyles = makeStyles((theme) => ({

  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },

  Ygrid: {
    maxWidth: 1100,

  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    height: theme.spacing(45),

  },
  YgridList: {
    maxHeight: theme.spacing(42),
    justifyContent: 'center',
    // Aquí se estiliza la scrollbar
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

    // Estilo responsivo de YgridList
    '@media only screen and (max-width: 600px)': {
      // height: theme.spacing(60),

    },
    '@media only screen and (max-width: 400px)': {
      // height: theme.spacing(50),

    },

  },

}));

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

// Creando un formschema que se ajuste al form:
const formSchema: CreateRequestTypeString = {
  approxStartDate: new Date(),
  client: '',
  client_name: '',
  contractType: '',
  externalRep: '',
  externalRep_name: '',
  formationStatus: '',
  internalRep: '',
  levelOfStudies: '',
  languages: [],
  maxSalary: '',
  position: '',
  possibleDuration: '',
  recruiter: '',
  requestDescription: '',
  requiresComputer: '',
  requiresTechnical: '',
  serviceType: '',
  shift: '',
  shiftType: '',
  softSkills: '',
  specialRequirements: '',
  stage: 'REQUEST',
  technicalRequirements: '',
  vacancies: '',
  workAdress: '',
  yearsExperience: '',

};

// Labels títulos y largo de pasos
const steps = ['Información del cliente',
  'Informacion del perfil requerido',
  'Información de contratación del colaborador',
  'Información de contratación del servicio',
  'Resumen'];

export default function SignIn(): JSX.Element {
  const [onSubmitHandler,
    { loading: mutationLoading, error: mutationError }] = useMutation<
  { createRequest: CreateRequestType }>(REQUEST_FORM_MUTATION);

  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);

  const Form1 = React.useRef<FormikProps<CreateRequestTypeString>>(null);
  const Form2 = React.useRef<FormikProps<CreateRequestTypeString>>(null);
  const Form3 = React.useRef<FormikProps<CreateRequestTypeString>>(null);
  const Form4 = React.useRef<FormikProps<CreateRequestTypeString>>(null);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  function mutationResult() {
    if (mutationLoading) {
      return <CircularProgress color="primary" />;
    }
    if (mutationError) {
      return <p>Error :( Por favor intente de nuevo</p>;
    }
    return (
      <>
        <p>Solicitud enviada</p>
        <Button variant="contained" href="/recruitment-process" className={classes.button}> Volver a solicitudes</Button>
        <Button variant="contained" href="/personnel-request" className={classes.button}> Crear nueva solicitud</Button>
      </>
    );
  }
  // esta definición servirá para mandar los lenguajes
  // const finalLanguages: { language: string, level: string }[] = formSchema.languages.map(
  //   (lang:{ id: string; label: string; language: string; level: string; }) => (
  //     { language: lang.language, level: lang.level }
  //   ),
  // );

  const handleSubmit = () => {
    if (activeStep === steps.length - 1) {
      handleNext();

      onSubmitHandler({
        variables: {
          // createRequestInput: {
          //   internalRep: '609b4b9c4cfb419054fe7955',
          //   client: '6098625936b836005385ac40',
          //   maxSalary: 1000000,
          //   contractType: 'INDEFINIDO',
          //   vacancies: 2,
          //   position: 'Desarrollador',
          //   stage: 'REQUEST',
          //   shiftType: 'JORNADA_COMPLETA',
          //   softSkills: [
          //     'Trabajo en equipo', 'Buena comunicación',
          //   ],
          //   yearsExperience: 1,
          //   languages: [{ language: 'Inglés' }],
          //   possibleDuration: 3.5,
          //   requestDescription: 'Se necesita desarrollador Java, Python y Node',
          //   requiresComputer: true,
          // },
          createRequestInput: {
            approxStartDate: formSchema.approxStartDate,
            client: formSchema.client, // cambiar después por id real de cliente
            contractType: summaryLabels[formSchema.contractType],
            externalRep: formSchema.externalRep, // cambiar después por real de rep. externo
            formationStatus: summaryLabels[formSchema.formationStatus],
            internalRep: '609b4b9c4cfb419054fe7955', // cambiar después por real de rep. interno
            levelOfStudies: summaryLabels[formSchema.levelOfStudies],
            languages: formSchema.languages.map(
              (lang:{ id: string; label: string; language: string; level: string; }) => (
                { language: lang.language, level: lang.level }
              ),
            ),
            maxSalary: +formSchema.maxSalary,
            position: formSchema.position,
            possibleDuration: parseFloat(formSchema.possibleDuration),
            recruiter: '609b4b9c4cfb419054fe7955', // cambiar después por id real de reclutador
            requestDescription: formSchema.requestDescription,
            // requiresComputer: formSchema.requiresComputer === 'Sí',
            // requiresTechnical: formSchema.requiresTechnical === 'Sí',
            requiresComputer: summaryLabels[formSchema.requiresComputer],
            requiresTechnical: summaryLabels[formSchema.requiresTechnical],
            serviceType: summaryLabels[formSchema.serviceType],
            // shift: '', // cambiar form de shift por un checkbox de días de la semana
            shiftType: summaryLabels[formSchema.shiftType],
            softSkills: formSchema.softSkills.split(','), // forma tentativa
            specialRequirements: formSchema.specialRequirements.split(','), // forma tentativa
            stage: 'REQUEST',
            technicalRequirements: formSchema.technicalRequirements.split(','), // formatentativa
            vacancies: +formSchema.vacancies,
            // workAdress: '', // debe entregarse del form en formato ciudad,comuna,calle,número
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

  function getStepContent(step:number) {
    switch (step) {
      case 0:
        return (
          <ClientInfo
            formRef={Form1}
            formSchema={formSchema}
            handleNext={handleNext}
          />
        );
      case 1:
        return (
          <RequiredProfileInfo
            formRef={Form2}
            formSchema={formSchema}
            handleNext={handleNext}
          />
        );
      case 2:
        return (
          <CollabInfo
            formRef={Form3}
            formSchema={formSchema}
            handleNext={handleNext}
          />
        );
      case 3:
        return (
          <HiringInfo
            formRef={Form4}
            formSchema={formSchema}
            handleNext={handleNext}
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
  }

  return (
    <>
      <CssBaseline />

      <Grid
        className={classes.Ygrid}
        container
        direction="column"
        justify="center"
        alignItems="center"
        spacing={0}
      >

        <Typography variant="h5">Formulario solicitud</Typography>

        <Stepper activeStep={activeStep}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel><Hidden smDown>{label}</Hidden></StepLabel>
            </Step>
          ))}
        </Stepper>
        <Hidden mdUp><Typography>{steps[activeStep]}</Typography></Hidden>

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

    </>
  );
}
