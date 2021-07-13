import React, { RefObject } from 'react';
import { Formik, Form, FormikProps } from 'formik';
import * as Yup from 'yup';
import {
  Checkbox,
  TextField,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  FormHelperText,
  Typography,
} from '@material-ui/core';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import NumberFormat from 'react-number-format';
import { Autocomplete, AutocompleteRenderInputParams } from '@material-ui/lab';
import { CreateRequestTypeString } from '../../types/create-request-string-types';
import languages from './languages_json';
import theme from '../../theme';
import clientInfoStyles from './styles/1_client_info_styles';

// Form validation Schema
const ValidationSchema = Yup.object().shape({
  position: Yup.string()
    .required('Ingrese el cargo requerido'),
  vacancies: Yup.string()
    .required('Ingrese el N° de vacantes'),
  yearsExperience: Yup.string()
    .required('Ingrese los años de experiencia requeridos'),
  client: Yup.string()
    .required('Ingrese al cliente'),
  recruiter: Yup.string()
    .required('Ingrese al reclutador'),
  maxSalary: Yup.string()
    .required('Ingrese la renta máxima para contratación'),

});

interface ClientInfoProps {
  formRef: RefObject<FormikProps<CreateRequestTypeString>>,
  formSchema: CreateRequestTypeString,
  handleNext: () => void,
  updatePreviewCardContent: (formSchema:CreateRequestTypeString) => void
}

export default function ClientInfo(props: ClientInfoProps) : JSX.Element {
  const {
    formRef,
    formSchema,
    handleNext,
    updatePreviewCardContent,
  } = props;
  const classes = clientInfoStyles();
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  return (
    <>

      <Formik
        innerRef={formRef}
        initialValues={formSchema}
        validationSchema={ValidationSchema}
        onSubmit={(values) => {
          formSchema.position = values.position;
          formSchema.vacancies = values.vacancies;
          formSchema.yearsExperience = values.yearsExperience;
          formSchema.client = values.client;
          formSchema.recruiter = values.recruiter;
          formSchema.externalRep = values.externalRep;
          formSchema.maxSalary = values.maxSalary;
          formSchema.levelOfStudies = values.levelOfStudies;
          formSchema.formationStatus = values.formationStatus;
          handleNext();
          updatePreviewCardContent(values);
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
          <Form>
            <FormControl
              className={classes.formControl}
              error={touched.position && Boolean(errors.position)}
            >
              <InputLabel className={classes.labelText} shrink={!!values.position} id="position-label">Cargo requerido</InputLabel>
              <TextField
                margin="normal"
                value={values.position}
                onChange={handleChange}
                onBlur={handleBlur}
                id="position"
                name="position"
                error={touched.position && Boolean(errors.position)}
                helperText={touched.position ? errors.position : 'Máximo 30 caracteres'}
                FormHelperTextProps={{ className: classes.helperText }}
                inputProps={{ maxLength: 30 }}
              />
            </FormControl>

            <FormControl
              className={classes.formControl}
              error={touched.vacancies && Boolean(errors.vacancies)}
            >
              <InputLabel className={classes.labelText} id="vacancies-label">Vacantes</InputLabel>
              <Select
                labelId="vacancies-label"
                id="vacancies"
                name="vacancies"
                value={values.vacancies}
                onChange={handleChange}
                onBlur={handleBlur}
                inputProps={{ className: classes.inputText }}
              >
                <MenuItem value="1">1</MenuItem>
                <MenuItem value="2">2</MenuItem>
                <MenuItem value="3">3</MenuItem>
                <MenuItem value="4">4</MenuItem>
                <MenuItem value="5">5+</MenuItem>
              </Select>
              <FormHelperText className={classes.helperText}>{touched.vacancies ? errors.vacancies : ''}</FormHelperText>
            </FormControl>

            <FormControl
              className={classes.formControl}
              error={touched.yearsExperience
                && Boolean(errors.yearsExperience)}
            >
              <InputLabel className={classes.labelText} id="yearsExperience-label">Experiencia (Años)</InputLabel>
              <Select
                labelId="yearsExperience-label"
                id="yearsExperience"
                name="yearsExperience"
                value={values.yearsExperience}
                onChange={handleChange}
                onBlur={handleBlur}
                inputProps={{ className: classes.inputText }}
              >
                <MenuItem value="1">1</MenuItem>
                <MenuItem value="2">2</MenuItem>
                <MenuItem value="3">3</MenuItem>
                <MenuItem value="4">4</MenuItem>
                <MenuItem value="5">5+</MenuItem>
              </Select>
              <FormHelperText className={classes.helperText}>{touched.yearsExperience ? errors.yearsExperience : ''}</FormHelperText>
            </FormControl>

            <FormControl
              className={classes.formControl}
              error={touched.levelOfStudies
                && Boolean(errors.levelOfStudies)}
            >
              <InputLabel className={classes.labelText} id="levelOfStudies-label">Nivel de estudios</InputLabel>
              <Select
                labelId="levelOfStudies-label"
                id="levelOfStudies"
                name="levelOfStudies"
                value={values.levelOfStudies}
                onChange={handleChange}
                onBlur={handleBlur}
                inputProps={{ className: classes.inputText }}
              >
                <MenuItem value="BASICA">Educación Básica</MenuItem>
                <MenuItem value="MEDIA">Educación Media</MenuItem>
                <MenuItem value="TECNICO">Formación Técnico-Profesional</MenuItem>
                <MenuItem value="UNIVERSITARIA">Educación Universitaria</MenuItem>
              </Select>
              <FormHelperText className={classes.helperText}>{touched.levelOfStudies ? errors.levelOfStudies : ''}</FormHelperText>
            </FormControl>

            <FormControl
              className={classes.formControl}
              error={touched.formationStatus
                && Boolean(errors.formationStatus)}
            >
              <InputLabel className={classes.labelText} id="formationStatus-label">Nivel de la formación</InputLabel>
              <Select
                labelId="formationStatus-label"
                id="formationStatus"
                name="formationStatus"
                value={values.formationStatus}
                onChange={handleChange}
                onBlur={handleBlur}
                inputProps={{ className: classes.inputText }}
              >
                <MenuItem value="COMPLETO">Completa</MenuItem>
                <MenuItem value="INCOMPLETO">Incompleta</MenuItem>
              </Select>
              <FormHelperText className={classes.helperText}>{touched.formationStatus ? errors.formationStatus : ''}</FormHelperText>
            </FormControl>

            <FormControl
              className={classes.formControl}
              error={touched.maxSalary && Boolean(errors.maxSalary)}
            >
              <NumberFormat
                id="maxSalary"
                name="maxSalary"
                label="Renta máx. contratación"
                value={values.maxSalary}
                error={touched.maxSalary && Boolean(errors.maxSalary)}
                helperText={touched.maxSalary ? errors.maxSalary : ''}
                FormHelperTextProps={{ className: classes.helperText }}
                onValueChange={({ value: v }) => setFieldValue('maxSalary', v)}
                onBlur={handleBlur}
                customInput={TextField}
                InputLabelProps={{ className: classes.labelText }}
                InputProps={{
                  startAdornment: (
                    <Typography variant="body2">
                      $
                      {' '}
                    </Typography>
                  ),
                }}
                type="text"
                thousandSeparator="."
                decimalSeparator=","
                allowNegative={false}
              />

            </FormControl>

            <FormControl
              className={classes.formControl}
              error={touched.recruiter && Boolean(errors.client)}
            >
              <InputLabel className={classes.labelText} shrink={!!values.client} id="recruiter-label">Cliente</InputLabel>
              <TextField
                margin="normal"
                value={values.client}
                onChange={handleChange}
                onBlur={handleBlur}
                id="client"
                name="client"
                error={touched.client && Boolean(errors.client)}
                helperText={touched.client ? errors.client : ''}
                FormHelperTextProps={{ className: classes.helperText }}
              />
            </FormControl>

            <FormControl
              className={classes.formControl}
              error={touched.recruiter && Boolean(errors.recruiter)}
            >
              <InputLabel className={classes.labelText} shrink={!!values.recruiter} id="recruiter-label">Reclutador</InputLabel>
              <TextField
                margin="normal"
                value={values.recruiter}
                onChange={handleChange}
                onBlur={handleBlur}
                id="recruiter"
                name="recruiter"
                error={touched.recruiter && Boolean(errors.recruiter)}
                helperText={touched.recruiter ? errors.recruiter : ''}
                FormHelperTextProps={{ className: classes.helperText }}
              />
            </FormControl>
            <FormControl
              className={classes.formControl}
              style={{ width: 200, margin: theme.spacing(1) }}
            >
              <Autocomplete
                multiple
                id="languages"
                options={languages}
                getOptionLabel={(option:{ id:string, label: string, language:string, level:string }) => `${option.label}`}
                getOptionSelected={(option, value) => option.id === value.id}
                size="small"
                disableCloseOnSelect
                limitTags={3}
                value={values.languages}
                onChange={(e, value) => setFieldValue('languages', value)}
                renderOption={(option, { selected }) => (
                  <>
                    <Checkbox
                      icon={icon}
                      checkedIcon={checkedIcon}
                      style={{ marginRight: 8 }}
                      checked={selected}
                    />
                    {option.label}
                  </>
                )}
                renderInput={(params: AutocompleteRenderInputParams) => (
                  <TextField
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...params}
                    name="languages"
                    size="small"
                    variant="standard"
                    label={<Typography variant="caption">Idiomas</Typography>}
                    placeholder="Seleccione..."
                    id="languages"
                  />
                )}
              />
            </FormControl>

          </Form>
        )}
      </Formik>
    </>

  );
}
