import React from 'react';
import { TextField } from '@material-ui/core';
import { ProfessionalJobOfferDetail } from '../../../types/job-offer-query-types';

interface QuestionsProps {
  jobOffer: ProfessionalJobOfferDetail,
  handleAddAnswer: (index: number, text: string) => void,
}

export default function Questions(props: QuestionsProps) : JSX.Element {
  const { jobOffer, handleAddAnswer } = props;

  return (
    <>
      {jobOffer.questions && jobOffer.questions.map((question, index) => (
        <TextField
          key={question}
          autoFocus={index === 0}
          label={question}
          fullWidth
          multiline
          rows={3}
          onChange={(event) => handleAddAnswer(index, event.target.value)}
        />
      ))}
    </>
  );
}
