import React, { RefObject } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Formik, Form, FormikProps } from 'formik';
import * as Yup from 'yup';
import {
  TextField, Select, FormControl, InputLabel, MenuItem, FormHelperText,
} from '@material-ui/core';
import { CreateRequestTypeString } from '../types/create-request-string-types';

const SignupSchema = Yup.object().shape({
  serviceType: Yup.string()
    .required('Ingrese tipo de servicio'),
  possibleDuration: Yup.string()
    .required('Ingrese duración de servicio'),
  requiresComputer: Yup.string()
    .required('Ingrese si requiere computador'),
  requiresTechnical: Yup.string()
    .required('Ingrese si requiere aplicación de prueba técnica'),
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
    height: theme.spacing(2.5),
  },
  helperText: {
    fontSize: 'x-small',
    margin: 0,
    padding: 0,
    height: 0,
  },
}));

interface HiringInfoProps {
  formRef: RefObject<FormikProps<CreateRequestTypeString>>,
  formSchema: CreateRequestTypeString,
  handleNext: ()=> void
}

export default function HiringInfo(props: HiringInfoProps): JSX.Element {
  const {
    formRef, formSchema, handleNext,
  } = props;
  const classes = useStyles();

  return (
    <>

      <Formik
        innerRef={formRef}
        initialValues={formSchema}
        validationSchema={SignupSchema}
        onSubmit={(values) => {
          formSchema.serviceType = values.serviceType;
          formSchema.possibleDuration = values.possibleDuration;
          formSchema.requiresComputer = values.requiresComputer;
          formSchema.requiresTechnical = values.requiresTechnical;
          handleNext();
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
              error={touched.serviceType as boolean && Boolean(errors.serviceType)}
            >
              <InputLabel className={classes.labelText} id="serviceType-label">Tipo de servicio</InputLabel>
              <Select
                labelId="serviceType-label"
                id="serviceType"
                name="serviceType"
                value={values.serviceType}
                onBlur={handleBlur}
                onChange={handleChange}
                inputProps={{ className: classes.inputText }}
              >
                <MenuItem value="INTERNO">Interno</MenuItem>
                <MenuItem value="OUTSOURCING">Outsourcing</MenuItem>
                <MenuItem value="TRANSITORIOS">Servicios Transitorios</MenuItem>
                <MenuItem value="SELECCION">Selección</MenuItem>
              </Select>
              <FormHelperText className={classes.helperText}>{touched.serviceType ? errors.serviceType : ''}</FormHelperText>

            </FormControl>

            <FormControl
              className={classes.formControl}
              error={touched.possibleDuration as boolean && Boolean(errors.possibleDuration)}
            >
              <InputLabel className={classes.labelText} shrink={!!values.possibleDuration} id="possibleDuration-label">Duración de servicio</InputLabel>
              <TextField
                margin="normal"
                value={values.possibleDuration}
                id="possibleDuration"
                name="possibleDuration"
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.possibleDuration as boolean && Boolean(errors.possibleDuration)}
                helperText={touched.possibleDuration ? errors.possibleDuration : ''}
                FormHelperTextProps={{ className: classes.helperText }}
                inputProps={{ className: classes.inputText }}
              />
            </FormControl>

            <FormControl
              className={classes.formControl}
              error={touched.requiresComputer as boolean && Boolean(errors.requiresComputer)}
            >
              <InputLabel className={classes.labelText} id="requiresComputer-label">Requiere computador</InputLabel>
              <Select
                labelId="requiresComputer-label"
                id="requiresComputer"
                name="requiresComputer"
                value={values.requiresComputer}
                onBlur={handleBlur}
                onChange={handleChange}
                inputProps={{ className: classes.inputText }}
              >
                <MenuItem value="SI">Sí</MenuItem>
                <MenuItem value="NO">No</MenuItem>
              </Select>
              <FormHelperText className={classes.helperText}>{touched.requiresComputer ? errors.requiresComputer : ''}</FormHelperText>

            </FormControl>
            <FormControl
              className={classes.formControl}
              error={touched.requiresTechnical as boolean && Boolean(errors.requiresTechnical)}
            >
              <InputLabel className={classes.labelText} id="requiresTechnical-label">¿Requiere aplicación de prueba técnica?</InputLabel>
              <Select
                labelId="requiresTechnical-label"
                id="requiresTechnical"
                name="requiresTechnical"
                value={values.requiresTechnical}
                onBlur={handleBlur}
                onChange={handleChange}
                inputProps={{ className: classes.inputText }}
              >
                <MenuItem value="SI">Sí</MenuItem>
                <MenuItem value="NO">No</MenuItem>
              </Select>
              <FormHelperText className={classes.helperText}>{touched.requiresTechnical ? errors.requiresTechnical : ''}</FormHelperText>

            </FormControl>

          </Form>

        )}
      </Formik>
    </>
  );
}
