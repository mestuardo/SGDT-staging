import React from 'react';
import {
  Box,
  Paper,
  Grid,
  Hidden,
  Tabs,
  Tab,
  Typography,
} from '@material-ui/core';

import recruitingHeadViewStyles from './styles';
import RequestForm from '../personnel-request/request_form';
import assignIdToTab from '../../helpers/assign_id_to_tab';
import TabPanel from '../tab_panel';
import SampleApplicantionCard from '../cards/sample_application_card';
import { CreateRequestTypeString } from '../../types/create-request-string-types';
import { summaryLabels } from '../request_review_detail/helpers';

const formSchema: CreateRequestTypeString = {
  approxStartDate: new Date(),
  client: '',
  contractType: '',
  formationStatus: '',
  internalRep: '',
  levelOfStudies: '',
  languages: [],
  maxSalary: '',
  position: '',
  possibleDuration: '',
  recruiter: '',
  requestDescription: '',
  requiresComputer: '',
  requiresTechnical: '',
  serviceType: '',
  shift: '',
  shiftType: '',
  softSkills: '',
  specialRequirements: '',
  stage: 'REQUEST',
  technicalRequirements: '',
  vacancies: '',
  workAdress: '',
  yearsExperience: '',

};

export default function RecruitingHeadView() : JSX.Element {
  const classes = recruitingHeadViewStyles();

  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.ChangeEvent<unknown>, newValue: number) => {
    setValue(newValue);
  };
  const dummyHandle = () => { };
  const [previewCardContent, setPreviewCardContent] = React.useState(formSchema);
  const updatePreviewCardContent = (content: CreateRequestTypeString) => (
    setPreviewCardContent(content)
  );

  return (
    <Grid
      container
      className={classes.gridContainer}
      justify="center"
      alignContent="center"
      alignItems="center"
      spacing={0}
    >
      <Grid
        item
        xs={12}
        lg={8}
        component={Paper}
      >
        <div className={classes.horizontalTabs}>
          <Tabs
            orientation="horizontal"
            variant="scrollable"
            scrollButtons="on"
            value={value}
            onChange={handleChange}
            aria-label="Horizontal tabs"
          >
            <Tab label="Crear solicitud" id={assignIdToTab(0).id} aria-controls={assignIdToTab(0)['aria-controls']} />

          </Tabs>
        </div>

        {/* Here the first (and only) component view starts */}
        <TabPanel tabValue={value} index={0}>

          <RequestForm
            formSchema={formSchema}
            updatePreviewCardContent={updatePreviewCardContent}
          />

        </TabPanel>
      </Grid>

      <Hidden mdDown>
        <Grid
          item
          md={3}
          component={Paper}
          className={classes.gridItem}
        >

          <div style={{
            marginTop: '30px',
            height: '570px',
            display: 'grid',
            justifyContent: 'center',
            textAlign: 'center',
            placeItems: 'center',
          }}
          >
            <h3>Vista previa</h3>
            <SampleApplicantionCard
              formSchema={previewCardContent}
              handleOpenDetails={dummyHandle}
            />
            <div className={classes.queryDetails}>
              <Typography variant="caption" component="div">
                <Box fontWeight="fontWeightMedium" display="inline">Salario máximo:</Box>
                {' $'}
                {(+previewCardContent.maxSalary).toLocaleString() || '-'}
              </Typography>
              <Typography variant="caption" component="div">
                <Box fontWeight="fontWeightMedium" display="inline">Duración del trabajo:</Box>
                {' '}
                {previewCardContent.possibleDuration || '-'}
              </Typography>
              <Typography variant="caption" component="div">
                <Box fontWeight="fontWeightMedium" display="inline">Idiomas:</Box>
                {' '}
                {previewCardContent.languages ? previewCardContent.languages.map((entry:{ language:string; level:string }) => `${entry.language}, ${entry.level}`).join('; ') : '-'}
              </Typography>
              <Typography variant="caption" component="div">
                <Box fontWeight="fontWeightMedium" display="inline">Nivel de estudios:</Box>
                {' '}
                {summaryLabels[previewCardContent.levelOfStudies] || '-'}
              </Typography>
              <Typography variant="caption" component="div">
                <Box fontWeight="fontWeightMedium" display="inline">Nivel formación:</Box>
                {' '}
                {summaryLabels[previewCardContent.formationStatus] || '-'}
              </Typography>
              <Typography variant="caption" component="div">
                <Box fontWeight="fontWeightMedium" display="inline">Habilidades blandas:</Box>
                {' '}
                {previewCardContent.softSkills || '-'}
              </Typography>
              <Typography variant="caption" component="div">
                <Box fontWeight="fontWeightMedium" display="inline">Tipo de servicio:</Box>
                {' '}
                {previewCardContent.serviceType || '-'}
              </Typography>
              <Typography variant="caption" component="div">
                <Box fontWeight="fontWeightMedium" display="inline">Tipo de contrato:</Box>
                {' '}
                {summaryLabels[previewCardContent.contractType] || '-'}
              </Typography>
              <Typography variant="caption" component="div">
                <Box fontWeight="fontWeightMedium" display="inline">Jornada laboral:</Box>
                {' '}
                {summaryLabels[previewCardContent.shiftType] || '-'}
              </Typography>
              <Typography variant="caption" component="div">
                <Box fontWeight="fontWeightMedium" display="inline">Años experiencia requeridos:</Box>
                {' '}
                {`${previewCardContent.yearsExperience} años` || '-'}
              </Typography>
              <Typography variant="caption" component="div">
                <Box fontWeight="fontWeightMedium" display="inline">Requiere computador:</Box>
                {' '}
                {previewCardContent.requiresComputer ? 'Sí' : 'No' || '-'}
              </Typography>
            </div>
          </div>

        </Grid>
      </Hidden>
    </Grid>
  );
}
