import React, { RefObject } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Formik, Form, FormikProps } from 'formik';
import * as Yup from 'yup';
import {
  TextField, Select, FormControl, InputLabel, MenuItem, FormHelperText,
} from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider, KeyboardDatePicker,
} from '@material-ui/pickers';
import esLocale from 'date-fns/locale/es';
import { useQuery } from '@apollo/client';
import { CreateRequestTypeString } from '../types/create-request-string-types';
import GET_CLIENTS from '../queries/get-client-details.graphql';
import GET_EXTERNAL_REPS from '../queries/get-external-reps.graphql';
import { GetClientDetailsArray, GetExternalRepDetailsArray } from '../types/personnel-request-types';
// Form validation Schema
const ValidationSchema = Yup.object().shape({
  client: Yup.string()
    .required('Ingrese al cliente'),
  recruiter: Yup.string()
    .required('Ingrese al reclutador'),
  externalRep: Yup.string()
    .required('Ingrese al responsable externo'),

});

// Styles
const useStyles = makeStyles((theme: Theme) => createStyles({
  formControl: {
    margin: theme.spacing(1),
    width: 150,
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

interface ClientInfoProps {
  formRef: RefObject<FormikProps<CreateRequestTypeString>>,
  formSchema: CreateRequestTypeString,
  handleNext: ()=> void
}
// TODO: Adapt components according to the new formSchema
export default function ClientInfo(props: ClientInfoProps): JSX.Element {
  const {
    formRef, formSchema, handleNext,
  } = props;
  const classes = useStyles();
  const {
    data: ClientDetails, loading: ClientDetailsLoading, error: CLientDetailsError,
  } = useQuery<GetClientDetailsArray>(GET_CLIENTS);
  const {
    data: ExternalRepDetails, loading: ExternalRepLoading, error: ExternalRepError,
  } = useQuery<GetExternalRepDetailsArray>(GET_EXTERNAL_REPS);

  return (
    <>

      <Formik
        innerRef={formRef}
        initialValues={formSchema}
        validationSchema={ValidationSchema}
        onSubmit={(values) => {
          formSchema.approxStartDate = values.approxStartDate;
          formSchema.client = values.client;
          formSchema.recruiter = values.recruiter;
          formSchema.externalRep = values.externalRep;
          ClientDetails?.clients.forEach((cli) => {
            if (cli.id === values.client) {
              formSchema.client_name = `${cli.tradeName} - ${cli.name}`;
            }
          });
          ExternalRepDetails?.externalRepresentatives.forEach((ext) => {
            if (ext.id === values.externalRep) {
              formSchema.externalRep_name = `${ext.name} ${ext.firstSurname} ${ext.secondSurname}`;
            }
          });
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
              <InputLabel shrink className={classes.labelText} id="approxStartDate-label">Fecha</InputLabel>
              <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>
                <KeyboardDatePicker
                  margin="normal"
                  id="approxStartDate"
                  cancelLabel="Cancelar"
                  // disabled
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
              error={touched.client as boolean && Boolean(errors.client)}
            >
              <InputLabel className={classes.labelText} id="client-label">Cliente</InputLabel>
              <Select
                labelId="client-label"
                id="client"
                name="client"
                value={values.client}
                onChange={handleChange}
                onBlur={handleBlur}
                inputProps={{ className: classes.inputText }}
              >
                {ClientDetailsLoading && <MenuItem disabled value="cargando">Cargando...</MenuItem>}
                {CLientDetailsError && <MenuItem disabled value="cargando">Ha ocurrido un error</MenuItem>}
                {ClientDetails && ClientDetails.clients.map((client) => (
                  <MenuItem key={client.id} value={client.id}>
                    {client.tradeName}
                    {' '}
                    -
                    {' '}
                    {client.name}
                  </MenuItem>
                ))}

              </Select>
              <FormHelperText className={classes.helperText}>{touched.client ? errors.client : ''}</FormHelperText>

            </FormControl>

            <FormControl
              className={classes.formControl}
              error={touched.recruiter as boolean && Boolean(errors.recruiter)}
            >
              <InputLabel className={classes.labelText} shrink={!!values.recruiter} id="recruiter-label">Reclutador</InputLabel>
              <TextField
                margin="normal"
                value={values.recruiter}
                onChange={handleChange}
                onBlur={handleBlur}
                id="recruiter"
                name="recruiter"
                error={touched.recruiter as boolean && Boolean(errors.recruiter)}
                helperText={touched.recruiter ? errors.recruiter : ''}
                FormHelperTextProps={{ className: classes.helperText }}
                inputProps={{ className: classes.inputText }}
              />
            </FormControl>

            <FormControl
              className={classes.formControl}
              error={touched.externalRep as boolean && Boolean(errors.externalRep)}
            >
              <InputLabel className={classes.labelText} shrink={!!values.externalRep} id="externalRep-label">Representante Externo</InputLabel>
              <Select
                labelId="externalRep-label"
                id="externalRep"
                name="externalRep"
                value={values.externalRep}
                onChange={handleChange}
                onBlur={handleBlur}
                inputProps={{ className: classes.inputText }}
              >
                {ExternalRepLoading && <MenuItem disabled value="cargando">Cargando...</MenuItem>}
                {ExternalRepError && <MenuItem disabled value="cargando">Ha ocurrido un error</MenuItem>}
                {ExternalRepDetails && ExternalRepDetails.externalRepresentatives.map((extrep) => (
                  <MenuItem key={extrep.id} value={extrep.id}>
                    {extrep.name}
                    {' '}
                    {extrep.firstSurname}
                    {' '}
                    {extrep.secondSurname}
                  </MenuItem>
                ))}

              </Select>
              <FormHelperText className={classes.helperText}>{touched.externalRep ? errors.externalRep : ''}</FormHelperText>
            </FormControl>
          </Form>
        )}
      </Formik>
    </>

  );
}
