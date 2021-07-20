import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { ApplyOfferDialogStyles } from '../styles';
import {
  capitalizeEnumSentence,
  processJobOffer,
  jobModalityTransformer,
} from '../../utils';
import JobDescriptionField from '../job-description-field';
import { ProfessionalJobOfferDetail } from '../../../types/job-offer-query-types';

interface InformationProps {
  jobOffer: ProfessionalJobOfferDetail,
}

export default function Information(props: InformationProps) : JSX.Element {
  const { jobOffer } = props;
  const classes = ApplyOfferDialogStyles();

  const jobOfferData = processJobOffer(jobOffer);

  return (
    <>
      <Typography variant="h4" component="h4">
        {jobOffer.position}
      </Typography>
      <div className={classes.mainMetadataContainer}>
        <Typography>
          <Box fontWeight="fontWeightBold">
            {capitalizeEnumSentence(jobOffer.shiftType)}
          </Box>
        </Typography>
        <Typography>
          <Box fontWeight="fontWeightBold">
            {jobModalityTransformer(jobOffer.jobModality) || 'Presencial'}
          </Box>
        </Typography>
      </div>
      <Typography>
        <Box py={1}>
          {jobOffer.offerDescription}
        </Box>
      </Typography>
      {jobOfferData.map(
        (fieldData) => (
          <JobDescriptionField
            key={fieldData.field}
            field={fieldData.field}
            value={fieldData.value}
          />
        ),
      )}
    </>
  );
}
