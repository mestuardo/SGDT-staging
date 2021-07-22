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
  formationStatus: '',
  internalRep: '',
  levelOfStudies: '',
  languages: [],
  maxSalary: '',
  position: '',
  contractType_1: '',
  possibleDuration_1: '',
  contractType_2: '',
  possibleDuration_2: '',
  contractType_3: '',
  possibleDuration_3: '',
  recruiter: '',
  requestDescription: '',
  requiresComputer: '',
  requiresTechnical: '',
  serviceType: '',
  shiftType: '',
  softSkills: '',
  specialRequirements: '',
  technicalRequirements: [],
  techReq_1: { requirement: '', obligatoriness: '' },
  techReq_2: { requirement: '', obligatoriness: '' },
  techReq_3: { requirement: '', obligatoriness: '' },
  techReq_4: { requirement: '', obligatoriness: '' },
  techReq_5: { requirement: '', obligatoriness: '' },
  techReq_6: { requirement: '', obligatoriness: '' },
  techReq_7: { requirement: '', obligatoriness: '' },
  techReq_8: { requirement: '', obligatoriness: '' },
  techReq_9: { requirement: '', obligatoriness: '' },
  techReq_10: { requirement: '', obligatoriness: '' },
  vacancies: '',
  workAdress_city: '',
  workAdress_district: '',
  workAdress_street: '',
  workAdress_number: '',
  yearsExperience: '',

};

export default function RecruitingHeadView() : JSX.Element {
  const classes = recruitingHeadViewStyles();

  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.ChangeEvent<unknown>, newValue: number) => {
    setValue(newValue);
  };
  const [previewCardContent, setPreviewCardContent] = React.useState(formSchema);
  const updatePreviewCardContent = (content: CreateRequestTypeString) => (
    setPreviewCardContent(content)
  );

  return (
    <Grid
      container
      className={classes.gridContainer}
      justifyContent="center"
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
            <Tab label="Nueva solicitud" id={assignIdToTab(0).id} aria-controls={assignIdToTab(0)['aria-controls']} />

          </Tabs>
        </div>

        {/* Here the first (and only) component view starts */}
        <TabPanel tabValue={value} index={0}>

          <RequestForm
            formSchema={previewCardContent}
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
            />
            <div className={classes.queryDetails}>
              <Typography variant="caption" component="div">
                <Box fontWeight="fontWeightMedium" display="inline">Salario máximo:</Box>
                {' $'}
                {(+previewCardContent.maxSalary).toLocaleString() || '-'}
              </Typography>
              <Typography variant="caption" component="div">
                <Box fontWeight="fontWeightMedium" display="inline">Años experiencia requeridos:</Box>
                {' '}
                {`${previewCardContent.yearsExperience} años` || '-'}
              </Typography>

              <Typography variant="caption" component="div">
                <Box fontWeight="fontWeightMedium" display="inline">Nivel de estudios:</Box>
                {' '}
                {summaryLabels[previewCardContent.levelOfStudies] || '-'}
              </Typography>
              <Typography variant="caption" component="div">
                <Box fontWeight="fontWeightMedium" display="inline">Idiomas:</Box>
                {' '}
                {previewCardContent.languages ? previewCardContent.languages.map((entry:{ language:string; level:string }) => `${entry.language}, ${entry.level}`).join('; ') : '-'}
              </Typography>
              <Typography variant="caption" component="div">
                <Box fontWeight="fontWeightMedium" display="inline">Requisitios técnicos:</Box>
                {' '}
                {previewCardContent.technicalRequirements.map(
                  (
                    tec: { requirement: string, obligatoriness: string },
                  ) => (
                    `${tec.requirement}, ${summaryLabels[tec.obligatoriness] as string};`
                  ),
                ) || '-'}
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
                <Box fontWeight="fontWeightMedium" display="inline">Funciones del cargo:</Box>
                {' '}
                {previewCardContent.requestDescription || '-'}
              </Typography>
              <Typography variant="caption" component="div">
                <Box fontWeight="fontWeightMedium" display="inline">Requerimientos especiales:</Box>
                {' '}
                {previewCardContent.specialRequirements || '-'}
              </Typography>
              <Typography variant="caption" component="div">
                <Box fontWeight="fontWeightMedium" display="inline">Fecha de ingreso:</Box>
                {' '}
                {previewCardContent.approxStartDate.toLocaleDateString() || '-'}
              </Typography>
              <Typography variant="caption" component="div">
                <Box fontWeight="fontWeightMedium" display="inline">Duración del servicio:</Box>
                {' '}
                {`${previewCardContent.possibleDuration_1} meses` || '-'}
              </Typography>
              <Typography variant="caption" component="div">
                <Box fontWeight="fontWeightMedium" display="inline">Tipo de servicio:</Box>
                {' '}
                {summaryLabels[previewCardContent.serviceType] || '-'}
              </Typography>
              <Typography variant="caption" component="div">
                <Box fontWeight="fontWeightMedium" display="inline">Tipo de contrato:</Box>
                {' '}
                {summaryLabels[previewCardContent.contractType_1] || '-'}
              </Typography>
              <Typography variant="caption" component="div">
                <Box fontWeight="fontWeightMedium" display="inline">Jornada laboral:</Box>
                {' '}
                {summaryLabels[previewCardContent.shiftType] || '-'}
              </Typography>
              <Typography variant="caption" component="div">
                <Box fontWeight="fontWeightMedium" display="inline">Dirección laboral:</Box>
                {' '}
                {previewCardContent.workAdress || '-'}
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
