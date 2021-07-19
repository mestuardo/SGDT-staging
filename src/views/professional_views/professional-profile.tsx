import React from 'react';
import Image from 'next/image';
import {
  Typography,
  Box,
  GridList,
  Button,
  IconButton,
  TextField,
} from '@material-ui/core';
import ControlPointOutlinedIcon from '@material-ui/icons/ControlPointOutlined';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import withWidth from '@material-ui/core/withWidth';

import { ApolloError, useMutation } from '@apollo/client';
import ProfileCards from '../cards/profile-cards/profile_card';
import AddSkillCard from '../cards/profile-cards/edit_skill_card';
import AddEducationCard from '../cards/profile-cards/edit_education_card';
import AddJobCard from '../cards/profile-cards/edit_job_card';
import PROFESSIONAL_PROFILE_V1 from '../../mutations/changeProfessionalProfileV1.graphql';
import PROFESSIONAL_PROFILE_ATTRIBUTES_DEL from '../../mutations/changeProfessionalProfileAttributesDel.graphql';
import profileStyle from './styles';
import {
  ProfessionalProfileData, EducationProps, KnowledgeSkill, JobCardProps,
} from '../../types/get-professional-profile-types';
import StateDropDown from '../state-dropdown';
import professionalId from '../../global-variables';

interface EditProps {
  id?: string,
  name?: string,
  profile?: string,
  specialty?: string,
  currentJob?: string,
  companyName?: string,
  period?: string,
  position?: string,
  functions?: string,
  technologiesUsed?: string,
  title?: string,
  body?: string,
  description?: string,
  career?: string,
  deleteSkill?: (id: string, type: string) => void | '',
  skills?: { title: string, body: string }[],
  education?: {
    title: string,
    period: string,
    description: string,
    degree: string,
    completed: boolean,
  }[],
  pastJobs?: {
    companyName: string,
    period: string,
    position: string,
    functions: string,
    technologiesUsed: string,
  }[]
}

interface CardProps {
  id: string,
  companyName?: string,
  period?: string,
  position?: string,
  functions?: string,
  technologiesUsed?: string,
  type?: string,
  title?: string,
  body?: string,
  description?: string,
  career?: string,
  educationType?: {
    degree?: string,
    completed?: boolean | string,
  }
  deleteSkill?: (id: string, type: string) => void | '',
}

interface DataFetched {
  editProfessional: {
    skills: string[],
    pastJobs: string[],
    education: string[]
  }
}

interface GetProfessionalProps {
  editProfessionalProfessionalId: string,
  editProfessionalInput: EditProps
}

interface Address {
  city: string,
  comuna: string,
  country: string,
  number: string,
  street: string,
}

interface ContactInfo {
  email: string,
  phone: string,
  address: Address
}

const defaultContactInfo = {
  email: ' ',
  phone: ' ',
  address: {
    city: ' ',
    comuna: ' ',
    country: ' ',
    number: ' ',
    street: ' ',
  },
};

function ProfessionalProfileView(props: ProfessionalProfileData) : JSX.Element {
  // States
  const [educationCards, setEducationCards] = React.useState<EducationProps[]>([]);
  const [jobCards, setJobCards] = React.useState<JobCardProps[]>([]);
  const [contactInfo, setContactInfo] = React.useState<ContactInfo>(defaultContactInfo);
  const [yearsExperience, setYearsExperience] = React.useState<string>('');
  const [skillCards, setSkillCards] = React.useState<KnowledgeSkill[]>([]);
  const [specialty, setSpecialty] = React.useState<string>('');
  const [birthDate, setBirthDate] = React.useState<Date | null>();
  const [currentJob, setCurrentJob] = React.useState<string>('');
  const [name, setName] = React.useState<string>('');
  const [lastName, setLastName] = React.useState<string>('');
  const [institution, setInstitution] = React.useState<string>('');
  const [editFirst, setEditFirst] = React.useState<boolean>(false);
  const [profile, setProfile] = React.useState<string>('');
  const [techKnowledge, setTechKnowledge] = React.useState<string>('Ingresa tus conocimiento');
  const [addSkill, setAddSkill] = React.useState<boolean>(false);
  const [addEducation, setAddEducation] = React.useState<boolean>(false);
  const [addJob, setAddJob] = React.useState<boolean>(false);

  // Styles
  const classes = profileStyle();

  // Mutations
  const [sendEditProfileV1, { error },
  ] = useMutation<DataFetched>(PROFESSIONAL_PROFILE_V1);
  const [delProfileAttribute,
  ] = useMutation(PROFESSIONAL_PROFILE_ATTRIBUTES_DEL);

  // Delete cards in backend
  const sendDeleteAttribute = (type: string, id: string) => {
    const variables = {
      deleteProfessionalAttributeProfessionalId: professionalId,
      deleteProfessionalAttributeArrayAttribute: [
        type,
        id,
      ],
      deleteProfessionalAttributeStringAttributes: [],
    };
    delProfileAttribute({ variables }).catch((_error: ApolloError) => { throw (_error); });
  };

  // Delete cards from frontend
  const deleteProfileAttribute = (id: string, type: string) => {
    if (type === 'skills') {
      setSkillCards(skillCards.filter((skill) => skill.id !== id));
      sendDeleteAttribute('skills', id);
    } else if (type === 'education') {
      setEducationCards(educationCards.filter((ed) => ed.id !== id));
      sendDeleteAttribute('education', id);
    } else {
      setJobCards(jobCards.filter((job) => job.id !== id));
      sendDeleteAttribute('pastJobs', id);
    }
  };

  // Render cards in frontend
  const renderGridList = (
    className:string, listData:CardProps[] | EducationProps[], type: string,
  ) => (
    <GridList className={className}>
      {type === 'education' && listData.map((ed: CardProps) => (
        <ProfileCards
          key={ed.id}
          id={ed.id}
          type="education"
          description={ed.description}
          period={ed.period}
          educationTitle={ed.title}
          deleteSkill={deleteProfileAttribute}
          degree={ed.educationType?.degree}
          completed={ed.educationType?.completed as boolean}
        />
      ))}
      {type === 'skills' && listData.map((skill: CardProps) => (
        <ProfileCards
          key={skill.id}
          id={skill.id}
          type="skills"
          title={skill.title}
          body={skill.body}
          deleteSkill={deleteProfileAttribute}
        />
      ))}
      {type === 'jobs' && listData.map((job: CardProps) => (
        <ProfileCards
          key={job.id}
          id={job.id}
          type="jobs"
          companyName={job.companyName}
          period={job.period}
          position={job.position}
          functions={job.functions}
          technologiesUsed={job.technologiesUsed}
          deleteSkill={deleteProfileAttribute}
        />
      ))}
    </GridList>
  );

  // Add cards or edit profile information in backend
  const sendEditProfile = (variables: GetProfessionalProps) => {
    sendEditProfileV1({ variables }).catch((_error: ApolloError) => { throw (_error); });
  };

  // Edit profile information for backend
  const sendProfileV1 = () => {
    const variables = {
      editProfessionalProfessionalId: professionalId,
      editProfessionalInput: {
        name,
        specialty,
        currentJob,
        profile,
        institutions: institution,
        technicalKnowledge: techKnowledge,
        contactInfo: {
          phone: contactInfo.phone,
          email: contactInfo.email,
          address: {
            country: contactInfo.address.country,
            city: contactInfo.address.city,
            comuna: contactInfo.address.comuna,
            street: contactInfo.address.street,
            number: contactInfo.address.number,
          },
        },

      },
    };
    sendEditProfile(variables);
  };

  // Edit information for frontend - toggle
  const editProfileV1 = () => {
    if (editFirst === true) {
      sendProfileV1();
      setEditFirst(!editFirst);
    } else {
      setEditFirst(!editFirst);
    }
  };

  // Add skill card in frontend
  const addSkillToProfile = (title: string, body: string) => {
    const variables = {
      editProfessionalProfessionalId: professionalId,
      editProfessionalInput: {
        skills: [
          {
            title,
            body,
          },
        ],
      },
    };
    sendEditProfileV1({ variables }).then((response) => {
      if (error) { throw (error); }
      if (response.data && response.data.editProfessional) {
        setSkillCards(
          [...skillCards, { id: response.data.editProfessional.skills[-1], title, body }],
        );
        setAddSkill(false);
      }
    }).catch((err) => { throw (err); });
  };

  // Add education card in frontend
  const addEducationToProfile = (
    title: string, period: string, description: string, degree: string, completed: string,
  ) => {
    const completedFormat = completed.toLowerCase() === 'true';
    const variables = {
      editProfessionalProfessionalId: professionalId,
      editProfessionalInput: {
        education: [
          {
            title,
            period,
            description,
            educationType: {
              degree,
              completed: completedFormat,
            },
          },
        ],
      },
    };
    sendEditProfileV1({ variables }).then((response) => {
      if (error) { throw (error); }
      if (response.data && response.data.editProfessional) {
        const educationType = { degree, completed };
        setEducationCards(
          [...educationCards, {
            id: response.data.editProfessional.education[-1],
            title,
            period,
            description,
            educationType,
          }],
        );
        setAddEducation(false);
      }
    }).catch((err) => { throw (err); });
  };

  // Add job card in frontend
  const addJobToProfile = (
    companyName: string, period: string, position: string,
    functions: string, technologiesUsed: string,
  ) => {
    const variables = {
      editProfessionalProfessionalId: professionalId,
      editProfessionalInput: {
        pastJobs: [
          {
            companyName,
            period,
            position,
            functions,
            technologiesUsed,
          },
        ],
      },
    };
    sendEditProfileV1({ variables }).then((response) => {
      if (error) { throw (error); }
      if (response.data && response.data.editProfessional) {
        setJobCards(
          [...jobCards, {
            id: response.data.editProfessional.pastJobs[-1],
            companyName,
            period,
            position,
            functions,
            technologiesUsed,
          }],
        );
        setAddJob(false);
      }
    }).catch((err) => { throw (err); });
  };

  React.useEffect(() => {
    setProfile(props.data.profile ? props.data.profile : '');
    setName(props.data.name ? props.data.name : '');
    setCurrentJob(props.data.currentJob ? props.data.currentJob : '');
    setSpecialty(props.data.specialty ? props.data.specialty : '');
    setInstitution(props.data.institutions ? props.data.institutions : '');
    setBirthDate(props.data.birthDate ? props.data.birthDate : null);
    setContactInfo(props.data.contactInfo ? props.data.contactInfo : defaultContactInfo);
    setYearsExperience(props.data.yearsExperience ? props.data.yearsExperience : '');
    setTechKnowledge(props.data.technicalKnowledge ? props.data.technicalKnowledge : '');
    setLastName(props.data.firstSurname ? props.data.firstSurname : '');
    setEditFirst(false);
    setEducationCards(props.data.education
      ? props.data.education.map((ed) => {
        const {
          id, title, period, description, educationType,
        } = ed;
        return (
          {
            id,
            title,
            period,
            description,
            educationType,
          }
        );
      }) : []);
    setSkillCards(props.data.skills
      ? props.data.skills.map((skill: KnowledgeSkill) => {
        const {
          id, title, body,
        } = skill;
        return (
          {
            id, title, body,
          }
        );
      }) : []);
    setJobCards(props.data.pastJobs ? props.data.pastJobs : []);
  }, []);

  return (
    <div className={classes.profileContainer}>
      <div className={classes.title}>
        <Typography variant="body1" component="h1">
          <Box>
            Perfil Profesional
          </Box>
        </Typography>
      </div>
      <div className={classes.upperContainer}>
        <div className={classes.bodyLayout}>
          <div className={classes.imageContainer}>
            <Image src="/no-profile.png" alt="me" width="100" height="100" />
          </div>
          <div className={classes.bodyContainer}>
            {editFirst === false
              ? (
                <div className={classes.leftBody}>
                  <Typography style={{ display: 'flex', flexDirection: 'column', maxWidth: '80%' }} variant="body1" component="h2">
                    <Box pl={1} width="50%" fontWeight="fontWeightBold" fontSize={20}>
                      {name.length !== 0 ? name : 'No especificado'}
                      {' '}
                      {lastName.length !== 0 ? lastName : ''}
                    </Box>
                    <Box pl={1} width="50%" fontWeight="fontWeightRegular" fontSize={15} marginBottom="5%">
                      {birthDate ? `${birthDate.getDate()}-${birthDate.getMonth()}-${birthDate.getFullYear()}` : ''}
                    </Box>
                    <Box fontWeight="fontWeightBold" fontSize={13}>Dirección:</Box>
                    <Box pl={1} width="50%" fontWeight="fontWeightRegular" fontSize={13} marginBottom="5%">
                      {contactInfo.address.street.trim().length !== 0 ? `${contactInfo.address.street} ${contactInfo.address.number}, ${contactInfo.address.comuna}` : 'No especificado'}
                    </Box>
                    <Box fontWeight="fontWeightBold" fontSize={13}>País:</Box>
                    <Box pl={1} width="50%" fontWeight="fontWeightRegular" fontSize={13} marginBottom="5%">
                      {contactInfo.address.country.trim().length !== 0 ? contactInfo.address.country : 'No especificado'}
                    </Box>
                    <Box fontWeight="fontWeightBold" fontSize={13}>Número Telefónico:</Box>
                    <Box pl={1} width="50%" fontWeight="fontWeightRegular" fontSize={13} marginBottom="5%">
                      {contactInfo.phone.trim().length !== 0 ? contactInfo.phone : 'No especificado'}
                    </Box>
                    <Box fontWeight="fontWeightBold" fontSize={13}>Correo electrónico:</Box>
                    <Box pl={1} width="50%" fontWeight="fontWeightRegular" fontSize={13} marginBottom="5%">
                      {contactInfo.email.trim().length !== 0 ? contactInfo.email : 'No especificado'}
                    </Box>

                    <Box fontWeight="fontWeightBold" fontSize={13}>Años de experiencia laboral: </Box>
                    <Box pl={1} width="50%" fontWeight="fontWeightRegular" fontSize={13} marginBottom="5%">
                      {yearsExperience.length !== 0 ? yearsExperience : 'No especificado'}
                    </Box>
                    <Box fontWeight="fontWeightBold" fontSize={13}>
                      Trabajo Actual:
                    </Box>
                    <Box pl={1} fontWeight="fontWeightRegular" fontSize={13} marginBottom="5%" width="90%">
                      {currentJob.length !== 0 ? currentJob : 'No especificado'}
                    </Box>

                    <Box fontWeight="fontWeightBold" fontSize={13}> Especialidad: </Box>
                    <Box pl={1} fontWeight="fontWeightRegular" fontSize={13} marginBottom="5%" width="90%">
                      {specialty.length !== 0 ? specialty : 'No especificado'}
                    </Box>

                    <Box fontWeight="fontWeightBold" fontSize={13}> Perfil: </Box>
                    <Box pl={1} fontWeight="fontWeightRegular" fontSize={13} marginBottom="5%" width="90%">
                      {profile.length !== 0 ? profile : 'No especificado'}
                    </Box>

                    <Box fontWeight="fontWeightBold" fontSize={13}> Institución: </Box>
                    <Box pl={1} fontWeight="fontWeightRegular" fontSize={13} marginBottom="5%" width="90%">
                      {institution.length !== 0 ? institution : 'No especificado'}
                    </Box>

                    <Box fontWeight="fontWeightBold" fontSize={13}> Conocimientos Técnicos: </Box>
                    <Box pl={1} fontWeight="fontWeightRegular" fontSize={13} marginBottom="5%" width="90%">
                      {techKnowledge.length !== 0 ? techKnowledge : 'No especificado'}
                    </Box>
                  </Typography>
                </div>
              )
              : (
                <div className={classes.leftEditingContainer}>
                  <div>
                    Nombre:
                    <TextField
                      margin="dense"
                      fullWidth
                      value={name}
                      onChange={(c) => { setName(c.target.value); }}
                      id="name"
                      name="name"
                      variant="filled"
                    />
                  </div>
                  <div>
                    Fecha de nacimiento:
                    <TextField
                      margin="dense"
                      fullWidth
                      onChange={(c) => { setBirthDate(new Date(c.target.value)); }}
                      id="birth"
                      name="birth"
                      variant="filled"
                      type="date"
                    />
                  </div>
                  <div>
                    Correo electrónico:
                    <TextField
                      margin="dense"
                      fullWidth
                      onChange={(c) => {
                        setContactInfo({
                          ...contactInfo,
                          email: c.target.value,
                        });
                      }}
                      id="email"
                      name="email"
                      variant="filled"
                    />
                  </div>
                  <div>
                    Número telefónico:
                    <TextField
                      margin="dense"
                      fullWidth
                      onChange={(c) => {
                        setContactInfo({
                          ...contactInfo,
                          phone: c.target.value,
                        });
                      }}
                      id="phone"
                      name="phone"
                      variant="filled"
                    />
                  </div>
                  <div>
                    País:
                    <TextField
                      margin="dense"
                      fullWidth
                      onChange={(c) => {
                        setContactInfo({
                          ...contactInfo,
                          address: {
                            ...contactInfo.address,
                            country: c.target.value,
                          },
                        });
                      }}
                      id="country"
                      name="country"
                      variant="filled"
                    />
                  </div>
                  <div>
                    Calle (Dirección):
                    <TextField
                      margin="dense"
                      fullWidth
                      value={contactInfo.address.street}
                      onChange={(c) => {
                        setContactInfo({
                          ...contactInfo,
                          address: {
                            ...contactInfo.address,
                            street: c.target.value,
                          },
                        });
                      }}
                      id="street"
                      name="street"
                      variant="filled"
                      placeholder="Calle"
                    />
                    Número (Dirección)
                    <TextField
                      margin="dense"
                      fullWidth
                      value={contactInfo.address.number}
                      onChange={(c) => {
                        setContactInfo({
                          ...contactInfo,
                          address: {
                            ...contactInfo.address,
                            number: c.target.value,
                          },
                        });
                      }}
                      id="number"
                      name="number"
                      variant="filled"
                      placeholder="numero"
                    />
                    Comuna (Dirección)
                    <TextField
                      margin="dense"
                      fullWidth
                      value={contactInfo.address.comuna}
                      onChange={(c) => {
                        setContactInfo({
                          ...contactInfo,
                          address: {
                            ...contactInfo.address,
                            comuna: c.target.value,
                          },
                        });
                      }}
                      id="comuna"
                      name="comuna"
                      variant="filled"
                      placeholder="comuna"
                    />
                  </div>
                  <div>
                    Perfil:
                    <TextField
                      margin="dense"
                      fullWidth
                      multiline
                      rows={4}
                      value={profile}
                      onChange={(c) => { setProfile(c.target.value); }}
                      id="profile"
                      name="profile"
                      variant="filled"
                    />
                  </div>
                  <div>
                    Años de experiencia:
                    <TextField
                      margin="dense"
                      fullWidth
                      value={yearsExperience}
                      onChange={(c) => { setYearsExperience(c.target.value); }}
                      id="years"
                      name="years"
                      variant="filled"
                    />
                  </div>
                  <div>
                    Trabajo Actual:
                    <TextField
                      margin="dense"
                      fullWidth
                      multiline
                      rows={4}
                      value={currentJob}
                      onChange={(c) => { setCurrentJob(c.target.value); }}
                      id="currentJob"
                      name="currentJob"
                      variant="filled"
                    />
                  </div>
                  <div>
                    Especialidad:
                    <TextField
                      margin="dense"
                      fullWidth
                      multiline
                      rows={4}
                      value={specialty}
                      onChange={(c) => { setSpecialty(c.target.value); }}
                      id="specialty"
                      name="specialty"
                      variant="filled"
                    />
                  </div>
                  <div>
                    Institución:
                    <TextField
                      margin="dense"
                      fullWidth
                      multiline
                      rows={4}
                      value={institution}
                      onChange={(c) => { setInstitution(c.target.value); }}
                      id="institution"
                      name="institution"
                      variant="filled"
                    />
                  </div>
                  <div>
                    Conocimientos Técnicos:
                    <TextField
                      margin="dense"
                      fullWidth
                      multiline
                      rows={4}
                      value={techKnowledge}
                      onChange={(c) => { setTechKnowledge(c.target.value); }}
                      id="techKnowledge"
                      name="techKnowledge"
                      variant="filled"
                    />
                  </div>
                </div>
              )}
          </div>
          <div className={classes.rightContainer}>
            <Button onClick={() => { editProfileV1(); }}> Edit </Button>
            <StateDropDown />
          </div>
        </div>
      </div>
      <p className={classes.cardTitle}>Skills Técnicos</p>
      <div className={classes.bottomBars}>
        {renderGridList(classes.XgridList, skillCards, 'skills')}
        {addSkill && <AddSkillCard type="skills" addSkill={addSkillToProfile} setAddSkill={setAddSkill} />}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {addSkill === false ? (
            <IconButton
              className={classes.icon}
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
              onClick={() => { setAddSkill(!addSkill); }}
            >
              <ControlPointOutlinedIcon />
            </IconButton>
          )
            : (
              <IconButton
                className={classes.icon}
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
                onClick={() => { setAddSkill(!addSkill); }}
              >
                <CancelOutlinedIcon />
              </IconButton>
            )}
        </div>
      </div>
      <p className={classes.cardTitle}>Educación</p>
      <div className={classes.bottomBars}>
        {renderGridList(classes.XgridList, educationCards, 'education')}
        {addEducation && <AddEducationCard type="education" addEducation={addEducationToProfile} setAddEducation={setAddEducation} />}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {addEducation === false ? (
            <IconButton
              className={classes.icon}
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
              onClick={() => { setAddEducation(!addEducation); }}
            >
              <ControlPointOutlinedIcon />
            </IconButton>
          ) : (
            <IconButton
              className={classes.icon}
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
              onClick={() => { setAddEducation(!addEducation); }}
            >
              <CancelOutlinedIcon />
            </IconButton>
          )}
        </div>
      </div>
      <p className={classes.cardTitle}>Experiencia Laboral</p>
      <div className={classes.bottomBars}>
        {renderGridList(classes.XgridList, jobCards, 'jobs')}
        {addJob && <AddJobCard type="jobs" addJob={addJobToProfile} setAddJob={setAddJob} />}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {addJob === false ? (
            <IconButton
              className={classes.icon}
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
              onClick={() => { setAddJob(!addJob); }}
            >
              <ControlPointOutlinedIcon />
            </IconButton>
          ) : (
            <IconButton
              className={classes.icon}
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
              onClick={() => { setAddJob(!addJob); }}
            >
              <CancelOutlinedIcon />
            </IconButton>
          )}
        </div>

      </div>
    </div>
  );
}

// withWidth to recognize the screen width
export default withWidth()(ProfessionalProfileView);