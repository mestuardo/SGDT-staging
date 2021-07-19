import React, { RefObject, useState } from 'react';
import 'date-fns';
import { Formik, Form, FormikProps } from 'formik';
import * as Yup from 'yup';
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Button,
  Box,
} from '@material-ui/core';

import requiredProfileInfoStyles from './styles/2_required_profile_info_styles';
import { CreateRequestTypeString } from '../../types/create-request-string-types';
import theme from '../../theme';

// Form validation Schema
// TODO: Technical requirements validationschema
const ValidationSchema = Yup.object().shape({
  softSkills: Yup.string()
    .required('Ingrese habilidades blandas'),
  requestDescription: Yup.string()
    .required('Ingrese las funciones del cargo'),
  specialRequirements: Yup.string()
    .required('Ingrese los requerimientos especiales'),

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

  const [techsQuantity, setTechsQuantity] = useState(1);
  const handleAddTechs = () => setTechsQuantity((prevState) => prevState + 1);
  const handleRemoveTechs = () => setTechsQuantity((prevState) => prevState - 1);

  return (
    <>

      <Formik
        innerRef={formRef}
        initialValues={formSchema}
        validationSchema={ValidationSchema}
        onSubmit={(values) => {
          updatePreviewCardContent({
            ...values,
            technicalRequirements: [values.techReq_1,
              values.techReq_2,
              values.techReq_3,
              values.techReq_4,
              values.techReq_5,
              values.techReq_6,
              values.techReq_7,
              values.techReq_8,
              values.techReq_9,
              values.techReq_10].slice(0, techsQuantity),
          });
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
                multiline
                rows={3}
                id="requestDescription"
                name="requestDescription"
                error={touched.requestDescription && Boolean(errors.requestDescription)}
                helperText={touched.requestDescription ? errors.requestDescription : 'Separadas por comas'}
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
                id="specialRequirements"
                name="specialRequirements"
                error={touched.specialRequirements
                  && Boolean(errors.specialRequirements)}
                helperText={touched.specialRequirements ? errors.specialRequirements : 'Separados por comas'}
                FormHelperTextProps={{ className: classes.helperText }}
                inputProps={{ className: classes.textAreaText }}
              />
            </FormControl>

            <br />
            <FormControl
              className={classes.formControl}
              // error={touched.technicalRequirements
              //   && Boolean(errors.technicalRequirements)}
              style={{ width: 200, margin: theme.spacing(1) }}
            >
              <InputLabel className={classes.labelText} shrink={!!values.techReq_1.requirement} id="techReq_1.requirement-label">Requisito técnico</InputLabel>
              <TextField
                margin="normal"
                value={values.techReq_1.requirement}
                onChange={handleChange}
                onBlur={handleBlur}
                id="techReq_1.requirement"
                name="techReq_1.requirement"
                // error={touched['techReq_1.requirement']
                //   && Boolean(errors['techReq_1.requirement'])}
                // helperText={touched['techReq_1.requirement']
                // ? errors['techReq_1.requirement'] : ''}
                FormHelperTextProps={{ className: classes.helperText }}
              />
            </FormControl>
            <FormControl
              className={classes.formControl}
              // error={touched.technicalRequirementsObligatoriness
              //   && Boolean(errors.technicalRequirementsObligatoriness)}
              style={{ width: 200, margin: theme.spacing(1) }}
            >
              <InputLabel className={classes.labelText} id="techReq_1.obligatoriness-label">Obligatoriedad requisito</InputLabel>
              <Select
                labelId="techReq_1.obligatoriness-label"
                id="techReq_1.obligatoriness"
                name="techReq_1.obligatoriness"
                value={values.techReq_1.obligatoriness}
                onChange={handleChange}
                onBlur={handleBlur}
                // disabled={values.techReq_1.requirement === ''}
                inputProps={{ className: classes.inputText }}
              >
                <MenuItem value="DESIRABLE">Deseable</MenuItem>
                <MenuItem value="EXCLUDING">Excluyente</MenuItem>
              </Select>
              <FormHelperText className={classes.helperText}>{touched.technicalRequirementsObligatoriness ? errors.technicalRequirementsObligatoriness : ''}</FormHelperText>

            </FormControl>
            {[values.techReq_1,
              values.techReq_2,
              values.techReq_3,
              values.techReq_4,
              values.techReq_5,
              values.techReq_6,
              values.techReq_7,
              values.techReq_8,
              values.techReq_9,
              values.techReq_10].slice(1, techsQuantity).map((handler, index) => (
                <Box key={`technicalRequirements-${index + 2}`}>
                  <FormControl
                    className={classes.formControl}
                //   error={touched.technicalRequirements
                // && Boolean(errors.technicalRequirements)}
                    style={{ width: 200, margin: theme.spacing(1) }}
                  >
                    <InputLabel className={classes.labelText} shrink={!!handler.requirement} id="technicalRequirements-label">{`Requisito ${index + 2}`}</InputLabel>
                    <TextField
                      margin="normal"
                      value={handler.requirement}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      id={`techReq_${index + 2}.requirement`}
                      name={`techReq_${index + 2}.requirement`}
                  //   error={touched.technicalRequirements
                  // && Boolean(errors.technicalRequirements)}
                  // helperText={touched.technicalRequirements ? errors.technicalRequirements : ''}
                      FormHelperTextProps={{ className: classes.helperText }}
                    />
                  </FormControl>
                  <FormControl
                    className={classes.formControl}
                //   error={touched.technicalRequirementsObligatoriness
                // && Boolean(errors.technicalRequirementsObligatoriness)}
                    style={{ width: 200, margin: theme.spacing(1) }}
                  >
                    <InputLabel className={classes.labelText} id={`techReq_${index + 2}.obligatoriness-label`}>{`Obligatoriedad requisito ${index + 2}`}</InputLabel>
                    <Select
                      id={`techReq_${index + 2}.obligatoriness`}
                      name={`techReq_${index + 2}.obligatoriness`}
                      value={handler.obligatoriness}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      // disabled={values.techReq_1.requirement === ''}
                      inputProps={{ className: classes.inputText }}
                    >
                      <MenuItem value="DESIRABLE">Deseable</MenuItem>
                      <MenuItem value="EXCLUDING">Excluyente</MenuItem>
                    </Select>
                    <FormHelperText className={classes.helperText}>{touched.technicalRequirementsObligatoriness ? errors.technicalRequirementsObligatoriness : ''}</FormHelperText>

                  </FormControl>
                </Box>
            ))}
            <br />
            <Button
              disabled={values.techReq_1.requirement === '' || values.techReq_1.obligatoriness === ''}
              onClick={handleAddTechs}
            >
              Agregar requisito
            </Button>
            <Button
              disabled={techsQuantity === 1}
              onClick={handleRemoveTechs}
            >
              Quitar requisito
            </Button>

          </Form>
        )}
      </Formik>
    </>

  );
}
