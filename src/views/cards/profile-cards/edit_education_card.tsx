import React from 'react';
import {
  Dialog,
  Button,
  TextField,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Select,
  InputLabel,
} from '@material-ui/core';
import { profileCardStyles } from '../styles';

interface SkillsCardProps{
  type: string,
  addEducation: (
    title: string,
    period: string,
    description: string,
    degree: string,
    completed: string) => void,
  setAddEducation: (state: boolean) => void,
}

export default function AddEducationCard(props: SkillsCardProps) : JSX.Element {
  const [title, setTitle] = React.useState<string>('');
  const [period, setPeriod] = React.useState<string>('');
  const [description, setDescription] = React.useState<string>('');
  const [open, setOpen] = React.useState(true);
  const [degree, setDegree] = React.useState('CAREER');
  const [state, setState] = React.useState('');

  const { addEducation, type, setAddEducation } = props;

  const classes = profileCardStyles();

  const addEducationToProfile = () => {
    addEducation(title, period, description, degree, state);
    setTitle('');
    setPeriod('');
    setDescription('');
    setOpen(false);
    setAddEducation(false);
  };

  const handleClose = () => {
    setOpen(false);
    setAddEducation(false);
  };

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setDegree((event.target as HTMLInputElement).value);
  };

  const handleChangeState = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState((event.target as HTMLInputElement).value);
  };

  const getEducation = () => (
    <div style={{ width: '40vw', height: '80vw' }}>
      <DialogTitle style={{ textAlign: 'center', backgroundColor: '#19857b', color: 'white' }}>Educación</DialogTitle>
      <DialogContent>
        <FormControl component="fieldset">
          <InputLabel htmlFor="age-native-simple">Grado</InputLabel>
          <Select
            native
            value={degree}
            onChange={handleChange}
            inputProps={{
              name: 'Grado',
              id: 'grade-native-simple',
            }}
            style={{ marginBottom: '10%' }}
          >
            <option value="CAREER">Carrera</option>
            <option value="COURSE">Curso</option>
            <option value="CERTIFICATION">Certificación</option>
            <option value="POSTGRADUATE">Postgrado</option>
          </Select>
        </FormControl>
        <DialogContentText>
          Titulo:
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          type="email"
          fullWidth
          multiline
          onChange={(c) => { setTitle(c.target.value); }}
          variant="filled"
        />
        <DialogContentText>
          Periodo:
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="filled-multiline-flexible"
          type="email"
          fullWidth
          multiline
          onChange={(c) => { setPeriod(c.target.value); }}
          variant="filled"
        />
        <DialogContentText>
          Institución:
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="filled-basic"
          type="email"
          fullWidth
          multiline
          rows={10}
          onChange={(c) => { setDescription(c.target.value); }}
          variant="filled"
        />
        <FormControl component="fieldset">
          <FormLabel component="legend">Estado</FormLabel>
          <RadioGroup aria-label="gender" name="gender1" value={state} onChange={handleChangeState}>
            <FormControlLabel value="true" control={<Radio />} label="Completado" />
            <FormControlLabel value="false" control={<Radio />} label="No completado" />
          </RadioGroup>
        </FormControl>
      </DialogContent>
      <DialogActions style={{ display: 'flex', justifyContent: 'center' }}>
        <Button onClick={handleClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={() => { addEducationToProfile(); }} color="primary">
          Agregar
        </Button>
      </DialogActions>
    </div>
  );

  return (
    <Dialog scroll="paper" open={open} onClose={handleClose} className={classes.rootDialog}>
      {type === 'education'
        && (
          getEducation()
        )}
    </Dialog>
  );
}
