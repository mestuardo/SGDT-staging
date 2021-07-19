import React from 'react';
import { Avatar, Button, Typography } from '@material-ui/core';
import { GetProfessionalType } from '../../types/get-professional-types';
import { FilterApplicationsType } from '../../types/filter-applications-query-types';
import UploadButton from './document-upload';

export const initProfessional: GetProfessionalType = {
  id: '',
  name: '',
  firstSurname: '',
  secondSurname: '',
  rut: '',
  specialty: '',
  currentJob: '',
  savedJobOffers: [''],
  profile: '',
  technicalKnowledge: '',
  education: [],
  skills: [],
  pastJobs: [],
  contactInfo: { phone: '', email: '' },
};

export const initApplication: FilterApplicationsType = {
  id: '',
  jobOfferId: '',
  professionalId: '',
  status: '',
  applicationCreationDate: 0,
  lastStageDate: 0,
  decisionDate: 0,
  recruiterId: '',
  questions: [''],
  answers: [''],
  assessment: '',
  stage: '',
  rejectedMessage: '',
  files: [],
};

const showApplicationFiles = (application: FilterApplicationsType) => {
  if (application.files && application.files.length > 0) {
    return (
      <div>
        <div>
          <h3>Archivos</h3>
        </div>
        {application.files.map((fileInfo) => (
          <div key={fileInfo.filename}>
            <a
              key={fileInfo.filename}
              href={fileInfo.url}
              target="_blank"
              rel="noreferrer"
            >
              <Typography noWrap style={{ maxWidth: '200px' }}>{fileInfo.filename}</Typography>
            </a>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export const getDialogLabels = (application: FilterApplicationsType): string[] => {
  if (application.status === 'IN_PROCESS' && application.stage === 'JOB_OFFER') {
    return ['Detalles postulante', 'Postulación'];
  } if (application.status === 'IN_PROCESS' && application.stage === 'TECHNICAL') {
    return ['Detalles candidato', 'Entrevista técnica'];
  } if (application.status === 'IN_PROCESS' && application.stage === 'PSYCHOLOGICAL') {
    return ['Detalles candidato', 'Entrevista psicolaboral'];
  }
  if (application.status === 'REJECTED') {
    return ['Detalles candidato', 'Rechazado'];
  }
  if (application.status === 'ACCEPTED') {
    return ['Detalles candidato', 'Aceptado'];
  }
  return ['', ''];
};

export const getButtons = (
  avatarClassName: string,
  currentPro: GetProfessionalType,
  currentApp: FilterApplicationsType,
  jobOfferId: string,
  handleOpenRejectDialog: () => void,
  handleOpenApprovalDialog: ()=> void,
): JSX.Element|null => {
  switch (currentApp.status) {
    case 'REJECTED':
      return (
        <>
          <Avatar className={avatarClassName} variant="rounded" />
          <h2>
            {currentPro.name }
            {' '}
            {currentPro.firstSurname}
          </h2>
          <div>{currentPro.specialty}</div>
          <div>{currentPro.rut}</div>
          <div>{currentPro.currentJob}</div>
          <h3>Motivo del rechazo</h3>
          <div>{currentApp.rejectedMessage}</div>
        </>
      );
    case 'IN_PROCESS':
      return (
        <>
          <Avatar className={avatarClassName} variant="rounded" />
          <h2>
            {currentPro.name}
            {' '}
            {currentPro.firstSurname}
          </h2>
          <div>{currentPro.specialty}</div>
          <div>{currentPro.rut}</div>
          <div>{currentPro.currentJob}</div>
          {showApplicationFiles(currentApp)}
          <UploadButton
            applicationId={currentApp.id}
            jobOfferId={jobOfferId}
          />
          <Button onClick={handleOpenApprovalDialog} variant="contained" color="secondary">
            {currentApp.stage === 'JOB_OFFER'
              ? 'CONVERTIR EN CANDIDATO'
              : 'PASAR A SIGUIENTE FASE'}
          </Button>
          {currentApp.stage === 'JOB_OFFER' ? null
            : (
              <Button onClick={handleOpenRejectDialog} style={{ color: 'red' }}>
                Rechazar
              </Button>
            )}
        </>
      );
    case 'ACCEPTED':
      return (
        <>
          <Avatar className={avatarClassName} variant="rounded" />
          <h2>
            {currentPro.name}
            {' '}
            {currentPro.firstSurname}
          </h2>
          <div>{currentPro.specialty}</div>
          <div>{currentPro.rut}</div>
          <div>{currentPro.currentJob}</div>
        </>
      );
    default:
      return null;
  }
};
