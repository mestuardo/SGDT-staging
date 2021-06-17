import React, { RefObject } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Formik, Form, FormikProps } from 'formik';
import * as Yup from 'yup';
import {
  TextField, Select, FormControl, InputLabel, MenuItem, FormHelperText,
} from '@material-ui/core';
import {
} from '@material-ui/pickers';
import { CreateRequestTypeString } from '../types/create-request-string-types';

const SignupSchema = Yup.object().shape({
  contractType: Yup.string()
    .required('Ingrese tipo de contrato'),
  shiftType: Yup.string()
    .required('Ingrese el tipo de jornada laboral'),
  shift: Yup.string()
    .required('Ingrese los días de trabajo'),
  workAdress: Yup.string()
    .required('Ingrese la dirección laboral'),

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

interface CollabInfoProps {
  formRef: RefObject<FormikProps<CreateRequestTypeString>>,
  formSchema: CreateRequestTypeString,
  handleNext: ()=> void
}
// TODO: Adapt components according to the new formSchema
export default function CollabInfo(props: CollabInfoProps): JSX.Element {
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
          formSchema.contractType = values.contractType;
          formSchema.shiftType = values.shiftType;
          formSchema.shift = values.shift;
          formSchema.workAdress = values.workAdress;
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
              error={touched.contractType as boolean && Boolean(errors.contractType)}
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
              error={touched.shiftType as boolean && Boolean(errors.shiftType)}
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
              error={touched.shift as boolean && Boolean(errors.shift)}
            >
              <InputLabel className={classes.labelText} shrink={!!values.shift} id="shift-label">Días laborales</InputLabel>
              <TextField
                margin="normal"
                value={values.shift}
                onChange={handleChange}
                onBlur={handleBlur}
                id="shift"
                name="shift"
                error={touched.shift as boolean && Boolean(errors.shift)}
                helperText={touched.shift ? errors.shift : ''}
                FormHelperTextProps={{ className: classes.helperText }}
                inputProps={{ className: classes.inputText }}
              />
            </FormControl>

            <FormControl
              className={classes.formControl}
              error={touched.workAdress as boolean && Boolean(errors.workAdress)}
            >
              <InputLabel className={classes.labelText} shrink={!!values.workAdress} id="workAdress-label">Dirección laboral</InputLabel>
              <TextField
                margin="normal"
                value={values.workAdress}
                onChange={handleChange}
                onBlur={handleBlur}
                id="workAdress"
                name="workAdress"
                error={touched.workAdress as boolean && Boolean(errors.workAdress)}
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
