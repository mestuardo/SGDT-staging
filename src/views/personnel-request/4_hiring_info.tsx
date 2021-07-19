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
  Typography,
} from '@material-ui/core';
import NumberFormat from 'react-number-format';
import hiringInfoStyles from './styles/4_hiring_info_styles';
import { CreateRequestTypeString } from '../../types/create-request-string-types';

const SignupSchema = Yup.object().shape({
  contractType_1: Yup.string()
    .required('Ingrese tipo de contrato'),
  possibleDuration_1: Yup.string()
    .when('contractType', {
      is: 'FIXED',
      then: Yup.string().required('Ingrese duración de servicio'),
    }),
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
          updatePreviewCardContent(values);
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
            <div style={{ width: '100%' }}>
              <FormControl
                className={classes.formControl}
                error={touched.contractType_1 && Boolean(errors.contractType_1)}
              >
                <InputLabel className={classes.labelText} id="contractType-label">Tipo de contrato 1</InputLabel>
                <Select
                  labelId="contractType-label"
                  id="contractType_1"
                  name="contractType_1"
                  value={values.contractType_1}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  inputProps={{ className: classes.inputText }}
                >
                  <MenuItem value="FIXED">Fijo</MenuItem>
                  <MenuItem value="INDEFINITE">Indefinido</MenuItem>
                </Select>
                <FormHelperText className={classes.helperText}>{touched.contractType_1 ? errors.contractType_1 : ''}</FormHelperText>

              </FormControl>
              <FormControl
                className={classes.formControl}
                error={touched.maxSalary && Boolean(errors.maxSalary)}
              >
                <NumberFormat
                  id="possibleDuration_1"
                  name="possibleDuration_1"
                  label="Duración servicio"
                  value={values.possibleDuration_1}
                  error={touched.possibleDuration_1 && Boolean(errors.possibleDuration_1)}
                  helperText={touched.possibleDuration_1 ? errors.possibleDuration_1 : ''}
                  FormHelperTextProps={{ className: classes.helperText }}
                  onValueChange={({ value: v }) => setFieldValue('possibleDuration_1', v)}
                  onBlur={handleBlur}
                  customInput={TextField}
                  disabled={values.contractType_1 === 'INDEFINITE' || values.contractType_1 === ''}
                  InputLabelProps={{
                    className: classes.labelText,
                    shrink: true,
                  }}
                  InputProps={{
                    endAdornment: (
                      <Typography variant="body2">
                        meses
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
            </div>
            {values.contractType_1 === 'FIXED' ? (
              <div style={{ width: '100%' }}>
                <FormControl
                  className={classes.formControl}
                >
                  <InputLabel className={classes.labelText} id="contractType-label">Tipo de contrato 2</InputLabel>
                  <Select
                    labelId="contractType-label"
                    id="contractType_2"
                    name="contractType_2"
                    value={values.contractType_2}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    inputProps={{ className: classes.inputText }}
                  >
                    <MenuItem value="FIXED">Fijo</MenuItem>
                    <MenuItem value="INDEFINITE">Indefinido</MenuItem>
                  </Select>
                  <FormHelperText className={classes.helperText}>{' '}</FormHelperText>

                </FormControl>
                <FormControl
                  className={classes.formControl}
                >
                  <NumberFormat
                    id="possibleDuration_1"
                    name="possibleDuration_1"
                    label="Duración servicio"
                    value={values.possibleDuration_2}
                    error={touched.possibleDuration_2 && Boolean(errors.possibleDuration_2)}
                    helperText={touched.possibleDuration_2 ? errors.possibleDuration_2 : ''}
                    FormHelperTextProps={{ className: classes.helperText }}
                    onValueChange={({ value: v }) => setFieldValue('possibleDuration_2', v)}
                    onBlur={handleBlur}
                    customInput={TextField}
                    disabled={values.contractType_2 === 'INDEFINITE' || values.contractType_2 === ''}
                    InputLabelProps={{
                      className: classes.labelText,
                      shrink: true,
                    }}
                    InputProps={{
                      endAdornment: (
                        <Typography variant="body2">
                          meses
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
              </div>
            ) : null}
            {(values.contractType_1 === 'FIXED' && values.contractType_2 === 'FIXED') ? (
              <div style={{ width: '100%' }}>
                <FormControl
                  className={classes.formControl}
                >
                  <InputLabel className={classes.labelText} id="contractType_2-label">Tipo de contrato 3</InputLabel>
                  <Select
                    labelId="contractType-label"
                    id="contractType_3"
                    name="contractType_3"
                    value={values.contractType_3}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    inputProps={{ className: classes.inputText }}
                  >
                    <MenuItem value="FIXED">Fijo</MenuItem>
                    <MenuItem value="INDEFINITE">Indefinido</MenuItem>
                  </Select>
                  <FormHelperText className={classes.helperText}>{' '}</FormHelperText>

                </FormControl>
                <FormControl
                  className={classes.formControl}
                >
                  <NumberFormat
                    id="possibleDuration_3"
                    name="possibleDuration_3"
                    label="Duración servicio"
                    value={values.possibleDuration_3}
                    error={touched.possibleDuration_3 && Boolean(errors.possibleDuration_3)}
                    helperText={touched.possibleDuration_3 ? errors.possibleDuration_3 : ''}
                    FormHelperTextProps={{ className: classes.helperText }}
                    onValueChange={({ value: v }) => setFieldValue('possibleDuration_3', v)}
                    onBlur={handleBlur}
                    customInput={TextField}
                    disabled={values.contractType_3 === 'INDEFINITE' || values.contractType_3 === ''}
                    InputLabelProps={{
                      className: classes.labelText,
                      shrink: true,
                    }}
                    InputProps={{
                      endAdornment: (
                        <Typography variant="body2">
                          meses
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
              </div>
            ) : null}

            <FormControl
              className={classes.formControl}
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
              <FormHelperText className={classes.helperText}>{' '}</FormHelperText>

            </FormControl>
          </Form>

        )}
      </Formik>
    </>
  );
}
