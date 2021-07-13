import React from 'react';

import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Hidden,
  TextField,
  Typography,
  IconButton,
  FormControl,
  InputLabel,
  Paper,
} from '@material-ui/core';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import {
  AddCircle,
  Cancel,
  RemoveCircle,
} from '@material-ui/icons';
import DateFnsUtils from '@date-io/date-fns';
import esLocale from 'date-fns/locale/es';
import * as Yup from 'yup';
import { Formik, Form, FormikProps } from 'formik';
import {
  useMutation,
  DocumentNode,
} from '@apollo/client';
import { useRouter, NextRouter } from 'next/router';

import SamplePostedApplicationCard from '../cards/sample_posted_application_card';
import requestReviewStyles from './styles';
import { DescriptionAndQuestionsSchema, summaryLabels } from './helpers';
import { RequestDetailType } from '../../types/request-query-types';
import PUBLISH_JOB_OFFER from '../../mutations/createJobOffer.graphql';
import RECRUITMENT_PROCESS_INDEX_QUERY from '../../queries/recruitment-process-index.graphql';

interface RequestReviewDetailProps {
  requestData: RequestDetailType,
}

const ValidationSchema = Yup.object().shape({
  SLA_1: Yup.date().nullable()
    .required('Ingrese una fecha para el SLA de inicio'),
  SLA_2: Yup.date().nullable()
    .required('Ingrese una fecha para el SLA de fin'),
  description: Yup.string()
    .required('Ingrese una descripción para la oferta de trabajo'),
  question_1: Yup.string()
    .required('Ingrese al menos una pregunta para el postulante'),
});

const formSchema = {
  SLA_1: null,
  SLA_2: null,
  description: '',
  question_1: '',
  question_2: '',
  question_3: '',
  question_4: '',
  question_5: '',
};

export default function RequestReviewDetail(props: RequestReviewDetailProps): JSX.Element {
  const { requestData } = props;
  const classes = requestReviewStyles();
  const router: NextRouter = useRouter();

  const [publishJobOffer,
    { loading: mutationLoading, error: mutationError }] = useMutation(PUBLISH_JOB_OFFER);

  const formRef = React.useRef<FormikProps<DescriptionAndQuestionsSchema>>(null);

  const [questionQuantity, setQuestionQuantity] = React.useState(1);
  const handleAddQuestions = () => setQuestionQuantity((prevState) => prevState + 1);
  const handleRemoveQuestions = () => setQuestionQuantity((prevState) => prevState - 1);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    setTimeout(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  }, [questionQuantity]);

  const redirectOnSubmit = () => router.push('/recruitment-process/');

  return (
    <Grid
      className={classes.root}
      container
      direction="row"
      justify="center"
      alignItems="center"
      spacing={0}
    >
      <Grid
        item
        xs={12}
        lg={8}
        component={Paper}
      >
        <h2>Revisión de solicitud</h2>
        <div style={{ textAlign: 'left', width: '70%', margin: 'auto' }}>
          <Typography variant="caption" component="div">
            <Box fontWeight="fontWeightMedium" display="inline">Salario máximo:</Box>
            {' $'}
            {requestData.maxSalary.toLocaleString() || '-'}
          </Typography>
          <Typography variant="caption" component="div">
            <Box fontWeight="fontWeightMedium" display="inline">Vacantes:</Box>
            {' '}
            {requestData.vacancies || '-'}
          </Typography>
          <Typography variant="caption" component="div">
            <Box fontWeight="fontWeightMedium" display="inline">Duración del trabajo:</Box>
            {' '}
            {requestData.possibleDuration || '-'}
          </Typography>
          <Typography variant="caption" component="div">
            <Box fontWeight="fontWeightMedium" display="inline">Idiomas:</Box>
            {' '}
            {requestData.languages ? requestData.languages.map((entry:{ language:string; level:string }) => `${entry.language}, ${entry.level}`).join('; ') : '-'}
          </Typography>
          <Typography variant="caption" component="div">
            <Box fontWeight="fontWeightMedium" display="inline">Nivel de estudios:</Box>
            {' '}
            {summaryLabels[requestData.levelOfStudies] || '-'}
          </Typography>
          <Typography variant="caption" component="div">
            <Box fontWeight="fontWeightMedium" display="inline">Nivel formación:</Box>
            {' '}
            {summaryLabels[requestData.formationStatus] || '-'}
          </Typography>
          <Typography variant="caption" component="div">
            <Box fontWeight="fontWeightMedium" display="inline">Habilidades blandas:</Box>
            {' '}
            {requestData.softSkills.map((softSkill:string) => softSkill).join(', ') || '-'}
          </Typography>
          <Typography variant="caption" component="div">
            <Box fontWeight="fontWeightMedium" display="inline">Tipo de servicio:</Box>
            {' '}
            {requestData.serviceType || '-'}
          </Typography>
          <Typography variant="caption" component="div">
            <Box fontWeight="fontWeightMedium" display="inline">Tipo de contrato:</Box>
            {' '}
            {summaryLabels[requestData.contractType] || '-'}
          </Typography>
          <Typography variant="caption" component="div">
            <Box fontWeight="fontWeightMedium" display="inline">Jornada laboral:</Box>
            {' '}
            {summaryLabels[requestData.shiftType] || '-'}
          </Typography>
          <Typography variant="caption" component="div">
            <Box fontWeight="fontWeightMedium" display="inline">Años experiencia requeridos:</Box>
            {' '}
            {`${requestData.yearsExperience} años` || '-'}
          </Typography>
          <Typography variant="caption" component="div">
            <Box fontWeight="fontWeightMedium" display="inline">Requiere computador:</Box>
            {' '}
            {requestData.requiresComputer ? 'Sí' : 'No' || '-'}
          </Typography>
        </div>
        <Formik
          innerRef={formRef}
          initialValues={formSchema}
          validationSchema={ValidationSchema}
          onSubmit={(values) => {
            publishJobOffer({
              variables: {
                createJobOfferId: requestData.id,
                createJobOfferDescription: values.description,
                createJobOfferQuestions: [values.question_1,
                  values.question_2,
                  values.question_3,
                  values.question_4,
                  values.question_5].slice(0, questionQuantity),
              },
              refetchQueries: [
                { query: RECRUITMENT_PROCESS_INDEX_QUERY as DocumentNode },
              ],
            })
              .then(() => {
                // eslint-disable-next-line @typescript-eslint/no-floating-promises
                redirectOnSubmit();
              })
              .catch((mutErr) => { throw (mutErr); });
          }}
        >
          {({
            values,
            handleChange,
            handleBlur,
            setFieldValue,
            touched,
            errors,
          }) => (
            <Form style={{ textAlign: 'center' }}>
              <FormControl
                className={classes.formControl}
                error={touched.SLA_1 as boolean && Boolean(errors.SLA_1)}
              >
                <InputLabel shrink className={classes.labelText} id="SLA_1-label">SLA inicio</InputLabel>
                <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>
                  <KeyboardDatePicker
                    margin="normal"
                    id="SLA_1"
                    name="SLA_1"
                    cancelLabel="Cancelar"
                    format="dd/MM/yyyy"
                    value={values.SLA_1}
                    onChange={(value) => setFieldValue('SLA_1', value)}
                    KeyboardButtonProps={{
                      'aria-label': 'cambiar fecha',
                    }}
                    FormHelperTextProps={{ className: classes.helperText }}
                    error={touched.SLA_1 as boolean && Boolean(errors.SLA_1)}
                    helperText={touched.SLA_1 ? errors.SLA_1 : ''}
                  />

                </MuiPickersUtilsProvider>

              </FormControl>
              <FormControl
                className={classes.formControl}
                error={touched.SLA_2 as boolean && Boolean(errors.SLA_2)}
              >
                <InputLabel shrink className={classes.labelText} id="SLA_2-label">SLA fin</InputLabel>
                <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>
                  <KeyboardDatePicker
                    margin="normal"
                    id="SLA_1"
                    name="SLA_1"
                    cancelLabel="Cancelar"
                    format="dd/MM/yyyy"
                    value={values.SLA_2}
                    onChange={(value) => setFieldValue('SLA_2', value)}
                    onBlur={handleBlur}
                    KeyboardButtonProps={{
                      'aria-label': 'cambiar fecha',
                    }}
                    FormHelperTextProps={{ className: classes.helperText }}
                    error={touched.SLA_2 as boolean && Boolean(errors.SLA_2)}
                    helperText={touched.SLA_2 ? errors.SLA_2 : ''}
                  />

                </MuiPickersUtilsProvider>

              </FormControl>

              <TextField
                className={classes.questionField}
                label="Descripción"
                margin="normal"
                multiline
                rows={3}
                variant="outlined"
                id="description"
                name="description"
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
                inputProps={{ style: { fontSize: 'small' } }}
                error={touched.description && Boolean(errors.description)}
                helperText={touched.description ? errors.description : ''}
                FormHelperTextProps={{ className: classes.helperText }}
              />

              <TextField
                className={classes.questionField}
                label="Pregunta 1"
                id="question_1"
                name="question_1"
                placeholder="Ingrese la primera pregunta para el postulante"
                variant="outlined"
                value={values.question_1}
                onChange={handleChange}
                inputProps={{ style: { fontSize: 'small' } }}
                error={touched.question_1 && Boolean(errors.question_1)}
                helperText={touched.question_1 ? errors.question_1 : ''}
                FormHelperTextProps={{ className: classes.helperText }}
              />

              {[values.question_1,
                values.question_2,
                values.question_3,
                values.question_4,
                values.question_5].slice(1, questionQuantity).map((handler, index) => (
                  <TextField
                    key={`question_${index + 2}`}
                    className={classes.questionField}
                    label={`Pregunta ${index + 2}`}
                    id={`question_${index + 2}`}
                    name={`question_${index + 2}`}
                    placeholder={`Ingrese la ${index + 2}° pregunta para el postulante`}
                    variant="outlined"
                    value={handler}
                    onChange={handleChange}
                    inputProps={{ style: { fontSize: 'small' } }}
                  />
              ))}
              <div ref={scrollRef} style={{ display: 'grid', justifyContent: 'center', gridAutoFlow: 'column' }}>

                <IconButton
                  disabled={(questionQuantity === 5 || [values.question_1,
                    values.question_2,
                    values.question_3,
                    values.question_4,
                    values.question_5][questionQuantity - 1] === '')}
                  aria-label="add question"
                  onClick={() => {
                    if (
                      [values.question_1,
                        values.question_2,
                        values.question_3,
                        values.question_4,
                        values.question_5][questionQuantity - 1] !== '') {
                      handleAddQuestions();
                    }
                  }}
                >
                  <AddCircle style={{
                    color: ((questionQuantity === 5 || [values.question_1,
                      values.question_2,
                      values.question_3,
                      values.question_4,
                      values.question_5][questionQuantity - 1] === '') ? 'grey' : 'green'),
                  }}
                  />
                </IconButton>
                <IconButton disabled={(questionQuantity === 1)} aria-label="remove question" onClick={handleRemoveQuestions}>
                  <RemoveCircle style={{ color: (questionQuantity === 1 ? 'grey' : 'red') }} />
                </IconButton>
              </div>
            </Form>
          )}
        </Formik>
        <Hidden lgUp>
          <Button
            className={classes.button}
            variant="contained"
            color="secondary"
            disabled={mutationLoading}
            onClick={() => {
              if (scrollRef.current) {
                scrollRef.current.scrollIntoView({ behavior: 'smooth' });
              }
              if (formRef.current) {
                formRef.current.handleSubmit();
              }
            }}
          >
            Publicar oferta laboral
            {' '}
            {mutationLoading && <CircularProgress size={15} />}
            {mutationError && <Cancel color="error" />}
          </Button>
          <Button className={classes.button} onClick={() => router.push('/recruitment-process/')} color="secondary">
            Cancelar
          </Button>
        </Hidden>

      </Grid>
      <Hidden mdDown>
        <Grid
          item
          className={classes.gridItem}
          md={3}
          component={Paper}

        >
          <h3>Vista previa</h3>
          <div style={{
            height: '460px',
            display: 'grid',
            justifyContent: 'center',
            textAlign: 'center',
            placeItems: 'center',
          }}
          >
            <SamplePostedApplicationCard
              jobOffer={requestData}
            />

          </div>

          <Button
            className={classes.button}
            variant="contained"
            color="secondary"
            disabled={mutationLoading}
            onClick={() => {
              if (scrollRef.current) {
                scrollRef.current.scrollIntoView({ behavior: 'smooth' });
              }
              if (formRef.current) {
                formRef.current.handleSubmit();
              }
            }}
          >
            Publicar oferta laboral
            {' '}
            {mutationLoading && <CircularProgress size={15} />}
            {mutationError && <Cancel color="error" />}
          </Button>
          <Button className={classes.button} onClick={() => router.push('/recruitment-process/')} color="secondary">
            Cancelar
          </Button>

        </Grid>
      </Hidden>
    </Grid>

  );
}
