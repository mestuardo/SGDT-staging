import React from 'react';
import {
  Avatar, Box, Button, Typography,
} from '@material-ui/core';
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
  institutions: '',
  technicalKnowledge: '',
  education: [{
    id: '', title: '', period: '', description: '', educationType: { degree: '', completed: false },
  }],
  skills: [{ id: '', title: '', body: '' }],
  pastJobs: [{
    id: '',
    companyName: '',
    period: '',
    position: '',
    functions: '',
    technologiesUsed: '',
  }],
  contactInfo: {
    phone: '',
    email: '',
    address: {
      country: '', city: '', comuna: '', street: '', number: '',
    },
  },
  birthDay: new Date(),
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
          <div>{`Especialidad: ${currentPro.specialty}`}</div>
          <div>{`RUT: ${currentPro.rut}`}</div>
          {currentPro.birthDay !== null ? <div>{`Fecha de nacimiento: ${new Date(currentPro.birthDay).toLocaleDateString()}`}</div> : null}
          {currentPro.currentJob !== null ? <div>{`Trabajo actual: ${currentPro.currentJob}`}</div> : null}
          {currentPro.institutions !== null ? <div>{`Instituciones: ${currentPro.institutions}`}</div> : null}
          {currentPro.technicalKnowledge !== null ? <div>{`Conocimientos técnicos: ${currentPro.technicalKnowledge}`}</div> : null}
          {currentPro.profile !== null ? <div>{`Perfil: ${currentPro.profile}`}</div> : null}
          <h3>Educación</h3>
          <div>
            {currentPro.education.map((ed) => (
              <div key={ed.id}>
                {`${ed.title}: ${ed.period} - ${ed.description}`}
              </div>
            ))}
          </div>
          <h3>Skills</h3>
          <div>
            {currentPro.skills.map((skill) => (
              <div key={skill.id}>
                {`${skill.title}: ${skill.body}`}
              </div>
            ))}
          </div>
          <h3>Trabajos anteriores</h3>
          <div>
            {currentPro.pastJobs.map((job) => (
              <div key={job.id}>
                {`${job.position} en ${job.companyName}; ${job.period}`}
              </div>
            ))}
          </div>
          <h3>Respuesta a preguntas</h3>
          <div>
            {currentApp.answers.map((answer, index) => (
              <div key={answer} style={{ textAlign: 'left' }}>
                <Box fontWeight="fontWeightMedium" display="inline">{`Respuesta a pregunta ${index + 1}: `}</Box>
                {answer}
              </div>
            ))}
          </div>
          <h3>Datos de contacto</h3>
          {currentPro.contactInfo !== null
            ? (
              <div style={{ textAlign: 'left' }}>
                <div>
                  <Box fontWeight="fontWeightMedium" display="inline">Teléfono: </Box>
                  {currentPro.contactInfo.phone}
                </div>
                <div>
                  <Box fontWeight="fontWeightMedium" display="inline">E-mail: </Box>
                  {currentPro.contactInfo.email}
                </div>
                {currentPro.contactInfo.address
                  ? (
                    <div>
                      <Box fontWeight="fontWeightMedium" display="inline">Dirección: </Box>
                      {`${currentPro.contactInfo.address.street} ${currentPro.contactInfo.address.number}, ${currentPro.contactInfo.address.comuna}, ${currentPro.contactInfo.address.city}, ${currentPro.contactInfo.address.country}`}
                    </div>
                  )
                  : null }
              </div>
            )
            : <div>Teléfono: - E-mail: - Dirección: -</div>}
          {showApplicationFiles(currentApp)}
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
          <div>{`Especialidad: ${currentPro.specialty}`}</div>
          <div>{`RUT: ${currentPro.rut}`}</div>
          {currentPro.birthDay !== null ? <div>{`Fecha de nacimiento: ${new Date(currentPro.birthDay).toLocaleDateString()}`}</div> : null}
          {currentPro.currentJob !== null ? <div>{`Trabajo actual: ${currentPro.currentJob}`}</div> : null}
          {currentPro.institutions !== null ? <div>{`Instituciones: ${currentPro.institutions}`}</div> : null}
          {currentPro.technicalKnowledge !== null ? <div>{`Conocimientos técnicos: ${currentPro.technicalKnowledge}`}</div> : null}
          {currentPro.profile !== null ? <div>{`Perfil: ${currentPro.profile}`}</div> : null}
          <h3>Educación</h3>
          <div>
            {currentPro.education.map((ed) => (
              <div key={ed.id}>
                {`${ed.title}: ${ed.period} - ${ed.description}`}
              </div>
            ))}
          </div>
          <h3>Skills</h3>
          <div>
            {currentPro.skills.map((skill) => (
              <div key={skill.id}>
                {`${skill.title}: ${skill.body}`}
              </div>
            ))}
          </div>
          <h3>Trabajos anteriores</h3>
          <div>
            {currentPro.pastJobs.map((job) => (
              <div key={job.id}>
                {`${job.position} en ${job.companyName}; ${job.period}`}
              </div>
            ))}
          </div>
          <h3>Respuesta a preguntas</h3>
          <div>
            {currentApp.answers.map((answer, index) => (
              <div key={answer} style={{ textAlign: 'left' }}>
                <Box fontWeight="fontWeightMedium" display="inline">{`Respuesta a pregunta ${index + 1}: `}</Box>
                {`${answer}`}
              </div>
            ))}
          </div>
          <h3>Datos de contacto</h3>
          {currentPro.contactInfo !== null
            ? (
              <div style={{ textAlign: 'left' }}>
                <div>
                  <Box fontWeight="fontWeightMedium" display="inline">Teléfono: </Box>
                  {currentPro.contactInfo.phone}
                </div>
                <div>
                  <Box fontWeight="fontWeightMedium" display="inline">E-mail: </Box>
                  {currentPro.contactInfo.email}
                </div>
                {currentPro.contactInfo.address
                  ? (
                    <div>
                      <Box fontWeight="fontWeightMedium" display="inline">Dirección: </Box>
                      {`${currentPro.contactInfo.address.street} ${currentPro.contactInfo.address.number}, ${currentPro.contactInfo.address.comuna}, ${currentPro.contactInfo.address.city}, ${currentPro.contactInfo.address.country}`}
                    </div>
                  )
                  : null }
              </div>
            )
            : <div>Teléfono: - E-mail: - Dirección: -</div>}
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
          <div>
            {currentApp.stage === 'JOB_OFFER' ? null
              : (
                <Button onClick={handleOpenRejectDialog} style={{ color: 'red' }}>
                  Rechazar
                </Button>
              )}
          </div>
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
          <div>{`Especialidad: ${currentPro.specialty}`}</div>
          <div>{`RUT: ${currentPro.rut}`}</div>
          {currentPro.birthDay !== null ? <div>{`Fecha de nacimiento: ${new Date(currentPro.birthDay).toLocaleDateString()}`}</div> : null}
          {currentPro.currentJob !== null ? <div>{`Trabajo actual: ${currentPro.currentJob}`}</div> : null}
          {currentPro.institutions !== null ? <div>{`Instituciones: ${currentPro.institutions}`}</div> : null}
          {currentPro.technicalKnowledge !== null ? <div>{`Conocimientos técnicos: ${currentPro.technicalKnowledge}`}</div> : null}
          {currentPro.profile !== null ? <div>{`Perfil: ${currentPro.profile}`}</div> : null}
          <h3>Educación</h3>
          <div>
            {currentPro.education.map((ed) => (
              <div key={ed.id}>
                {`${ed.title}: ${ed.period} - ${ed.description}`}
              </div>
            ))}
          </div>
          <h3>Skills</h3>
          <div>
            {currentPro.skills.map((skill) => (
              <div key={skill.id}>
                {`${skill.title}: ${skill.body}`}
              </div>
            ))}
          </div>
          <h3>Trabajos anteriores</h3>
          <div>
            {currentPro.pastJobs.map((job) => (
              <div key={job.id}>
                {`${job.position} en ${job.companyName}; ${job.period}`}
              </div>
            ))}
          </div>
          <h3>Respuesta a preguntas</h3>
          <div>
            {currentApp.answers.map((answer, index) => (
              <div key={answer} style={{ textAlign: 'left' }}>
                <Box fontWeight="fontWeightMedium" display="inline">{`Respuesta a pregunta ${index + 1}: `}</Box>
                {`${answer}`}
              </div>
            ))}
          </div>
          <h3>Datos de contacto</h3>
          {currentPro.contactInfo !== null
            ? (
              <div style={{ textAlign: 'left' }}>
                <div>
                  <Box fontWeight="fontWeightMedium" display="inline">Teléfono: </Box>
                  {currentPro.contactInfo.phone}
                </div>
                <div>
                  <Box fontWeight="fontWeightMedium" display="inline">E-mail: </Box>
                  {currentPro.contactInfo.email}
                </div>
                {currentPro.contactInfo.address
                  ? (
                    <div>
                      <Box fontWeight="fontWeightMedium" display="inline">Dirección: </Box>
                      {`${currentPro.contactInfo.address.street} ${currentPro.contactInfo.address.number}, ${currentPro.contactInfo.address.comuna}, ${currentPro.contactInfo.address.city}, ${currentPro.contactInfo.address.country}`}
                    </div>
                  )
                  : null }
              </div>
            )
            : <div>Teléfono: - E-mail: - Dirección: -</div>}
          {showApplicationFiles(currentApp)}
          <UploadButton
            applicationId={currentApp.id}
            jobOfferId={jobOfferId}
          />
          {currentApp.stage === 'JOB_OFFER' ? null
            : (
              <Button onClick={handleOpenRejectDialog} style={{ color: 'red' }}>
                Rechazar
              </Button>
            )}
        </>
      );
    default:
      return null;
  }
};
