import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { DocumentNode } from '@apollo/client';

import { JobOfferSummaryType } from '../../../types/job-offer-query-types';
import FILTER_APPLICATIONS from '../../../queries/filter-applications.graphql';
import SAVE_JOB_OFFER from '../../../mutations/saveJobOffer.graphql';
import PostedApplicationCard from '../../../views/cards/posted_application_card';

const milisecondsInADay = 86400000;
const nowInMiliseconds = Date.now();

const jobOfferConstructor = (daysUntilSLA: number, closeMessage: string): JobOfferSummaryType => ({
  id: '1',
  position: 'Programmer',
  requestCreationDate: nowInMiliseconds - 4 * milisecondsInADay,
  jobOfferCreationDate: nowInMiliseconds - 2 * milisecondsInADay,
  closeJobOfferDate: nowInMiliseconds + 10 * milisecondsInADay,
  closeMessage,
  sla_start: nowInMiliseconds + daysUntilSLA * milisecondsInADay,
  sla_end: nowInMiliseconds + (daysUntilSLA + 1) * milisecondsInADay,
  vacancies: 1,
  client: 'example client',
  recruiter: 'example recruiter',
});
const exampleJobOffer = jobOfferConstructor(1, '');
const mockHandleOpen = jest.fn();

const defineMocks = (status:string, stage:string) => ([
  {
    request: {
      query: FILTER_APPLICATIONS as DocumentNode,
      variables: {
        jobOfferId: exampleJobOffer.id,
      },
    },
    result: {
      data: {
        jobOfferApplications: [
          {
            id: '123',
            jobOfferId: exampleJobOffer.id,
            professionalId: '123',
            status,
            recruiterId: '123',
            questions: [],
            answers: [],
            assessment: 'example',
            stage,
          },
        ],
      },
    },
  }, {
    request: {
      query: SAVE_JOB_OFFER as DocumentNode,
      variables: {
        saveJobOfferProfessionalId: '60e7cb10b2879c001142d330',
        saveJobOfferJobOfferId: exampleJobOffer.id,
      },
    },
    result: {},
  },
]);

const testWithOptions = (status:string, stage:string, jobOffer:JobOfferSummaryType) => {
  const { getByText, getByTestId } = render(
    <MockedProvider mocks={defineMocks(status, stage)} addTypename={false}>
      <PostedApplicationCard
        jobOffer={jobOffer}
        handleOpenDetails={mockHandleOpen}
      />
    </MockedProvider>,
  );

  return { getByText, getByTestId };
};

describe('Posted application card', () => {
  it('renders correctly', async () => {
    const { getByText } = render(
      <MockedProvider mocks={defineMocks('IN_PROGRESS', 'OTHER')} addTypename={false}>
        <PostedApplicationCard
          jobOffer={exampleJobOffer}
          handleOpenDetails={mockHandleOpen}
        />
      </MockedProvider>,
    );

    await waitFor(() => {});

    expect(getByText(exampleJobOffer.position)).toBeInTheDocument();
  });

  it('renders blue badges', async () => {
    const { getByText, getByTestId } = testWithOptions('ACCEPTED', 'OTHER', exampleJobOffer);

    await waitFor(() => {});

    expect(getByText(exampleJobOffer.position)).toBeInTheDocument();
    expect(getByTestId('card-badge').children[1].classList.contains('MuiBadge-colorPrimary')).toBe(true);
  });

  it('renders green badges', async () => {
    const { getByText, getByTestId } = testWithOptions('IN_PROGRESS', 'PSYCHOLOGICAL', exampleJobOffer);

    await waitFor(() => {});

    expect(getByText(exampleJobOffer.position)).toBeInTheDocument();
    expect(getByTestId('card-badge').children[1].classList.contains('MuiBadge-colorSecondary')).toBe(true);
  });

  it('renders red badges', async () => {
    const { getByText, getByTestId } = testWithOptions('IN_PROGRESS', 'TECHNICAL', exampleJobOffer);

    await waitFor(() => {});

    expect(getByText(exampleJobOffer.position)).toBeInTheDocument();
    expect(getByTestId('card-badge').children[1].classList.contains('MuiBadge-colorError')).toBe(true);
  });

  it('renders default color badges', async () => {
    const { getByText, getByTestId } = testWithOptions('IN_PROGRESS', 'OTHER', exampleJobOffer);

    await waitFor(() => {});

    expect(getByText(exampleJobOffer.position)).toBeInTheDocument();
    expect(getByTestId('card-badge').children[1].classList.contains('MuiBadge-anchorOriginTopRightRectangle')).toBe(true);
  });

  it('renders closed jobOffer', () => {
    const { getByText } = testWithOptions('IN_PROGRESS', 'OTHER', jobOfferConstructor(1, 'closed job offer'));

    expect(getByText('Fecha cierre:')).toBeInTheDocument();
  });
});
