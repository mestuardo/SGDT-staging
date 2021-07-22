import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ApplicantCard from '../../../views/cards/application_card';

const exampleRequest = {
  id: '1',
  position: 'Programmer',
  requestCreationDate: 1624135607,
  jobOfferCreationDate: 1624654007,
  closeJobOfferDate: 1626827707,
  sla_start: 1624826807,
  sla_end: 1626727607,
  vacancies: 1,
  client: 'example client',
  recruiter: 'example recruiter',
};
const mockHandleOpen = jest.fn();

describe('Applicant card', () => {
  it('renders correctly', () => {
    const { getByText, getByTestId } = render(
      <ApplicantCard
        request={exampleRequest}
        handleOpenDetails={mockHandleOpen}
      />,
    );
    expect(getByText(exampleRequest.position)).toBeInTheDocument();
    // TODO: change button to card action area
    fireEvent.click(getByTestId('request-card-area'));
    expect(mockHandleOpen).toHaveBeenCalled();
  });
});
