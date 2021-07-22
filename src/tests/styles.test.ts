import createMuiTheme from '../theme';
import { applicationCardStyles, postedApplicationCardStyles } from '../views/cards/styles';
import {
  jobOfferDetailStyles,
  profileCardStyles,
  ColorlibConnector,
  useColorlibStepIconStyles,
  recruitmentProcessStepperStyles,
  applicantInfoStyles,
  changeStageDialogStyles,
} from '../views/job_offer_process/styles';
import {
  clientInfoStyles,
  requiredProfileInfoStyles,
  collabInfoStyles,
  hiringInfoStyles,
  summaryStyles,
  requestFormStyles,
} from '../views/personnel-request/personnel-request-form-styles';
import postedAppCardStyles from '../views/posted_app_card_details/styles';
import recruiterViewStyles from '../views/recruiter_view/styles';
import recruitingHeadViewStyles from '../views/recruiting_head_view/styles';
import requestReviewStyles from '../views/request_review_detail/styles';

test('general theme does exist', () => {
  expect(createMuiTheme).not.toBeNull();
});

describe('check styles for card components', () => {
  test('application card style exists', () => {
    expect(applicationCardStyles).not.toBeNull();
  });
  test('posted application card style exists', () => {
    expect(postedApplicationCardStyles).not.toBeNull();
  });
});

describe('check styles for job_offer_process components', () => {
  test('job offer details style exists', () => {
    expect(jobOfferDetailStyles).not.toBeNull();
  });
  test('profile card style exists', () => {
    expect(profileCardStyles).not.toBeNull();
  });
  test('color lib connector style exists', () => {
    expect(ColorlibConnector).not.toBeNull();
  });
  test('color step icon style exists', () => {
    expect(useColorlibStepIconStyles).not.toBeNull();
  });
  test('recruitment process stepper style exists', () => {
    expect(recruitmentProcessStepperStyles).not.toBeNull();
  });
  test('applicant info style exists', () => {
    expect(applicantInfoStyles).not.toBeNull();
  });
  test('change stage dialog style exists', () => {
    expect(changeStageDialogStyles).not.toBeNull();
  });
});

describe('check styles for personnel_request_form components', () => {
  test('client info style exists', () => {
    expect(clientInfoStyles).not.toBeNull();
  });
  test('required profile info style exists', () => {
    expect(requiredProfileInfoStyles).not.toBeNull();
  });
  test('collab info style exists', () => {
    expect(collabInfoStyles).not.toBeNull();
  });
  test('hiring info style exists', () => {
    expect(hiringInfoStyles).not.toBeNull();
  });
  test('summary style exists', () => {
    expect(summaryStyles).not.toBeNull();
  });
  test('summary form style exists', () => {
    expect(requestFormStyles).not.toBeNull();
  });
});

test('check style for posted app card', () => {
  expect(postedAppCardStyles).not.toBeNull();
});

test('check style for recruiter view', () => {
  expect(recruiterViewStyles).not.toBeNull();
});

test('check style for recruiter head view', () => {
  expect(recruitingHeadViewStyles).not.toBeNull();
});

test('check style for review request view', () => {
  expect(requestReviewStyles).not.toBeNull();
});
