import React, { RefObject } from 'react';
import 'date-fns';
import { Autocomplete, AutocompleteRenderInputParams } from '@material-ui/lab';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { Formik, Form, FormikProps } from 'formik';
import * as Yup from 'yup';
import NumberFormat from 'react-number-format';
// import PropTypes from 'prop-types';
import {
  Typography, TextField, Select, Checkbox, FormControl, InputLabel, MenuItem, FormHelperText,
} from '@material-ui/core';
import { CreateRequestTypeString } from '../types/create-request-string-types';

// Form validation Schema
const ValidationSchema = Yup.object().shape({
  position: Yup.string()
    .required('Ingrese el cargo requerido'),
  vacancies: Yup.string()
    .required('Ingrese el N° de vacantes'),
  yearsExperience: Yup.string()
    .required('Ingrese los años de experiencia requeridos'),
  requestDescription: Yup.string()
    .required('Ingrese las funciones del cargo'),
  technicalRequirements: Yup.string()
    .required('Ingrese los requisitos técnicos'),
  specialRequirements: Yup.string()
    .required('Ingrese los requerimientos especiales'),
  levelOfStudies: Yup.string()
    .required('Ingrese la formación académica'),
  formationStatus: Yup.string()
    .required('Ingrese el nivel de la formación'),
  softSkills: Yup.string()
    .required('Ingrese habilidades blandas'),
  maxSalary: Yup.string()
    .required('Ingrese la renta máxima para contratación'),

});

const useStyles = makeStyles((theme: Theme) => createStyles({
  formControl: {
    margin: theme.spacing(1),
    width: 150,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  labelText: {
    fontSize: 'small',
  },
  inputText: {
    fontSize: 'small',
  },
  textAreaText: {
    fontSize: 'small',

  },
  helperText: {
    fontSize: 'x-small',
    margin: 0,
    padding: 0,
    height: 0,
  },
}));

interface RequiredProfileInfoProps {
  formRef: RefObject<FormikProps<CreateRequestTypeString>>,
  formSchema: CreateRequestTypeString,
  handleNext: ()=> void
}
// TODO: Adapt components according to the new formSchema
export default function RequiredProfileInfo(props: RequiredProfileInfoProps): JSX.Element {
  const {
    formRef, formSchema, handleNext,
  } = props;
  const classes = useStyles();
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
          formSchema.requestDescription = values.requestDescription;
          formSchema.technicalRequirements = values.technicalRequirements;
          formSchema.specialRequirements = values.specialRequirements;
          formSchema.levelOfStudies = values.levelOfStudies;
          formSchema.formationStatus = values.formationStatus;
          formSchema.languages = values.languages;
          formSchema.softSkills = values.softSkills;
          formSchema.maxSalary = values.maxSalary;
          handleNext();
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
              error={touched.position as boolean && Boolean(errors.position)}
            >
              <InputLabel className={classes.labelText} shrink={!!values.position} id="position-label">Cargo requerido</InputLabel>
              <TextField
                margin="normal"
                value={values.position}
                onChange={handleChange}
                onBlur={handleBlur}
            // fullWidth
                id="position"
                name="position"
            // autoFocus
                error={touched.position as boolean && Boolean(errors.position)}
                helperText={touched.position ? errors.position : 'Máximo 30 caracteres'}
                FormHelperTextProps={{ className: classes.helperText }}
                inputProps={{ className: classes.textAreaText, maxLength: 30 }}
              />
            </FormControl>

            <FormControl
              className={classes.formControl}
              error={touched.vacancies as boolean && Boolean(errors.vacancies)}
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
              error={touched.yearsExperience as boolean
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
              error={touched.requestDescription as boolean && Boolean(errors.requestDescription)}
            >
              <InputLabel className={classes.labelText} shrink={!!values.requestDescription} id="requestDescription-label">Funciones del cargo</InputLabel>
              <TextField
                margin="normal"
                value={values.requestDescription}
                onChange={handleChange}
                onBlur={handleBlur}
            // fullWidth
                multiline
                rows={2}
                id="requestDescription"
                name="requestDescription"
            // autoFocus
                error={touched.requestDescription as boolean && Boolean(errors.requestDescription)}
                helperText={touched.requestDescription ? errors.requestDescription : ''}
                FormHelperTextProps={{ className: classes.helperText }}
                inputProps={{ className: classes.textAreaText }}
              />
            </FormControl>

            <FormControl
              className={classes.formControl}
              error={touched.technicalRequirements as boolean
                && Boolean(errors.technicalRequirements)}
            >
              <InputLabel className={classes.labelText} shrink={!!values.technicalRequirements} id="technicalRequirements-label">Requisitos técnicos</InputLabel>
              <TextField
                margin="normal"
                multiline
                rows={2}
                value={values.technicalRequirements}
                onChange={handleChange}
                onBlur={handleBlur}
            // fullWidth
                id="technicalRequirements"
                name="technicalRequirements"
            // autoFocus
                error={touched.technicalRequirements as boolean
                  && Boolean(errors.technicalRequirements)}
                helperText={touched.technicalRequirements ? errors.technicalRequirements : ''}
                FormHelperTextProps={{ className: classes.helperText }}
                inputProps={{ className: classes.textAreaText }}
              />
            </FormControl>

            <FormControl
              className={classes.formControl}
              error={touched.specialRequirements as boolean && Boolean(errors.specialRequirements)}
            >
              <InputLabel className={classes.labelText} shrink={!!values.specialRequirements} id="specialRequirements-label">Requerimientos especiales</InputLabel>
              <TextField
                margin="normal"
                multiline
                rows={2}
                value={values.specialRequirements}
                onChange={handleChange}
                onBlur={handleBlur}
            // fullWidth
                id="specialRequirements"
                name="specialRequirements"
            // autoFocus
                error={touched.specialRequirements as boolean
                  && Boolean(errors.specialRequirements)}
                helperText={touched.specialRequirements ? errors.specialRequirements : ''}
                FormHelperTextProps={{ className: classes.helperText }}
                inputProps={{ className: classes.textAreaText }}
              />
            </FormControl>

            <FormControl
              className={classes.formControl}
              error={touched.levelOfStudies as boolean
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
              error={touched.formationStatus as boolean
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

            {/* <FormControl
              className={classes.formControl}
              error={touched.languages && Boolean(errors.languages)}
            >
              <InputLabel className={classes.labelText} shrink={!!values.languages}
               id="languages-label">Idiomas</InputLabel>
              <TextField
                margin="normal"
                value={values.languages}
                onChange={handleChange}
                onBlur={handleBlur}
            // fullWidth
                id="languages"
                name="languages"
            // autoFocus
                error={touched.languages && Boolean(errors.languages)}
                helperText={touched.languages ? errors.languages : ''}
                FormHelperTextProps={{ className: classes.helperText }}
                inputProps={{ className: classes.inputText }}
              />
            </FormControl> */}

            <FormControl
              className={classes.formControl}
            >
              <Autocomplete
                multiple
                id="languages"
                options={[{
                  id: 'EN-A', label: 'Inglés - Avanzado', language: 'Inglés', level: 'Avanzado',
                }, {
                  id: 'EN-M', label: 'Inglés - Medio', language: 'Inglés', level: 'Medio',
                }, {
                  id: 'EN-B', label: 'Inglés - Básico', language: 'Inglés', level: 'Básico',
                }, {
                  id: 'FR-B', label: 'Francés - Básico', language: 'Francés', level: 'Básico',
                }, {
                  id: 'FR-M', label: 'Francés - Medio', language: 'Francés', level: 'Medio',
                }]}
                getOptionLabel={(option:{ id:string, label: string, language:string, level:string }) => `${option.label}`}
                getOptionSelected={(option, value) => option.id === value.id}
                // getOptionDisabled={(option) => otp}
                size="small"
                disableCloseOnSelect
                limitTags={1}
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
                    // fullWidth
                    id="languages"
                  />
                )}
              />
            </FormControl>

            <FormControl
              className={classes.formControl}
              error={touched.softSkills as boolean && Boolean(errors.softSkills)}
            >
              <InputLabel className={classes.labelText} shrink={!!values.softSkills} id="softSkills-label">Habilidades blandas</InputLabel>
              <TextField
                margin="normal"
                value={values.softSkills}
                onChange={handleChange}
                onBlur={handleBlur}
            // fullWidth
                id="softSkills"
                name="softSkills"
            // autoFocus
                error={touched.softSkills as boolean && Boolean(errors.softSkills)}
                helperText={touched.softSkills ? errors.softSkills : ''}
                FormHelperTextProps={{ className: classes.helperText }}
                inputProps={{ className: classes.inputText }}
              />
            </FormControl>

            <FormControl
              className={classes.formControl}
              error={touched.maxSalary as boolean && Boolean(errors.maxSalary)}
            >
              <NumberFormat
                // {...props}
                label="Renta máx. contratación"
                value={values.maxSalary}
                error={touched.maxSalary && Boolean(errors.maxSalary)}
                helperText={touched.maxSalary ? errors.maxSalary : ''}
                FormHelperTextProps={{ className: classes.helperText }}
                onValueChange={({ value: v }) => setFieldValue('maxSalary', v)}
                onBlur={handleBlur}
                customInput={TextField}
                // prefix="CLP$"
                InputLabelProps={{ className: classes.labelText }}
                InputProps={{
                  className: classes.inputText,
                  startAdornment: (
                    <Typography variant="body2">CLP$ </Typography>
                  ),
                }}
                type="text"
                thousandSeparator="."
                decimalSeparator=","
              />
            </FormControl>

          </Form>
        )}
      </Formik>
    </>

  );
}
