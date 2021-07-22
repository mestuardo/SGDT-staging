import React from 'react';
import {
  CardActionArea,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
} from '@material-ui/core';
import { useMutation } from '@apollo/client';
import CREATE_APPLICATION_MUTATION from '../../mutations/createApplication.graphql';
import { ProfessionalJobOfferDetail } from '../../types/job-offer-query-types';
import ApplyOfferDialogInformation from './apply_offer_dialog/information';
import ApplyOfferDialogQuestions from './apply_offer_dialog/questions';
import ApplyOfferDialogButtons from './apply_offer_dialog/buttons';
import ApplyOfferDialogAlert from './apply_offer_dialog/alert';

interface ApplyOfferDialogProps {
  openDialog: boolean,
  closeDialog: () => void,
  notifyApplied: () => void,
  jobOffer: ProfessionalJobOfferDetail,
}

export default function ApplyOfferDialog(props: ApplyOfferDialogProps) : JSX.Element {
  const {
    openDialog, jobOffer, notifyApplied, closeDialog,
  } = props;

  const [publishApplication,
    { loading: mutationLoading }] = useMutation(CREATE_APPLICATION_MUTATION);

  const [currentStep, setCurrentStep] = React.useState('Offer Information');
  const [answers, setAnswers] = React.useState<(string | undefined)[]>([]);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const [snackbarType, setSnackbarType] = React.useState<('error' | 'success')>('success');

  const updateAlert = (message: string, type: 'error' | 'success') => {
    setSnackbarMessage(message);
    setSnackbarType(type);
    setOpenSnackbar(true);
  };

  const handleAddAnswer = (index: number, text: string) => {
    if (text.length > 0) {
      const answersModified : (string | undefined)[] = [...answers];
      answersModified[index] = text;
      setAnswers(answersModified);
    }
  };

  const handleSubmit = () => {
    if (answers.length === jobOffer.questions?.length && !answers.includes(undefined)) {
      publishApplication({
        variables: {
          createApplicationInput: {
            professionalId: localStorage.getItem('professionalId'),
            answers,
            jobOfferId: jobOffer.id,
            status: 'IN_PROCESS',
            assessment: '',
          },
        },
      }).then(() => {
        updateAlert('Postulación realizada con éxito', 'success');
        notifyApplied();
        closeDialog();
      }).catch(() => {
        updateAlert('Ha habido un problema al enviar tu postulación', 'error');
      });
    } else {
      updateAlert('No has respondido todas las preguntas', 'error');
    }
  };

  React.useEffect(() => {
    if (jobOffer.questions) setAnswers(new Array(jobOffer.questions.length));
    setCurrentStep('Offer Information');
  }, [jobOffer]);

  return (
    <>
      <Dialog
        open={openDialog}
        onClose={closeDialog}
        aria-labelledby="applicant-info-details"
      >
        <CardActionArea>
          <CardMedia
            component="img"
            height="150"
            image="https://cdn.givingcompass.org/wp-content/uploads/2019/03/26130148/Meet-the-People-Coding-Our-World.jpg"
            title="Example Image"
          />
        </CardActionArea>
        <DialogContent>
          {currentStep === 'Offer Information' && (
            <ApplyOfferDialogInformation jobOffer={jobOffer} />
          )}
          {currentStep === 'Offer Questions' && (
            <ApplyOfferDialogQuestions jobOffer={jobOffer} handleAddAnswer={handleAddAnswer} />
          )}
        </DialogContent>
        <DialogActions style={{ justifyContent: 'center' }}>
          <ApplyOfferDialogButtons
            jobOffer={jobOffer}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            answers={answers}
            handleSubmit={handleSubmit}
            mutationLoading={mutationLoading}
          />
        </DialogActions>
      </Dialog>
      <ApplyOfferDialogAlert
        openSnackbar={openSnackbar}
        setOpenSnackbar={setOpenSnackbar}
        snackbarType={snackbarType}
        snackbarMessage={snackbarMessage}
      />
    </>
  );
}
