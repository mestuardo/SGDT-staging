import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { IconButton } from '@material-ui/core';
import CancelOutlinedIcon from '@material-ui/icons/Cancel';
import Box from '@material-ui/core/Box';
import React from 'react';

import DialogInformationCard from './show_dialog_card';

import { profileCardStyles } from '../styles';

interface CardProps {
  id: string,
  companyName?: string,
  period?: string,
  position?: string,
  functions?: string,
  technologiesUsed?: string,
  type: string,
  title?: string,
  body?: string,
  description?: string,
  educationTitle?: string,
  degree?: string,
  completed?: boolean,
  deleteSkill: (id: string, type: string) => void | '',
}

const defaultCardProps = {
  companyName: '',
  period: '',
  position: '',
  functions: '',
  technologiesUsed: '',
  title: '',
  body: '',
  description: '',
  educationTitle: '',
  degree: '',
  completed: false,
};

export default function ProfileCards(
  props: CardProps,
) : JSX.Element {
  const { id, type, deleteSkill } = props;

  const classes = profileCardStyles();

  const getEducation = () => {
    const {
      description, period, educationTitle, degree, completed,
    } = props;
    return (
      <CardContent className={classes.cardContent}>
        <div>
          <Typography variant="caption" component="div">
            <Box fontSize="150%" fontWeight="fontWeightMedium" display="flex" justifyContent="flex-start">Carrera:</Box>
            {' '}
            {educationTitle}
          </Typography>
          <Typography variant="caption" component="div">
            <Box fontSize="150%" fontWeight="fontWeightMedium" display="flex" justifyContent="flex-start">Años (periodo):</Box>
            {' '}
            {period}
          </Typography>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
          <IconButton
            className={classes.crossIcon}
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            color="inherit"
            onClick={() => deleteSkill(id, type)}
          >
            <CancelOutlinedIcon color="action" />
          </IconButton>
          <DialogInformationCard
            educationTitle={educationTitle}
            period={period}
            description={description}
            type="education"
            degree={degree}
            completed={completed}
          />
        </div>
      </CardContent>

    );
  };

  const getSkills = () => {
    const { title, body } = props;
    return (
      <CardContent className={classes.cardContent}>
        <div>
          <Typography variant="caption" component="div">
            <Box fontSize="150%" fontWeight="fontWeightMedium" display="flex" justifyContent="flex-start">Skill:</Box>
            {' '}
            {title}
          </Typography>
          <Typography variant="caption" component="div">
            <Box fontSize="150%" fontWeight="fontWeightMedium" display="flex" justifyContent="flex-start">Nivel:</Box>
            {' '}
            {body}
          </Typography>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
          <IconButton
            className={classes.crossIcon}
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            color="inherit"
            onClick={() => deleteSkill(id, type)}
          >
            <CancelOutlinedIcon color="action" />
          </IconButton>
          <DialogInformationCard
            title={title}
            body={body}
            type="skills"
          />
        </div>
      </CardContent>
    );
  };

  const getPastJobs = () => {
    const {
      companyName, period, position, functions, technologiesUsed,
    } = props;
    return (
      <CardContent className={classes.cardContent}>
        <div>
          <Typography variant="caption" component="div">
            <Box fontSize="150%" fontWeight="fontWeightMedium" display="flex" justifyContent="flex-start">Nombre empesa:</Box>
            {' '}
            {companyName}
          </Typography>
          <Typography variant="caption" component="div">
            <Box fontSize="150%" fontWeight="fontWeightMedium" display="flex" justifyContent="flex-start">Period:</Box>
            {' '}
            {period}
          </Typography>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
          <IconButton
            className={classes.crossIcon}
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            color="inherit"
            onClick={() => deleteSkill(id, type)}
          >
            <CancelOutlinedIcon color="action" />
          </IconButton>
          <DialogInformationCard
            companyName={companyName}
            period={period}
            position={position}
            functions={functions}
            technologiesUsed={technologiesUsed}
            type="jobs"
          />
        </div>
      </CardContent>
    );
  };

  return (
    <Card className={classes.root}>
      {type === 'education'
        && (
          getEducation()
        )}
      {type === 'skills'
        && (
          getSkills()
        )}
      {type === 'jobs'
       && (
         getPastJobs()
       )}
    </Card>
  );
}

ProfileCards.defaultProps = defaultCardProps;
