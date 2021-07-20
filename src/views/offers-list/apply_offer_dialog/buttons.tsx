import React from 'react';
import { Button, CircularProgress } from '@material-ui/core';
import { ProfessionalJobOfferDetail } from '../../../types/job-offer-query-types';

interface ButtonsProps {
  jobOffer: ProfessionalJobOfferDetail,
  currentStep: string,
  setCurrentStep: (newStep: string) => void,
  answers: (string | undefined)[],
  handleSubmit: () => void,
  mutationLoading: boolean,
}

export default function Buttons(props: ButtonsProps) : JSX.Element {
  const {
    jobOffer, currentStep, setCurrentStep, answers, handleSubmit, mutationLoading,
  } = props;

  return (
    <>
      {currentStep === 'Offer Information' && (
        <Button onClick={() => setCurrentStep('Offer Questions')}>
          Preguntas
        </Button>
      )}
      {currentStep === 'Offer Questions' && (
        <>
          <Button onClick={() => setCurrentStep('Offer Information')}>
            Volver
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={
              (jobOffer.questions
              && answers.length !== jobOffer.questions.length)
              || answers.includes(undefined)
            }
          >
            {mutationLoading ? <CircularProgress size={15} /> : 'Postular'}
          </Button>
        </>
      )}
    </>
  );
}
