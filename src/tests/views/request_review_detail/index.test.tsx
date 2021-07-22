import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { DocumentNode } from '@apollo/client';
import { createTheme, MuiThemeProvider } from '@material-ui/core/styles';
import userEvent from '@testing-library/user-event';

import { summaryLabels } from '../../../views/request_review_detail/helpers';
import RequestReviewDetail from '../../../views/request_review_detail';
import { exampleRequest, emptyRequest } from '../../mock-elements';
import PUBLISH_JOB_OFFER from '../../../mutations/createJobOffer.graphql';

const mocks = [{
  request: {
    query: PUBLISH_JOB_OFFER as DocumentNode,
    variables: {
      createJobOfferId: exampleRequest.id,
      createJobOfferDescription: 'example',
      createJobOfferQuestions: ['example'],
      SLA_Start: null,
      SLA_End: null,
    },
  },
  result: {
    data: {
      id: exampleRequest.id,
      position: exampleRequest.position,
      sla_start: null,
      sla_end: null,
    },
  },
}];

const midTheme = createTheme({ props: { MuiWithWidth: { initialWidth: 'md' } } });
window.HTMLElement.prototype.scrollIntoView = jest.fn();

describe('Review request helpers', () => {
  test('summaryLabels returns correctly', () => {
    expect(summaryLabels).not.toBe(null);
  });
});

describe('Review request component', () => {
  it('renders request with empty datafields', () => {
    const { getByTestId } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MuiThemeProvider theme={midTheme}>
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
          {/* @ts-ignore */}
          <RequestReviewDetail requestData={emptyRequest} />
        </MuiThemeProvider>
      </MockedProvider>,
    );
    expect(getByTestId('submit-button-small')).toBeInTheDocument();
  });
  it('renders correctly', async () => {
    const { getByLabelText, getByTestId } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MuiThemeProvider theme={midTheme}>
          <RequestReviewDetail requestData={exampleRequest} />
        </MuiThemeProvider>
      </MockedProvider>,
    );

    fireEvent.change(getByLabelText('Descripción'), { target: { value: 'example' } });
    fireEvent.change(getByLabelText('Pregunta 1'), { target: { value: 'example' } });
    await userEvent.type(getByTestId('SLA_1'), '22102021', { delay: 1 });
    await userEvent.type(getByTestId('SLA_2'), '23102021', { delay: 1 });
    expect(getByTestId('submit-button-small')).toBeInTheDocument();
  });
});
