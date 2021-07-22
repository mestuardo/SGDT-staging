import React from 'react';
import { render } from '@testing-library/react';
import RecruiterView from '../../../views/recruiter_view';

const exampleRecruitmentProcessData = {
  requests: [],
  jobOffers: [],
};

describe('Recruiter view', () => {
  it('renders correctly', () => {
    const { debug } = render(<RecruiterView data={exampleRecruitmentProcessData} />);
    debug();
  });
});
