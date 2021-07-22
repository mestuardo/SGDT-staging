import React from 'react';
import { Button, InputLabel } from '@material-ui/core';
import { useMutation } from '@apollo/client';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { documentUploadStyles } from './styles';
import { UploadDocumentType } from '../../types/upload-document-type';
import UPLOAD_CV_MUTATION from '../../mutations/uploadDocument.graphql';

interface UploadButtonProps{
  applicationId: string,
  handleObjURL: (obj:{ name:string, url:string }) => void
}
function Alert(props: AlertProps) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
export default function UploadButton(props: UploadButtonProps): JSX.Element {
  const { applicationId, handleObjURL } = props;
  const classes = documentUploadStyles();
  const [openAlert, setAlertOpen] = React.useState(false);

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setAlertOpen(false);
  };

  const [onSubmitHandler,
    { loading: mutationLoading, error: mutationError }] = useMutation<
  { uploadCV: UploadDocumentType }>(UPLOAD_CV_MUTATION);

  const newHandleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length === 1) {
      // await onSubmitHandler({
      //   variables: {
      //     document: event.target.files[0],
      //     documentApplicationId: applicationId,
      //   },
      // });
      // if (!mutationLoading && !mutationError) {
        handleObjURL({
          name: event.target.files[0].name,
          url: URL.createObjectURL(event.target.files[0]),
        });
        setAlertOpen(true);
      // }
    }
  };

  if (mutationLoading) return <div>Cargando...</div>;
  if (mutationError) return <div>{JSON.stringify(mutationError, null, 2)}</div>;

  return (
    <div className={classes.root}>
      <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          ¡Se ha agregó un archivo correctamente!
        </Alert>
      </Snackbar>
      <input
        accept=".doc,.docx,.pdf"
        className={classes.input}
        id="contained-button-file"
        multiple
        type="file"
        onChange={newHandleChange}
      />
      <InputLabel htmlFor="contained-button-file">
        <Button variant="contained" color="primary" component="span">
          Agregar archivo
        </Button>
      </InputLabel>
    </div>
  );
}
