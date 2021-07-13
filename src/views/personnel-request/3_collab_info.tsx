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
  contractType: Yup.string()
    .required('Ingrese tipo de contrato'),
  shiftType: Yup.string()
    .required('Ingrese el tipo de jornada laboral'),
  workAdress: Yup.string()
    .required('Ingrese la dirección laboral'),

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
          formSchema.approxStartDate = values.approxStartDate;
          formSchema.contractType = values.contractType;
          formSchema.shiftType = values.shiftType;
          formSchema.workAdress = values.workAdress;
          handleNext();
          updatePreviewCardContent(values);
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
              error={touched.contractType && Boolean(errors.contractType)}
            >
              <InputLabel className={classes.labelText} id="contractType-label">Tipo de contrato</InputLabel>
              <Select
                labelId="contractType-label"
                id="contractType"
                name="contractType"
                value={values.contractType}
                onChange={handleChange}
                onBlur={handleBlur}
                inputProps={{ className: classes.inputText }}
              >
                <MenuItem value="FIJO">Fijo</MenuItem>
                <MenuItem value="INDEFINIDO">Indefinido</MenuItem>
              </Select>
              <FormHelperText className={classes.helperText}>{touched.contractType ? errors.contractType : ''}</FormHelperText>

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
                <MenuItem value="FREELANCER">Freelancer</MenuItem>
              </Select>
              <FormHelperText className={classes.helperText}>{touched.shiftType ? errors.shiftType : ''}</FormHelperText>
            </FormControl>

            <FormControl
              className={classes.formControl}
              error={touched.workAdress && Boolean(errors.workAdress)}
            >
              <InputLabel className={classes.labelText} shrink={!!values.workAdress} id="workAdress-label">Dirección laboral</InputLabel>
              <TextField
                margin="normal"
                value={values.workAdress}
                onChange={handleChange}
                onBlur={handleBlur}
                id="workAdress"
                name="workAdress"
                error={touched.workAdress && Boolean(errors.workAdress)}
                helperText={touched.workAdress ? errors.workAdress : ''}
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
