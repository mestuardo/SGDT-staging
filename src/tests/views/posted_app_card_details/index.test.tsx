import React from 'react';
import { render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { DocumentNode } from '@apollo/client';

import FILTER_APPLICATIONS from '../../../queries/filter-applications.graphql';
import ProfilesView from '../../../views/posted_app_card_details';
import { exampleJobOffer } from '../../mock-elements';

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
  },
]);

describe('Profiles view', () => {
  it('renders correctly', async () => {
    const { getByText } = render(
      <MockedProvider mocks={defineMocks('IN_PROGRESS', 'OTHER')} addTypename={false}>
        <ProfilesView
          reqId={exampleJobOffer.id}
          jobOfferData={exampleJobOffer}
          width="lg"
        />
      </MockedProvider>,
    );

    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(getByText(`Oferta ${exampleJobOffer.position}`)).toBeInTheDocument();
  });
});
