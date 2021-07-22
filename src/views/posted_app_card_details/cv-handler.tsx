/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react';
import { Button } from '@material-ui/core';
import { saveAs } from 'file-saver';
import { Packer, Document } from 'docx';

import DocumentCreator from '../button-test/cv-generator';
import { GetProfessionalType } from '../../types/get-professional-types';

interface DocumentComponentProps{
  currentProfessional: GetProfessionalType,
}

export default function DocumentComponent(props: DocumentComponentProps) : JSX.Element {
  const { currentProfessional } = props;
  const documentCreator = new DocumentCreator();

  const generateDocument = async () => {
    const doc: Document = documentCreator.create(currentProfessional);
    const blob = await Packer.toBlob(doc);
    saveAs(blob, `${currentProfessional.name}.docx`);
  };

  return (
    <div style={{ margin: '10px' }}>
      <Button onClick={generateDocument} variant="contained" color="primary" component="span">
        Generar CV
      </Button>
    </div>
  );
}
