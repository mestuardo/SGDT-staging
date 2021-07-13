import React, { RefObject } from 'react';
import 'date-fns';
import { Formik, Form, FormikProps } from 'formik';
import * as Yup from 'yup';

import {
  TextField,
  FormControl,
  InputLabel,
} from '@material-ui/core';

import requiredProfileInfoStyles from './styles/2_required_profile_info_styles';
import { CreateRequestTypeString } from '../../types/create-request-string-types';
import theme from '../../theme';

// Form validation Schema
const ValidationSchema = Yup.object().shape({

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

});

interface RequiredProfileInfoProps {
  formRef: RefObject<FormikProps<CreateRequestTypeString>>,
  formSchema: CreateRequestTypeString,
  handleNext: () => void,
  updatePreviewCardContent: (formSchema:CreateRequestTypeString) => void
}

export default function RequiredProfileInfo(props: RequiredProfileInfoProps) : JSX.Element {
  const {
    formRef,
    formSchema,
    handleNext,
    updatePreviewCardContent,
  } = props;
  const classes = requiredProfileInfoStyles();

  return (
    <>

      <Formik
        innerRef={formRef}
        initialValues={formSchema}
        validationSchema={ValidationSchema}
        onSubmit={(values) => {
          formSchema.requestDescription = values.requestDescription;
          formSchema.technicalRequirements = values.technicalRequirements;
          formSchema.specialRequirements = values.specialRequirements;
          formSchema.languages = values.languages;
          formSchema.softSkills = values.softSkills;

          handleNext();
          updatePreviewCardContent(values);
        }}
      >
        {({
          values,
          handleChange,
          handleBlur,
          touched,
          errors,
        }) => (
          <Form>

            <FormControl
              className={classes.formControl}
              error={touched.softSkills && Boolean(errors.softSkills)}
              style={{ width: 200, margin: theme.spacing(1) }}
            >
              <InputLabel className={classes.labelText} shrink={!!values.softSkills} id="softSkills-label">Habilidades blandas</InputLabel>
              <TextField
                margin="normal"
                multiline
                rows={3}
                value={values.softSkills}
                onChange={handleChange}
                onBlur={handleBlur}
                id="softSkills"
                name="softSkills"
                error={touched.softSkills && Boolean(errors.softSkills)}
                helperText={touched.softSkills ? errors.softSkills : 'Separadas por comas'}
                FormHelperTextProps={{ className: classes.helperText }}
                inputProps={{ className: classes.inputText }}
              />
            </FormControl>

            <FormControl
              className={classes.formControl}
              error={touched.requestDescription && Boolean(errors.requestDescription)}
              style={{ width: 200, margin: theme.spacing(1) }}
            >
              <InputLabel className={classes.labelText} shrink={!!values.requestDescription} id="requestDescription-label">Funciones del cargo</InputLabel>
              <TextField
                margin="normal"
                value={values.requestDescription}
                onChange={handleChange}
                onBlur={handleBlur}
            // fullWidth
                multiline
                rows={3}
                id="requestDescription"
                name="requestDescription"
            // autoFocus
                error={touched.requestDescription && Boolean(errors.requestDescription)}
                helperText={touched.requestDescription ? errors.requestDescription : 'Separadas por comas'}
                FormHelperTextProps={{ className: classes.helperText }}
                inputProps={{ className: classes.textAreaText }}
              />
            </FormControl>

            <FormControl
              className={classes.formControl}
              error={touched.technicalRequirements
                && Boolean(errors.technicalRequirements)}
              style={{ width: 200, margin: theme.spacing(1) }}
            >
              <InputLabel className={classes.labelText} shrink={!!values.technicalRequirements} id="technicalRequirements-label">Requisitos técnicos</InputLabel>
              <TextField
                margin="normal"
                multiline
                rows={3}
                value={values.technicalRequirements}
                onChange={handleChange}
                onBlur={handleBlur}
            // fullWidth
                id="technicalRequirements"
                name="technicalRequirements"
            // autoFocus
                error={touched.technicalRequirements
                  && Boolean(errors.technicalRequirements)}
                helperText={touched.technicalRequirements ? errors.technicalRequirements : 'Separados por comas'}
                FormHelperTextProps={{ className: classes.helperText }}
                inputProps={{ className: classes.textAreaText }}
              />
            </FormControl>

            <FormControl
              className={classes.formControl}
              error={touched.specialRequirements && Boolean(errors.specialRequirements)}
              style={{ width: 200, margin: theme.spacing(1) }}
            >
              <InputLabel className={classes.labelText} shrink={!!values.specialRequirements} id="specialRequirements-label">Requerimientos especiales</InputLabel>
              <TextField
                margin="normal"
                multiline
                rows={3}
                value={values.specialRequirements}
                onChange={handleChange}
                onBlur={handleBlur}
            // fullWidth
                id="specialRequirements"
                name="specialRequirements"
            // autoFocus
                error={touched.specialRequirements
                  && Boolean(errors.specialRequirements)}
                helperText={touched.specialRequirements ? errors.specialRequirements : 'Separados por comas'}
                FormHelperTextProps={{ className: classes.helperText }}
                inputProps={{ className: classes.textAreaText }}
              />
            </FormControl>

          </Form>
        )}
      </Formik>
    </>

  );
}
