import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';

import { profileCardStyles } from '../styles';

interface DialogProps {
  companyName?: string,
  period?: string,
  position?: string,
  functions?: string,
  technologiesUsed?: string,
  type: 'skills' | 'education' | 'jobs',
  title?: string,
  body?: string,
  description?: string,
  educationTitle?: string,
  degree?: string,
  completed?: boolean,
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

export default function DialogInformationCard(props: DialogProps) : JSX.Element {
  const [open, setOpen] = React.useState(false);
  const { type } = props;

  const classes = profileCardStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getJob = () => (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Ver Más
      </Button>
      <Dialog scroll="paper" open={open} onClose={handleClose} className={classes.rootDialog}>
        <div style={{ width: '40vw', height: '80vw' }}>
          <DialogTitle style={{ textAlign: 'center', backgroundColor: '#19857b', color: 'white' }}>Trabajo Realizado</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Empresa:
            </DialogContentText>
            <Typography gutterBottom>
              {props.companyName}
            </Typography>
            <DialogContentText>
              Periodo:
            </DialogContentText>
            <Typography gutterBottom>
              {props.period}
            </Typography>
            <DialogContentText>
              Cargo en la empresa:
            </DialogContentText>
            <Typography gutterBottom>
              {props.position}
            </Typography>
            <DialogContentText>
              Funciones:
            </DialogContentText>
            <Typography gutterBottom>
              {props.functions}
            </Typography>
            <DialogContentText>
              Tecnologías usadas:
            </DialogContentText>
            <Typography gutterBottom>
              {props.technologiesUsed}
            </Typography>
          </DialogContent>
          <DialogActions style={{ display: 'flex', justifyContent: 'center' }}>
            <Button onClick={handleClose} color="primary">
              Aceptar
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    </div>
  );

  const changeTypeNames = (degreeType: string) => {
    switch (degreeType) {
      case 'CAREER':
        return 'Carrera';
      case 'COURSE':
        return 'Curso';
      case 'CERTIFICATION':
        return 'Certificación';
      case 'POSTGRADUATE':
        return 'Postgrado';
      default:
        return 'No Definido';
    }
  };

  const getEducation = () => (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Ver Más
      </Button>
      <Dialog scroll="paper" open={open} onClose={handleClose} className={classes.rootDialog}>
        <div style={{ width: '40vw', height: '80vw' }}>
          <DialogTitle style={{ textAlign: 'center', backgroundColor: '#19857b', color: 'white' }}>Trabajo Realizado</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Tipo:
            </DialogContentText>
            <Typography gutterBottom>
              {changeTypeNames(props.degree || '')}
            </Typography>
            <DialogContentText>
              Titulo:
            </DialogContentText>
            <Typography gutterBottom>
              {props.educationTitle}
            </Typography>
            <DialogContentText>
              Periodo:
            </DialogContentText>
            <Typography gutterBottom>
              {props.period}
            </Typography>
            <DialogContentText>
              Descripción:
            </DialogContentText>
            <Typography gutterBottom>
              {props.description}
            </Typography>
            <DialogContentText>
              Estado:
            </DialogContentText>
            <Typography gutterBottom>
              {props.completed === true ? 'Completado' : 'No Completado'}
            </Typography>
          </DialogContent>
          <DialogActions style={{ display: 'flex', justifyContent: 'center' }}>
            <Button onClick={handleClose} color="primary">
              Aceptar
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    </div>
  );

  const getSkill = () => (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Ver Más
      </Button>
      <Dialog scroll="paper" open={open} onClose={handleClose} className={classes.rootDialog}>
        <div style={{ width: '40vw', height: '80vw' }}>
          <DialogTitle style={{ textAlign: 'center', backgroundColor: '#19857b', color: 'white' }}>Trabajo Realizado</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Skill:
            </DialogContentText>
            <Typography gutterBottom>
              {props.title}
            </Typography>
            <DialogContentText>
              Nivel:
            </DialogContentText>
            <Typography gutterBottom>
              {props.body}
            </Typography>
          </DialogContent>
          <DialogActions style={{ display: 'flex', justifyContent: 'center' }}>
            <Button onClick={handleClose} color="primary">
              Aceptar
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    </div>
  );

  return (
    <div>
      {type === 'jobs'
        && (
          getJob()
        )}
      {type === 'education'
        && (
          getEducation()
        )}
      {type === 'skills'
        && (
          getSkill()
        )}
    </div>
  );
}

DialogInformationCard.defaultProps = defaultCardProps;
