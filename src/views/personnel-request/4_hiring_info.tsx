import React, { RefObject } from 'react';
import { Formik, Form, FormikProps } from 'formik';
import * as Yup from 'yup';
import {
  TextField,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  FormHelperText,
} from '@material-ui/core';

import hiringInfoStyles from './styles/4_hiring_info_styles';
import { CreateRequestTypeString } from '../../types/create-request-string-types';

const SignupSchema = Yup.object().shape({
  serviceType: Yup.string()
    .required('Ingrese tipo de servicio'),
  possibleDuration: Yup.string()
    .required('Ingrese duración de servicio'),
  requiresComputer: Yup.string()
    .required('Ingrese si requiere computador'),
});

interface HiringInfoProps {
  formRef: RefObject<FormikProps<CreateRequestTypeString>>,
  formSchema: CreateRequestTypeString,
  handleNext: () => void,
  updatePreviewCardContent: (formSchema:CreateRequestTypeString) => void
}

export default function HiringInfo(props: HiringInfoProps) : JSX.Element {
  const {
    formRef,
    formSchema,
    handleNext,
    updatePreviewCardContent,
  } = props;
  const classes = hiringInfoStyles();

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
              error={touched.serviceType && Boolean(errors.serviceType)}
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
              error={touched.possibleDuration && Boolean(errors.possibleDuration)}
            >
              <InputLabel className={classes.labelText} shrink={!!values.possibleDuration} id="possibleDuration-label">Duración de servicio</InputLabel>
              <TextField
                margin="normal"
                value={values.possibleDuration}
                id="possibleDuration"
                name="possibleDuration"
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.possibleDuration && Boolean(errors.possibleDuration)}
                helperText={touched.possibleDuration ? errors.possibleDuration : ''}
                FormHelperTextProps={{ className: classes.helperText }}
                inputProps={{ className: classes.inputText }}
              />
            </FormControl>

            <FormControl
              className={classes.formControl}
              error={touched.requiresComputer && Boolean(errors.requiresComputer)}
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
          </Form>

        )}
      </Formik>
    </>
  );
}
