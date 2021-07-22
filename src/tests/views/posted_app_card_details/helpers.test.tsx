import React from 'react';
import { render } from '@testing-library/react';

import GetButtons from '../../../views/posted_app_card_details/helpers';

const mockApprovalDialog = jest.fn();
const mockRejectionDialog = jest.fn();
const createExampleApplication = (status:string, stage:string) => ({
  id: '123',
  jobOfferId: '123',
  professionalId: '123',
  status,
  recruiterId: '123',
  questions: [],
  answers: [],
  assessment: 'example',
  stage,
});
const exampleProfessional = {
  id: '123',
  name: 'John',
  firstSurname: 'Doe',
  secondSurname: 'Perez',
  rut: '12345678-9',
  specialty: 'programming',
  currentJob: 'IT clover',
  savedJobOffers: [],
};

describe('Profile view helpers', () => {
  test.skip('GetButtons renders correctly on rejected status', () => {
    const exampleApplication = createExampleApplication('REJECTED', 'OTHER');
    const { getByText } = render(
      <GetButtons
        status={exampleApplication.status}
        currentProfessional={exampleProfessional}
        currentApplication={exampleApplication}
        handleOpenApprovalDialog={mockApprovalDialog}
        handleOpenRejectDialog={mockRejectionDialog}
      />,
    );
    expect(getByText(exampleProfessional.rut)).toBeInTheDocument();
  });

  test.skip('GetButtons renders correctly on in process status & job offer stage', () => {
    const exampleApplication = createExampleApplication('IN_PROCESS', 'JOB_OFFER');
    const { getByText } = render(
      <GetButtons
        status={exampleApplication.status}
        currentProfessional={exampleProfessional}
        currentApplication={exampleApplication}
        handleOpenApprovalDialog={mockApprovalDialog}
        handleOpenRejectDialog={mockRejectionDialog}
      />,
    );
    expect(getByText('CONVERTIR EN CANDIDATO')).toBeInTheDocument();
  });

  test.skip('GetButtons renders correctly on in process status & other stage', () => {
    const exampleApplication = createExampleApplication('IN_PROCESS', 'OTHER');
    const { getByText } = render(
      <GetButtons
        status={exampleApplication.status}
        currentProfessional={exampleProfessional}
        currentApplication={exampleApplication}
        handleOpenApprovalDialog={mockApprovalDialog}
        handleOpenRejectDialog={mockRejectionDialog}
      />,
    );
    expect(getByText('PASAR A SIGUIENTE FASE')).toBeInTheDocument();
  });

  test.skip('GetButtons renders correctly on accepted status', () => {
    const exampleApplication = createExampleApplication('ACCEPTED', 'OTHER');
    const { getByRole } = render(
      <GetButtons
        status={exampleApplication.status}
        currentProfessional={exampleProfessional}
        currentApplication={exampleApplication}
        handleOpenApprovalDialog={mockApprovalDialog}
        handleOpenRejectDialog={mockRejectionDialog}
      />,
    );
    expect(getByRole('button')).toBeInTheDocument();
  });

  test.skip('GetButtons renders empty on other status', () => {
    const exampleApplication = createExampleApplication('OTHER', 'OTHER');
    const { container } = render(
      <GetButtons
        status={exampleApplication.status}
        currentProfessional={exampleProfessional}
        currentApplication={exampleApplication}
        handleOpenApprovalDialog={mockApprovalDialog}
        handleOpenRejectDialog={mockRejectionDialog}
      />,
    );
    expect(container.firstChild).toBeEmptyDOMElement();
  });
});
