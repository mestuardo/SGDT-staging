import React from 'react';
import {
  Box,
  Button,
  CircularProgress,
  CardActionArea,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  Snackbar,
  TextField,
  Typography,
} from '@material-ui/core';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { useMutation } from '@apollo/client';
import CREATE_APPLICATION_MUTATION from '../../mutations/createApplication.graphql';
import { ApplyOfferDialogStyles } from './styles';
import {
  capitalizeEnumSentence,
  processJobOffer,
  jobModalityTransformer,
} from '../utils';
import JobDescriptionField from './job-description-field';
import { ProfessionalJobOfferDetail } from '../../types/job-offer-query-types';
import professionalId from '../../global-variables';

function Alert(props: AlertProps) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

interface ApplyOfferDialogProps {
  openDialog: boolean,
  closeDialog: () => void,
  notifyApplied: () => void,
  jobOffer: ProfessionalJobOfferDetail,
  /*
  handleCloseDialog: ()=> void,
  dialogTitle: string,
  dialogContentID: string,
  applicationInfo: FilterApplicationsType,
  professionalInfo: GetProfessionalType,
  step: string,
  */
}

export default function ApplyOfferDialog(props: ApplyOfferDialogProps) : JSX.Element {
  const {
    openDialog, jobOffer, notifyApplied, closeDialog,
  } = props;
  const classes = ApplyOfferDialogStyles();
  /*
  console.log('jobOffer');
  console.log(jobOffer);
  */

  const [publishApplication,
    { loading: mutationLoading }] = useMutation(CREATE_APPLICATION_MUTATION);

  const [currentStep, setCurrentStep] = React.useState('Offer Information');
  const [answers, setAnswers] = React.useState<(string | undefined)[]>([]);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const [snackbarType, setSnackbarType] = React.useState<('error' | 'success')>('success');
  const [activateTab, setActivateTab] = React.useState(1);

  const jobOfferData = processJobOffer(jobOffer);
  // console.log(jobOfferData);

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
            professionalId,
            answers,
            jobOfferId: jobOffer.id,
            status: 'IN_PROCESS',
            recruiterId: jobOffer.recruiter || '60bcf8ec4bd9280011fed3c4', // esto está así porque la mayoría de las ofertas no tiene recruiterId
            assessment: '',
          },
        },
      }).then(() => {
        setSnackbarMessage('Postulación realizada con éxito');
        setSnackbarType('success');
        setOpenSnackbar(true);
        notifyApplied();
        closeDialog();
      }).catch(() => {
        setSnackbarMessage('Ha habido un problema al enviar tu postulación');
        setSnackbarType('error');
        setOpenSnackbar(true);
      });
    } else {
      setSnackbarMessage('No has respondido todas las preguntas');
      setSnackbarType('error');
      setOpenSnackbar(true);
    }
  };

  React.useEffect(() => {
    if (jobOffer.questions) setAnswers(new Array(jobOffer.questions.length));
    setCurrentStep('Offer Information');
  }, [jobOffer]);

  type DataSectionType =
    | 'requiredProfile'
    | 'contractInformation'
    | 'additionInformation';

  const [dataSection, setDataSection] = React.useState<DataSectionType>(
    'requiredProfile',
  );

  return (
    <>
      <Dialog
        open={openDialog}
        onClose={closeDialog}
        aria-labelledby="applicant-info-details"
        className={classes.content}
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
            <div>
              {jobOfferData[dataSection].map(
                (fieldData) => (
                  <JobDescriptionField
                    key={fieldData.field}
                    field={fieldData.field}
                    value={fieldData.value}
                  />
                ),
              )}
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                onClick={() => {
                  setDataSection('requiredProfile');
                  setActivateTab(1);
                }}
                variant={activateTab === 1 ? 'contained' : 'outlined'}
              >
                1
              </Button>
              <Button
                onClick={() => {
                  setDataSection('contractInformation');
                  setActivateTab(2);
                }}
                variant={activateTab === 2 ? 'contained' : 'outlined'}
              >
                2
              </Button>
              <Button
                onClick={() => {
                  setDataSection('additionInformation');
                  setActivateTab(3);
                }}
                variant={activateTab === 3 ? 'contained' : 'outlined'}
              >
                3
              </Button>
            </div>
          </>
          )}
          {currentStep === 'Offer Questions' && jobOffer.questions && jobOffer.questions.map((question, index) => (
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
        </DialogContent>
        <DialogActions style={{ justifyContent: 'center' }}>
          {currentStep === 'Offer Information' && (
            <Button onClick={() => setCurrentStep('Offer Questions')}>
              Postular
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
                {mutationLoading ? <CircularProgress size={15} /> : 'Enviar'}
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
      <Snackbar open={openSnackbar} autoHideDuration={5000} onClose={() => setOpenSnackbar(false)}>
        <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarType}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
