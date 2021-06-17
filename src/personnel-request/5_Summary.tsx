import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box, Hidden, Table, TableBody, TableContainer, TableHead,
  TableRow, TableCell, Paper, Collapse, IconButton,
} from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { useQuery } from '@apollo/client';
import CLIENT_INFO from '../queries/client-information.graphql';
import { CreateRequestTypeString } from '../types/create-request-string-types';
import { ClientInformationType } from '../types/job-offer-query-types';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

// These are the rows for the mobile version of the summary table
function Row(props: { row: ReturnType<typeof createData> }) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

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
}

interface AdditionalInfoProps {
  formSchema: CreateRequestTypeString,
}

function createData(name: string, value: string | Date |
{ id: string; label: string; language: string; level: string; }[]) {
  return {
    name, value,
  };
}

export default function AdditionalInfo(props: AdditionalInfoProps): JSX.Element {
  const {
    formSchema,
  } = props;
  const {
    data: ClientDetails, loading: ClientDetailsLoading, error: CLientDetailsError,
  } = useQuery<ClientInformationType>(CLIENT_INFO,
    { variables: { getClientId: formSchema.client } });
  // Here we populate the table rows

  const summaryLabels: { [key:string]:string } = {
    approxStartDate: 'Fecha',
    client: 'Cliente-ID',
    client_name: 'Client',
    contractType: 'Tipo de contrato',
    externalRep: 'Representante Externo-ID',
    externalRep_name: 'Representante Externo',
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
    requiresTechnical: 'Requiere aplicación de prueba técnica',
    serviceType: 'Tipo de servicio',
    shift: 'Días laborales',
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

  const rows2 = rows.filter((row) => row.name !== 'ID' && row.name !== 'Cliente-ID' && row.name !== 'Etapa' && row.name !== 'Representante Interno' && row.name !== 'Representante Externo-ID');

  function getRowValueLabel(row_name: string, row_value: Date | string |
  { id: string; label: string; language: string; level: string; }[]) {
    if (row_name === 'Fecha') {
      return row_value.toLocaleString();
    }
    return row_value;
  }

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
                  {' '}
                  {ClientDetails?.name}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows2.map((row) => (
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
                {rows2.map((row) => (
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
