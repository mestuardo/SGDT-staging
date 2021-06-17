import { RequestSummaryType } from './request-query-types';
import { JobOfferSummaryType } from './job-offer-query-types';

export interface RecruitmentProcessData {
  requests: RequestSummaryType[],
  jobOffers: JobOfferSummaryType[],
}
