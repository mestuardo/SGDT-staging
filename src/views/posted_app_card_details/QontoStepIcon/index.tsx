import React from 'react';
import clsx from 'clsx';
import { StepConnector } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Check from '@material-ui/icons/Check';
import { StepIconProps } from '@material-ui/core/StepIcon';
import useQontoStepIconStyles from './styles';

export const QontoConnector = withStyles({
  alternativeLabel: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  active: {
    '& $line': {
      borderColor: '#784af4',
    },
  },
  completed: {
    '& $line': {

      borderColor: '#784af4',
    },
  },
  line: {
    display: 'none',
    borderColor: '#eaeaf0',
    borderTopWidth: 3,
    borderRadius: 1,
  },
})(StepConnector);

export const QontoStepIcon = (props: StepIconProps): JSX.Element => {
  const classes = useQontoStepIconStyles();
  const { active, completed } = props;

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
      })}
    >
      {completed ? <Check className={classes.completed} /> : <div className={classes.circle} />}
    </div>
  );
};
