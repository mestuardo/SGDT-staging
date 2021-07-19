import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { profileCardStyles } from '../styles';

interface SkillsCardProps{
  type: string,
  addJob: (
    companyName: string,
    period: string,
    position: string,
    functions: string,
    technologiesUsed: string) => void,
  setAddJob: (state: boolean) => void,
}

export default function AddJobCard(props: SkillsCardProps) : JSX.Element {
  const [companyName, setCompanyName] = React.useState<string>('');
  const [period, setPeriod] = React.useState<string>('');
  const [position, setPosition] = React.useState<string>('');
  const [functions, setFunctions] = React.useState<string>('');
  const [technologiesUsed, setTechnologiesUsed] = React.useState<string>('');
  const [open, setOpen] = React.useState(true);
  const { addJob, type, setAddJob } = props;

  const classes = profileCardStyles();

  const addJobToPtofile = () => {
    addJob(companyName, period, position, functions, technologiesUsed);
    setCompanyName('');
    setPosition('');
    setFunctions('');
    setTechnologiesUsed('');
    setPeriod('');
    setOpen(false);
    setAddJob(false);
  };

  const handleClose = () => {
    setOpen(false);
    setAddJob(false);
  };

  const getJob = () => (
    <div style={{ width: '40vw', height: '80vw' }}>
      <DialogTitle style={{ textAlign: 'center', backgroundColor: '#19857b', color: 'white' }}>Trabajo Realizado</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Empresa:
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          type="text"
          fullWidth
          multiline
          onChange={(c) => { setCompanyName(c.target.value); }}
          variant="filled"
        />
        <DialogContentText>
          Periodo:
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="period"
          type="text"
          fullWidth
          multiline
          onChange={(c) => { setPeriod(c.target.value); }}
          variant="filled"
        />
        <DialogContentText>
          Cargo en la empresa:
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="position"
          type="text"
          fullWidth
          multiline
          rows={10}
          onChange={(c) => { setPosition(c.target.value); }}
          variant="filled"
        />
        <DialogContentText>
          Funciones:
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="functions"
          type="text"
          fullWidth
          multiline
          rows={10}
          onChange={(c) => { setFunctions(c.target.value); }}
          variant="filled"
        />
        <DialogContentText>
          Tecnologías usadas:
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          type="text"
          fullWidth
          multiline
          rows={10}
          onChange={(c) => { setTechnologiesUsed(c.target.value); }}
          variant="filled"
        />
      </DialogContent>
      <DialogActions style={{ display: 'flex', justifyContent: 'center' }}>
        <Button onClick={handleClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={() => { addJobToPtofile(); }} color="primary">
          Agregar
        </Button>
      </DialogActions>
    </div>
  );

  return (
    <Dialog scroll="paper" open={open} onClose={handleClose} className={classes.rootDialog}>
      {type === 'jobs'
        && (
          getJob()
        )}
    </Dialog>
  );
}
