import React from 'react';
import clsx from 'clsx';
import { StepIconProps } from '@material-ui/core/StepIcon';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import PolicyIcon from '@material-ui/icons/Policy';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';

import { useColorlibStepIconStyles } from './styles';

export const ContractTypes: { [key:string]:string } = {
  FIXED: 'Fijo',
  INDEFINITE: 'Indefinido',
};

export const LevelOfStudies: { [key: string]: string } = {
  LOWER_SCHOOL: 'Enseñanza básica',
  HIGH_SCHOOL: 'Enseñanza media',
  TECHNICAL: 'Técnico',
  COLLEGE: 'Universitario',
};

export const FormationStatus: { [key: string]: string } = {
  COMPLETE: 'completo',
  INCOMPLETE: 'incompleto',
};

export const getSteps = () : string[] => ['Entrevista técnica', 'Entrevista psicolaboral', 'Selección final'];

export const ColorlibStepIcon = (props: StepIconProps) : JSX.Element => {
  const classes = useColorlibStepIconStyles();
  const { active, completed, icon } = props;

  const icons: { [index: string]: React.ReactElement } = {
    1: <AccountCircleIcon />,
    2: <GroupAddIcon />,
    3: <PolicyIcon />,
    4: <AssignmentTurnedInIcon />,
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {icons[String(icon)]}
    </div>
  );
};
