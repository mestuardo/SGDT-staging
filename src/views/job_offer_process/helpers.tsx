import React from 'react';
import clsx from 'clsx';
import { StepIconProps } from '@material-ui/core/StepIcon';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import PolicyIcon from '@material-ui/icons/Policy';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';

import { useColorlibStepIconStyles } from './styles';

export const summaryLabels: { [key:string]:string | boolean } = {
  LOWER_SCHOOL: 'Ed. Básica',
  HIGH_SCHOOL: 'Ed. Media',
  TECHNICAL: 'Ed. Técnica',
  COLLEGE: 'Ed. Universitaria',
  TITLED: 'Titulado',
  DESIRABLE: 'Deseable',
  EXCLUDING: 'Excluyente',
  GRADUATED: 'Graduado',
  SUSPENDED: 'Congelado',
  COMPLETE: 'Completa',
  INCOMPLETE: 'Incompleta',
  FIXED: 'Fijo',
  INDEFINITE: 'Indefinido',
  PART_TIME: 'Part-Time',
  FULL_TIME: 'Full-Time',
  FREELANCE: 'Freelance',
  INTERNAL: 'Interno',
  OUTSOURCING: 'Outsourcing',
  OUTSOURCING_TRANSITORY: 'Transitorio',
  OUTSOURCING_SELECTION: 'Selección',
};

export const getSteps = () : string[] => ['Candidatos iniciales', 'Entrevista técnica', 'Entrevista psicolaboral', 'Selección final'];

export const ColorlibStepIcon = (props: StepIconProps) : JSX.Element => {
  const classes = useColorlibStepIconStyles();
  const { active, completed, icon } = props;

  const icons: { [index: string]: React.ReactElement } = {
    1: <AccountCircleIcon />,
    2: <PolicyIcon />,
    3: <GroupAddIcon />,
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
