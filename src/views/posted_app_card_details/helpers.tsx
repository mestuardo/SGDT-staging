import React from 'react';
import {
  Avatar, Box, Button, Typography,
} from '@material-ui/core';
import { useKeycloak } from '@react-keycloak/ssr';
import type { KeycloakInstance } from 'keycloak-js';
import ParsedTokenType from '../../types/keycloak-token-type';
import { GetProfessionalType } from '../../types/get-professional-types';
import { FilterApplicationsType } from '../../types/filter-applications-query-types';
import UploadButton from './document-upload';
import DocumentComponent from './cv-handler';
import { checkIfAllowed } from '../../helpers/roles';

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
    return ['Detalles candidato', 'Seleccionado'];
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
  const { keycloak } = useKeycloak<KeycloakInstance>();
  // The token received by keycloak with the data
  const parsedToken = keycloak?.tokenParsed as ParsedTokenType;
  const isRecruiter = parsedToken && checkIfAllowed(parsedToken, ['recruiter']);
  const [tempFile, setTempFile] = React.useState<{ name: string, url: string }[]>([]);
  const handleObjURL = (obj: { name: string, url: string }) => setTempFile(
    (prev: { name: string, url: string }[]) => [...prev, obj],
  );
  React.useEffect(() => {
    setTempFile([]);
  }, [currentApp.files]);
  switch (currentApp.status) {
    case 'REJECTED':
      return (
        <>
          <Avatar className={avatarClassName} variant="rounded" />
          <h2>
            {currentPro.name}
            {' '}
            {currentPro.firstSurname}
          </h2>
          <div style={{ textAlign: 'left', width: '80%', wordWrap: 'break-word' }}>
            <div>
              <Box fontWeight="fontWeightMedium" display="inline">Especialidad: </Box>
              {currentPro.specialty}
            </div>
            <div>
              <Box fontWeight="fontWeightMedium" display="inline">RUT: </Box>
              {currentPro.rut}
            </div>
            {currentPro.birthDay !== null ? (
              <div>
                <Box fontWeight="fontWeightMedium" display="inline">Fecha de nacimiento: </Box>
                {new Date(currentPro.birthDay).toLocaleDateString()}
              </div>
            ) : null}
            {currentPro.currentJob !== null ? (
              <div>
                <Box fontWeight="fontWeightMedium" display="inline">Trabajo Actual: </Box>
                {currentPro.currentJob}
              </div>
            ) : null}
            {currentPro.institutions !== null ? (
              <div>
                <Box fontWeight="fontWeightMedium" display="inline">Instituciones: </Box>
                {currentPro.institutions}
              </div>
            ) : null}
            {currentPro.technicalKnowledge !== null ? (
              <div>
                <Box fontWeight="fontWeightMedium" display="inline">Conocimientos técnicos: </Box>
                {currentPro.technicalKnowledge}
              </div>
            ) : null}
            {currentPro.profile !== null ? (
              <div>
                <Box fontWeight="fontWeightMedium" display="inline">Perfil: </Box>
                {currentPro.profile}
              </div>
            ) : null}
          </div>
          <h3>Educación</h3>
          <div style={{ textAlign: 'left', width: '80%', wordWrap: 'break-word' }}>
            {currentPro.education.map((ed) => (
              <div key={ed.id}>
                <Box fontWeight="fontWeightMedium" display="inline">{ed.title}</Box>
                {`: ${ed.period} - ${ed.description}`}
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
          <div style={{ textAlign: 'left', width: '80%', wordWrap: 'break-word' }}>
            {currentPro.pastJobs.map((job) => (
              <div key={job.id}>
                {`${job.position} en ${job.companyName}; ${job.period}`}
              </div>
            ))}
          </div>
          <h3>Respuesta a preguntas</h3>
          {currentApp.answers.map((answer, index) => (
            <div key={`question_${index + 1}`} style={{ textAlign: 'left', width: '80%', wordWrap: 'break-word' }}>
              <Box fontWeight="fontWeightMedium" display="inline">{`Respuesta a pregunta ${index + 1}: `}</Box>
              {answer}
            </div>
          ))}
          <h3>Datos de contacto</h3>
          {currentPro.contactInfo !== null
            ? (
              <div style={{ textAlign: 'left', width: '80%' }}>
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
          <DocumentComponent
            currentProfessional={currentPro}
          />
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
          <div style={{ textAlign: 'left', width: '80%', wordWrap: 'break-word' }}>
            <div>
              <Box fontWeight="fontWeightMedium" display="inline">Especialidad: </Box>
              {currentPro.specialty}
            </div>
            <div>
              <Box fontWeight="fontWeightMedium" display="inline">RUT: </Box>
              {currentPro.rut}
            </div>
            {currentPro.birthDay !== null ? (
              <div>
                <Box fontWeight="fontWeightMedium" display="inline">Fecha de nacimiento: </Box>
                {new Date(currentPro.birthDay).toLocaleDateString()}
              </div>
            ) : null}
            {currentPro.currentJob !== null ? (
              <div>
                <Box fontWeight="fontWeightMedium" display="inline">Trabajo Actual: </Box>
                {currentPro.currentJob}
              </div>
            ) : null}
            {currentPro.institutions !== null ? (
              <div>
                <Box fontWeight="fontWeightMedium" display="inline">Instituciones: </Box>
                {currentPro.institutions}
              </div>
            ) : null}
            {currentPro.technicalKnowledge !== null ? (
              <div>
                <Box fontWeight="fontWeightMedium" display="inline">Conocimientos técnicos: </Box>
                {currentPro.technicalKnowledge}
              </div>
            ) : null}
            {currentPro.profile !== null ? (
              <div>
                <Box fontWeight="fontWeightMedium" display="inline">Perfil: </Box>
                {currentPro.profile}
              </div>
            ) : null}
          </div>
          <h3>Educación</h3>
          <div style={{ textAlign: 'left', width: '80%', wordWrap: 'break-word' }}>
            {currentPro.education.map((ed) => (
              <div key={ed.id}>
                <Box fontWeight="fontWeightMedium" display="inline">{ed.title}</Box>
                {`: ${ed.period} - ${ed.description}`}
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
          <div style={{ textAlign: 'left', width: '80%', wordWrap: 'break-word' }}>
            {currentPro.pastJobs.map((job) => (
              <div key={job.id}>
                {`${job.position} en ${job.companyName}; ${job.period}`}
              </div>
            ))}
          </div>
          <h3>Respuesta a preguntas</h3>
          {currentApp.answers.map((answer, index) => (
            <div key={`question_${index + 1}`} style={{ textAlign: 'left', width: '80%' }}>
              <Box fontWeight="fontWeightMedium" display="inline">{`Respuesta a pregunta ${index + 1}: `}</Box>
              {`${answer}`}
            </div>
          ))}
          <h3>Datos de contacto</h3>
          {currentPro.contactInfo !== null
            ? (
              <div style={{ textAlign: 'left', width: '80%' }}>
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
          {tempFile.map((file) => (
            <div key={file.url}>
              <a
                key={file.url}
                href={file.url}
                target="_blank"
                rel="noreferrer"
              >
                <Typography noWrap style={{ maxWidth: '200px' }}>{`${file.name}`}</Typography>
              </a>
            </div>
          ))}
          <DocumentComponent
            currentProfessional={currentPro}
          />
          {isRecruiter
            ? (
              <>
                <UploadButton
                  applicationId={currentApp.id}
                  handleObjURL={handleObjURL}
                />
                <Button
                  onClick={handleOpenApprovalDialog}
                  disabled={(currentApp.files.length === 0) && (tempFile.length === 0)}
                  variant="contained"
                  color="secondary"
                >
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
            ) : null}
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
          <div style={{ textAlign: 'left', width: '80%', wordWrap: 'break-word' }}>
            <div>
              <Box fontWeight="fontWeightMedium" display="inline">Especialidad: </Box>
              {currentPro.specialty}
            </div>
            <div>
              <Box fontWeight="fontWeightMedium" display="inline">RUT: </Box>
              {currentPro.rut}
            </div>
            {currentPro.birthDay !== null ? (
              <div>
                <Box fontWeight="fontWeightMedium" display="inline">Fecha de nacimiento: </Box>
                {new Date(currentPro.birthDay).toLocaleDateString()}
              </div>
            ) : null}
            {currentPro.currentJob !== null ? (
              <div>
                <Box fontWeight="fontWeightMedium" display="inline">Trabajo Actual: </Box>
                {currentPro.currentJob}
              </div>
            ) : null}
            {currentPro.institutions !== null ? (
              <div>
                <Box fontWeight="fontWeightMedium" display="inline">Instituciones: </Box>
                {currentPro.institutions}
              </div>
            ) : null}
            {currentPro.technicalKnowledge !== null ? (
              <div>
                <Box fontWeight="fontWeightMedium" display="inline">Conocimientos técnicos: </Box>
                {currentPro.technicalKnowledge}
              </div>
            ) : null}
            {currentPro.profile !== null ? (
              <div>
                <Box fontWeight="fontWeightMedium" display="inline">Perfil: </Box>
                {currentPro.profile}
              </div>
            ) : null}
          </div>
          <h3>Educación</h3>
          <div style={{ textAlign: 'left', width: '80%', wordWrap: 'break-word' }}>
            {currentPro.education.map((ed) => (
              <div key={ed.id}>
                <Box fontWeight="fontWeightMedium" display="inline">{ed.title}</Box>
                {`: ${ed.period} - ${ed.description}`}
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
          <div style={{ textAlign: 'left', width: '80%', wordWrap: 'break-word' }}>
            {currentPro.pastJobs.map((job) => (
              <div key={job.id}>
                {`${job.position} en ${job.companyName}; ${job.period}`}
              </div>
            ))}
          </div>
          <h3>Respuesta a preguntas</h3>
          {currentApp.answers.map((answer, index) => (
            <div key={`question_${index + 1}`} style={{ textAlign: 'left', width: '80%', wordWrap: 'break-word' }}>
              <Box fontWeight="fontWeightMedium" display="inline">{`Respuesta a pregunta ${index + 1}: `}</Box>
              {`${answer}`}
            </div>
          ))}
          <h3>Datos de contacto</h3>
          {currentPro.contactInfo !== null
            ? (
              <div style={{ textAlign: 'left', width: '80%' }}>
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
          {tempFile.map((file) => (
            <div key={file.url}>
              <a
                key={file.url}
                href={file.url}
                target="_blank"
                rel="noreferrer"
              >
                <Typography noWrap style={{ maxWidth: '200px' }}>{`${file.name}`}</Typography>
              </a>
            </div>
          ))}
          <DocumentComponent
            currentProfessional={currentPro}
          />
          {isRecruiter
            ? (
              <>
                <UploadButton
                  applicationId={currentApp.id}
                  handleObjURL={handleObjURL}
                />
                {currentApp.stage === 'JOB_OFFER' ? null
                  : (
                    <Button onClick={handleOpenRejectDialog} style={{ color: 'red' }}>
                      Rechazar
                    </Button>
                  )}
              </>
            ) : null}
        </>
      );
    default:
      return null;
  }
};
