import React, { RefObject } from 'react';
import * as Yup from 'yup';
import { Formik, Form, FormikProps } from 'formik';
import {
  TextField,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  FormHelperText,
  Typography,
} from '@material-ui/core';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import esLocale from 'date-fns/locale/es';
import collabInfoStyles from './styles/3_collab_info_styles';
import { CreateRequestTypeString } from '../../types/create-request-string-types';

const SignupSchema = Yup.object().shape({
  serviceType: Yup.string()
    .required('Ingrese tipo de contrato'),
  shiftType: Yup.string()
    .required('Ingrese el tipo de jornada laboral'),
  workAdress_city: Yup.string()
    .required('Ingrese ka ciudad'),
  workAdress_district: Yup.string()
    .required('Ingrese la comuna'),
  workAdress_street: Yup.string()
    .required('Ingrese la calle'),
  workAdress_number: Yup.string()
    .required('Ingrese el número'),

});

interface CollabInfoProps {
  formRef: RefObject<FormikProps<CreateRequestTypeString>>,
  formSchema: CreateRequestTypeString,
  handleNext: () => void,
  updatePreviewCardContent: (formSchema:CreateRequestTypeString) => void
}

export default function CollabInfo(props: CollabInfoProps) : JSX.Element {
  const {
    formRef,
    formSchema,
    handleNext,
    updatePreviewCardContent,
  } = props;
  const classes = collabInfoStyles();

  return (
    <>

      <Formik
        innerRef={formRef}
        initialValues={formSchema}
        validationSchema={SignupSchema}
        onSubmit={(values) => {
          updatePreviewCardContent(values);
          handleNext();
        }}
      >
        {({
          values,
          setFieldValue,
          handleChange,
          handleBlur,
          touched,
          errors,
        }) => (
          <Form>
            <FormControl
              className={classes.formControl}
              error={touched.approxStartDate as boolean && Boolean(errors.approxStartDate)}
            >
              <InputLabel shrink className={classes.labelText} id="approxStartDate-label">Fecha de ingreso</InputLabel>
              <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>
                <KeyboardDatePicker
                  margin="normal"
                  id="approxStartDate"
                  cancelLabel="Cancelar"
                  format="dd/MM/yyyy"
                  value={values.approxStartDate}
                  onChange={(value) => setFieldValue('approxStartDate', value)}
                  KeyboardButtonProps={{
                    'aria-label': 'cambiar fecha',
                  }}
                  FormHelperTextProps={{ className: classes.helperText }}
                />

              </MuiPickersUtilsProvider>

            </FormControl>

            <FormControl
              className={classes.formControl}
              error={touched.shiftType && Boolean(errors.shiftType)}
            >
              <InputLabel className={classes.labelText} id="shiftType-label">Jornada laboral</InputLabel>
              <Select
                labelId="shiftType-label"
                id="shiftType"
                name="shiftType"
                value={values.shiftType}
                onChange={handleChange}
                onBlur={handleBlur}
                inputProps={{ className: classes.inputText }}
              >
                <MenuItem value="PART_TIME">Part-Time</MenuItem>
                <MenuItem value="FULL_TIME">Full-Time</MenuItem>
                <MenuItem value="FREELANCE">Freelancer</MenuItem>
              </Select>
              <FormHelperText className={classes.helperText}>{touched.shiftType ? errors.shiftType : ''}</FormHelperText>
            </FormControl>
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
                <MenuItem value="INTERNAL">Interno</MenuItem>
                <MenuItem value="OUTSOURCING">Outsourcing</MenuItem>
                <MenuItem value="OUTSOURCING_TRANSITORY">Servicios Transitorios</MenuItem>
                <MenuItem value="OUTSOURCING_SELECTION">Selección</MenuItem>
              </Select>
              <FormHelperText className={classes.helperText}>{touched.serviceType ? errors.serviceType : ''}</FormHelperText>

            </FormControl>
            <Typography variant="body2" style={{ marginTop: '10px' }}>Dirección laboral</Typography>
            <FormControl
              className={classes.formControl}
              error={touched.workAdress_city && Boolean(errors.workAdress_city)}
            >
              <InputLabel className={classes.labelText} shrink={!!values.workAdress_city} id="workAdress_city-label">Ciudad</InputLabel>
              <TextField
                margin="normal"
                value={values.workAdress_city}
                onChange={handleChange}
                onBlur={handleBlur}
                id="workAdress_city"
                name="workAdress_city"
                error={touched.workAdress_city && Boolean(errors.workAdress_city)}
                helperText={touched.workAdress_city ? errors.workAdress_city : ''}
                FormHelperTextProps={{ className: classes.helperText }}
                inputProps={{ className: classes.inputText }}
              />
            </FormControl>
            <FormControl
              className={classes.formControl}
              error={touched.workAdress_district && Boolean(errors.workAdress_district)}
            >
              <InputLabel
                className={classes.labelText}
                shrink={!!values.workAdress_district}
                id="workAdress_district-label"
              >
                Comuna

              </InputLabel>
              <TextField
                margin="normal"
                value={values.workAdress_district}
                onChange={handleChange}
                onBlur={handleBlur}
                id="workAdress_district"
                name="workAdress_district"
                error={touched.workAdress_district && Boolean(errors.workAdress_district)}
                helperText={touched.workAdress_district ? errors.workAdress_district : ''}
                FormHelperTextProps={{ className: classes.helperText }}
                inputProps={{ className: classes.inputText }}
              />
            </FormControl>
            <FormControl
              className={classes.formControl}
              error={touched.workAdress_street && Boolean(errors.workAdress_street)}
            >
              <InputLabel
                className={classes.labelText}
                shrink={!!values.workAdress_street}
                id="workAdress_street-label"
              >
                Calle

              </InputLabel>
              <TextField
                margin="normal"
                value={values.workAdress_street}
                onChange={handleChange}
                onBlur={handleBlur}
                id="workAdress_street"
                name="workAdress_street"
                error={touched.workAdress_street && Boolean(errors.workAdress_street)}
                helperText={touched.workAdress_street ? errors.workAdress_street : ''}
                FormHelperTextProps={{ className: classes.helperText }}
                inputProps={{ className: classes.inputText }}
              />
            </FormControl>
            <FormControl
              className={classes.formControl}
              error={touched.workAdress_number && Boolean(errors.workAdress_number)}
            >
              <InputLabel
                className={classes.labelText}
                shrink={!!values.workAdress_number}
                id="workAdress_number-label"
              >
                Número/Letra

              </InputLabel>
              <TextField
                margin="normal"
                value={values.workAdress_number}
                onChange={handleChange}
                onBlur={handleBlur}
                id="workAdress_number"
                name="workAdress_number"
                error={touched.workAdress_number && Boolean(errors.workAdress_number)}
                helperText={touched.workAdress_number ? errors.workAdress_number : ''}
                FormHelperTextProps={{ className: classes.helperText }}
                inputProps={{ className: classes.inputText }}
              />
            </FormControl>

          </Form>
        )}
      </Formik>
    </>

  );
}
