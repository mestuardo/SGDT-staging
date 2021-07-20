import React from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';

import { CreateRequestTypeString } from '../../types/create-request-string-types';

interface AdditionalInfoProps {
  formSchema: CreateRequestTypeString,
}

const createData = (name: string, value: string | Date | number |
{ id: string; label: string; language: string; level: string; type: string }[] |
{ requirement: string, obligatoriness: string }[]| {
  requirement: string;
  obligatoriness: string
}) => ({ name, value });

export default function AdditionalInfo(props: AdditionalInfoProps) : JSX.Element {
  const {
    formSchema,
  } = props;

  const summaryLabels: { [key:string]:string } = {
    approxStartDate: 'Fecha ingreso',
    client: 'Cliente',
    contractType_1: 'Tipo de contrato 1',
    possibleDuration_1: 'Duración contrato 1 (Meses)',
    contractType_2: 'Tipo de contrato 2',
    possibleDuration_2: 'Duración contrato 2 (Meses)',
    contractType_3: 'Tipo de contrato 3',
    possibleDuration_3: 'Duración contrato 3 (Meses)',
    formationStatus: 'Nivel de formación',
    id: 'ID',
    internalRep: 'Representante Interno',
    levelOfStudies: 'Nivel de estudios',
    languages: 'Idiomas',
    maxSalary: 'Renta máx. Contratación',
    position: 'Cargo requerido',
    workAdress_city: 'Ciudad',
    workAdress_street: 'Calle',
    workAdress_number: 'Número',
    workAdress_district: 'Comuna',
    possibleDuration: 'Duración de servicio',
    recruiter: 'Reclutador/a',
    requestDescription: 'Funciones del cargo',
    requiresComputer: 'Requiere computador',
    serviceType: 'Tipo de servicio',
    shiftType: 'Jornada laboral',
    softSkills: 'Habilidades blandas',
    specialRequirements: 'Requerimientos especiales',
    stage: 'Etapa',
    technicalRequirements: 'Requerimientos técnicos',
    vacancies: 'Vacantes',
    yearsExperience: 'Años de experiencia',
  };
  const summaryValues: { [key:string]:string | boolean } = {
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

  const stringLanguages: string[] = formSchema.languages.map(
    (lang:{ id: string; label: string; language: string; level: string; type: string }) => (
      ` ${lang.label}`
    ),
  );

  const stringTechnical: string[] = formSchema.technicalRequirements.map(
    (req:{ requirement: string; obligatoriness: string }) => (
      ` ${req.requirement} ${req.obligatoriness === 'DESIRABLE' ? 'Deseable' : 'Excluyente'}`
    ),
  );

  const rows = Object.keys(formSchema).map(
    (keyName:string) => {
      if (keyName === 'languages') {
        return createData(summaryLabels[keyName], stringLanguages.toString());
      } if (keyName === 'technicalRequirements') {
        return createData(summaryLabels[keyName], stringTechnical.toString());
      } if (['techReq_1',
        'techReq_2',
        'techReq_3',
        'techReq_4',
        'techReq_5',
        'techReq_6',
        'techReq_7',
        'techReq_8',
        'techReq_9',
        'techReq_10'].includes(keyName)) { return createData('techReq', ''); }
      return createData(summaryLabels[keyName], formSchema[keyName]);
    },
  );

  const filteredRows = rows.filter((row) => row.name !== '' && row.name !== 'techReq' && row.name !== 'ID' && row.name !== 'Etapa' && row.name !== 'Representante Interno');

  const getRowValueLabel = (row_name: string, row_value: Date | string | number |
  {
    requirement: string;
    obligatoriness: string
  }[] |
  {
    id: string;
    label: string;
    language: string;
    level: string;
    type: string;
  }[]| {
    requirement: string;
    obligatoriness: string
  }) => {
    if (row_name === 'Fecha ingreso' && (row_value instanceof Date)) {
      return row_value.toLocaleString('es-ES', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
      });
    } if (['Nivel de formación',
      'Nivel de estudios',
      'Tipo de contrato 1',
      'Tipo de contrato 2',
      'Tipo de contrato 3',
      'Jornada laboral',
      'Tipo de servicio',
    ].includes(row_name)
      && typeof row_value === 'string') {
      return summaryValues[row_value];
    }
    return row_value;
  };

  return (
    <>

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

    </>
  );
}
