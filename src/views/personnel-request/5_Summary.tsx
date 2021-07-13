import React from 'react';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import {
  Box,
  Collapse,
  Hidden,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';

import { summaryStyles } from './personnel-request-form-styles';
import { CreateRequestTypeString } from '../../types/create-request-string-types';

interface AdditionalInfoProps {
  formSchema: CreateRequestTypeString,
}

// These are the rows for the mobile version of the summary table
const Row = (props: { row: ReturnType<typeof createData> }) => {
  const { row } = props;
  const classes = summaryStyles();

  const [open, setOpen] = React.useState(false);

  return (
    <>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>{row.name}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>

                  <TableRow key={row.name}>
                    <TableCell component="th" scope="row" style={{ maxWidth: '200px' }}>
                      {row.value}
                    </TableCell>

                  </TableRow>

                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

const createData = (name: string, value: string | Date | number |
{ id: string; label: string; language: string; level: string; }[]) => ({ name, value });

export default function AdditionalInfo(props: AdditionalInfoProps) : JSX.Element {
  const {
    formSchema,
  } = props;

  const summaryLabels: { [key:string]:string } = {
    approxStartDate: 'Fecha',
    client: 'Client',
    contractType: 'Tipo de contrato',
    formationStatus: 'Nivel de formación',
    id: 'ID',
    internalRep: 'Representante Interno',
    levelOfStudies: 'Nivel de estudios',
    languages: 'Idiomas',
    maxSalary: 'Renta máx. Contratación',
    position: 'Cargo requerido',
    possibleDuration: 'Duración de servicio',
    recruiter: 'Reclutador@',
    requestDescription: 'Funciones del cargo',
    requiresComputer: 'Requiere computador',
    serviceType: 'Tipo de servicio',
    shiftType: 'Jornada laboral',
    softSkills: 'Habilidades blandas',
    specialRequirements: 'Requerimientos especiales',
    stage: 'Etapa',
    technicalRequirements: 'Requerimientos técnicos',
    vacancies: 'Vacantes',
    workAdress: 'Dirección laboral',
    yearsExperience: 'Años de experiencia',
  };

  const stringLanguages: string[] = formSchema.languages.map(
    (lang:{ id: string; label: string; language: string; level: string; }) => (
      ` ${lang.language} ${lang.level}`
    ),
  );
  const rows = Object.keys(formSchema).map(
    (keyName:string) => (keyName !== 'languages' ? createData(summaryLabels[keyName], formSchema[keyName]) : createData(summaryLabels[keyName], stringLanguages.toString())),
  );

  const filteredRows = rows.filter((row) => row.name !== 'ID' && row.name !== 'Etapa' && row.name !== 'Representante Interno');

  const getRowValueLabel = (row_name: string, row_value: Date | string | number |
  { id: string; label: string; language: string; level: string; }[]) => {
    if (row_name === 'Fecha') {
      return row_value.toLocaleString();
    }
    return row_value;
  };

  return (
    <>
      <Hidden xsDown>
        <TableContainer component={Paper}>
          <Table size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Elemento</TableCell>
                <TableCell align="right">
                  Detalles
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRows.map((row) => (
                <TableRow key={row.name}>
                  <TableCell
                    component="th"
                    scope="row"
                    style={{
                      maxWidth: '300px',
                      whiteSpace: 'normal',
                      wordWrap: 'break-word',
                    }}
                  >
                    {/* Here we need to add the labels according to each row.name */}
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{getRowValueLabel(row.name, row.value)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Hidden>
      <Hidden smUp>

        <>
          <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
              <TableBody>
                {filteredRows.map((row) => (
                  <Row key={row.name} row={row} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      </Hidden>
    </>
  );
}
