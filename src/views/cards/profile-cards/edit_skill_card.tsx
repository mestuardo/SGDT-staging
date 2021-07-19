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
  addSkill: (title: string, body: string) => void,
  setAddSkill: (state: boolean) => void,
}

export default function AddSkillCard(props: SkillsCardProps) : JSX.Element {
  const [title, setTitle] = React.useState<string>('');
  const [body, setBody] = React.useState<string>('');
  const [open, setOpen] = React.useState(true);
  const { type, addSkill, setAddSkill } = props;

  const classes = profileCardStyles();

  const addSkillToPtofile = () => {
    addSkill(title, body);
    setTitle('');
    setBody('');
    setOpen(false);
    setAddSkill(false);
  };

  const handleClose = () => {
    setOpen(false);
    setAddSkill(false);
  };

  const getSkills = () => (
    <div style={{ width: '40vw', height: '80vw' }}>
      <DialogTitle style={{ textAlign: 'center', backgroundColor: '#19857b', color: 'white' }}>Trabajo Realizado</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Tipo de Habilidad:
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="type"
          type="text"
          fullWidth
          multiline
          onChange={(c) => { setTitle(c.target.value); }}
          variant="filled"
        />
        <DialogContentText>
          Descripción:
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="description"
          type="text"
          fullWidth
          multiline
          rows={10}
          onChange={(c) => { setBody(c.target.value); }}
          variant="filled"
        />
      </DialogContent>
      <DialogActions style={{ display: 'flex', justifyContent: 'center' }}>
        <Button onClick={handleClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={() => { addSkillToPtofile(); }} color="primary">
          Agregar
        </Button>
      </DialogActions>
    </div>
  );

  return (
    <Dialog scroll="paper" open={open} onClose={handleClose} className={classes.rootDialog}>
      {type === 'skills'
        && (
          getSkills()
        )}
    </Dialog>
  );
}
